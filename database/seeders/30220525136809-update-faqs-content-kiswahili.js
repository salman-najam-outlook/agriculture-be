'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    //bengali
     [await queryInterface.bulkUpdate('faq_sections', {
      sw: '`[{"question": "Je ninaweza kuweka taarifa ya usajili wangu wa binafsi?", "answer": "Kwa chombo chako bonyeza ikoni iliyo kwenye pembe la kushoto la ukurasa wako wa mwanzo. Unaweza kupata nafasi ya kujaza jina lako na baruapepe yako ya mawasiliano. Pia unapaswa kujaza taarifa zote zinazohitajika ili kuunda akaunti yako"}, {"question": "Je ninaweza kubadilisha taarifa iliyo kwenye usajili wangu vipi?", "answer": "Ili kutazama na kubadilisha taarifa katika usajili wako, unaweza kubonyeza jina lako au kubonyeza kitufe cha kubadilisha taarifa iliyo karibu na jina lako kwenye kilele cha skrini"}, {"question": "Je ninaweza kuhifadhi vipi mabadiliko katika usajili wangu?", "answer": "Wakati wowote unapounda au kufanya mabadiliko katika taarifa zako za akaunti, unaweza kukubali mabadiliko yako kwa kubonyeza kitufe cha Hifadhi kilicho katika sehemu ya chini ya skrini. Mara inapohifadhiwa, taarifa hiyo itaongezwa kiautomatiki kwenye mfumo"}]`',
    }, {
      name: 'my_profile',
    },
  ), await queryInterface.bulkUpdate('faq_sections', {
    sw: '`[{"question": "Je ninaweza kusajili shamba langu namna gani?", "answer": "Unaweza kubonyeza sehemu ya Shamba Langu na kuchagua usajili wa Shamba. Unaweza kujaza taarifa inayotakiwa katika fomu iliyoonyeshwa."}, {"question": "Je ninaweza kurekebisha vipi taarifa yangu ya usajili wa shamba?", "answer": "Taarifa za usajili wa shamba lako zinaweza kuonekana chini ya sehemu ya Shamba Langu baada ya kujaza fomu. Ili kurekebisha taarifa, unaweza kubonyeza kitufe cha Kurekebisha linalopatikana katika skrini ya kukubali taarifa"}, {"question": "Je ninaweza kupata wapi eneo la shamba langu?", "answer": "Anwani ya makaazi au mahali shamba lako linapatikana, pamoja na mipaka ya kisahihi ya shamba lako (Ua la Kijeografia) yanafaa kutolewa wakati wa mchakato wa Usajili wa Shamba. Taarifa hizo zinaweza kupatikana katika sehemu za Mahali Nipo na Ua langu la Kijeografia za Shamba Langu ambapo unaweza kutazama taarifa uliyoweka na kufanya marekebisho iwapo yanahitajika"}, {"question": "Je kwa nini ninapaswa kuandika malengo yangu?", "answer": "Kuongeza taarifa kuhusu malengo yako yanakusaidia kufuatilia maendeleo yako kulingana na masharti uliyojiwekea na hutupatia namna bora zaidi za kukusaidia kutimiza mahitaji yako"}, {"question": "Je ni kwa nini ninapaswa kujaza fomu la Ukaguzi wa Shamba?", "answer": "Lengo la sehemu la Ukaguzi wa Shamba ni kuamua iwapo mkulima anatenda vizuri kulingana na masharti fulani yanaohusiana na sehemu tofauti za shamba. Tunaweza kukusaidia kutambua sehemu zinazopaswa kurekebishwa (kuboreshwa) na sehemu ambazo unafanya vizuri. Unaweza kujaza fomu letu la mtandao la ukaguzi au unaweza kutupatia/kuwasilisha kwetu mojawapo ya ukaguzi wako wa awali kwa kumbukumbu lako"}, {"question": "Je ni nini lengo la sehemu la Hati Zangu?", "answer": "Unaweza kuwasilisha aina tofauti za faili na hati chini ya sehemu ya Hati Zangu kwa urahisi wa kuzipata na kwa kumbukumbu la siku ijayo. Unaweza kuandaa hati zako katika faili, kuzitafuta na kuzichuja ili kupata faili zinazofaa. Unaweza kuwasilisha faili zinazohusu sehemu tofauti za app kutoka chombo unachotumia"}]`',

    
  }, {
    name: 'my_farm',
  },
),
 
  await queryInterface.bulkUpdate('faq_sections', {
    sw: '`[{"question": "Je ninaweza kusajili mazao zangu vipi?", "answer": "Unaweza kuenda katika sehemu ya Mazao Yangu na kuchagua usajili wa Zao. Tafadhali weka data iliyotajwa katika fomu ili kusajili mazao yako katika mfumo"}, {"question": "Je ninaweza kutazama vipi na kurekebisha taarifa za usajili wa zao langu?", "answer": "Pindi unapojaza taarifa zinazohusu mazao yako chini ya skrini ya usajili wa Zao, unaweza kutazama taarifa katika skrini ya kuhakikisha ambapo unaweza kurekebisha taarifa kwa kubonyeza kwenye kitufe cha kurekebisha kinachopatikana kwenye skrini hiyo hiyo"}, {"question": "Je ninaweza vipi kubainisha aina la zao na aina la mmea?", "answer": "Aina za zao na mimea zinafaa kusajiliwa katika mchakato wa Usajili wa Zao ambapo unaweza kuchagua kutoka orodha ya aina ya mazao na mimea yanayopatikana kwa sasa unazoweza kuchagua kati."}, {"question": "Je ninapaswa kuandika nini katika sehemu ya Uchunguzi wa Zao?", "answer": "Hali za zao, upungufu wa virutubisho, na taarifa za afya za kiujumla zinaweza kusajiliwa katika sehemu ya Uchunguzi wa Zao ili kuweka taarifa ya ziada kuhusu utendakazi wa zao lako na hali yake. Unaweza kutumia sehemu hii kama kumbukumbu kwa mitazamo yako ya mara kwa mara ambapo pia unaweza kuongeza taarifa za ziada na kuambatanisha picha kukusaidia kufuatilia hali katika muda fulani."}]`',

  
    
  },{
  name: 'my_crops',
},
),
await queryInterface.bulkUpdate('faq_sections', {
  sw: '`[{"question": "Je ninaweza kusajili mifugo zangu vipi?", "answer": "Unaweza kuenda katika Sehemu ya Mifugo Yangu na kuchagua Usajili wa Mifugo. Utaweka aina ya mnyama, jina / nambari ya utambulizi na taarifa nyingine iliyotajwa katika fomu ili kusajli taarifa za mnyama wako na mafanikio"}, {"question": "Je ni vipi ninaweza kuongeza malengo yangu?", "answer": "Unaweza kuongeza malengo yako katika mojawapo ya mbinu mbili: kwa kubonyeza sehemu ya Malengo Yangu chini ya sehemu ya Shamba Langu ambapo unaweza kuchagua zaidi iwapo ungependa kutaja lengo maalum linalohusu mazao yako au mifugo yako. Unaweza pia kupata kitufe cha malengo yangu chini ya sehemu ya Mifugo Yangu au Mazao Yangu ili uweze kuongeza taarofa maalum inayohusu sehemu hiyo. Unaweza pia kuongeza malengo kadhaa."}, {"question": "Je ninaweza kuongeza mitazamo kuhusu mnyama/wanyama wangu?", "answer": "Sehemu ya Mitazamo ya Mnyama inayopatikana chini ya sehemu ya Mifugo Yangu ni mahali bora zaidi pa kuongeza taarifa yeyote kuhusu mitazamo yako ya mnyama. Unaweza pia kuongeza taarifa ya mitazamo kwa mnyama wako mmoja kibinafsi (pekee) au kwa kundi la wanyama (kundi)"}, {"question": "Je ni taarifa gani kuhusu mifugo yangu ninayofaa kuongeza kwa usajili wa mnyama wenye mafanikio?", "answer": "Tafadhali fuata maswali ambayo yanaulizwa katika fomu la Usajili wa Mfugo. Sehemu ambazo ni lazima kujaza zimewekwa alama ya nyota nyekundu na zinawakilisha sehemu muhimu zaidi. Tunawatia moyo kutoa taarifa zaidi iwezekanavyo ili tuweze kuwapa mapendekezo sahihi zaidi na maripoti ambazo zinakidhi mahitaji zenu"}]`',

  
 
},{
name: 'my_livestock',
},
),
await queryInterface.bulkUpdate('faq_sections', {
  sw: '`[{"question": "Kwa maswala yeyote ya kiufundi, tafadhali wasiliana nasi kupitia help@dimitra.io ukielezea swala lako au jaza fomu letu la mtandao ambalo linaweza kupatikana katika sehemu ya Wasiliana nasi", "answer": ""}]`',
},{
name: 'technical_issues',
},
)
];
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
