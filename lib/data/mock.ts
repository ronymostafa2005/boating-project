import type { Boat } from "@/types/boat";
import type { FAQ, PageContent } from "@/types/cms";

export const mockBoats: Boat[] = [
  {
    _id: "boat-1",
    name: { ar: "يخت رويال ستار", en: "Royal Star Yacht" },
    slug: "royal-star-yacht",
    type: "yacht",
    capacity: 20,
    images: [
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-1.jpg",
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-image-carousel-2.jpg",
    ],
    description: {
      ar: "يخت فاخر مثالي للمناسبات الخاصة والرحلات العائلية في مياه جدة الصافية.",
      en: "A luxury yacht perfect for special occasions and family trips in Jeddah's pristine waters.",
    },
    addons: [
      {
        name: { ar: "بوفيه طعام", en: "Catering Buffet" },
        price: 1500,
        currency: "SAR",
      },
      {
        name: { ar: "تصوير احترافي", en: "Professional Photography" },
        price: 800,
        currency: "SAR",
      },
    ],
    specs: [
      {
        label: { ar: "الطول", en: "Length" },
        value: { ar: "18 متر", en: "18 meters" },
      },
      {
        label: { ar: "السرعة", en: "Speed" },
        value: { ar: "25 عقدة", en: "25 knots" },
      },
    ],
    bokunProductId: "demo-product-1",
    featured: true,
    marina: "Yacht Club Jeddah",
    priceFrom: 3500,
  },
  {
    _id: "boat-2",
    name: { ar: "قارب النخيل", en: "Palm Cruiser" },
    slug: "palm-cruiser",
    type: "boat",
    capacity: 8,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    ],
    description: {
      ar: "قارب مريح للرحلات القصيرة والصيد الترفيهي.",
      en: "A comfortable boat for short trips and recreational fishing.",
    },
    addons: [
      {
        name: { ar: "معدات صيد", en: "Fishing Equipment" },
        price: 300,
        currency: "SAR",
      },
    ],
    specs: [
      {
        label: { ar: "الطول", en: "Length" },
        value: { ar: "8 متر", en: "8 meters" },
      },
    ],
    bokunProductId: "demo-product-2",
    featured: true,
    marina: "Jeddah Corniche",
    priceFrom: 1200,
  },
  {
    _id: "boat-3",
    name: { ar: "سبيد بوت توربو", en: "Turbo Speedboat" },
    slug: "turbo-speedboat",
    type: "speedboat",
    capacity: 6,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    description: {
      ar: "قارب سريع مثالي لعشاق الإثارة والمغامرة.",
      en: "A fast boat ideal for thrill seekers and adventure lovers.",
    },
    addons: [],
    specs: [
      {
        label: { ar: "السرعة القصوى", en: "Max Speed" },
        value: { ar: "45 عقدة", en: "45 knots" },
      },
    ],
    bokunProductId: "demo-product-3",
    featured: false,
    marina: "Obhur",
    priceFrom: 900,
  },
  {
    _id: "boat-4",
    name: { ar: "كاتاماران بحر الأحمر", en: "Red Sea Catamaran" },
    slug: "red-sea-catamaran",
    type: "catamaran",
    capacity: 15,
    images: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80",
    ],
    description: {
      ar: "كاتاماران واسع ومستقر، مثالي للحفلات والتجمعات.",
      en: "A spacious and stable catamaran, perfect for parties and gatherings.",
    },
    addons: [
      {
        name: { ar: "دي جي", en: "DJ Setup" },
        price: 2000,
        currency: "SAR",
      },
    ],
    specs: [
      {
        label: { ar: "الطول", en: "Length" },
        value: { ar: "14 متر", en: "14 meters" },
      },
    ],
    bokunProductId: "demo-product-4",
    featured: true,
    marina: "Yacht Club Jeddah",
    priceFrom: 2800,
  },
];

