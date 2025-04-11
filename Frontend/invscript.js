document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Basic validation
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
  }

  // File validation
  const governmentId = document.getElementById('government-id').files[0];
  
  if (governmentId) {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      
      if (!validTypes.includes(governmentId.type)) {
          alert('Invalid file type! Only PDF, JPG, and PNG are allowed.');
          return;
      }
      
      if (governmentId.size > maxSize) {
          alert('File size exceeds the 5MB limit!');
          return;
      }
  } else {
      alert('Please upload your government ID!');
      return;
  }

  // Collect form data
  const formData = {
      fullName: document.getElementById('full-name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: password,
      occupation: document.getElementById('occupation').value,
      company: document.getElementById('company').value || '',
      linkedin: document.getElementById('linkedin').value || '',
      terms: document.getElementById('terms').checked,
      role: 'investor' // Adding role to identify this is an investor signup
  };

  // Create FormData object for file upload
  const fileFormData = new FormData();
  fileFormData.append('governmentId', governmentId);
  
  // Add other form fields to FormData
  Object.keys(formData).forEach(key => {
      fileFormData.append(key, formData[key]);
  });

  // Disable submit button to prevent multiple submissions
  document.querySelector('button[type="submit"]').disabled = true;
  document.querySelector('button[type="submit"]').textContent = 'Signing Up...';

  // Send data to backend
  signupUser(fileFormData);
});

async function signupUser(formData) {
  try {
      // For JSON data without file
      // const response = await fetch('http://localhost:5000/api/auth/register/investor', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(formData),
      // });

      // For FormData with file
      const response = await fetch('http://localhost:5000/api/auth/register/investor', {
          method: 'POST',
          body: formData, // No Content-Type header for FormData with files
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("Success response received, preparing to redirect");
          // Store token if provided
          if (data.token) {
              localStorage.setItem('token', data.token);
              console.log("Token saved to localStorage");
          }
          
          alert('Registration successful! Redirecting to your profile.');
          console.log("About to redirect to profile.html");
          
          // Redirect to profile page
          //   window.location.href = 'profile.html';
          setTimeout(() => {
            window.location.replace('profile.html');
        }, 1000);
          console.log("Redirection command executed");
      } else {
          alert(data.message || 'Registration failed. Please try again.');
          // Re-enable submit button
          document.querySelector('button[type="submit"]').disabled = false;
          document.querySelector('button[type="submit"]').textContent = 'Sign Up';
      }
  } catch (err) {
      console.error('Error during signup:', err);
      alert('Error submitting form. Please check your connection and try again.');
      // Re-enable submit button
      document.querySelector('button[type="submit"]').disabled = false;
      document.querySelector('button[type="submit"]').textContent = 'Sign Up';
  }
}

function login() {
  alert('Redirecting to Login Page...');
  window.location.href = 'login.html'; // Redirect to the login page
}
