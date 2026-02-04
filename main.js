
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
            { name: 'برتقال وليمون', price: '2000' },
            { name: 'نيتوز', price: '750' }
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

    // Populate Menu
    for (const [sectionId, items] of Object.entries(menuData)) {
        const container = document.getElementById(`${sectionId}-list`);
        if (container) {
            items.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.className = 'menu-item';
                itemEl.style.animationDelay = `${index * 0.1}s`; // Staggered delay handled in CSS if needed, or here
                
                itemEl.innerHTML = `
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${formatPrice(item.price)}</div>
                `;
                container.appendChild(itemEl);
            });
        }
    }

    // format price helper
    function formatPrice(price) {
        return parseInt(price).toLocaleString('en-US');
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-section').forEach(section => {
        observer.observe(section);
    });
});
