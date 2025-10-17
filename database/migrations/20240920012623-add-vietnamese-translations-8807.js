'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Cacao Data",
        vietnamese: "Dữ liệu Cacao",
      },
      {
        english: "Buy Sell Overview",
        vietnamese: "Tổng quan Mua Bán",
      },
      {
        english: "Cacao Overview",
        vietnamese: "Tổng quan Cacao",
      },
      {
        english: "Deforestation",
        vietnamese: "Phá rừng",
      },
      {
        english: "Deforestation Compliance Reports",
        vietnamese: "Báo cáo Tuân thủ Phá rừng",
      },
      {
        english: "Compliance Certification",
        vietnamese: "Chứng nhận Tuân thủ",
      },
      {
        english: "Dry Cacao",
        vietnamese: "Cacao Khô",
      },
      {
        english: "Land Suitability",
        vietnamese: "Sự phù hợp của đất",
      },
      {
        english: 'Due Diligence Report',
        vietnamese: 'Báo cáo Nghiêm túc',
      },
      {
        english: 'Dispute Resolution',
        vietnamese: 'Giải quyết Tranh chấp',
      },
      {
        english: 'Suppliers',
        vietnamese: 'Nhà cung cấp',
      },
      {
        english:'Shipments',
        vietnamese:'Lô hàng',
      },
      {
        english:'Cocoa',
        vietnamese:'Cacao',
      },
      {
        english:'Cocoa Beans',
        vietnamese:'Hạt Cacao',
      },
      {
        english: "Assessment Builder",
        vietnamese: "Công cụ Đánh giá",
      },
      // EUDR Due Diligence
      {
        english: "EUDR Due Diligence",
        vietnamese: "Nghiêm túc EUDR",
      },
      {
        english: "Cacao Buying Station",
        vietnamese: "Trạm Mua Cacao",
      },
      {
        english: "Cacao Fermentation",
        vietnamese: "Lên men Cacao",
      },
      {
        english: "Cacao Buying Station Production",
        vietnamese: "Sản xuất Trạm Mua Cacao",
      },
      //Cacao Purchase Order
      {
        english: "Cacao Purchase Order",
        vietnamese: "Đơn Đặt Hàng Cacao",
      },
      // Cacao Buying Station Report
      {
        english: "Cacao Buying Station Report",
        vietnamese: "Báo Cáo Trạm Mua Cacao",
      },
      // Cacao Warehouse
      {
        english: "Cacao Warehouse",
        vietnamese: "Kho Cacao",
      },
      {
        english:'Cacao InBound Warehouse',
        vietnamese:'Kho Cacao Nhập',
      },
      {
        english:'Cacao OutBound Warehouse',
        vietnamese:'Kho Cacao Xuất',
      },
      //Cacao Warehouse Report
      {
        english: "Cacao Warehouse Report",
        vietnamese: "Báo Cáo Kho Cacao",
      },
      // Forest Report
      {
        english: "Forest Report",
        vietnamese: "Báo Cáo Rừng",
      },
      {
        english: "Cacao Dry Milling",
        vietnamese: "Xay khô Cacao",
      },
      {
        english: "Cacao Dry Milling Production Chart",
        vietnamese: "Biểu đồ Sản xuất Xay khô Cacao",
      },
      {
        english: "Cacao Dry Milling Register Dry",
        vietnamese: "Đăng ký Xay khô Cacao",
      },
      {
        english: "Crop Health Report",
        vietnamese: "Báo cáo Sức khỏe Cây trồng",
      },
      {
        english: "Satellite Report",
        vietnamese: "Báo cáo vệ tinh",
      },
      {
        english: "Weather Analysis Report",
        vietnamese: "Báo cáo Phân tích Thời tiết",
      },
      {
        english: "Batch Management",
        vietnamese: "Quản lý Lô hàng",
      },
      {
        english: "Final Product",
        vietnamese: "Sản phẩm Cuối cùng",
      },
      {
        english: "Production Chart",
        vietnamese: "Biểu đồ Sản xuất",
      },
      {
        english: "Purchase Confirmations",
        vietnamese: "Xác nhận Mua hàng",
      },
      {
        english: 'Weather Analysis',
        vietnamese: 'Phân tích Thời tiết',
      },
      {
        english: 'Farm Activities',
        vietnamese: 'Hoạt động Nông trại',
      },
      {
        english: 'Avocado Trees',
        vietnamese: 'Cây Bơ',
      }

    ];
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
          id: global_trans.map((item) => item.id),
        });
      }
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkInsert("global_translation_metadata", [item]);
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
