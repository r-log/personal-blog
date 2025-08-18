const routes = {
    '/': { path: 'pages/home.html', category: 'home' },
    '/coding': { path: 'pages/coding.html', category: 'coding' },
    '/writing': { path: 'pages/writing.html', category: 'writing' },
    '/music': { path: 'pages/music.html', category: 'music' },
    '/careers': { path: 'pages/careers.html', category: 'careers' },
    '/admin': { path: 'pages/admin.html', category: 'admin' }
};

const navigate = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    
    const html = await fetch(route.path).then((data) => data.text());
    document.getElementById('app').innerHTML = html;

    // This will call the main rendering logic from our new app script
    if (window.onNavigate) {
        window.onNavigate(route.category);
    }
    
    setActiveLink();
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

window.onpopstate = handleLocation;
window.route = navigate;

// Initial load
handleLocation();
