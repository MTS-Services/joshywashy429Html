// Load common HTML components
function loadHeader() {
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';

    fetch(basePath + 'includes/header.html')
        .then(response => response.text())
        .then(html => {
            // Adjust paths in header for pages folder
            if (isInPages) {
                html = html.replace(/href="index\.html"/g, 'href="../index.html"')
                    .replace(/href="pages\//g, 'href="../pages/');
            }
            const header = document.createElement('div');
            header.innerHTML = html;
            document.body.insertBefore(header, document.body.firstChild);
            updateNavActive();
            document.dispatchEvent(new CustomEvent('site-components-loaded'));
        });
}

function loadFooter() {
    const isInPages = window.location.pathname.includes('/pages/');
    const basePath = isInPages ? '../' : '';

    fetch(basePath + 'includes/footer.html')
        .then(response => response.text())
        .then(html => {
            // Adjust paths in footer for pages folder
            if (isInPages) {
                html = html.replace(/href="index\.html"/g, 'href="../index.html"')
                    .replace(/href="pages\//g, 'href="../pages/')
                    .replace(/href="\.\.\//g, 'href="../');
            }
            document.body.insertAdjacentHTML('beforeend', html);
        });
}

function updateNavActive() {
    const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activePage = currentPage === 'property.html' ? 'realestate.html' : currentPage;
    links.forEach(link => {
        let href = link.getAttribute('href');
        // Extract just the filename
        const filename = href.split('/').pop() || 'index.html';
        link.classList.toggle('active', filename === activePage);
    });
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});
