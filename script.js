 // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link, .mobile-actions .btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mobileMenu.contains(event.target) || mobileToggle.contains(event.target);
            if (!isClickInsideMenu && mobileMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Prevent scroll when mobile menu is open
        mobileToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });


    document.addEventListener('DOMContentLoaded', function() {
            const particleContainer = document.querySelector('.ana-hero-particles');
            
            // Create additional dynamic particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'ana-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particleContainer.appendChild(particle);
            }

            // Smooth scroll for CTA buttons
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Parallax effect on scroll
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const bg = document.querySelector('.ana-hero-bg-animation');
                const visual = document.querySelector('.ana-hero-visual');
                
                if (bg) {
                    bg.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                if (visual) {
                    visual.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            });
        });



        document.addEventListener('DOMContentLoaded', function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);

            // Observe all animated elements
            const animatedElements = document.querySelectorAll('.ana-value-card, .ana-stat-card');
            animatedElements.forEach(el => {
                observer.observe(el);
            });

            // Counter animation for stats
            const animateCounter = (element, target) => {
                let count = 0;
                const increment = target / 100;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    
                    if (target >= 1000000) {
                        element.textContent = '$' + (count / 1000000).toFixed(0) + 'M+';
                    } else {
                        element.textContent = Math.floor(count) + '+';
                    }
                }, 20);
            };

            // Animate counters when they come into view
            const statObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const number = entry.target.querySelector('.ana-stat-number');
                        const text = number.textContent;
                        
                        if (text.includes('500+')) {
                            animateCounter(number, 500);
                        } else if (text.includes('$50M+')) {
                            animateCounter(number, 50000000);
                        }
                        
                        statObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.ana-stat-card').forEach(card => {
                statObserver.observe(card);
            });
        });

document.addEventListener('DOMContentLoaded', function() {
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);

            // Observe team cards for staggered animation
            const teamCards = document.querySelectorAll('.ana-team-card');
            teamCards.forEach((card, index) => {
                observer.observe(card);
            });

            // Counter animation for team stats
            const animateCounter = (element, target, suffix = '') => {
                let count = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    
                    if (typeof target === 'string') {
                        element.textContent = target;
                    } else {
                        element.textContent = Math.floor(count) + suffix;
                    }
                }, 30);
            };

            // Animate stats when they come into view
            const statsObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statNumbers = entry.target.querySelectorAll('.ana-team-stat-number');
                        
                        statNumbers.forEach(number => {
                            const text = number.textContent;
                            if (text.includes('50+')) {
                                animateCounter(number, 50, '+');
                            } else if (text === '8') {
                                animateCounter(number, 8);
                            } else if (text.includes('12+')) {
                                animateCounter(number, 12, '+');
                            } else if (text === '24/7') {
                                number.textContent = '24/7';
                            }
                        });
                        
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const statsContainer = document.querySelector('.ana-team-stats');
            if (statsContainer) {
                statsObserver.observe(statsContainer);
            }

            // Add hover effects for team cards
            teamCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.zIndex = '20';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.zIndex = '10';
                });
            });

            // Smooth scroll behavior for social links
            const socialLinks = document.querySelectorAll('.ana-team-social-link');
            socialLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Add custom behavior here if needed
                });
            });
        });