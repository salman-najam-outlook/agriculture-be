'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Potato virus",
        arabic: "فيروس البطاطس"
      },
      {
        english: "Spotted wilt virus",
        arabic: "فيروس التلف المنتشر"
      },
      {
        english: "Plum pox virus",
        arabic: "فيروس بقعة البرقوق"
      },
      {
        english: "Yellow leaf curl virus",
        arabic: "فيروس تجعد الأوراق الصفراء"
      },
      {
        english: "Seed treatment",
        arabic: "معالجة البذور"
      },
      {
        english: "Soil drenching",
        arabic: "غمر التربة"
      },
      {
        english: "Dry, wet foliar spraying",
        arabic: "رش الأوراق الجافة والرطبة"
      },
      // {
      //   english: "Dhdgdgdgegwg",
      //   arabic: "Dhdgdgdgegwg"
      // },
      // {
      //   english: "gsgsgaha",
      //   arabic: "gsgsgaha"
      // },
      // {
      //   english: "tttttttt",
      //   arabic: "tttttttt"
      // },
      // {
      //   english: "Sgggshhwhwhwh",
      //   arabic: "Sgggshhwhwhwh"
      // },
      // {
      //   english: "g6gygyf",
      //   arabic: "g6gygyf"
      // },
      // {
      //   english: "uuuuuuu",
      //   arabic: "uuuuuuu"
      // },
      // {
      //   english: "Hellloooook",
      //   arabic: "Hellloooook"
      // },
      // {
      //   english: "Tester",
      //   arabic: "Tester"
      // },
      // {
      //   english: "test4",
      //   arabic: "test4"
      // },
      // {
      //   english: "test44",
      //   arabic: "test44"
      // },
      // {
      //   english: "test444",
      //   arabic: "test444"
      // },
      // {
      //   english: "Testergenehe",
      //   arabic: "Testergenehe"
      // },
      // {
      //   english: "test4441",
      //   arabic: "test4441"
      // },
      // {
      //   english: "test44411",
      //   arabic: "test44411"
      // },
      // {
      //   english: "Hhuhuhuhubu",
      //   arabic: "Hhuhuhuhubu"
      // },
      // {
      //   english: "test444111",
      //   arabic: "test444111"
      // },
      // {
      //   english: "Dgdgdvdgdg",
      //   arabic: "Dgdgdvdgdg"
      // },
      // {
      //   english: "Yyyy",
      //   arabic: "Yyyy"
      // },
      // {
      //   english: "Guvjcjjc",
      //   arabic: "Guvjcjjc"
      // },
      // {
      //   english: "Guvjcjjceyh4heh",
      //   arabic: "Guvjcjjceyh4heh"
      // },
      // {
      //   english: "Fhfhfhcjcjfjvjvjvjvjvjvjgj",
      //   arabic: "Fhfhfhcjcjfjvjvjvjvjvjvjgj"
      // },
      // {
      //   english: "Gshhshsha",
      //   arabic: "Gshhshsha"
      // },
      {
        english: "Last test",
        arabic: "اختبار الأخير"
      },
      // {
      //   english: "Hiiiii",
      //   arabic: "هيييي"
      // },
      // {
      //   english: "Gggggg",
      //   arabic: "جيجيجي"
      // },
      // {
      //   english: "Hhhhhhhhhh88g8g8g",
      //   arabic: "هههههه88ج8ج8ج"
      // },
      // {
      //   english: "Ghhhhhhhhhjjj",
      //   arabic: "غغغغغغججج"
      // },
      // {
      //   english: "Ghhhhhhhhhnlknlknklnlsscknknjjsdsj",
      //   arabic: "غغغغغغنلكنكلنلسسكنكنججسدسج"
      // },
      // {
      //   english: "Ghhhhhhhhhnlknlknklnlsscknknsasasjjsdsj",
      //   arabic: "غغغغغغنلكنكلنلسسكنكنساساسججسدسج"
      // },
      // {
      //   english: "Gggg111111",
      //   arabic: "ججججج111111"
      // },
      {
        english: "Testing last",
        arabic: "اختبار الأخير"
      },
      {
        english: "Test last one",
        arabic: "اختبار الأخير الواحد"
      },
      {
        english: "Testing last last",
        arabic: "اختبار الأخير الأخير"
      },
      {
        english: "Testering",
        arabic: "اختبار"
      },
      // {
      //   english: "Testringgg",
      //   arabic: "اختبارججج"
      // },
      {
        english: "Testing",
        arabic: "اختبار"
      },
      {
        english: "Hello test",
        arabic: "اختبار مرحبًا"
      },
      {
        english: "New test",
        arabic: "اختبار جديد"
      },
      {
        english: "Zone",
        arabic: "منطقة"
      },
      {
        english: "Paddock",
        arabic: "حظيرة"
      },
      {
        english: "Camp",
        arabic: "مخيم"
      },
      {
        english: "Pen",
        arabic: "قفص"
      },
      {
        english: "Segment",
        arabic: "قطاع"
      },
      {
        english: "Pasture",
        arabic: "مرعى"
      },
      {
        english: "zero-grazing",
        arabic: "نظام إنتاج بدون رعي"
      },
      {
        english: "fenced farming",
        arabic: "زراعة محاطة بالسياج"
      },
      {
        english: "enclosed ranching",
        arabic: "مراعي مغلقة"
      },
      {
        english: "my way",
        arabic: "طريقتي"
      },
      {
        english: "propping",
        arabic: "تقويم النبات"
      },
      {
        english: "Detrashing",
        arabic: "التخلص من القش"
      },
      {
        english: "Topping",
        arabic: "قمة النبات"
      },
      {
        english: "Nipping",
        arabic: "قص الأفرع الجديدة"
      },
      {
        english: "Loose Farming",
        arabic: "زراعة فسيحة"
      },
      {
        english: "Conventional Barn System",
        arabic: "نظام الحظائر التقليدية"
      },
      {
        english: "Free Range System",
        arabic: "نظام التربية في الهواء الطلق"
      },
      // {
      //   english: "Ds",
      //   arabic: "Ds"
      // },
      {
        english: "semiwashed",
        arabic: "شبه مغسولة"
      },
      {
        english: "fullwashed",
        arabic: "مغسولة بالكامل"
      },
      // {
      //   english: "Jfjsosk",
      //   arabic: "Jfjsosk"
      // },
      {
        english: "Hydro",
        arabic: "هيدرو"
      }
    ]
    


    for (const row of data) {
      let sql = "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.english },
      });

      // update case
      if (global_trans && global_trans.length > 0) {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkUpdate("global_translation_metadata", item, {
          id: global_trans?.map((item) => item.id),
        });
      } else {
        // Insert Case
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, "global_translation_metadata", item);
      }

    }
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
