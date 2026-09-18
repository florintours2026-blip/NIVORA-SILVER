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
            "assets/images/products/jewelry/ring-1-1.jpg",
            "assets/images/products/jewelry/ring-1-2.jpg",
            "assets/images/products/jewelry/ring-1-3.jpg",
            "assets/images/products/jewelry/ring-1-4.jpg",
            "assets/images/products/jewelry/ring-1-5.jpg"
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
            "assets/images/products/jewelry/necklace-1-1.jpg",
            "assets/images/products/jewelry/necklace-1-2.jpg",
            "assets/images/products/jewelry/necklace-1-3.jpg",
            "assets/images/products/jewelry/necklace-1-4.jpg"
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
            "assets/images/products/perfumes/noir-1-1.jpg",
            "assets/images/products/perfumes/noir-1-2.jpg",
            "assets/images/products/perfumes/noir-1-3.jpg",
            "assets/images/products/perfumes/noir-1-4.jpg",
            "assets/images/products/perfumes/noir-1-5.jpg",
            "assets/images/products/perfumes/noir-1-6.jpg"
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
            "assets/images/products/perfumes/amber-1-1.jpg",
            "assets/images/products/perfumes/amber-1-2.jpg",
            "assets/images/products/perfumes/amber-1-3.jpg",
            "assets/images/products/perfumes/amber-1-4.jpg"
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
            "assets/images/products/watches/classic-1-1.jpg",
            "assets/images/products/watches/classic-1-2.jpg",
            "assets/images/products/watches/classic-1-3.jpg",
            "assets/images/products/watches/classic-1-4.jpg",
            "assets/images/products/watches/classic-1-5.jpg"
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
            "assets/images/products/watches/rolex-1-1.jpg",
            "assets/images/products/watches/rolex-1-2.jpg",
            "assets/images/products/watches/rolex-1-3.jpg",
            "assets/images/products/watches/rolex-1-4.jpg",
            "assets/images/products/watches/rolex-1-5.jpg",
            "assets/images/products/watches/rolex-1-6.jpg",
            "assets/images/products/watches/rolex-1-7.jpg"
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
            "assets/images/products/sunglasses/aviator-1-1.jpg",
            "assets/images/products/sunglasses/aviator-1-2.jpg",
            "assets/images/products/sunglasses/aviator-1-3.jpg",
            "assets/images/products/sunglasses/aviator-1-4.jpg"
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
            "assets/images/products/sunglasses/square-1-1.jpg",
            "assets/images/products/sunglasses/square-1-2.jpg",
            "assets/images/products/sunglasses/square-1-3.jpg",
            "assets/images/products/sunglasses/square-1-4.jpg",
            "assets/images/products/sunglasses/square-1-5.jpg"
        ],
        featured: false,
        brand: "NIVORA"
    }
];

// تصدير البيانات للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productsData;
      }
