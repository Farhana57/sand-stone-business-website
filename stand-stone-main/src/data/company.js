/**
 * ---------------------------------------------------------------------------
 * BUSINESS DETAILS  —  EDIT THIS FILE FIRST
 * ---------------------------------------------------------------------------
 * Every value below is a placeholder for the demo. Replace the phone numbers,
 * e-mail, address and social links with the real business details before you
 * publish the site. Nothing here is invented pricing or made-up claims, but the
 * contact points are sample data.
 *
 * Contact values are language-neutral (phones/e-mail) except `address`, which
 * carries a Bangla and an English version.
 */

export const company = {
  /** TODO: replace with the real business name (shown in the header, footer, page titles). */
  name: {
    bn: 'পদ্মা স্যান্ড অ্যান্ড স্টোন',
    en: 'Padma Sand & Stone',
  },
  nameShort: {
    bn: 'পদ্মা',
    en: 'Padma',
  },
  tagline: {
    bn: 'বালু, পাথর ও নির্মাণ সামগ্রীর নির্ভরযোগ্য সরবরাহ',
    en: 'Reliable supply of sand, stone & construction materials',
  },

  /** TODO: replace with the real numbers. Digits only, international format for wa.me. */
  phone: '+8801712345678',
  phoneDisplay: '+880 1712-345678',
  phoneAlt: '',
  phoneAltDisplay: '',

  /** TODO: replace. Must be digits only with country code (no + or spaces) for wa.me links. */
  whatsapp: '8801712345678',
  /** Pre-filled WhatsApp text is composed in lib/contact.js from the translations. */

  /** TODO: replace. */
  email: 'info@example.com',

  /** TODO: replace. */
  address: {
    bn: 'পশ্চিম রামপুরা, ঢাকা-১২১৯, বাংলাদেশ',
    en: 'West Rampura, Dhaka-1219, Bangladesh',
  },
  /** Google Maps search query for the "Open in Maps" link. */
  mapQuery: 'West Rampura, Dhaka, Bangladesh',

  hours: {
    bn: 'প্রতিদিন সকাল ৭টা – রাত ১০টা (শুক্রবারসহ)',
    en: 'Every day, 7:00 AM – 10:00 PM (including Friday)',
  },

  /** TODO: replace with the real social profiles (or remove the entry). */
  social: {
    facebook: 'https://facebook.com/',
    youtube: '',
  },

  /**
   * Service guarantees shown on the home page and delivery page.
   * These are policy statements, not statistics — adjust the wording to match
   * what the business actually offers.
   */
  guarantees: [
    {
      icon: 'scale',
      title: { bn: 'প্রতি লোডে ওজন-স্লিপ', en: 'Weighbridge slip with every load' },
      body: {
        bn: 'ডেলিভারির সময় পরিমাপ করা পরিমাণের স্লিপ দেওয়া হয়, যাতে মাপ নিয়ে সন্দেহ না থাকে।',
        en: 'You receive a measured slip with the delivery so the quantity is never in doubt.',
      },
    },
    {
      icon: 'truck',
      title: { bn: 'নিজস্ব ট্রাক ও ড্রাইভার', en: 'Own trucks and drivers' },
      body: {
        bn: 'নিজস্ব টিপার ও কাভার্ড ট্রাক থাকায় সময়মতো পণ্য পৌঁছে দেওয়া যায়।',
        en: 'Our own tipper and covered trucks keep deliveries on schedule.',
      },
    },
    {
      icon: 'wallet',
      title: { bn: 'ক্যাশ অন ডেলিভারি', en: 'Cash on delivery' },
      body: {
        bn: 'পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা।',
        en: 'Pay after the material reaches your site.',
      },
    },
    {
      icon: 'shield',
      title: { bn: 'নমুনা দেখে অর্ডার', en: 'Order after seeing the material' },
      body: {
        bn: 'বড় অর্ডারের আগে মালের নমুনা দেখে সিদ্ধান্ত নিতে পারবেন।',
        en: 'Check a sample before committing to a large order.',
      },
    },
  ],

  /** Delivery coverage. Edit freely. */
  deliveryAreas: {
    dhakaZone: {
      bn: ['ঢাকা সিটি', 'গাজীপুর', 'নারায়ণগঞ্জ', 'সাভার', 'কেরানীগঞ্জ', 'মুন্সিগঞ্জ', 'নরসিংদী', 'টঙ্গী'],
      en: ['Dhaka City', 'Gazipur', 'Narayanganj', 'Savar', 'Keraniganj', 'Munshiganj', 'Narsingdi', 'Tongi'],
    },
    /** Long-haul coverage is described rather than listed, to stay accurate. */
    longHaul: {
      bn: 'চট্টগ্রাম, সিলেট, খুলনা, রাজশাহী, বরিশাল, রংপুর ও ময়মনসিংহ বিভাগের যেকোনো জেলায় ট্রাক লোড সরবরাহ করা হয়।',
      en: 'Truck-load supply to any district in the Chattogram, Sylhet, Khulna, Rajshahi, Barishal, Rangpur and Mymensingh divisions.',
    },
  },
}

export default company
