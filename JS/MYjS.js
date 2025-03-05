const header = document.getElementById('header');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const scrollTopBtn = document.getElementById('scroll-top');
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        const fadeElements = document.querySelectorAll('.fade-in');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const typingElement = document.getElementById('typing');

        // Typing Effect
        const words = ['Fausat','Développeuse full-stack', 'Designer', 'Freelance', 'Etudiante'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing new word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Mobile Navigation
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Highlight nav links on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
            
            // Sticky header
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
                header.style.padding = '1rem 0';
                scrollTopBtn.classList.add('active');
            } else {
                header.style.backgroundColor = 'var(--dark)';
                header.style.padding = '1.5rem 0';
                scrollTopBtn.classList.remove('active');
            }
            
            // Fade in elements on scroll
            fadeElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('appear');
                }
            });
        });

        // Portfolio Filter
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Scroll to top
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initialize the typing effect
        window.addEventListener('load', () => {
            // Start typing effect
            setTimeout(typeEffect, 1000);
            
            // Trigger fade-in animation for visible elements
            fadeElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.classList.add('appear');
                }
            });
        });

