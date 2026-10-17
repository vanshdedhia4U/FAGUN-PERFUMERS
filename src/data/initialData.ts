import {
  Product,
  Collection,
  Review,
  Coupon,
  StoreSettings,
  JournalArticle,
  SiteAnnouncement,
  HeroContent,
  PromoBannerContent,
  BrandStoryContent,
  Order
} from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'fp-prod-001',
    slug: 'royal-mysore-sandalwood-agarbatti',
    name: 'Royal Mysore Sandalwood',
    variant: 'Pure Chandan Heritage Sticks',
    category: 'incense-sticks',
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockQuantity: 45,
    sku: 'FP-AGB-SAN-01',
    description:
      'Distilled from aged Mysore sandalwood roots and natural tree resins. Each stick burns with a serene, velvety warmth designed to create a grounded sanctuary for morning prayer and meditation.',
    fragranceFamily: 'Woody',
    fragranceNotes: {
      top: 'Sweet Bark, Sun-Dried Vetiver',
      heart: 'Mysore Sandalwood Paste, Cedarwood',
      base: 'Warm Amber, Frankincense Resin'
    },
    packSize: 'Pack of 50 Sticks',
    unitsPerPack: 50,
    burnTime: 'Approx. 50 minutes per stick',
    ingredients: [
      'Pure Sandalwood Powder',
      'Natural Tree Bark Jigat',
      'Sandalwood Essential Oil',
      'Charcoal-Free Bamboo Core'
    ],
    usageInstructions:
      'Light the coated end of the incense stick. Once the flame catches, gently blow it out and place in an upright or angled heat-resistant holder.',
    safetyInstructions:
      'Keep away from curtains, inflammable surfaces, children, and pets. Ensure adequate ventilation in the room.',
    image: 'sandalwood',
    featured: true,
    bestseller: true,
    occasions: ['Daily Pooja', 'Morning Rituals', 'Meditation and Quiet Moments'],
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'fp-prod-002',
    slug: 'vrindavan-kasturi-dhoop-sticks',
    name: 'Vrindavan Kasturi',
    variant: 'Bambooless Ritual Dhoop',
    category: 'dhoop-sticks',
    price: 320,
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    stockQuantity: 32,
    sku: 'FP-DHP-KAS-02',
    description:
      'Traditional bambooless dhoop infused with plant-based botanical musk notes, holy basil leaves, and temple saffron. Emits a continuous, slow-smoldering aroma suited for sanctifying living spaces.',
    fragranceFamily: 'Musk',
    fragranceNotes: {
      top: 'Tulsi Leaves, Indian Saffron',
      heart: 'Botanical Kasturi Accord, Benzoin',
      base: 'Dried Cow Dung Ash, Natural Resins'
    },
    packSize: 'Pack of 30 Dhoop Sticks + Ceramic Base',
    unitsPerPack: 30,
    burnTime: 'Approx. 40 minutes per stick',
    ingredients: [
      'Natural Herb Ash',
      'Botanical Kasturi Extract',
      'Tulsi Extract',
      'Natural Binding Resins (Halmaddi)'
    ],
    usageInstructions:
      'Insert the dhoop stick into the provided ceramic base. Light the tip and gently blow out the flame to allow the dhoop to smolder.',
    safetyInstructions:
      'Place on a non-conductive, heat-safe coaster. Avoid moving the holder while the stick is active.',
    image: 'kasturi',
    featured: true,
    bestseller: true,
    occasions: ['Daily Pooja', 'Evening Aarti', 'Festivals and Celebrations'],
    createdAt: '2026-08-12T11:30:00Z'
  },
  {
    id: 'fp-prod-003',
    slug: 'kashi-vishwanath-loban-guggul-agarbatti',
    name: 'Kashi Loban & Guggul',
    variant: 'Temple Sanctum Purification Sticks',
    category: 'incense-sticks',
    price: 290,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockQuantity: 28,
    sku: 'FP-AGB-LOB-03',
    description:
      'An ancient formulation inspired by the eternal ghats of Kashi. Blended with authentic tears of Sal tree loban and wild Himalayan guggul to dispel stale energies and invite sacred quietude.',
    fragranceFamily: 'Resinous',
    fragranceNotes: {
      top: 'Crushed Guggul Tears, Clove Bud',
      heart: 'Pure Benzoin (Loban), Cinnamon Bark',
      base: 'Balsamic Myrrh, Patchouli Earth'
    },
    packSize: 'Pack of 45 Sticks',
    unitsPerPack: 45,
    burnTime: 'Approx. 45 minutes per stick',
    ingredients: [
      'Shuddha Loban (Styrax Benzoin)',
      'Commiphora Mukul (Guggul Gum)',
      'Natural Aromatic Wood Powders'
    ],
    usageInstructions:
      'Hold stick at an angle over a flame until glowing. Blow out flame and set securely into holder.',
    safetyInstructions:
      'Do not leave burning incense unattended. Always keep away from open windows with strong breezes.',
    image: 'loban',
    featured: true,
    bestseller: true,
    occasions: ['Morning Rituals', 'Evening Aarti', 'Daily Pooja'],
    createdAt: '2026-08-15T09:00:00Z'
  },
  {
    id: 'fp-prod-004',
    slug: 'devotional-rose-camphor-dhoop',
    name: 'Devotional Rose & Camphor',
    variant: 'Sacred Pushpanjali Dhoop Sticks',
    category: 'dhoop-sticks',
    price: 340,
    originalPrice: 390,
    rating: 4.7,
    reviewCount: 19,
    inStock: true,
    stockQuantity: 18,
    sku: 'FP-DHP-ROS-04',
    description:
      'Crafted with hand-gathered Kannauj damask rose petals dried in shade and crystalline Bhimseni camphor. Clean burning without synthetic harshness, leaving a delicate floral breeze.',
    fragranceFamily: 'Floral',
    fragranceNotes: {
      top: 'Bhimseni Camphor, Green Geranium',
      heart: 'Indian Damascena Rose, Neroli Water',
      base: 'White Sandalwood, Orris Powder'
    },
    packSize: 'Pack of 35 Sticks + Terracotta Stand',
    unitsPerPack: 35,
    burnTime: 'Approx. 45 minutes per stick',
    ingredients: [
      'Kannauj Rose Petal Powder',
      'Pure Bhimseni Camphor (Edible Grade Source)',
      'Natural Tree Resins'
    ],
    usageInstructions:
      'Ignite the tip, let it flame for 5 seconds, extinguish softly and let the fragrance diffuse naturally.',
    safetyInstructions:
      'Store in a cool dry place away from direct sunlight to preserve aromatic essential oils.',
    image: 'rose',
    featured: false,
    bestseller: true,
    occasions: ['Daily Pooja', 'Festivals and Celebrations', 'Thoughtful Gifting'],
    createdAt: '2026-08-20T14:15:00Z'
  },
  {
    id: 'fp-prod-005',
    slug: 'parijat-night-jasmine-incense',
    name: 'Parijat & Night Jasmine',
    variant: 'Sacred Temple Flower Incense',
    category: 'premium-fragrances',
    price: 440,
    rating: 5.0,
    reviewCount: 15,
    inStock: true,
    stockQuantity: 14,
    sku: 'FP-PRM-PAR-05',
    description:
      'Parijat (Nyctanthes arbor-tristis), the auspicious celestial tree flower, gathered at dawn and paired with night-blooming jasmine extracts. Delicate, sweet, and deeply uplifting.',
    fragranceFamily: 'Floral',
    fragranceNotes: {
      top: 'Morning Dew, Orange Blossom',
      heart: 'Parijat Petals, Motia Jasmine',
      base: 'Soft Amber, Honey Resin'
    },
    packSize: 'Pack of 40 Premium Sticks',
    unitsPerPack: 40,
    burnTime: 'Approx. 55 minutes per stick',
    ingredients: [
      'Shade-Dried Parijat Blossoms',
      'Mogra Extract',
      'Wild Honey Resin',
      'Raw Bamboo Stick'
    ],
    usageInstructions:
      'Light at one end until ignited. Place in brass or ceramic incense holder and enjoy the soothing bloom.',
    safetyInstructions: 'Ensure holder catches falling ash to protect furniture surfaces.',
    image: 'parijat',
    featured: true,
    bestseller: false,
    occasions: ['Morning Rituals', 'Meditation and Quiet Moments', 'Thoughtful Gifting'],
    createdAt: '2026-08-25T16:00:00Z'
  },
  {
    id: 'fp-prod-006',
    slug: 'panchamrit-festive-pooja-gift-box',
    name: 'Panchamrit Festive Gift Box',
    variant: 'Five Sacred Fragrance Assortment + Brass Diya',
    category: 'gift-sets',
    price: 1250,
    originalPrice: 1450,
    rating: 5.0,
    reviewCount: 31,
    inStock: true,
    stockQuantity: 22,
    sku: 'FP-GFT-PAN-06',
    description:
      'A luxury presentation box containing five celebrated fragrances of Fagun: Royal Sandalwood, Kashi Loban, Devotional Rose, Parijat Jasmine, and Vrindavan Kasturi. Accompanied by a solid brass handmade diya holder.',
    fragranceFamily: 'Woody',
    fragranceNotes: {
      top: 'Camphor, Sweet Citrus, Rose',
      heart: 'Sandalwood, Parijat, Benzoin',
      base: 'Guggul, Amber, Sacred Ash'
    },
    packSize: '5 Tubes (20 sticks each) + Solid Brass Diya Holder',
    unitsPerPack: 100,
    burnTime: 'Approx. 45–55 minutes per stick',
    ingredients: [
      'Curated Selection of 100% Charcoal-Free Natural Incense & Dhoop',
      'Artisanal Brassware'
    ],
    usageInstructions:
      'Choose the fragrance that matches your ritual mood. Light and rest in the bespoke brass holder provided.',
    safetyInstructions:
      'Do not place hot brass items on wooden or delicate fabric surfaces without the protective felt coaster.',
    image: 'giftbox',
    featured: true,
    bestseller: true,
    occasions: ['Festivals and Celebrations', 'Thoughtful Gifting', 'Daily Pooja'],
    createdAt: '2026-08-28T09:30:00Z'
  },
  {
    id: 'fp-prod-007',
    slug: 'marigold-vetiver-khus-agarbatti',
    name: 'Genda & Vetiver (Khus)',
    variant: 'Cooling Earth Agarbatti',
    category: 'incense-sticks',
    price: 310,
    rating: 4.7,
    reviewCount: 16,
    inStock: true,
    stockQuantity: 40,
    sku: 'FP-AGB-GEN-07',
    description:
      'Fresh marigold garlands interwoven with wild-harvested green vetiver (khus) roots from North India. Provides a cooling, grounded stillness reminiscent of rain on sun-warmed earth.',
    fragranceFamily: 'Herbal',
    fragranceNotes: {
      top: 'Fresh Marigold Petals, Lemongrass',
      heart: 'Green Vetiver Roots, Cardamom',
      base: 'Petrichor Accord, Oakmoss'
    },
    packSize: 'Pack of 45 Sticks',
    unitsPerPack: 45,
    burnTime: 'Approx. 45 minutes per stick',
    ingredients: [
      'Distilled Vetiver Root Essence',
      'Dried Marigold Petals',
      'Natural Wood Ash & Tree Bark'
    ],
    usageInstructions: 'Light tip, extinguish flame, insert into burner.',
    safetyInstructions: 'Ensure room has fresh airflow.',
    image: 'vetiver',
    featured: false,
    bestseller: false,
    occasions: ['Daily Pooja', 'Morning Rituals', 'Meditation and Quiet Moments'],
    createdAt: '2026-09-02T13:00:00Z'
  },
  {
    id: 'fp-prod-008',
    slug: 'ganga-snan-sacred-havan-dhoop',
    name: 'Ganga Snan Sacred Havan Dhoop',
    variant: 'Herbal Agnihotra Samagri Sticks',
    category: 'dhoop-sticks',
    price: 360,
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    stockQuantity: 25,
    sku: 'FP-DHP-HAV-08',
    description:
      'Pure havan samagri compacted into clean smokeless dhoop sticks: desi cow ghee, dried jatamansi, nagarmotha, bay leaves, and pure camphor. Brings the sanctifying power of a Vedic yajna into the home.',
    fragranceFamily: 'Resinous',
    fragranceNotes: {
      top: 'Dried Bay Leaf, Crystalline Camphor',
      heart: 'Jatamansi, Desi Cow Ghee, Nutmeg',
      base: 'Charred Guggal, Sandalwood Dust'
    },
    packSize: 'Pack of 30 Sticks + Stoneware Holder',
    unitsPerPack: 30,
    burnTime: 'Approx. 40 minutes per stick',
    ingredients: [
      '32 Vedic Havan Herbs',
      'Pure A2 Desi Cow Ghee',
      'Bhimseni Camphor',
      'Natural Plant Starch'
    ],
    usageInstructions:
      'Place in the stoneware holder. Light the tip, blow out after 5 seconds, let the sacred aroma fill the room.',
    safetyInstructions: 'Keep dry; moisture alters burning performance.',
    image: 'havan',
    featured: true,
    bestseller: false,
    occasions: ['Daily Pooja', 'Evening Aarti', 'Festivals and Celebrations'],
    createdAt: '2026-09-10T10:00:00Z'
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    slug: 'incense-sticks',
    name: 'Incense Sticks',
    description:
      'Charcoal-free agarbatti hand-rolled with aged natural resins, essential oils, and botanical powders for daily pooja.',
    image: 'col_incense',
    productCount: 3
  },
  {
    id: 'col-2',
    slug: 'dhoop-sticks',
    name: 'Dhoop Sticks',
    description:
      'Traditional bambooless dhoop crafted for slow smoldering, authentic purification, and lingering fragrance.',
    image: 'col_dhoop',
    productCount: 3
  },
  {
    id: 'col-3',
    slug: 'premium-fragrances',
    name: 'Premium Fragrances',
    description:
      'Single-origin botanical extracts and rare temple flower formulations for connoisseurs of fine Indian aromatics.',
    image: 'col_premium',
    productCount: 1
  },
  {
    id: 'col-4',
    slug: 'gift-sets',
    name: 'Festive & Gift Sets',
    description:
      'Artfully packaged gift hampers and pooja samagri collections with handcrafted brassware for auspicious occasions.',
    image: 'col_gift',
    productCount: 1
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'fp-prod-001',
    productName: 'Royal Mysore Sandalwood',
    rating: 5,
    title: 'Authentic temple fragrance with zero headache',
    comment:
      'Unlike commercial incense with chemical perfumes, Fagun Sandalwood smells exactly like the sanctum of a temple in Karnataka. The smoke is delicate and leaves the room smelling sacred for hours.',
    reviewerName: 'Radhika S. (Bengaluru)',
    verifiedPurchase: true,
    date: '14 Oct 2026',
    status: 'approved'
  },
  {
    id: 'rev-02',
    productId: 'fp-prod-003',
    productName: 'Kashi Loban & Guggul',
    rating: 5,
    title: 'Pure Benzoin tears, exactly like evening aarti',
    comment:
      'I burn this every evening during Sandhya aarti. The loban quality is outstanding. It clears out the evening heaviness and brings immediate peace into our home temple.',
    reviewerName: 'Venkatesh Iyer (Chennai)',
    verifiedPurchase: true,
    date: '08 Oct 2026',
    status: 'approved'
  },
  {
    id: 'rev-03',
    productId: 'fp-prod-006',
    productName: 'Panchamrit Festive Gift Box',
    rating: 5,
    title: 'Exquisite Diwali gift for family',
    comment:
      'Ordered three boxes for gifting. The brass diya included is heavy and beautiful, and the packaging has a rich tactile gold finish. Everyone loved the Parijat and Rose sticks.',
    reviewerName: 'Meenakshi Sharma (Jaipur)',
    verifiedPurchase: true,
    date: '02 Oct 2026',
    status: 'approved'
  },
  {
    id: 'rev-04',
    productId: 'fp-prod-002',
    productName: 'Vrindavan Kasturi Dhoop',
    rating: 5,
    title: 'Bambooless and deep musk notes',
    comment:
      'Very happy to see traditional bambooless dhoop made with genuine plant resins. It burns evenly for 40 minutes and creates a deeply meditative ambiance for morning japa.',
    reviewerName: 'Anand K. (Varanasi)',
    verifiedPurchase: true,
    date: '28 Sep 2026',
    status: 'approved'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FAGUN10',
    discountType: 'percentage',
    value: 10,
    minCartValue: 500,
    maxDiscount: 200,
    active: true,
    expiresAt: '2026-12-31',
    usageCount: 18,
    maxUsage: 500
  },
  {
    code: 'AARTI50',
    discountType: 'fixed',
    value: 50,
    minCartValue: 600,
    active: true,
    expiresAt: '2026-11-30',
    usageCount: 12,
    maxUsage: 200
  },
  {
    code: 'FESTIVE15',
    discountType: 'percentage',
    value: 15,
    minCartValue: 1200,
    maxDiscount: 400,
    active: true,
    expiresAt: '2026-11-15',
    usageCount: 7,
    maxUsage: 100
  }
];

