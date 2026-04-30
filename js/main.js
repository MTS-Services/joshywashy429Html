// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .property-card, .structure-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        cursor.style.background = 'transparent';
        cursor.style.border = '1px solid var(--gold)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursor.style.background = 'var(--gold)';
        cursor.style.border = 'none';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
    });
});

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── PAGE SWITCHING ──
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    observeReveal();
}

function setActive(el) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
}

// ── MOBILE ──
function toggleMobile() {
    const menu = document.getElementById('mobileMenu');
    const ham = document.getElementById('hamburger');
    menu.classList.toggle('open');
    ham.classList.toggle('open');
}

// ── SCROLL REVEAL ──
function observeReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(r => obs.observe(r));
}
observeReveal();

// Nav clicks don't bubble to anchor default
document.querySelectorAll('a[onclick]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
});
