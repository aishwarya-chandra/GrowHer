document.getElementById('business-form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Basic validation
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
  }

  // File validation
  const registrationCertificate = document.getElementById('registration-certificate').files[0];
  const governmentId = document.getElementById('government-id').files[0];
  
  if (!registrationCertificate || !governmentId) {
      alert('Please upload all required documents!');
      return;
  }

  // Create FormData object for file uploads
  const formData = new FormData();
  
  // Add text fields to FormData
  formData.append('businessName', document.getElementById('business-name').value);
  formData.append('ownerName', document.getElementById('owner-name').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('phone', document.getElementById('phone').value);
  formData.append('password', password);
  formData.append('industry', document.getElementById('industry').value);
  formData.append('businessType', document.getElementById('business-type').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('website', document.getElementById('website').value || '');
  formData.append('fundingGoal', document.getElementById('funding-goal').value);
  formData.append('investmentType', document.getElementById('investment-type').value);
  formData.append('businessStage', document.getElementById('business-stage').value);
  formData.append('terms', document.getElementById('terms').checked);
  formData.append('role', 'business'); // Adding role to identify this is a business signup
  
  // Add files to FormData
  formData.append('registrationCertificate', registrationCertificate);
  formData.append('governmentId', governmentId);

  // Disable submit button to prevent multiple submissions
  document.querySelector('button[type="submit"]').disabled = true;
  document.querySelector('button[type="submit"]').textContent = 'Submitting...';

  // Send data to backend
  signupUser(formData);
});

async function signupUser(formData) {
  try {
      const response = await fetch('http://localhost:5000/api/auth/register/business', {
          method: 'POST',
          body: formData, // No Content-Type header for FormData with files
      });

      const data = await response.json();
      
      if (data.success) {
          // Store token if provided
          if (data.token) {
              localStorage.setItem('token', data.token);
          }
          
          alert('Registration successful! Redirecting to your profile.');
          
          // Redirect to profile page
          window.location.href = 'profile.html';
      } else {
          alert(data.message || 'Registration failed. Please try again.');
          // Re-enable submit button
          document.querySelector('button[type="submit"]').disabled = false;
          document.querySelector('button[type="submit"]').textContent = 'Submit';
      }
  } catch (err) {
      console.error('Error during signup:', err);
      alert('Error submitting form. Please check your connection and try again.');
      // Re-enable submit button
      document.querySelector('button[type="submit"]').disabled = false;
      document.querySelector('button[type="submit"]').textContent = 'Submit';
  }
}

function login() {
  alert('Redirecting to Login Page...');
  window.location.href = 'login.html'; // Redirect to the login page
}
