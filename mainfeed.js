// Simulated data for users and posts
const users = [
    { id: 1, username: "SarahJohnson", avatar: "https://via.placeholder.com/40" },
    { id: 2, username: "EmilyDavis", avatar: "https://via.placeholder.com/40" },
    { id: 3, username: "JessicaBrown", avatar: "https://via.placeholder.com/40" },
    { id: 4, username: "LauraSmith", avatar: "https://via.placeholder.com/40" },
    { id: 5, username: "AnnaWilson", avatar: "https://via.placeholder.com/40" }
];

const currentUser = { id: 6, username: "CurrentUser", avatar: "https://via.placeholder.com/40" }; // Current user
const userConnections = [1, 2]; // Simulate the user's connections (SarahJohnson and EmilyDavis)

let posts = JSON.parse(localStorage.getItem("posts")) || [
    { id: 1, content: "Exciting new startup idea!", username: "SarahJohnson", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: null },
    { id: 2, content: "Check out my new product launch!", username: "EmilyDavis", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: "https://via.placeholder.com/800x300" },
    { id: 3, content: "Looking for new business partners!", username: "JessicaBrown", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: null },
    { id: 4, content: "Just launched my new website!", username: "LauraSmith", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: "https://via.placeholder.com/800x300" },
    { id: 5, content: "Excited to join this community!", username: "AnnaWilson", avatar: "https://via.placeholder.com/40", likes: 0, likedBy: [], image: null }
];

// Hardcoded posts for the "Connected" page
const hardcodedPosts = [
    {
        id: 6, // Unique ID for each post
        content: "This is a post from User1. Loving the new forum design!",
        username: "User1",
        avatar: "https://via.placeholder.com/40",
        likes: 0,
        likedBy: [],
        image: null,
    },
    {
        id: 7,
        content: "User2 here! Just sharing some thoughts on the latest trends.",
        username: "User2",
        avatar: "https://via.placeholder.com/40",
        likes: 0,
        likedBy: [],
        image: null,
    },
    {
        id: 8,
        content: "Hello from User3! Let's discuss some exciting topics.",
        username: "User3",
        avatar: "https://via.placeholder.com/40",
        likes: 0,
        likedBy: [],
        image: null,
    },
];

// Add hardcoded posts to the main posts array if they don't already exist
hardcodedPosts.forEach((hardcodedPost) => {
    if (!posts.some((post) => post.id === hardcodedPost.id)) {
        posts.push(hardcodedPost);
    }
});

// Ensure posts are saved to localStorage initially
savePosts();

// Load the Feed page with default "Connected" view
function loadFeed() {
    posts = JSON.parse(localStorage.getItem("posts")) || posts; // Reload posts from localStorage
    loadConnectionsPage(); // Default to Connections when Feed is clicked
}

// Show only posts from connected users (including current user)
function loadConnectionsPage() {
    document.getElementById('connected-page').style.display = 'block';
    document.getElementById('explore-page').style.display = 'none';
    displayPosts('connected');
}

// Show posts from everyone
function loadExplorePage() {
    document.getElementById('connected-page').style.display = 'none';
    document.getElementById('explore-page').style.display = 'block';
    displayPosts('explore');
}

// Show all posts or filter by connections
function displayPosts(feedType) {
    const feed = feedType === 'connected' ? document.getElementById('connected-feed') : document.getElementById('explore-feed');
    feed.innerHTML = ''; // Clear previous posts

    const filteredPosts = feedType === 'connected'
        ? posts.filter(post => {
            const postUser = users.find(user => user.username === post.username);
            return userConnections.includes(postUser?.id) || post.username === currentUser.username;
        })
        : posts;

    // Sort posts: Current user's posts at the top
    const sortedPosts = filteredPosts.sort((a, b) => {
        if (a.username === currentUser.username) return -1;
        if (b.username === currentUser.username) return 1;
        return 0;
    });

    sortedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="Avatar" class="avatar">
                <h4>${post.username}</h4>
            </div>
            ${post.image ? `<img src="${post.image}" alt="Post Image" class="post-image">` : ''}
            <p>${post.content}</p>
            <div class="post-actions">
                <button onclick="toggleLike(${post.id})">
                    ${post.likedBy.includes(currentUser.username) ? 'Like' : 'Like'} (${post.likes})
                </button>
                <button onclick="commentPost(${post.id})">Comment</button>
                <button onclick="sharePost(${post.id})">Share</button>
            </div>
        `;
        feed.appendChild(postElement);
    });
}

// Create a post for a section (connected or explore)
function createPost(feedType) {
    const content = document.getElementById('post-content').value;
    const imageInput = document.getElementById('post-image');
    const imageFile = imageInput.files[0];

    if (content.trim() || imageFile) {
        const newPost = {
            id: Date.now(),
            content: content,
            username: currentUser.username,
            avatar: currentUser.avatar,
            likes: 0,
            likedBy: [],
            image: imageFile ? URL.createObjectURL(imageFile) : null
        };
        posts.push(newPost);
        savePosts();
        displayPosts(feedType);
    }
    document.getElementById('post-content').value = ''; // Clear the textarea
    imageInput.value = ''; // Clear the file input
}

// Toggle like for a post
function toggleLike(postId) {
    posts = JSON.parse(localStorage.getItem("posts")) || posts; // Refresh from localStorage
    const post = posts.find(p => p.id === postId);

    if (post.likedBy.includes(currentUser.username)) {
        // Unlike the post
        post.likes -= 1;
        post.likedBy = post.likedBy.filter(username => username !== currentUser.username);
    } else {
        // Like the post
        post.likes += 1;
        post.likedBy.push(currentUser.username);
    }

    savePosts();
    displayPosts('connected'); // Reload the connected feed
    displayPosts('explore'); // Reload the explore feed
}

// Save posts to localStorage to persist likes
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Initialize with Feed page
loadFeed();