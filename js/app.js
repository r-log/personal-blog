let posts = [];
let currentCategory = 'home';

// --- UI Update Functions ---
function updateAdminUI() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = isAdmin ? 'block' : 'none';
    });
    // Also handle the main logout button in the header
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = isAdmin ? 'block' : 'none';
    }
}

// --- Post Management ---
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
        
        const title = document.createElement('h2');
        title.textContent = post.title;
        postElement.appendChild(title);

        const content = document.createElement('p');
        content.textContent = post.content;
        postElement.appendChild(content);

        const adminControls = document.createElement('div');
        adminControls.className = 'admin-only';
        adminControls.style.display = 'none';

        const editButton = document.createElement('button');
        editButton.dataset.action = 'edit';
        editButton.dataset.id = post.id;
        editButton.textContent = 'Edit';
        adminControls.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.dataset.action = 'delete';
        deleteButton.dataset.id = post.id;
        deleteButton.textContent = 'Delete';
        adminControls.appendChild(deleteButton);

        postElement.appendChild(adminControls);
        postsContainer.appendChild(postElement);
    });
    updateAdminUI();
}

// --- Modal Management ---
function openPostModal(id) {
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
}

function closePostModal() {
    document.getElementById('post-modal').style.display = 'none';
}

async function savePost() {
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
        closePostModal();
        await fetchAndRenderPosts();
    } else {
        alert('Please fill out all fields.');
    }
}

async function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        await fetchAndRenderPosts();
    }
}

// --- Event Delegation and Initialization ---
function initializeEventListeners() {
    console.log('Attempting to initialize event listeners...');
    const app = document.getElementById('app');
    const modal = document.getElementById('post-modal');

    if (!app) {
        console.error('#app element not found!');
        return;
    }

    // Using addEventListener for more robust event handling
    app.addEventListener('click', (e) => {
        console.log('Click detected inside #app container.');
        const target = e.target;
        console.log('Clicked element:', target);

        if (target.id === 'login-btn') {
            console.log('Login button was clicked.');
            const passwordInput = document.getElementById('password');
            if (passwordInput) {
                const password = passwordInput.value;
                console.log(`Password entered: "${password}"`);
                if (password === 'admin') {
                    console.log('Password is correct. Logging in...');
                    sessionStorage.setItem('isAdmin', 'true');
                    window.route('/');
                } else {
                    console.log('Password incorrect.');
                    alert('Incorrect password.');
                }
            } else {
                console.error('Password input field not found!');
            }
        } else if (target.id === 'add-post-btn') {
            openPostModal();
        } else if (target.dataset.action === 'edit') {
            openPostModal(target.dataset.id);
        } else if (target.dataset.action === 'delete') {
            deletePost(target.dataset.id);
        }
    });

    console.log('Click listener for #app attached.');

    // Modal close buttons
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.onclick = closePostModal;
    }
    const savePostBtn = document.getElementById('save-post-btn');
    if (savePostBtn) {
        savePostBtn.onclick = savePost;
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            closePostModal();
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Logout button is in the static header, so it can be set up once
    document.getElementById('logout-btn').onclick = () => {
        sessionStorage.removeItem('isAdmin');
        // Use router to navigate to home to reload content
        if (window.route) window.route('/');
        else window.location.href = '/';
    };

    // Kick off the initial page load from app.js
    if (window.handleLocation) {
        window.handleLocation();
    }
});

// This function is called by the router after a new page is loaded
window.onNavigate = (category) => {
    console.log(`onNavigate called for category: ${category}`);
    currentCategory = category;
    initializeEventListeners(); // Re-initialize listeners on new content
    if (['coding', 'writing', 'music', 'careers'].includes(category)) {
        fetchAndRenderPosts();
    } else {
        updateAdminUI();
    }
};
