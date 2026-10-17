/**
 * ---------------------------------------------------------------------------
 * PRODUCT / MATERIAL CATALOGUE
 * ---------------------------------------------------------------------------
 * `price` is intentionally `null` for every product: the brief says not to show
 * fake prices. While `price` is null the UI shows "Price on request" and the
 * buyer is pushed to the quote form / WhatsApp instead.
 *
 * To publish a price, set e.g. `price: 3200` and `priceUnit: 'cft'`.
 * `minQuantity` is the minimum order in the product's default unit.
 */

export const categories = [
  { id: 'all', label: { bn: 'সব সামগ্রী', en: 'All Materials' } },
  { id: 'sand', label: { bn: 'বালু', en: 'Sand' } },
  { id: 'stone', label: { bn: 'পাথর ও চিপস', en: 'Stone & Chips' } },
  { id: 'other', label: { bn: 'অন্যান্য সামগ্রী', en: 'Other Materials' } },
]

/** Units a customer can order in. Order of `units` in a product sets the default. */
export const units = [
  { id: 'cft', label: { bn: 'ঘনফুট (CFT)', en: 'Cubic feet (CFT)' }, short: { bn: 'CFT', en: 'CFT' } },
  { id: 'truck', label: { bn: 'ট্রাক লোড', en: 'Truck load' }, short: { bn: 'ট্রাক', en: 'truck' } },
  { id: 'ton', label: { bn: 'টন', en: 'Metric ton' }, short: { bn: 'টন', en: 'ton' } },
  { id: 'bag', label: { bn: 'ব্যাগ', en: 'Bag' }, short: { bn: 'ব্যাগ', en: 'bag' } },
  { id: 'piece', label: { bn: 'পিস', en: 'Piece' }, short: { bn: 'পিস', en: 'pc' } },
]

