const routes = {
    '/': { path: 'pages/home.html', category: 'home' },
    '/coding': { path: 'pages/coding.html', category: 'coding' },
    '/writing': { path: 'pages/writing.html', category: 'writing' },
    '/music': { path: 'pages/music.html', category: 'music' },
    '/careers': { path: 'pages/careers.html', category: 'careers' },
    '/admin': { path: 'pages/admin.html', category: 'admin' }
};

let onNavigateCallback;

const navigate = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    handleLocation();
};

const handleLocation = async () => {
    console.log(`[Router] handleLocation triggered for path: ${window.location.pathname}`);
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    console.log(`[Router] Matched route for path "${path}":`, route);

    try {
        const response = await fetch(route.path);
        console.log(`[Router] Fetch response for ${route.path}:`, response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        console.log(`[Router] Successfully loaded content for "${route.category}" into #app.`);
        
        setActiveLink();
        
        if (onNavigateCallback) {
            console.log(`[Router] Executing onNavigate callback with category: "${route.category}"`);
            onNavigateCallback(route.category);
        }
    } catch (error) {
        console.error("[Router] Failed to load page content:", error);
        document.getElementById('app').innerHTML = `<p>Error: Could not load page content. Please check the console for details.</p>`;
    }
};

const setActiveLink = () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === window.location.pathname) {
            link.classList.add('active');
        }
    });
};

const init = (callback) => {
    onNavigateCallback = callback;
    document.querySelector('nav').addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const path = e.target.getAttribute('href');
            if (path !== window.location.pathname) {
                navigate(path);
            }
        }
    });
    window.onpopstate = handleLocation;
    handleLocation(); // Initial load
};

export const router = {
    init,
    navigate
};
