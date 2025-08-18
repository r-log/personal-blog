const routes = {
    '/': { path: 'pages/home.html', category: 'home' },
    '/coding': { path: 'pages/coding.html', category: 'coding' },
    '/writing': { path: 'pages/writing.html', category: 'writing' },
    '/music': { path: 'pages/music.html', category: 'music' },
    '/careers': { path: 'pages/careers.html', category: 'careers' },
    '/admin': { path: 'pages/admin.html', category: 'admin' }
};

let posts = [];
let currentCategory = 'home';

const navigate = (path) => {
    window.history.pushState({}, path, window.location.origin + path);
    handleLocation();
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    currentCategory = route.category;

    const html = await fetch(route.path).then((data) => data.text());
    document.getElementById('app').innerHTML = html;

    initializePage();
    setActiveLink();
};

async function fetchAndRenderPosts() {
    try {
        const response = await fetch('/api/posts');
        posts = await response.json();
        renderPosts();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;

    const categoryPosts = posts.filter(post => post.category === currentCategory);
    postsContainer.innerHTML = '';
    categoryPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <div class="admin-only" style="display: none;">
                <button onclick="window.openPostModal('${post.id}')">Edit</button>
                <button onclick="window.deletePost('${post.id}')">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
    updateAdminUI();
}

window.openPostModal = (id) => {
    const modal = document.getElementById('post-modal');
    if (id) {
        const post = posts.find(p => p.id === id);
        modal.querySelector('h2').textContent = 'Edit Post';
        document.getElementById('post-id').value = post.id;
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
    } else {
        modal.querySelector('h2').textContent = 'Create New Post';
        document.getElementById('post-id').value = '';
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    }
    modal.style.display = 'block';
};

window.savePost = async () => {
    const modal = document.getElementById('post-modal');
    const id = document.getElementById('post-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title && content) {
        const post = { title, content, category: currentCategory };
        if (id) {
            post.id = id;
            await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
        } else {
            await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            });
        }
        modal.style.display = 'none';
        await fetchAndRenderPosts();
    } else {
        alert('Please fill out all fields.');
    }
};

window.deletePost = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
        await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        await fetchAndRenderPosts();
    }
};

function updateAdminUI() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = isAdmin ? 'block' : 'none';
    });
}

function initializePage() {
    if (['coding', 'writing', 'music', 'careers'].includes(currentCategory)) {
        fetchAndRenderPosts();
    }
    
    const addPostBtn = document.getElementById('add-post-btn');
    if (addPostBtn) {
        addPostBtn.onclick = () => window.openPostModal();
    }

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = () => {
            const password = document.getElementById('password').value;
            if (password === 'admin') {
                sessionStorage.setItem('isAdmin', 'true');
                navigate('/');
            } else {
                alert('Incorrect password.');
            }
        };
    }
}

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
