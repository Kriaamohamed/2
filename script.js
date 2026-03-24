/*
   Kriaa Services - Logic & Functions
   Version 2.0 (High Precision)
*/

// --- 1. ثوابت الموقع ---
const WHATSAPP_NUMBER = "216XXXXXXXX"; // استبدله برقمك
const REDIRECT_MSG = "مرحباً Kriaa Services، أرغب في طلب خدمة: ";

// --- 2. وظيفة البحث الفوري ---
const searchInput = document.getElementById('searchInput');
const serviceCards = document.querySelectorAll('.service-card');

function handleSearch() {
    searchInput.addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const isMatch = title.includes(query);
            
            if (isMatch) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
}

// --- 3. وظيفة تحويل الواتساب بدقة ---
function setupWhatsAppLinks() {
    const buyButtons = document.querySelectorAll('.wa-link');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.getAttribute('data-service');
            const finalMessage = encodeURIComponent(REDIRECT_MSG + serviceName);
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${finalMessage}`;
            
            // إضافة تأثير اهتزاز بسيط قبل الانتقال
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                window.open(waUrl, '_blank');
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// --- 4. وصف الخدمة المنبثق (Modal / Alert) ---
function showDesc(text) {
    // تم استخدام Alert كبسيط ولكن يمكن تطويره لـ Modal
    alert("ℹ️ وصف الخدمة:\n\n" + text);
}

// --- 5. أنيميشن الظهور عند التمرير (Scroll Reveal) ---
function handleScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // توقف عن مراقبة العنصر بمجرد ظهوره
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        observer.observe(card);
    });
}

// --- 6. تأثيرات الهيدر عند التمرير ---
function handleHeaderEffects() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.height = "65px";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        } else {
            header.style.height = "80px";
            header.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
        }
    });
}

// --- تشغيل كل الوظائف عند التحميل ---
document.addEventListener('DOMContentLoaded', () => {
    handleSearch();
    setupWhatsAppLinks();
    handleScrollReveal();
    handleHeaderEffects();
    console.log("Kriaa Services Engine Started...");
});
