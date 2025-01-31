// Hardcoded Data for Categories and Threads
const forumData = {
    categories: ["Startups", "Investments", "Marketing", "Technology", "Mentorship"],
    threads: [
      {
        category: "Startups",
        title: "How to pitch to investors?",
        content: "Looking for tips on how to create a compelling pitch deck.",
        author: "Jane Doe"
      },
      {
        category: "Investments",
        title: "Best industries to invest in 2024?",
        content: "What are the emerging industries with high growth potential?",
        author: "John Smith"
      },
      {
        category: "Marketing",
        title: "Effective social media strategies for startups",
        content: "Share your best practices for organic growth on social media.",
        author: "Alice Johnson"
      },
      {
        category: "Technology",
        title: "Top tech trends for 2024",
        content: "Discuss the latest advancements in AI, blockchain, and IoT.",
        author: "Bob Brown"
      },
      {
        category: "Mentorship",
        title: "How to find a good mentor?",
        content: "Tips for identifying and approaching potential mentors.",
        author: "Charlie Davis"
      }
    ]
  };
  
  // Function to render categories
  function renderCategories() {
    const categoriesContainer = document.querySelector('.categories');
    forumData.categories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.className = 'category';
      categoryElement.textContent = category;
      categoryElement.addEventListener('click', () => filterThreads(category));
      categoriesContainer.appendChild(categoryElement);
    });
  }
  
  // Function to render threads based on category
  function renderThreads(filterCategory = null) {
    const threadsContainer = document.querySelector('.threads');
    threadsContainer.innerHTML = ''; // Clear existing threads
  
    const filteredThreads = filterCategory
      ? forumData.threads.filter(thread => thread.category === filterCategory)
      : forumData.threads;
  
    if (filteredThreads.length === 0) {
      threadsContainer.innerHTML = '<p>No threads found in this category.</p>';
      return;
    }
  
    filteredThreads.forEach(thread => {
      const threadElement = document.createElement('div');
      threadElement.className = 'thread';
      threadElement.innerHTML = `
        <h3>${thread.title}</h3>
        <p>${thread.content}</p>
        <p><strong>Author:</strong> ${thread.author}</p>
      `;
      threadsContainer.appendChild(threadElement);
    });
  }
  
//   // Function to filter threads by category
//   function filterThreads(category) {
//     renderThreads(category);
//   }
  function filterThreads(category) {
    // Remove active class from all categories
    document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
    // Add active class to the selected category
    const selectedCategory = Array.from(document.querySelectorAll('.category')).find(
      cat => cat.textContent === category
    );
    if (selectedCategory) selectedCategory.classList.add('active');
    // Render threads for the selected category
    renderThreads(category);
  }
  
  // Initialize the forum
  function initForum() {
    renderCategories();
    renderThreads(); // Show all threads by default
  }
  
  // Run the initialization function when the page loads
  window.onload = initForum;