export const INITIAL_ANNOUNCEMENT: SiteAnnouncement = {
  enabled: true,
  text: 'Bring home the fragrance of devotion. Complimentary shipping across India on orders above ₹799.',
  linkText: 'Explore Collections',
  linkUrl: '/shop'
};

export const INITIAL_HERO: HeroContent = {
  eyebrow: 'THE ART OF INDIAN FRAGRANCE',
  headline: 'A Fragrance That Brings You Closer.',
  supportingCopy:
    'Discover thoughtfully crafted incense and dhoop for moments of devotion, stillness and everyday ritual. Charcoal-free, blended with pure botanical resins and time-honored Indian traditions.',
  primaryButtonText: 'Explore the Collection',
  secondaryButtonText: 'Discover Our Story'
};

export const INITIAL_PROMO: PromoBannerContent = {
  enabled: true,
  badge: 'FESTIVE AUSPICIOUS COLLECTION',
  title: 'The Panchamrit Pooja Collection',
  subtitle:
    'Five rare temple fragrances paired with a handcrafted solid brass diya. Artfully packaged for gifting and sacred celebrations.',
  linkText: 'View Gift Sets',
  linkUrl: '/products/panchamrit-festive-pooja-gift-box'
};

export const INITIAL_STORY: BrandStoryContent = {
  title: 'More Than a Fragrance. A Moment of Peace.',
  subtitle: 'Handcrafted in India with Devotion and Natural Purity',
  body1:
    'In Hindu rituals, incense (dhoop & agarbatti) represents the element of air and the dissemination of pure intent. At Fagun Perfumers, we preserve this spiritual connection by rejecting harsh chemical combustion agents and synthetic kerosene binders.',
  body2:
    'Every blend starts with natural wood powders, botanical gum extracts (jigat and halmaddi), natural camphor, and hand-distilled flower oils. When lit, Fagun incense produces a soft, grounding aroma that quietly settles the mind, transforms the atmosphere, and honors the sacred spaces of your home.',
  quote: '“Where fragrance lingers gently, devotion finds its quiet center.”'
};

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Fagun Perfumers',
  tagline: 'Premium Indian Incense & Dhoop',
  currency: 'INR (₹)',
  freeShippingThreshold: 799,
  standardShippingFee: 75,
  codEnabled: true,
  taxPercentage: 5, // 5% GST standard on incense sticks in India
  supportEmail: 'care@fagunperfumers.com',
  supportPhone: '+91 98200 45123',
  businessAddress: 'Heritage Fragrance Lane, Old City, Ahmedabad, Gujarat 380001, India',
  operationalHours: 'Monday – Saturday: 9:30 AM to 6:30 PM IST'
};

