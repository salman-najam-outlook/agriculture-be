'use strict';

const translationDataFixes = [
  {
    english: "1st to nth trifoliolate stage",
    hindi: "1 से नौवीं ट्राइफोलियोलेट चरण",
    marathi: "1 ला एनटीएच ट्रायफोलिओलेट स्टेज",
    spanish: "1° a n° estadio trifoliolado",
    indonesian: "Tahap trifoliolat ke-1 hingga ke-n",
    portugese: "1º ao enésimo estágio trifoliolado",
    nepali: "पहिलो देखि एनठी ट्रिफरोइज्ड चरणसम्म",
    french: "1er à énième stade trifoliolé",
    arabic: "من الأول إلى المرحلة الثلاثية",
    swahili: "Hatua ya 1 hadi ya nth trifoliolate",
    bengali: "প্রথম থেকে নবম ট্রাইফোলিওলেট পর্যায়",
    oromo: "Sadarkaa 1ffaa hanga nffaatti trifoliolate",
    somali: "1aad ilaa nth marxaladda trifoliolate",
    vietnamese: "Giai đoạn ba lá thứ 1 đến thứ n",
    amharic: "ከ 1 ኛ እስከ ኛ ትራይፎሊዮሌት ደረጃ",
    greek: "1ο έως το ντο τριφυλλικό στάδιο",
    mandarin: "第1至第n三叶期",
    japanese: "第 1 期から第 n 期までの三葉期",
    turkish: "1 ila nth trifoliolate aşaması"
  },
  {
    english: "Beginning bloom/first flower stage",
    hindi: "खिलने की शुरुआत/पहली फूल अवस्था",
    marathi: "फुलांची सुरुवात/पहिली फुलांची अवस्था",
    spanish: "Comienzo de floración/primera etapa de flor",
    indonesian: "Mulai mekar/tahap bunga pertama",
    portugese: "Início da floração/primeira fase da flor",
    nepali: "प्रारम्भिक फूल / पहिलो फूल चरण",
    french: "Début de floraison/premier stade de floraison",
    arabic: "بداية الإزهار / مرحلة الزهرة الأولى",
    swahili: "Mwanzo wa maua / hatua ya maua ya kwanza",
    bengali: "প্রস্ফুটিত/প্রথম ফুলের পর্যায়",
    oromo: "Daraaraa jalqabaa/sadarkaa daraaraa jalqabaa",
    somali: "Bilawga ubaxa/marxaladda ubaxa koowaad",
    vietnamese: "Bắt đầu nở hoa/giai đoạn hoa đầu tiên",
    amharic: "የመጀመሪያ አበባ/የመጀመሪያው የአበባ ደረጃ",
    greek: "Έναρξη άνθισης/πρώτο στάδιο άνθισης",
    mandarin: "初花期/初花期",
    japanese: "咲き始め/最初の花期",
    turkish: "Çiçeklenme başlangıcı/ilk çiçek aşaması"
  },
  {
    english: "Initial maturity stage",
    hindi: "प्रारंभिक परिपक्वता अवस्था",
    marathi: "प्रारंभिक परिपक्वता टप्पा",
    spanish: "Etapa de madurez inicial",
    indonesian: "Tahap kedewasaan awal",
    portugese: "Estágio inicial de maturidade",
    nepali: "प्रारम्भिक परिपक्वता चरण",
    french: "Stade de maturité initiale",
    arabic: "مرحلة النضج الأولي",
    swahili: "Awamu ya ukomavu wa awali",
    bengali: "প্রাথমিক পরিপক্কতার পর্যায়",
    oromo: "Sadarkaa bilchina jalqabaa",
    somali: "Marxaladda biseylka hore",
    vietnamese: "Giai đoạn trưởng thành ban đầu",
    amharic: "የመጀመሪያ ደረጃ የብስለት ደረጃ",
    greek: "Αρχικό στάδιο ωριμότητας",
    mandarin: "初始成熟阶段",
    japanese: "初期成熟段階",
    turkish: "İlk olgunluk aşaması"
  },
  {
    english: "Cankers",
    hindi: "नासूर",
    marathi: "कॅंकर्स",
    spanish: "Cancros",
    indonesian: "Busuk",
    portugese: "Cancros",
    nepali: "क्यानरहरू",
    french: "Chancres",
    arabic: "كانكرز",
    swahili: "Saratani",
    bengali: "ক্যাঙ্কার্স",
    oromo: "Kansaroota",
    somali: "Cankers",
    vietnamese: "Cankers",
    amharic: "ካንሰሮች",
    greek: "Καρκινώματα",
    mandarin: "溃疡病",
    japanese: "潰瘍",
    turkish: "Cankerler"
  },
  {
    english: "Granary",
    hindi: "धान्यागार",
    marathi: "धान्य कोठार",
    spanish: "Granero",
    indonesian: "Lumbung padi",
    portugese: "Celeiro",
    nepali: "अन्न भण्डार",
    french: "Grenier",
    arabic: "صومعة",
    swahili: "Ghala",
    bengali: "শস্যভাণ্ডার",
    oromo: "Kuusaa midhaanii",
    somali: "Granary",
    vietnamese: "Kho",
    amharic: "ጎተራ",
    greek: "Σιταποθήκη",
    mandarin: "粮仓",
    japanese: "穀倉",
    turkish: "Tahıl ambarı"
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const englishTranslations = translationDataFixes.map(data => data.english);
    
    await queryInterface.bulkDelete('global_translation_metadata', {
      english: {
        [Sequelize.Op.in]: [...englishTranslations, 'Initial maturity satge']
      }
    });

    await queryInterface.bulkInsert('global_translation_metadata', translationDataFixes);
    await queryInterface.bulkUpdate('crop_observation_growth_stage', {
      name: 'Initial maturity stage'
    }, {
      name: 'Initial maturity satge'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
