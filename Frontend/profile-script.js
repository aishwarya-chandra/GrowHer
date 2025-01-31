// Function to generate random profit data
function generateRandomProfitData(months) {
    return Array.from({ length: months }, () => Math.floor(Math.random() * 100000) + 50000); // Random values between 50,000 and 150,000
  }
  
  // Render Profit Trends Graph
  function renderProfitTrendsGraph() {
    const ctx = document.getElementById('profit-trends-chart').getContext('2d');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const profitData = generateRandomProfitData(months.length); // Generate random profit data
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Profit (in ₹)',
            data: profitData,
            borderColor: '#00AAC1',
            backgroundColor: 'rgba(156, 137, 184, 0.2)', // Light purple fill
            fill: true,
            tension: 0.4, // Smooth line
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Profit (in ₹)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
  
  // Render Posted Pictures
  function renderPostedPictures() {
    const pictureGrid = document.getElementById('picture-grid');
    const pictures = [
      'E:/GrowHerFinal/t1.jpg',
      'E:/GrowHerFinal/t2.jpg',
      'E:/GrowHerFinal/t3.jpg',
      'E:/GrowHerFinal/t4.jpg',
      'E:/GrowHerFinal/t5.jpg',
      'E:/GrowHerFinal/t6.jpg',
    ];
  
    pictures.forEach((picture) => {
      const img = document.createElement('img');
      img.src = picture;
      pictureGrid.appendChild(img);
    });
  }
  
  // Initialize Page
  function init() {
    renderProfitTrendsGraph();
    renderPostedPictures();
  }
  
  // Run on page load
  init();