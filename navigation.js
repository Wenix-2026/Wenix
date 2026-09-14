document.addEventListener('DOMContentLoaded', () => {
    // 1. Sjednocená logika Burger Menu
    const burgerBtn = document.getElementById('burger-trigger');
    const burgerOverlay = document.getElementById('burger-overlay');
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');

    if (burgerBtn && burgerOverlay) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = burgerOverlay.classList.toggle('open');
            if (isOpen) {
                line1.style.transform = 'translateY(3px) rotate(45deg)';
                line2.style.transform = 'translateY(-3.5px) rotate(-45deg)';
                document.body.style.overflow = 'hidden';
            } else {
                line1.style.transform = 'none';
                line2.style.transform = 'none';
                document.body.style.overflow = '';
            }
        });

        // Zavření po kliknutí na libovolný odkaz
        burgerOverlay.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', () => {
                burgerOverlay.classList.remove('open');
                line1.style.transform = 'none';
                line2.style.transform = 'none';
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Nativní náhrada za AOS pro Fade-Up animace (Zero dependencies)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(el);
    });
});