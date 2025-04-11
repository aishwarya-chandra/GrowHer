document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (!token) {
      window.location.href = 'login.html';
      return;
  }

  // Fetch user profile data from backend
  fetchUserProfile(token);

  // Set up event listeners
  document.getElementById('connections-button').addEventListener('click', openConnectionsModal);
  document.querySelector('.close').addEventListener('click', closeConnectionsModal);
  document.getElementById('logout-btn').addEventListener('click', logout);
});

async function fetchUserProfile(token) {
  try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      if (data.success) {
          renderUserProfile(data.data);
      } else {
          showError('Error loading profile data');
      }
  } catch (error) {
      console.error('Profile error:', error);
      showError('Error loading profile. Please try logging in again.');
      setTimeout(() => {
          logout();
      }, 3000);
  }
}

function renderUserProfile(user) {
  // Set common profile elements
  document.getElementById('user-name').textContent = user.fullName || user.username;
  document.getElementById('username').textContent = `@${user.username}`;
  document.getElementById('user-role').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  document.getElementById('user-role').className = `role-badge ${user.role}`;
  
  // Clear loading indicator
  document.getElementById('details-container').innerHTML = '';
  
  // Add common details
  addDetailItem('Email', user.email);
  addDetailItem('Phone', user.phone);
  
  // Render role-specific content
  if (user.role === 'business') {
      renderBusinessProfile(user);
  } else if (user.role === 'investor') {
      renderInvestorProfile(user);
  }
}

function renderBusinessProfile(user) {
  // Show business-specific sections
  document.querySelector('.business-specific-content').style.display = 'block';
  document.querySelector('.investor-specific-content').style.display = 'none';
  
  // Add business-specific details
  addDetailItem('Business Name', user.businessName);
  addDetailItem('Industry', user.industry);
  addDetailItem('Business Type', user.businessType);
  addDetailItem('Funding Goal', user.fundingGoal);
  addDetailItem('Investment Type', user.investmentType);
  addDetailItem('Business Stage', user.businessStage);
  
  // Set bio
  document.getElementById('user-bio').textContent = user.description || '';
  
  // Render profit trends chart
  renderProfitTrendsGraph();
  
  // Render business gallery (placeholder images for now)
  renderBusinessGallery();
}

function renderInvestorProfile(user) {
  // Show investor-specific sections
  document.querySelector('.business-specific-content').style.display = 'none';
  document.querySelector('.investor-specific-content').style.display = 'block';
  
  // Add investor-specific details
  addDetailItem('Occupation', user.occupation);
  if (user.company) addDetailItem('Company', user.company);
  if (user.linkedin) addDetailItem('LinkedIn', user.linkedin);
  
  // Set bio (placeholder for now)
  document.getElementById('user-bio').textContent = "Investor looking for promising opportunities";
  
  // Render investment portfolio (placeholder for now)
  renderInvestmentPortfolio();
}

function addDetailItem(label, value) {
  if (!value) return;
  
  const detailItem = document.createElement('div');
  detailItem.innerHTML = `<strong>${label}:</strong> ${value}`;
  document.getElementById('details-container').appendChild(detailItem);
}

function renderProfitTrendsGraph() {
  const ctx = document.getElementById('profit-trends-chart').getContext('2d');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const profitData = generateRandomProfitData(months.length);
  
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: months,
          datasets: [{
              label: 'Profit (in ₹)',
              data: profitData,
              borderColor: '#00AAC1',
              backgroundColor: 'rgba(156, 137, 184, 0.2)',
              fill: true,
              tension: 0.4,
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Profit (in ₹)',
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: 'Months',
                  }
              }
          },
          plugins: {
              legend: {
                  display: true,
                  position: 'top',
              }
          }
      }
  });
}

function renderBusinessGallery() {
  const pictureGrid = document.getElementById('picture-grid');
  pictureGrid.innerHTML = ''; // Clear existing content
  
  // Use placeholder images instead of local file paths
  const placeholderImages = [
      'https://via.placeholder.com/300x200?text=Business+Image+1',
      'https://via.placeholder.com/300x200?text=Business+Image+2',
      'https://via.placeholder.com/300x200?text=Business+Image+3',
      'https://via.placeholder.com/300x200?text=Business+Image+4',
      'https://via.placeholder.com/300x200?text=Business+Image+5',
      'https://via.placeholder.com/300x200?text=Business+Image+6'
  ];
  
  placeholderImages.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = "Business Image";
      pictureGrid.appendChild(img);
  });
}

function renderInvestmentPortfolio() {
  const portfolioContainer = document.getElementById('investment-portfolio');
  portfolioContainer.innerHTML = `
      <p>You haven't made any investments yet. Explore businesses to start investing!</p>
      <button class="explore-button">Explore Businesses</button>
  `;
}

function generateRandomProfitData(months) {
  return Array.from({ length: months }, () => Math.floor(Math.random() * 100000) + 50000);
}

function openConnectionsModal() {
  document.getElementById('connections-modal').style.display = 'block';
}

function closeConnectionsModal() {
  document.getElementById('connections-modal').style.display = 'none';
}

function showError(message) {
  document.getElementById('user-name').textContent = 'Error';
  document.getElementById('user-bio').textContent = message;
  document.getElementById('details-container').innerHTML = `<div class="error">${message}</div>`;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'signin.html';
}
