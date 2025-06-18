       let anaPortfolioChart;
        
        function initializeAnaChart() {
            const ctx = document.getElementById('anaPortfolioChart').getContext('2d');
            
            const chartData = {
                '1M': {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    data: [14800, 15100, 14950, 15240]
                },
                '3M': {
                    labels: ['Month 1', 'Month 2', 'Month 3'],
                    data: [13500, 14200, 15240]
                },
                '6M': {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    data: [12800, 13200, 13500, 14200, 14800, 15240]
                },
                '1Y': {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    data: [11500, 13200, 14500, 15240]
                }
            };
            
            anaPortfolioChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData['1M'].labels,
                    datasets: [{
                        label: 'Portfolio Value',
                        data: chartData['1M'].data,
                        borderColor: '#1e40af',
                        backgroundColor: 'rgba(30, 64, 175, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#1e40af',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 3,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(30, 64, 175, 0.9)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            borderColor: '#1e40af',
                            borderWidth: 1,
                            cornerRadius: 8,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#64748b',
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'k';
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#64748b'
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
            
            // Store chart data for updates
            window.anaChartData = chartData;
        }
        
        function updateAnaChart(period) {
            // Remove active class from all buttons
            document.querySelectorAll('.ana-chart-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            event.target.classList.add('active');
            
            // Update chart data
            const newData = window.anaChartData[period];
            anaPortfolioChart.data.labels = newData.labels;
            anaPortfolioChart.data.datasets[0].data = newData.data;
            anaPortfolioChart.update('active');
        }
        
        // Sidebar navigation
        function initializeAnaNavigation() {
            const navItems = document.querySelectorAll('.ana-nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all items
                    navItems.forEach(nav => nav.classList.remove('active'));
                    
                    // Add active class to clicked item
                    this.classList.add('active');
                    
                    // Update header based on section
                    const section = this.dataset.section;
                    updateAnaHeader(section);
                });
            });
        }
        
        function updateAnaHeader(section) {
            const headerTitle = document.querySelector('.ana-header-left h1');
            const headerSubtitle = document.querySelector('.ana-header-left p');
            
            const sectionTitles = {
                dashboard: {
                    title: 'Welcome back, John!',
                    subtitle: "Here's your investment overview for today"
                },
                portfolio: {
                    title: 'Portfolio Overview',
                    subtitle: 'Manage and track your investments'
                },
                transactions: {
                    title: 'Transaction History',
                    subtitle: 'View all your investment activities'
                },
                investments: {
                    title: 'Investment Opportunities',
                    subtitle: 'Discover new investment options'
                },
                reports: {
                    title: 'Financial Reports',
                    subtitle: 'Access your detailed financial statements'
                },
                mentorship: {
                    title: 'Investment Mentorship',
                    subtitle: 'Learn from our expert advisors'
                },
                support: {
                    title: 'Customer Support',
                    subtitle: 'Get help with your account'
                },
                settings: {
                    title: 'Account Settings',
                    subtitle: 'Manage your profile and preferences'
                }
            };
            
            if (sectionTitles[section]) {
                headerTitle.textContent = sectionTitles[section].title;
                headerSubtitle.textContent = sectionTitles[section].subtitle;
            }
        }
        
        // Mobile sidebar toggle
        function toggleAnaSidebar() {
            const sidebar = document.getElementById('anaSidebar');
            sidebar.classList.toggle('open');
        }
        
        // Notification system
        function initializeAnaNotifications() {
            const notificationBtn = document.querySelector('.ana-notification-btn');
            
            notificationBtn.addEventListener('click', function() {
                // Simple notification popup
                alert('Notifications:\n• Portfolio gained 2.3% today\n• Dividend payment received\n• Monthly report is ready');
            });
        }
        
        // Stats animation
        function animateAnaStats() {
            const statValues = document.querySelectorAll('.ana-stat-value');
            
            statValues.forEach(stat => {
                const finalValue = stat.textContent;
                const isPercentage = finalValue.includes('%');
                const isDollar = finalValue.includes('$');
                
                let numericValue = parseFloat(finalValue.replace(/[$,%]/g, ''));
                let currentValue = 0;
                const increment = numericValue / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(currentValue);
                    
                    if (isDollar) {
                        stat.textContent = '$' + displayValue.toLocaleString();
                    } else if (isPercentage) {
                        stat.textContent = displayValue.toFixed(1) + '%';
                    } else {
                        stat.textContent = displayValue.toLocaleString();
                    }
                }, 20);
            });
        }
        
        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeAnaChart();
            initializeAnaNavigation();
            initializeAnaNotifications();
            
            // Animate stats after a short delay
            setTimeout(animateAnaStats, 500);
            
            // Close mobile sidebar when clicking outside
            document.addEventListener('click', function(e) {
                const sidebar = document.getElementById('anaSidebar');
                const menuBtn = document.querySelector('.ana-mobile-menu-btn');
                
                if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (anaPortfolioChart) {
                anaPortfolioChart.resize();
            }
        });