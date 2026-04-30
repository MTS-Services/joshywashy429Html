function getPropertySlug() {
    return new URLSearchParams(window.location.search).get('slug') || window.location.hash.replace('#', '') || '3003-n-central';
}

function getAssetBase() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
}

function resolveAssetUrl(path) {
    return getAssetBase() + path.replace(/^\.\.\//, '');
}

function getPropertyPageHref(slug) {
    return window.location.pathname.includes('/pages/') ? `property.html?slug=${slug}` : `pages/property.html?slug=${slug}`;
}

function renderPropertyGrid(container, properties) {
    container.innerHTML = properties.map(property => `
        <a class="listing-card reveal" href="${getPropertyPageHref(property.slug)}">
            <div class="listing-media listing-media-large" style="background-image: url('${resolveAssetUrl(property.heroImage)}');">
                <img src="${resolveAssetUrl(property.heroImage)}" alt="${property.title}">
                <div class="listing-badge">${property.category}</div>
            </div>
            <div class="listing-body">
                <div class="listing-location">${property.location}</div>
                <div class="listing-title">${property.title}</div>
                <div class="listing-desc">${property.summary}</div>
                <div class="listing-foot">
                    <span>${property.documents.length} DOCUMENT${property.documents.length !== 1 ? 'S' : ''}</span>
                    <span>OPEN</span>
                </div>
            </div>
        </a>
    `).join('');

    if (window.observeReveal) {
        window.observeReveal();
    }
}

function renderPropertyDetail(container, property, properties) {
    const galleryId = 'property-gallery-main';
    const thumbsId = 'property-gallery-thumbs';
    const detailId = 'property-detail-panel';
    const docsId = 'property-documents';
    const relatedId = 'property-related';

    container.innerHTML = `
        <section class="property-hero reveal">
            <div class="property-hero-copy">
                <div class="section-label">Property View</div>
                <h1 class="section-title">${property.title}</h1>
                <p class="section-sub" style="max-width: 760px; margin: 18px 0 0;">${property.summary}</p>
                <div class="property-hero-meta">
                    <span class="prop-tag">${property.category}</span>
                    <span class="prop-tag">${property.location}</span>
                </div>
            </div>
            <div class="property-hero-side">
                <div class="property-hero-stat">
                    <div class="stat-num">${property.gallery.length}</div>
                    <div class="stat-label">Gallery Images</div>
                </div>
                <div class="property-hero-stat">
                    <div class="stat-num">${property.documents.length}</div>
                    <div class="stat-label">PDF Documents</div>
                </div>
            </div>
        </section>

        <section class="property-shell">
            <div class="property-gallery reveal">
                <div class="gallery-main">
                    <button class="gallery-arrow gallery-prev" type="button" aria-label="Previous image">‹</button>
                    <img id="${galleryId}" src="${resolveAssetUrl(property.gallery[0])}" alt="${property.title}">
                    <button class="gallery-arrow gallery-next" type="button" aria-label="Next image">›</button>
                </div>
                <div class="gallery-thumbs" id="${thumbsId}"></div>
            </div>

            <aside class="property-sidebar">
                <div class="property-panel reveal" id="${detailId}">
                    <div class="section-label">Property Details</div>
                    <h2 class="section-title" style="font-size: 2rem;">Overview</h2>
                    <p class="property-copy">${property.summary}</p>
                    <div class="property-facts">
                        ${property.stats.map(item => `
                            <div class="property-fact">
                                <span>${item.label}</span>
                                <strong>${item.value}</strong>
                            </div>
                        `).join('')}
                    </div>
                    <ul class="property-highlights">
                        ${property.highlights.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="property-panel reveal" id="${docsId}">
                    <div class="section-label">PDF Files</div>
                    <h2 class="section-title" style="font-size: 1.8rem;">Documents</h2>
                    <div class="doc-list"></div>
                </div>
            </aside>
        </section>

        <section class="section related-section">
            <div class="reveal">
                <div class="section-label">More Listings</div>
                <h2 class="section-title">Other <span class="accent">Properties</span></h2>
                <p class="section-sub">Explore other available listings with the same document-driven format.</p>
            </div>
            <div class="related-grid reveal" id="${relatedId}"></div>
        </section>
    `;

    const thumbs = container.querySelector(`#${thumbsId}`);
    const mainImage = container.querySelector(`#${galleryId}`);
    const prevButton = container.querySelector('.gallery-prev');
    const nextButton = container.querySelector('.gallery-next');
    const docsList = container.querySelector(`#${docsId} .doc-list`);
    const relatedGrid = container.querySelector(`#${relatedId}`);

    let activeIndex = 0;

    function setActiveImage(index) {
        const total = property.gallery.length;
        activeIndex = (index + total) % total;
        mainImage.src = resolveAssetUrl(property.gallery[activeIndex]);
        mainImage.alt = `${property.title} image ${activeIndex + 1}`;

        thumbs.querySelectorAll('.gallery-thumb').forEach((thumb, thumbIndex) => {
            thumb.classList.toggle('active', thumbIndex === activeIndex);
        });
    }

    thumbs.innerHTML = property.gallery.map((src, index) => `
        <button type="button" class="gallery-thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${resolveAssetUrl(src)}" alt="${property.title} thumbnail ${index + 1}">
        </button>
    `).join('');

    thumbs.addEventListener('click', event => {
        const thumb = event.target.closest('.gallery-thumb');
        if (!thumb) {
            return;
        }

        setActiveImage(Number(thumb.dataset.index));
    });

    prevButton.addEventListener('click', () => setActiveImage(activeIndex - 1));
    nextButton.addEventListener('click', () => setActiveImage(activeIndex + 1));

    docsList.innerHTML = property.documents.map(document => `
        <a class="doc-item" href="${resolveAssetUrl(document.href)}" target="_blank" rel="noopener">
            <span>
                <strong>${document.label}</strong>
                <small>${document.href.split('/').pop()}</small>
            </span>
            <span>PDF</span>
        </a>
    `).join('');

    const relatedProperties = properties.filter(item => item.slug !== property.slug).slice(0, 3);
    relatedGrid.innerHTML = relatedProperties.map(item => `
        <a class="related-card reveal" href="${getPropertyPageHref(item.slug)}">
            <img src="${resolveAssetUrl(item.heroImage)}" alt="${item.title}">
            <div class="related-card-body">
                <span class="related-kicker">${item.location}</span>
                <strong>${item.title}</strong>
                <p>${item.summary}</p>
                <div class="related-footer">
                    <span>${item.documents.length} documents</span>
                    <span>Open</span>
                </div>
            </div>
        </a>
    `).join('');

    setActiveImage(0);

    if (window.observeReveal) {
        window.observeReveal();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const properties = window.PROPERTY_LISTINGS || [];
    const slug = getPropertySlug();
    const property = window.PROPERTY_LISTINGS_BY_SLUG ? window.PROPERTY_LISTINGS_BY_SLUG[slug] : null;

    const gridContainer = document.getElementById('property-grid-home') || document.getElementById('property-grid');
    if (gridContainer) {
        renderPropertyGrid(gridContainer, properties);
    }

    const detailContainer = document.getElementById('property-detail');
    if (detailContainer) {
        renderPropertyDetail(detailContainer, property || properties[0], properties);
    }
});
