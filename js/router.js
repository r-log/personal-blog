const routes = {
    '/': 'pages/home.html',
    '/coding': 'pages/coding.html',
    '/writing': 'pages/writing.html',
    '/music': 'pages/music.html',
    '/careers': 'pages/careers.html',
    '/admin': 'pages/admin.html'
};

const navigate = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById('app').innerHTML = html;
    setActiveLink();

    // Re-run scripts for the loaded content
    const scripts = document.getElementById('app').querySelectorAll('script');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript).parentNode.removeChild(newScript);
    });
};

const setActiveLink = () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname;
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
};

window.onpopstate = handleLocation;
window.route = navigate;

handleLocation();
