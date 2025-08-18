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
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    try {
        const response = await fetch(route.path);
        if (!response.ok) throw new Error(`Failed to fetch ${route.path}`);
        const html = await response.text();
        document.getElementById('app').innerHTML = html;
        setActiveLink();
        if (onNavigateCallback) {
            onNavigateCallback(route.category);
        }
    } catch (error) {
        console.error("Routing error:", error);
        document.getElementById('app').innerHTML = `<p>Error loading page. Please try again.</p>`;
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