export const products = [
  {
    id: 'filling-sand',
    category: 'sand',
    featured: true,
    name: { bn: 'ভরাট বালু', en: 'Filling Sand' },
    tagline: { bn: 'প্লট ও রাস্তা ভরাটের জন্য', en: 'For plot and road filling' },
    description: {
      bn: 'প্লট, রাস্তা ও ফাউন্ডেশন ভরাটের জন্য উপযোগী সিল্ট ও বালু মিশ্রিত ভরাট বালু। ট্রাক লোডে সরবরাহ করা হয় এবং চাহিদা অনুযায়ী পরিমাণ ঠিক করে দেওয়া হয়।',
      en: 'Filling sand for plots, roads and foundation backfill. Supplied in truck loads, with the quantity measured before dispatch.',
    },
    image: '/images/aerial-loading.jpg',
    units: ['truck', 'cft'],
    minQuantity: 1,
    minUnit: 'truck',
    price: null,
    priceUnit: 'truck',
    specs: [
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'প্লট ভরাট, রাস্তা, ফাউন্ডেশন', en: 'Plot filling, roads, foundation' } },
      { label: { bn: 'সরবরাহ', en: 'Delivery' }, value: { bn: 'ট্রাক লোড', en: 'Truck load' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '১ ট্রাক', en: '1 truck' } },
    ],
  },
  {
    id: 'coarse-sand',
    category: 'sand',
    featured: true,
    name: { bn: 'মোটা নদীর বালু', en: 'Coarse River Sand' },
    tagline: { bn: 'কংক্রিট ও ঢালাইয়ের জন্য', en: 'For concrete and casting' },
    description: {
      bn: 'নদী থেকে তোলা পরিষ্কার মোটা বালু, কংক্রিট, কলাম ও ছাদের ঢালাইয়ে ভালো বন্ধন দেয়। ধুয়ে পরিষ্কার করা যায় এবং নমুনা দেখে অর্ডার করা যায়।',
      en: 'Clean, coarse river sand with good binding for concrete, columns and roof casting. Washing and sample checks are available on request.',
    },
    image: '/images/sand-coarse.jpg',
    units: ['cft', 'truck'],
    minQuantity: 100,
    minUnit: 'cft',
    price: null,
    priceUnit: 'cft',
    specs: [
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'কংক্রিট, কলাম, ছাদের ঢালাই', en: 'Concrete, columns, roof casting' } },
      { label: { bn: 'গঠন', en: 'Texture' }, value: { bn: 'মোটা দানা, পরিষ্কার', en: 'Coarse grain, clean' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '১০০ ঘনফুট', en: '100 CFT' } },
    ],
  },
  {
    id: 'sylhet-sand',
    category: 'sand',
    featured: true,
    name: { bn: 'সিলেট বালু', en: 'Sylhet Sand' },
    tagline: { bn: 'প্লাস্টার ও ফিনিশিংয়ের জন্য', en: 'For plastering and finishing' },
    description: {
      bn: 'সিলেট অঞ্চলের মিহি, হালকা রঙের বালু — প্লাস্টার, গাঁথুনি ও ফিনিশিং কাজে মসৃণ ও সমান পৃষ্ঠ দেয়। ছোট ও বড় উভয় পরিমাণে পাওয়া যায়।',
      en: 'Fine, light-coloured sand from the Sylhet region. It gives a smooth, even finish for plastering and masonry, and is sold in both small and bulk quantities.',
    },
    image: '/images/sand-sylhet.jpg',
    units: ['cft', 'truck'],
    minQuantity: 50,
    minUnit: 'cft',
    price: null,
    priceUnit: 'cft',
    specs: [
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'প্লাস্টার, গাঁথুনি, ফিনিশিং', en: 'Plaster, masonry, finishing' } },
      { label: { bn: 'গঠন', en: 'Texture' }, value: { bn: 'মিহি ও সমান', en: 'Fine and even' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '৫০ ঘনফুট', en: '50 CFT' } },
    ],
  },
  {
    id: 'stone-chips-20mm',
    category: 'stone',
    featured: true,
    name: { bn: 'পাথর চিপস ৩/৪ ইঞ্চি (২০ মিমি)', en: 'Stone Chips 3/4" (20 mm)' },
    tagline: { bn: 'RCC ও রাস্তার কাজে', en: 'For RCC and road work' },
    description: {
      bn: '২০ মিমি (৩/৪ ইঞ্চি) গ্রেডের ধোয়া পাথর চিপস, RCC ঢালাই, বীম, কলাম ও রাস্তার কাজে ব্যবহার হয়। গ্রেড অনুযায়ী ছেঁকে দেওয়া হয়।',
      en: 'Washed 20 mm (3/4 inch) graded stone chips for RCC casting, beams, columns and road work. Screened to the requested grade.',
    },
    image: '/images/stone-chips.jpg',
    units: ['cft', 'truck', 'ton'],
    minQuantity: 100,
    minUnit: 'cft',
    price: null,
    priceUnit: 'cft',
    specs: [
      { label: { bn: 'সাইজ', en: 'Size' }, value: { bn: '২০ মিমি / ৩/৪ ইঞ্চি', en: '20 mm / 3/4 inch' } },
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'RCC, বীম, কলাম, রাস্তা', en: 'RCC, beams, columns, roads' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '১০০ ঘনফুট', en: '100 CFT' } },
    ],
  },
  {
    id: 'stone-chips-12mm',
    category: 'stone',
    name: { bn: 'পাথর চিপস ১/২ ইঞ্চি (১২ মিমি)', en: 'Stone Chips 1/2" (12 mm)' },
    tagline: { bn: 'স্ল্যাব ও ছাদের ঢালাইয়ে', en: 'For slabs and roof casting' },
    description: {
      bn: '১২ মিমি (১/২ ইঞ্চি) চিপস — পাতলা স্ল্যাব, ছাদ, লিন্টেল ও ফিনিশিং কংক্রিটের জন্য উপযোগী।',
      en: '12 mm (1/2 inch) chips suited to thin slabs, roofs, lintels and finishing concrete.',
    },
    image: '/images/stone-chips-white.jpg',
    units: ['cft', 'truck', 'ton'],
    minQuantity: 100,
    minUnit: 'cft',
    price: null,
    priceUnit: 'cft',
    specs: [
      { label: { bn: 'সাইজ', en: 'Size' }, value: { bn: '১২ মিমি / ১/২ ইঞ্চি', en: '12 mm / 1/2 inch' } },
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'স্ল্যাব, ছাদ, লিন্টেল', en: 'Slabs, roofs, lintels' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '১০০ ঘনফুট', en: '100 CFT' } },
    ],
  },
  {
    id: 'stone-dust',
    category: 'stone',
    name: { bn: 'স্টোন ডাস্ট (পাথরের গুঁড়া)', en: 'Stone Dust' },
    tagline: { bn: 'বেডিং ও ব্লক তৈরিতে', en: 'For bedding and block making' },
    description: {
      bn: 'পাথর ভাঙার সময় পাওয়া মিহি গুঁড়া — পেভার বেডিং, ব্লক ও ইট তৈরির কাজে এবং লেভেলিংয়ে ব্যবহার হয়।',
      en: 'Fine dust produced while crushing stone. Used for paver bedding, block and brick making, and levelling.',
    },
    image: '/images/sand-fine.jpg',
    units: ['cft', 'truck'],
    minQuantity: 50,
    minUnit: 'cft',
    price: null,
    priceUnit: 'cft',
    specs: [
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'বেডিং, ব্লক, লেভেলিং', en: 'Bedding, blocks, levelling' } },
      { label: { bn: 'গঠন', en: 'Texture' }, value: { bn: 'মিহি', en: 'Fine' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '৫০ ঘনফুট', en: '50 CFT' } },
    ],
  },
  {
    id: 'gravel-pebbles',
    category: 'stone',
    name: { bn: 'নুড়ি পাথর ও গ্রেভেল', en: 'Gravel & Pebbles' },
    tagline: { bn: 'ড্রেন ও ল্যান্ডস্কেপিংয়ে', en: 'For drainage and landscaping' },
    description: {
      bn: 'বিভিন্ন সাইজের নুড়ি পাথর — ড্রেন, সেপটিক ট্যাংক, ওয়াকওয়ে, বাগান ও ল্যান্ডস্কেপিং ডিজাইনে ব্যবহার হয়।',
      en: 'Gravel and pebbles in several sizes for drains, septic tanks, walkways, gardens and landscaping.',
    },
    image: '/images/gravel.jpg',
    units: ['cft', 'truck', 'bag'],
    minQuantity: 20,
    minUnit: 'cft',
    price: null,
    priceUnit: 'cft',
    specs: [
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'ড্রেন, ওয়াকওয়ে, বাগান', en: 'Drains, walkways, gardens' } },
      { label: { bn: 'সাইজ', en: 'Sizes' }, value: { bn: '১০ মিমি থেকে ৪০ মিমি', en: '10 mm to 40 mm' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '২০ ঘনফুট', en: '20 CFT' } },
    ],
  },
  {
    id: 'bricks',
    category: 'other',
    name: { bn: 'প্রথম শ্রেণির ইট', en: 'First Class Bricks' },
    tagline: { bn: 'গাঁথুনি ও দেয়ালের জন্য', en: 'For masonry and walls' },
    description: {
      bn: 'সমান মাপ ও কম ভাঙা প্রথম শ্রেণির পোড়া ইট — দেয়াল, গাঁথুনি ও সিভিল কাজে সরবরাহ করা হয়।',
      en: 'Uniformly sized, well-burnt first class bricks with a low breakage rate, supplied for walls and general masonry work.',
    },
    image: '/images/bricks.jpg',
    units: ['piece', 'truck'],
    minQuantity: 1000,
    minUnit: 'piece',
    price: null,
    priceUnit: 'piece',
    specs: [
      { label: { bn: 'ব্যবহার', en: 'Best for' }, value: { bn: 'দেয়াল, গাঁথুনি', en: 'Walls, masonry' } },
      { label: { bn: 'মান', en: 'Grade' }, value: { bn: 'প্রথম শ্রেণি', en: 'First class' } },
      { label: { bn: 'নূন্যতম অর্ডার', en: 'Minimum order' }, value: { bn: '১,০০০ পিস', en: '1,000 pcs' } },
    ],
  },
]

export const featuredProducts = products.filter((p) => p.featured)

export const getProductById = (id) => products.find((p) => p.id === id) || null

export const getUnitById = (id) => units.find((u) => u.id === id) || null

export default products