export const INITIAL_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'difference-between-agarbatti-and-dhoop',
    title: 'Agarbatti vs. Dhoop: Understanding Sacred Indian Incense Forms',
    category: 'Rituals & Traditions',
    readTime: '4 min read',
    publishedAt: '12 Oct 2026',
    excerpt:
      'While both are integral to Indian pooja, agarbatti with bamboo cores and bambooless dhoop sticks serve distinct sensory and ritual purposes.',
    content: [
      'For centuries across India, the burning of fragrant botanicals has accompanied sacred chanting, temple aartis, and household prayers.',
      'Agarbatti (Incense Sticks): Traditionally rolled onto a slender bamboo stick, agarbatti produces a fine, steady vertical wisp of smoke. Because the core supports the mixture, stick formulations can hold delicate floral waters, sandalwood powders, and slow-evaporating attars.',
      'Dhoop (Bambooless Sticks & Cones): In many Vedic customs, burning bare bamboo is reserved only for specific rites. Dhoop sticks contain no wooden core—instead, pure herbal pastes, cow ghee, dried roots, and loban resins are kneaded together and pressed. Dhoop burns with greater density and releases a rich, continuous purifying smoke ideal for cleansing the temple room.',
      'Choosing for your practice: Use Agarbatti when you desire a delicate background ambiance for reading, meditation, or morning tea. Turn to Dhoop for evening Sandhya aarti, purifying a new home, or festive homam rituals.'
    ],
    tags: ['Rituals', 'Agarbatti', 'Dhoop', 'Pooja'],
    published: true
  },
  {
    id: 'art-02',
    slug: 'the-sacred-power-of-loban-and-guggul',
    title: 'Loban & Guggul: Ancient Resins of Stillness and Sanctity',
    category: 'Fragrance Families',
    readTime: '5 min read',
    publishedAt: '05 Oct 2026',
    excerpt:
      'Discovered in ancient Ayurvedic treatises, pure tree resins have guarded the sanctums of Indian temples for millennia.',
    content: [
      'Among all aromatics, tree resins occupy the most revered status in temple worship. Loban (derived from Styrax benzoin) and Guggul (Commiphora mukul) are not laboratory perfumes—they are the natural aromatic sap of trees.',
      'When placed on glowing embers, Loban releases a sweet balsamic scent accompanied by crystalline warmth. In traditional homes, the mother walks through each room with a brass dhoop daan, letting the smoke sanctify every doorway and dispel stagnant atmospheric energy.',
      'At Fagun Perfumers, our Kashi Loban & Guggul sticks preserve this exact formula without dipping raw charcoal in synthetic masking perfumes. The difference is immediately apparent: your eyes will not sting, and the calm that follows is genuine.'
    ],
    tags: ['Loban', 'Guggul', 'Ayurveda', 'Purification'],
    published: true
  },
  {
    id: 'art-03',
    slug: 'preparing-a-peaceful-home-pooja-space',
    title: 'Preparing a Peaceful Pooja Space: Sensory Guidelines for Daily Rituals',
    category: 'Mindful Living',
    readTime: '3 min read',
    publishedAt: '25 Sep 2026',
    excerpt:
      'Five subtle adjustments to light, sound, and natural fragrance that cultivate immediate stillness before prayer.',
    content: [
      'A domestic mandir or quiet meditation corner should be a refuge from digital noise and daily haste.',
      '1. Cleanse with Gentle Ventilation: Allow fresh morning air to circulate before lighting your diya and incense. Clean airflow ensures the fragrance notes unfold with clarity rather than stagnation.',
      '2. Natural Brass & Clay: Warm metallic brass and terracotta provide grounding tactile surfaces that age gracefully with repeated ritual use.',
      '3. Align the Scent with the Hour: Fresh, sweet florals like Parijat and Khus are uplifting for early dawn (Brahma Muhurta). In the evening, grounding sandalwood, camphor, and guggul help the mind release the tensions of the day.'
    ],
    tags: ['Meditation', 'Home Mandir', 'Aarti', 'Peace'],
    published: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'FP-8921',
    customer: {
      fullName: 'Aarav Patel',
      email: 'aarav.patel@gmail.com',
      mobile: '+91 98201 12345',
      address: '402 Nilgiri Heights, Bodakdev',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380054'
    },
    items: [
      {
        productId: 'fp-prod-001',
        name: 'Royal Mysore Sandalwood',
        variant: 'Pure Chandan Heritage Sticks',
        sku: 'FP-AGB-SAN-01',
        unitPrice: 380,
        quantity: 2,
        packSize: 'Pack of 50 Sticks',
        image: 'sandalwood',
        totalPrice: 760
      },
      {
        productId: 'fp-prod-003',
        name: 'Kashi Loban & Guggul',
        variant: 'Temple Sanctum Purification Sticks',
        sku: 'FP-AGB-LOB-03',
        unitPrice: 290,
        quantity: 1,
        packSize: 'Pack of 45 Sticks',
        image: 'loban',
        totalPrice: 290
      }
    ],
    subtotal: 1050,
    discount: 105,
    couponCode: 'FAGUN10',
    shipping: 0,
    tax: 47.25,
    total: 992.25,
    paymentMethod: 'razorpay_test',
    paymentStatus: 'paid',
    paymentReference: 'pay_test_923847291',
    fulfilmentStatus: 'delivered',
    trackingNumber: 'DTDC-8839219',
    carrier: 'DTDC Express',
    estimatedDelivery: '16 Oct 2026',
    notes: 'Please leave at security desk if unavailable.',
    createdAt: '2026-10-12T08:30:00Z',
    updatedAt: '2026-10-16T14:20:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2026-10-12T08:31:00Z', note: 'Payment verified via Online Gateway' },
      { status: 'processing', timestamp: '2026-10-12T10:15:00Z', note: 'Batch inventory reserved' },
      { status: 'packed', timestamp: '2026-10-13T11:00:00Z', note: 'Carefully wrapped with eco-cushioning' },
      { status: 'shipped', timestamp: '2026-10-13T16:45:00Z', note: 'Dispatched via DTDC Express #DTDC-8839219' },
      { status: 'delivered', timestamp: '2026-10-16T14:20:00Z', note: 'Delivered to recipient' }
    ]
  },
  {
    id: 'ord-1002',
    orderNumber: 'FP-8922',
    customer: {
      fullName: 'Pooja Sundaram',
      email: 'pooja.sundaram@outlook.com',
      mobile: '+91 97412 87654',
      address: '12 Temple View Road, Mylapore',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600004'
    },
    items: [
      {
        productId: 'fp-prod-006',
        name: 'Panchamrit Festive Gift Box',
        variant: 'Five Sacred Fragrance Assortment + Brass Diya',
        sku: 'FP-GFT-PAN-06',
        unitPrice: 1250,
        quantity: 1,
        packSize: '5 Tubes + Solid Brass Diya',
        image: 'giftbox',
        totalPrice: 1250
      }
    ],
    subtotal: 1250,
    discount: 0,
    shipping: 0,
    tax: 62.5,
    total: 1312.5,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    fulfilmentStatus: 'shipped',
    trackingNumber: 'BLUEDART-5541092',
    carrier: 'Blue Dart',
    estimatedDelivery: '18 Oct 2026',
    notes: 'Cash on delivery order. Call customer before arrival.',
    createdAt: '2026-10-15T11:20:00Z',
    updatedAt: '2026-10-16T16:00:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2026-10-15T11:25:00Z', note: 'COD order confirmed via SMS OTP' },
      { status: 'processing', timestamp: '2026-10-15T14:00:00Z', note: 'Order in preparation' },
      { status: 'packed', timestamp: '2026-10-16T09:30:00Z', note: 'Packed with brassware protection' },
      { status: 'shipped', timestamp: '2026-10-16T16:00:00Z', note: 'Shipped via Blue Dart #BLUEDART-5541092' }
    ]
  },
  {
    id: 'ord-1003',
    orderNumber: 'FP-8923',
    customer: {
      fullName: 'Rajesh Mukherjee',
      email: 'rajesh.mukh@gmail.com',
      mobile: '+91 98300 33445',
      address: 'Flat 5B, Lake Palace Enclave, Salt Lake Sector 2',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091'
    },
    items: [
      {
        productId: 'fp-prod-002',
        name: 'Vrindavan Kasturi',
        variant: 'Bambooless Ritual Dhoop',
        sku: 'FP-DHP-KAS-02',
        unitPrice: 320,
        quantity: 2,
        packSize: 'Pack of 30 Dhoop Sticks + Ceramic Base',
        image: 'kasturi',
        totalPrice: 640
      }
    ],
    subtotal: 640,
    discount: 50,
    couponCode: 'AARTI50',
    shipping: 75,
    tax: 33.25,
    total: 698.25,
    paymentMethod: 'razorpay_test',
    paymentStatus: 'paid',
    paymentReference: 'pay_test_109283741',
    fulfilmentStatus: 'processing',
    createdAt: '2026-10-16T19:40:00Z',
    updatedAt: '2026-10-16T20:10:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2026-10-16T19:42:00Z', note: 'Payment verified' },
      { status: 'processing', timestamp: '2026-10-16T20:10:00Z', note: 'Item being selected from fresh stock' }
    ]
  }
];
