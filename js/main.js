// ── CURSOR ──
let cursor = null;
let ring = null;
let mx = 0, my = 0, rx = 0, ry = 0;
let cursorBooted = false;
let scrollBooted = false;

function bootCursor() {
    cursor = document.getElementById('cursor');
    ring = document.getElementById('cursor-ring');

    if (cursorBooted || !cursor || !ring) {
        return;
    }

    cursorBooted = true;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;

        if (!cursor) {
            return;
        }

        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    document.addEventListener('mouseover', e => {
        const target = e.target.closest('a, button, .service-card, .property-card, .listing-card, .structure-item, .gallery-thumb, .doc-item');

        if (!target || !cursor || !ring) {
            return;
        }

        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        cursor.style.background = 'transparent';
        cursor.style.border = '1px solid var(--gold)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });

    document.addEventListener('mouseout', e => {
        const target = e.target.closest('a, button, .service-card, .property-card, .listing-card, .structure-item, .gallery-thumb, .doc-item');

        if (!target || !cursor || !ring) {
            return;
        }

        if (e.relatedTarget && target.contains(e.relatedTarget)) {
            return;
        }

        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursor.style.background = 'var(--gold)';
        cursor.style.border = 'none';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
    });

    function animateRing() {
        if (ring) {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
        }

        requestAnimationFrame(animateRing);
    }

    animateRing();
}

// ── NAV SCROLL ──
function bootScrollNav() {
    if (scrollBooted) {
        return;
    }

    scrollBooted = true;

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');

        if (!navbar) {
            return;
        }

        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ── PAGE SWITCHING ──
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + id);

    if (target) {
        target.classList.add('active');
    }

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

    if (!menu || !ham) {
        return;
    }

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

    reveals.forEach(r => {
        if (r.dataset.revealBound === 'true') {
            return;
        }

        r.dataset.revealBound = 'true';
        obs.observe(r);
    });
}

function bootUi() {
    bootCursor();
    bootScrollNav();
    observeReveal();
}

document.addEventListener('DOMContentLoaded', bootUi);
document.addEventListener('site-components-loaded', bootUi);

window.observeReveal = observeReveal;