export const mockFaqs: FAQ[] = [
  {
    _id: "faq-1",
    order: 1,
    question: {
      ar: "كيف يمكنني حجز يخت؟",
      en: "How can I book a yacht?",
    },
    answer: {
      ar: "يمكنك الحجز مباشرة عبر موقعنا باختيار اليخت والتاريخ المناسب، أو التواصل معنا عبر واتساب.",
      en: "You can book directly through our website by selecting your yacht and preferred date, or contact us via WhatsApp.",
    },
  },
  {
    _id: "faq-2",
    order: 2,
    question: {
      ar: "ما هي طرق الدفع المتاحة؟",
      en: "What payment methods are available?",
    },
    answer: {
      ar: "نقبل الدفع عبر مدى وApple Pay وبطاقات الائتمان من خلال بوابة الدفع الآمنة.",
      en: "We accept Mada, Apple Pay, and credit cards through our secure payment gateway.",
    },
  },
  {
    _id: "faq-3",
    order: 3,
    question: {
      ar: "هل الكباتن مرخصون؟",
      en: "Are the captains licensed?",
    },
    answer: {
      ar: "نعم، جميع كباتننا حاصلون على تراخيص رسمية من الهيئة البحرية السعودية.",
      en: "Yes, all our captains hold official licenses from the Saudi Maritime Authority.",
    },
  },
  {
    _id: "faq-4",
    order: 4,
    question: {
      ar: "ما هي سياسة الإلغاء؟",
      en: "What is the cancellation policy?",
    },
    answer: {
      ar: "يمكن الإلغاء مجاناً قبل 48 ساعة من موعد الرحلة. الإلغاء خلال 48 ساعة يخضع لرسوم.",
      en: "Free cancellation up to 48 hours before the trip. Cancellations within 48 hours are subject to fees.",
    },
  },
  {
    _id: "faq-5",
    order: 5,
    question: {
      ar: "هل التأمين مشمول؟",
      en: "Is insurance included?",
    },
    answer: {
      ar: "نعم، جميع رحلاتنا مشمولة بتأمين شامل يغطي الركاب والممتلكات.",
      en: "Yes, all our trips include comprehensive insurance covering passengers and property.",
    },
  },
  {
    _id: "faq-6",
    order: 6,
    question: {
      ar: "ما هي ساعات العمل؟",
      en: "What are the operating hours?",
    },
    answer: {
      ar: "نعمل يومياً من 8 صباحاً حتى 10 مساءً. الرحلات الليلية متاحة بالحجز المسبق.",
      en: "We operate daily from 8 AM to 10 PM. Night trips are available with advance booking.",
    },
  },
  {
    _id: "faq-7",
    order: 7,
    question: {
      ar: "هل يمكنني إحضار طعامي الخاص؟",
      en: "Can I bring my own food?",
    },
    answer: {
      ar: "نعم، يمكنك إحضار طعامك. كما نوفر خدمة تموين اختيارية.",
      en: "Yes, you can bring your own food. We also offer optional catering service.",
    },
  },
  {
    _id: "faq-8",
    order: 8,
    question: {
      ar: "أين نقطة الانطلاق؟",
      en: "Where is the departure point?",
    },
    answer: {
      ar: "ننطلق من عدة مراسي في جدة: نادي اليخوت، الكورنيش، وأبحر.",
      en: "We depart from multiple marinas in Jeddah: Yacht Club, Corniche, and Obhur.",
    },
  },
  {
    _id: "faq-9",
    order: 9,
    question: {
      ar: "هل الرحلات مناسبة للأطفال؟",
      en: "Are trips suitable for children?",
    },
    answer: {
      ar: "نعم، مع توفير سترات نجاة للأطفال ومرافقة الوالدين.",
      en: "Yes, with life jackets provided for children and parental supervision required.",
    },
  },
  {
    _id: "faq-10",
    order: 10,
    question: {
      ar: "ماذا يحدث في حالة الطقس السيئ؟",
      en: "What happens in bad weather?",
    },
    answer: {
      ar: "نلغي أو نؤجل الرحلة مجاناً في حالة الطقس غير المناسب لسلامتكم.",
      en: "We cancel or reschedule trips free of charge in unsafe weather conditions.",
    },
  },
  {
    _id: "faq-11",
    order: 11,
    question: {
      ar: "هل يمكنني تخصيص الرحلة؟",
      en: "Can I customize my trip?",
    },
    answer: {
      ar: "نعم، نوفر إضافات مثل التموين والتصوير والترفيه. تواصل معنا للتفاصيل.",
      en: "Yes, we offer add-ons like catering, photography, and entertainment. Contact us for details.",
    },
  },
  {
    _id: "faq-12",
    order: 12,
    question: {
      ar: "كم مقدار العربون المطلوب؟",
      en: "How much deposit is required?",
    },
    answer: {
      ar: "نطلب عربون 30% عند الحجز، والباقي قبل موعد الرحلة بـ 24 ساعة.",
      en: "A 30% deposit is required at booking, with the balance due 24 hours before the trip.",
    },
  },
  {
    _id: "faq-13",
    order: 13,
    question: {
      ar: "هل تقدمون خدمة النقل؟",
      en: "Do you offer transportation?",
    },
    answer: {
      ar: "نوفر خدمة النقل من وإلى المرسى كإضافة اختيارية.",
      en: "We offer optional transportation to and from the marina as an add-on.",
    },
  },
  {
    _id: "faq-14",
    order: 14,
    question: {
      ar: "كيف أضيف قاربي للأسطول؟",
      en: "How do I list my boat?",
    },
    answer: {
      ar: "املأ نموذج 'أضف قاربك' وسيتواصل معك فريقنا خلال 48 ساعة.",
      en: "Fill out the 'List Your Boat' form and our team will contact you within 48 hours.",
    },
  },
  {
    _id: "faq-15",
    order: 15,
    question: {
      ar: "هل بياناتي آمنة؟",
      en: "Is my data secure?",
    },
    answer: {
      ar: "نعم، نلتزم بنظام حماية البيانات الشخصية السعودي (PDPL) ونستخدم تشفير SSL.",
      en: "Yes, we comply with Saudi PDPL and use SSL encryption for all data.",
    },
  },
];

