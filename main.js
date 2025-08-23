        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // Smooth scrolling for navigation links
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

        // Header scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(30, 58, 138, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(30, 58, 138, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Hide header on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });

        // Counter animation for stats
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.ceil(current).toLocaleString();
                }
            }, 10);
        }

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Download button functionality
        document.getElementById('downloadBtn')?.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create download modal
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                " onclick="this.remove()">
                    <div style="
                        background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                        border: 2px solid rgba(249, 115, 22, 0.5);
                        border-radius: 25px;
                        padding: 3rem;
                        text-align: center;
                        color: white;
                        max-width: 500px;
                        margin: 2rem;
                        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                        animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    " onclick="event.stopPropagation()">
                        <div style="
                            width: 80px;
                            height: 80px;
                            background: linear-gradient(45deg, #f97316, #fb923c);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin: 0 auto 2rem;
                            font-size: 2.5rem;
                            animation: pulse 2s infinite;
                        ">
                            <i class="fas fa-download"></i>
                        </div>
                        <h3 style="font-size: 2rem; margin-bottom: 1rem; color: #f97316;">
                            Download Iniciado!
                        </h3>
                        <p style="margin-bottom: 2rem; line-height: 1.6; opacity: 0.9;">
                            O FocusForge está sendo baixado. Enquanto aguarda, que tal se juntar à nossa comunidade 
                            para receber dicas exclusivas de produtividade?
                        </p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <a href="https://instagram.com/luizsantasuzana" target="_blank" style="
                                background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045);
                                color: white;
                                padding: 0.8rem 1.5rem;
                                border-radius: 25px;
                                text-decoration: none;
                                font-weight: 600;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: transform 0.3s ease;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fab fa-instagram"></i> Instagram
                            </a>
                            <a href="https://discord.gg/5jh7VaED6p" target="_blank" style="
                                background: #5865f2;
                                color: white;
                                padding: 0.8rem 1.5rem;
                                border-radius: 25px;
                                text-decoration: none;
                                font-weight: 600;
                                display: flex;
                                align-items: center;
                                gap: 0.5rem;
                                transition: transform 0.3s ease;
                            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <i class="fab fa-discord"></i> Discord
                            </a>
                        </div>
                        <button onclick="this.closest('[onclick]').remove()" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: 2px solid rgba(255, 255, 255, 0.3);
                            color: white;
                            padding: 0.8rem 2rem;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: 600;
                            margin-top: 2rem;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='rgba(255, 255, 255, 0.2)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.1)'">
                            Fechar
                        </button>
                    </div>
                </div>
                
                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes slideIn {
                        from { transform: translateY(-50px) scale(0.9); opacity: 0; }
                        to { transform: translateY(0) scale(1); opacity: 1; }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }
                </style>
            `;
            
            document.body.appendChild(modal);
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (modal.parentElement) {
                    modal.remove();
                }
            }, 10000);
        });

        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            document.querySelectorAll('.floating-element').forEach((element, index) => {
                const speed = (index + 1) * 0.3;
                element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add cursor trail effect
        const trail = [];
        const trailLength = 5;

        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (trail.length > trailLength) {
                trail.shift();
            }
            
            // Clean up old trail elements
            document.querySelectorAll('.cursor-trail').forEach(el => {
                if (Date.now() - el.dataset.time > 1000) {
                    el.remove();
                }
            });
        });

        // Mobile menu toggle (if needed later)
        const createMobileMenu = () => {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.cssText = `
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                @media (max-width: 768px) { display: block; }
            `;
            
            document.querySelector('nav').appendChild(mobileMenuBtn);
        };