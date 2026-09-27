document.addEventListener('DOMContentLoaded', () => {
    // Menu Data
    const menuData = {
        hookah: [
            { name: 'ترند', price: '4000' },
            { name: 'تفاحتين', price: '4000' },
            { name: 'انكليزي', price: '4000' },
            { name: 'علك ونعناع', price: '4000' },
            { name: 'ليمون ونعناع', price: '4000' },
            { name: 'عنب', price: '4000' }
        ],
        crepes: [
            { name: 'كريب نوتيلا', price: '3000' },
            { name: 'كريب لوتس', price: '4000' },
            { name: 'كريب بستاشيو', price: '4000' },
            { name: 'كريب فواكه', price: '4000' },
            { name: 'كريب رول بنانه', price: '4000' }
        ],
        juices: [
            { name: 'كوكتيل', price: '2000' },
            { name: 'موز و نوتيلا', price: '2000' },
            { name: 'موز وحليب', price: '2000' },
            { name: 'موز وفراولة', price: '2000' },
            { name: 'رمان', price: '2000' },
            { name: 'برتقال', price: '2000' },
            { name: 'ليمون', price: '2000' },
            { name: 'برتقال وليمون', price: '2000' }
        ],
        mojito: [
            { name: 'موهيتو بلوبيري', price: '1500' },
            { name: 'موهيتو فراولة', price: '1500' },
            { name: 'موهيتو رمان', price: '1500' },
            { name: 'موهيتو شمزي', price: '1500' },
            { name: 'موهيتو تفاح', price: '1500' },
            { name: 'موهيتو كيوي', price: '1500' },
            { name: 'موهيتو توت', price: '1500' },
            { name: 'موهيتو فواكه', price: '1500' }
        ],
        'cold-drinks': [
            { name: 'ماء', price: '250' },
            { name: 'ببسي', price: '500' },
            { name: 'سبرايت', price: '500' },
            { name: 'فانتا', price: '500' },
            { name: 'رمان', price: '500' },
            { name: 'مشن', price: '750' },
            { name: 'نيتوز', price: '750' }
        ],
        'hot-drinks': [
            { name: 'شاي', price: '500' },
            { name: 'قهوة', price: '1000' },
            { name: 'قهوة جكليتة', price: '1000' },
            { name: 'نسكافيه', price: '1000' },
            { name: 'كبتشينو', price: '1000' },
            { name: 'حليب', price: '1000' }
        ],
        'fruit-fresh': [
            { name: 'مكسيكي ليمون', price: '2000' },
            { name: 'مكسيكي رمان', price: '2000' },
            { name: 'مكسيكي برتقال', price: '2000' },
            { name: 'سموذي', price: '2500' },
            { name: 'تايكر', price: '1500' }
        ]
    };

    // Format price with Iraqi Dinar currency badge
    function formatPrice(price) {
        return `${parseInt(price, 10).toLocaleString('en-US')} <span class="currency">د.ع</span>`;
    }

    // Populate Menu Items
    for (const [sectionId, items] of Object.entries(menuData)) {
        const container = document.getElementById(`${sectionId}-list`);
        if (container) {
            container.innerHTML = '';
            items.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'menu-item';
                itemEl.style.transitionDelay = `${Math.min(index * 0.05, 0.3)}s`;

                itemEl.innerHTML = `
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${formatPrice(item.price)}</span>
                `;
                container.appendChild(itemEl);
            });
        }
    }

    // Scroll Animations (Intersection Observer for sections)
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.menu-section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Top Navigation & Active Section Highlighting
    const topNav = document.getElementById('topNav');
    const topLinks = document.querySelectorAll('.top-nav-items a');
    const bottomLinks = document.querySelectorAll('.bottom-nav .nav-item');

    function updateActiveNav() {
        const scrollPosition = window.scrollY;

        // Toggle Top Nav Visibility
        if (scrollPosition > 260) {
            topNav.classList.add('visible');
        } else {
            topNav.classList.remove('visible');
        }

        // Determine current active section
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update active class on top nav links
        topLinks.forEach(link => {
            const sectionAttr = link.getAttribute('data-section');
            if (sectionAttr === currentSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update active class on bottom nav links
        bottomLinks.forEach(link => {
            const sectionAttr = link.getAttribute('data-section');
            if (sectionAttr === currentSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
});