export const mockPageContent: Record<string, PageContent> = {
  about: {
    _id: "page-about",
    slug: "about",
    title: { ar: "من نحن", en: "About Us" },
    content: {
      ar: "نحن شركة سعودية رائدة في مجال تأجير اليخوت والقوارب في جدة. نؤمن بأن البحر الأحمر يستحق أن يُكتشف بأسلوب فاخر وآمن. فريقنا من الكباتن المحترفين والملاحين المرخصين يضمن لك تجربة لا تُنسى.",
      en: "We are a leading Saudi company in yacht and boat rentals in Jeddah. We believe the Red Sea deserves to be discovered in luxury and safety. Our team of professional licensed captains ensures an unforgettable experience.",
    },
  },
  safety: {
    _id: "page-safety",
    slug: "safety",
    title: { ar: "الأمان والثقة", en: "Safety & Trust" },
    content: {
      ar: "سلامتك أولويتنا القصوى في كل رحلة.",
      en: "Your safety is our top priority on every trip.",
    },
    sections: [
      {
        title: { ar: "تراخيص الكباتن", en: "Captain Licenses" },
        content: {
          ar: "جميع كباتننا حاصلون على تراخيص رسمية من الهيئة البحرية السعودية ويخضعون لفحوصات دورية.",
          en: "All our captains hold official Saudi Maritime Authority licenses and undergo regular checks.",
        },
      },
      {
        title: { ar: "فحص القوارب", en: "Boat Verification" },
        content: {
          ar: "كل قارب في أسطولنا يخضع لفحص شامل قبل كل رحلة.",
          en: "Every boat in our fleet undergoes comprehensive inspection before each trip.",
        },
      },
      {
        title: { ar: "إجراءات الطوارئ", en: "Emergency Procedures" },
        content: {
          ar: "معدات إسعافات أولية وسترات نجاة لجميع الركاب. بروتوكولات اتصال طوارئ 24/7.",
          en: "First aid equipment and life jackets for all passengers. 24/7 emergency communication protocols.",
        },
      },
      {
        title: { ar: "التأمين", en: "Insurance" },
        content: {
          ar: "تأمين شامل يغطي الركاب والممتلكات والمسؤولية المدنية.",
          en: "Comprehensive insurance covering passengers, property, and civil liability.",
        },
      },
      {
        title: { ar: "قواعد العربون", en: "Deposit Rules" },
        content: {
          ar: "عربون 30% عند الحجز. استرداد كامل عند الإلغاء قبل 48 ساعة.",
          en: "30% deposit at booking. Full refund for cancellations 48+ hours in advance.",
        },
      },
    ],
  },
  terms: {
    _id: "page-terms",
    slug: "terms",
    title: { ar: "الشروط والأحكام", en: "Terms & Conditions" },
    content: {
      ar: "باستخدامك لموقعنا وخدماتنا، فإنك توافق على الشروط والأحكام التالية وفقاً للأنظمة السعودية المعمول بها. يخضع الحجز لسياسة الإلغاء المذكورة. المستخدم مسؤول عن تقديم معلومات صحيحة. نحتفظ بحق تعديل الأسعار والتوفر.",
      en: "By using our website and services, you agree to the following terms and conditions under applicable Saudi regulations. Bookings are subject to the stated cancellation policy. Users are responsible for providing accurate information. We reserve the right to modify prices and availability.",
    },
  },
  privacy: {
    _id: "page-privacy",
    slug: "privacy",
    title: { ar: "سياسة الخصوصية", en: "Privacy Policy" },
    content: {
      ar: "نلتزم بنظام حماية البيانات الشخصية السعودي (PDPL). نجمع البيانات الضرورية للحجز فقط. لا نشارك بياناتك مع أطراف ثالثة دون موافقتك. يمكنك طلب حذف بياناتك في أي وقت.",
      en: "We comply with Saudi Personal Data Protection Law (PDPL). We collect only data necessary for booking. We do not share your data with third parties without consent. You may request data deletion at any time.",
    },
  },
};
