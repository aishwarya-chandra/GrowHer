document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('remember-me').checked;

  // Show loading state
  document.querySelector('.btn-login').textContent = 'Logging in...';
  document.querySelector('.btn-login').disabled = true;

  // Make API call to backend
  fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Store token in localStorage
          localStorage.setItem('token', data.token);
          
          // Store username if remember me is checked
          if (rememberMe) {
              localStorage.setItem('username', username);
          } else {
              localStorage.removeItem('username');
          }
          
          alert(`Welcome back, ${username}!`);
          // Redirect to profile page
          window.location.href = 'profile.html';
      } else {
          alert(data.message || 'Login failed. Please check your credentials.');
      }
  })
  .catch(error => {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
  })
  .finally(() => {
      // Reset button state
      document.querySelector('.btn-login').textContent = 'Login';
      document.querySelector('.btn-login').disabled = false;
  });
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', function() {
  // Pre-fill username if stored in localStorage
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
      document.getElementById('username').value = savedUsername;
      document.getElementById('remember-me').checked = true;
  }
  
  // Check if user has a valid token
  const token = localStorage.getItem('token');
  if (token) {
      // Verify token with backend
      fetch('http://localhost:5000/api/auth/me', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => {
          if (response.ok) {
              // Token is valid, redirect to profile
              window.location.href = 'profile.html';
          } else {
              // Token is invalid, remove it
              localStorage.removeItem('token');
          }
      })
      .catch(error => {
          console.error('Token verification error:', error);
      });
  }
});
