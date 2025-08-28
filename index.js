
        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.loader').classList.add('fade-out');
            }, 1500);
        });

        // Typing Animation
        const phrases = ['Full Stack Developer', 'Cloud Architect', 'Problem Solver', 'Tech Enthusiast'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typingText');

        function typeText() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(typeText, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeText, 500);
            } else {
                setTimeout(typeText, isDeleting ? 50 : 100);
            }
        }

        typeText();

        // Particle Animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleSymbols = ['<', '>', '/', '{', '}', '(', ')', ';', '=', '+'];
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('span');
                particle.className = 'particle';
                particle.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.fontSize = Math.random() * 20 + 10 + 'px';
                particlesContainer.appendChild(particle);
            }
        }

        createParticles();

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const icon = themeToggle.querySelector('i');

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                }
            });
        });

        // Scroll Reveal Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Testimonials Carousel
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const dots = document.querySelectorAll('.dot');

        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        // GitHub Contribution Graph
        function generateContributionGraph() {
            const graph = document.getElementById('contributionGraph');
            
            for (let week = 0; week < 52; week++) {
                const weekDiv = document.createElement('div');
                weekDiv.className = 'week';
                
                for (let day = 0; day < 7; day++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.className = 'day';
                    
                    // Random contribution level
                    const level = Math.floor(Math.random() * 5);
                    if (level > 0) {
                        dayDiv.classList.add(`level-${level}`);
                    }
                    
                    // Add tooltip on hover
                    dayDiv.title = `${Math.floor(Math.random() * 10)} contributions`;
                    
                    weekDiv.appendChild(dayDiv);
                }
                
                graph.appendChild(weekDiv);
            }
        }

        generateContributionGraph();

        // Terminal Form Interaction
        const terminalForm = document.querySelector('.terminal-form');
        const terminalInputs = document.querySelectorAll('.terminal-input');

        terminalInputs.forEach(input => {
            input.addEventListener('focus', () => {
                const header = document.querySelector('.terminal-header');
                header.style.color = '#0f0';
            });
            
            input.addEventListener('blur', () => {
                const header = document.querySelector('.terminal-header');
                header.style.color = 'var(--accent-blue)';
            });
        });

        terminalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully! I\'ll get back to you soon.');
            terminalForm.reset();
        });

        // Project Card Hover Effect
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            const particles = document.querySelector('.particles');
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - scrolled / window.innerHeight;
            }
            
            if (particles) {
                particles.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Add some interactive console messages
        console.log('%c Welcome to my portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px;');
        console.log('%c Feel free to explore the code and reach out if you have any questions!', 'color: #64ffda; font-size: 14px;');
        console.log('%c 📧 john.doe@email.com | 🔗 linkedin.com/in/johndoe-dev', 'color: #8892b0; font-size: 12px;');
