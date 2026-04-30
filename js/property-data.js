window.PROPERTY_LISTINGS = [
    {
        slug: '3003-n-central',
        title: '3003 N Central Ave',
        location: 'Phoenix, AZ 85012',
        category: 'Commercial / Office',
        summary: 'A premier multi-tenant commercial building with a full property info sheet and aerial overview for the North Central corridor.',
        heroImage: '../public/3003_N_Central.webp',
        gallery: [
            '../public/3003_N_Central.webp',
            '../public/3003_N_Central_Property_Info.png'
        ],
        documents: [
            {
                label: 'Aerial Overview',
                href: '../public/3003_N_Central_Aerial_Overview.pdf'
            }
        ],
        stats: [
            { label: 'Market', value: 'Phoenix' },
            { label: 'Asset Type', value: 'Multi-Tenant' },
            { label: 'Document Set', value: '2 Files' }
        ],
        highlights: [
            'Central corridor frontage',
            'Multi-tenant leasing profile',
            'Detailed property information'
        ]
    },
    {
        slug: 'mikhail-centre',
        title: 'Mikhail Centre / 4450 Walker Road',
        location: 'Windsor, Ontario',
        category: 'Retail / Power Centre',
        summary: 'A major retail destination anchored by national tenants and supported by brochures, site plans, signage and tenant imagery.',
        heroImage: '../public/4450_Walker_Road_Plaza.jpg',
        gallery: [
            '../public/4450_Walker_Road_Plaza.jpg',
            '../public/20190607_072155_resized.jpg',
            '../public/20190712_091114_resized.jpg',
            '../public/20210830_094543.jpg',
            '../public/image001.png',
            '../public/image002.png',
            '../public/image003.png',
            '../public/Image10.jpg',
            '../public/Image15.jpg'
        ],
        documents: [
            {
                label: 'Retail Expansion Package',
                href: '../public/3051 Legacy PetSmart Expansion Sobey and JM .pdf'
            },
            {
                label: 'Exterior Image / Signage',
                href: '../public/Exterior Image for Sign.pdf'
            },
            {
                label: 'Mikhail Centre Brochure',
                href: '../public/Mikhail_Centre_Windsor_2019_Brochure.pdf'
            },
            {
                label: 'Windsor Site Plan',
                href: '../public/Mikhail_Centre_Windsor_Site_Plan.pdf'
            },
            {
                label: 'Walker Road Site Plan',
                href: '../public/Mikhail_Centre_4450_Walker_Road_Site_Plan_1.pdf'
            }
        ],
        stats: [
            { label: 'Market', value: 'Windsor' },
            { label: 'Asset Type', value: 'Retail Centre' },
            { label: 'Document Set', value: '5 Files' }
        ],
        highlights: [
            'Anchored retail centre',
            'Strong tenant mix',
            'Multiple site-plan and brochure assets'
        ]
    },
    {
        slug: 'j-max-plaza',
        title: 'J Max Plaza',
        location: '2601 Lauzon Rd, Windsor, Ontario',
        category: 'Retail Plaza',
        summary: 'A retail plaza package with three gallery images and an offering memorandum for the Lauzon corridor.',
        heroImage: '../public/Jmax_Plaza_1.jpg',
        gallery: [
            '../public/Jmax_Plaza_1.jpg',
            '../public/Jmax_Plaza_2.jpg',
            '../public/Jmax_Plaza_3.webp'
        ],
        documents: [
            {
                label: 'Offering Memorandum',
                href: '../public/J_Max_Plaza_2601_Lauzon_OM_2025.pdf'
            }
        ],
        stats: [
            { label: 'Market', value: 'Windsor' },
            { label: 'Asset Type', value: 'Retail Plaza' },
            { label: 'Document Set', value: '1 File' }
        ],
        highlights: [
            'Lauzon Road frontage',
            'Retail plaza imagery set',
            'Single offering memorandum'
        ]
    },
    {
        slug: 'radius-center',
        title: 'Radius Center',
        location: '2679 Howard Ave, Windsor, Ontario',
        category: 'Commercial / Industrial',
        summary: 'A commercial site package with aerial planning, site coverage and document support for the Howard Avenue corridor.',
        heroImage: '../public/Radius_Center.png',
        gallery: [
            '../public/Radius center.jpg',
            '../public/Radius_Center.png'
        ],
        documents: [
            {
                label: 'Snow / Operations Plan',
                href: '../public/LCBO_SP-1_corrected metric area_JAN 31-2024.pdf'
            },
            {
                label: 'Architectural Sheet A-201-B1',
                href: '../public/A-201-B1.pdf'
            },
            {
                label: 'Site Plan 0029',
                href: '../public/0029-SPA-07-26-20.pdf'
            }
        ],
        stats: [
            { label: 'Market', value: 'Windsor' },
            { label: 'Asset Type', value: 'Commercial' },
            { label: 'Document Set', value: '3 Files' }
        ],
        highlights: [
            'Howard Avenue frontage',
            'Plan and operations docs',
            'Commercial site package'
        ]
    },
    {
        slug: 'enterprise-way-townhomes',
        title: 'Enterprise Way Townhomes',
        location: 'Windsor, Ontario',
        category: 'Residential / Townhomes',
        summary: 'A modern residential townhome concept supported by rendering views and three architectural site plan documents.',
        heroImage: '../public/Enterprise_Way_Townhomes_1.jpg',
        gallery: [
            '../public/Enterprise_Way_Townhomes_1.jpg',
            '../public/Enterprise_Way_Townhomes_2.jpg'
        ],
        documents: [
            {
                label: 'Site Plan 0431',
                href: '../public/0431- A-00 Site Plan.pdf'
            },
            {
                label: 'Typical / Corner Units',
                href: '../public/Cluster A1 Typical and Corner Units.pdf'
            },
            {
                label: 'Architectural Site Plan',
                href: '../public/SP1_1_Architectural_Site_Plan_V1.pdf'
            }
        ],
        stats: [
            { label: 'Market', value: 'Windsor' },
            { label: 'Asset Type', value: 'Townhomes' },
            { label: 'Document Set', value: '3 Files' }
        ],
        highlights: [
            'Multi-building residential concept',
            'Two render perspectives',
            'Three plan documents'
        ]
    }
];

window.PROPERTY_LISTINGS_BY_SLUG = window.PROPERTY_LISTINGS.reduce((lookup, property) => {
    lookup[property.slug] = property;
    return lookup;
}, {});
