document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');

    document.addEventListener('mousemove', (e) => {
        // Move dot instantly
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // Move glow with a slight delay for smooth effect
        setTimeout(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
        cursorDot.style.opacity = '0';
        cursorGlow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorGlow.style.opacity = '1';
    });


    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progressHeight = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = progressHeight + '%';
    });


    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });


    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });


    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- Typing Effect ---
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Electrical Engineering Student",
        "Electronics Enthusiast",
        "Embedded Systems Learner",
        "Cybersecurity Explorer",
        "Hackathon Competitor"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);


    // --- Intersection Observers ---
    
    // 1. Fade-in Elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));


    // 2. Skill Bars Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));


    // 3. Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-num');
    let counted = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const isPlus = stat.getAttribute('data-plus') === 'true';
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current) + (isPlus ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target + (isPlus ? '+' : '');
                        }
                    };
                    updateCounter();
                });
                counted = true;
                countObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        countObserver.observe(statsSection);
    }


    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form Submission Handling (Premium UI Feedback)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            
            const originalText = btn.innerText;
            const originalBg = btn.style.backgroundColor;
            
            // Show loading state
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Simulate network request delay
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
                btn.style.backgroundColor = '#10B981'; // Success green
                btn.style.color = '#fff';
                btn.style.opacity = '1';
                
                // Reset form fields
                form.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = originalBg; 
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    });

});
