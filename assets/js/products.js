// assets/js/products.js
const productsData = [
    // ===== الفضة والمجوهرات =====
    {
        id: 1,
        nameAr: "خاتم فضة عيار 925",
        nameEn: "925 Silver Ring",
        category: "jewelry",
        categoryAr: "الفضة والمجوهرات",
        price: 1299,
        oldPrice: 1599,
        discount: 19,
        stock: 15,
        rating: 4.8,
        reviews: 48,
        descriptionAr: "خاتم فضة عيار 925 بتصميم فاخر ونقوش يدوية دقيقة. مثالي للإطلالات الراقية.",
        descriptionEn: "925 silver ring with a luxurious design and precise handmade engravings.",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
            "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
            "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600",
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 2,
        nameAr: "سلسلة فضة رجالية",
        nameEn: "Men's Silver Necklace",
        category: "jewelry",
        categoryAr: "الفضة والمجوهرات",
        price: 1899,
        oldPrice: 2200,
        discount: 14,
        stock: 8,
        rating: 4.6,
        reviews: 32,
        descriptionAr: "سلسلة فضة رجالية بتصميم عصري وجذاب، مناسبة لجميع المناسبات.",
        descriptionEn: "Men's silver necklace with a modern and attractive design.",
        images: [
            "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600",
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600"
        ],
        featured: true,
        brand: "NIVORA"
    },
    // ===== العطور =====
    {
        id: 3,
        nameAr: "عطر Noir Élégance",
        nameEn: "Noir Élégance Perfume",
        category: "perfumes",
        categoryAr: "العطور",
        price: 899,
        oldPrice: 1100,
        discount: 18,
        stock: 25,
        rating: 4.9,
        reviews: 120,
        descriptionAr: "عطر فاخر برائحة خشبية ومسكية، يدوم طويلاً. Extrait de Parfum بتركيز 25-30%.",
        descriptionEn: "Luxury perfume with woody and musky notes, long-lasting. Extrait de Parfum 25-30%.",
        images: [
            "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
            "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600",
            "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 4,
        nameAr: "عطر Amber Royale",
        nameEn: "Amber Royale Perfume",
        category: "perfumes",
        categoryAr: "العطور",
        price: 1050,
        oldPrice: 1300,
        discount: 19,
        stock: 3,
        rating: 4.7,
        reviews: 85,
        descriptionAr: "عطر شرقي دافئ بمزيج من العنبر والتوابل الفاخرة. لمسة من الفخامة.",
        descriptionEn: "Warm oriental perfume with amber and luxury spices.",
        images: [
            "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600",
            "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600",
            "https://images.unsplash.com/photo-1616604426818-c4b7a2e6c9a1?w=600",
            "https://images.unsplash.com/photo-1610461888750-10bfc601b874?w=600"
        ],
        featured: false,
        brand: "NIVORA"
    },
    // ===== الساعات =====
    {
        id: 5,
        nameAr: "ساعة كلاسيك سيلفر",
        nameEn: "Classic Silver Watch",
        category: "watches",
        categoryAr: "الساعات",
        price: 2499,
        oldPrice: 2999,
        discount: 17,
        stock: 15,
        rating: 4.8,
        reviews: 60,
        descriptionAr: "ساعة كلاسيكية فاخرة بتصميم أنيق وميناء فضي، مقاومة للماء.",
        descriptionEn: "Luxury classic watch with an elegant design and silver dial, water-resistant.",
        images: [
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
            "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600",
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
            "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600",
            "https://images.unsplash.com/photo-1495856458515-0637185db551?w=600"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 6,
        nameAr: "ساعة رولكس دايت جست",
        nameEn: "Rolex Datejust Watch",
        category: "watches",
        categoryAr: "الساعات",
        price: 48999,
        oldPrice: 62999,
        discount: 22,
        stock: 2,
        rating: 4.9,
        reviews: 15,
        descriptionAr: "ساعة رولكس دايت جست الأصلية، فخامة لا تُضاهى. تصميم خالد يجمع بين الأناقة والدقة.",
        descriptionEn: "Original Rolex Datejust, unmatched luxury. Timeless design.",
        images: [
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600",
            "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600",
            "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600",
            "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600",
            "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600"
        ],
        featured: true,
        brand: "Rolex"
    },
    // ===== النظارات الشمسية =====
    {
        id: 7,
        nameAr: "نظارة شمسية Aviator",
        nameEn: "Aviator Sunglasses",
        category: "sunglasses",
        categoryAr: "النظارات الشمسية",
        price: 1299,
        oldPrice: 1600,
        discount: 19,
        stock: 22,
        rating: 4.6,
        reviews: 40,
        descriptionAr: "نظارة شمسية بتصميم Aviator كلاسيكي، حماية UV400، إطار معدني فاخر.",
        descriptionEn: "Classic Aviator sunglasses, UV400 protection, luxury metal frame.",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
            "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600",
            "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600"
        ],
        featured: true,
        brand: "NIVORA"
    },
    {
        id: 8,
        nameAr: "نظارة شمسية Square",
        nameEn: "Square Sunglasses",
        category: "sunglasses",
        categoryAr: "النظارات الشمسية",
        price: 950,
        oldPrice: 1200,
        discount: 21,
        stock: 18,
        rating: 4.5,
        reviews: 28,
        descriptionAr: "نظارة شمسية بتصميم مربع عصري، عدسات داكنة عالية الجودة.",
        descriptionEn: "Modern square sunglasses, high-quality dark lenses.",
        images: [
            "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600",
            "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600",
            "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=600",
            "https://images.unsplash.com/photo-1633621533309-74b7e07c19a8?w=600"
        ],
        featured: false,
        brand: "NIVORA"
    }
];
