"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      // Volume-Area
      {
        english: "Volume-Area",
        spanish: "Volumen-Área",
        french: "Volume-Aire",
        dutch: "Volume-Gebied",
        vietnamese: "Thể Tích-Khu Vực",
        portugese: "Volume-Área",
        swahili: "Kiasi-Eneo",
        indonesian: "Volume-Area",
      },
      // Volume Area
      {
        english: "Volume Area",
        spanish: "Área de Volumen",
        french: "Zone de volume",
        dutch: "Volumegebied",
        vietnamese: "Khu Vực Thể Tích",
        portugese: "Área de Volume",
        swahili: "Eneo la Kiasi",
        indonesian: "Area Volume",
      },
      // Perimeter
      {
        english: "Perimeter",
        spanish: "Perímetro",
        french: "Périmètre",
        dutch: "Omtrek",
        vietnamese: "Chu Vi",
        portugese: "Perímetro",
        swahili: "Mzingo",
        indonesian: "Keliling",
      },

      // Irrigation Area
      {
        english: "Irrigation Area",
        spanish: "Área de Riego",
        french: "Zone d'irrigation",
        dutch: "Irrigatiegebied",
        vietnamese: "Khu Vực Tưới Tiêu",
        portugese: "Área de Irrigação",
        swahili: "Eneo la Umwagiliaji",
        indonesian: "Daerah Irigasi",
      },
      // Irrigation Volume
      {
        english: "Irrigation Volume",
        spanish: "Volumen de Riego",
        french: "Volume d'irrigation",
        dutch: "Irrigatievolume",
        vietnamese: "Thể Tích Tưới Tiêu",
        portugese: "Volume de Irrigação",
        swahili: "Kiasi cha Umwagiliaji",
        indonesian: "Volume Irigasi",
      },
      // Storage Area
      {
        english: "Storage Area",
        spanish: "Área de Almacenamiento",
        french: "Zone de stockage",
        dutch: "Opslagruimte",
        vietnamese: "Khu Vực Lưu Trữ",
        portugese: "Área de Armazenamento",
        swahili: "Eneo la Uhifadhi",
        indonesian: "Area Penyimpanan",
      },
      // Storage Yield
      {
        english: "Storage Yield",
        spanish: "Rendimiento de Almacenamiento",
        french: "Rendement de stockage",
        dutch: "Opbrengst van opslag",
        vietnamese: "Lợi Nhuận Lưu Trữ",
        portugese: "Rendimento de Armazenamento",
        swahili: "Mavuno ya Uhifadhi",
        indonesian: "Hasil Penyimpanan",
      },
      // Harvesting Fresh Yield
      {
        english: "Harvesting Fresh Yield",
        spanish: "Rendimiento Fresco de Cosecha",
        french: "Rendement frais de la récolte",
        dutch: "Oogst Verse Opbrengst",
        vietnamese: "Lợi Nhuận Tươi",
        portugese: "Rendimento Fresco da Colheita",
        swahili: "Mavuno safi ya Kuvuna",
        indonesian: "Hasil Panen Segar",
      },
      // Harvesting Yield Household Consumption
      {
        english: "Harvesting Yield Household Consumption",
        spanish: "Rendimiento de Cosecha para Consumo Doméstico",
        french: "Rendement de la récolte pour la consommation des ménages",
        dutch: "Opbrengst van de oogst voor huishoudelijk gebruik",
        vietnamese: "Lợi Nhuận Tươi cho Tiêu Thụ Hộ Gia Đình",
        portugese: "Rendimento da Colheita para Consumo Doméstico",
        swahili: "Mavuno ya Kaya ya Kaya",
        indonesian: "Hasil Panen untuk Konsumsi Rumah Tangga",
      },
      // Herbicide Dose Rate
      {
        english: "Herbicide Dose Rate",
        spanish: "Tasa de Dosis de Herbicida",
        french: "Taux de dose d'herbicide",
        dutch: "Herbiciden Dosis Snelheid",
        vietnamese: "Liều Lượng Thuốc Diệt Cỏ",
        portugese: "Taxa de Dose de Herbicida",
        swahili: "Kiwango cha Dawa ya Herbicide",
        indonesian: "Tingkat Dosis Herbisida",
      },
      // Energy Consumption
      {
        english: "Energy Consumption",
        spanish: "Consumo de Energía",
        french: "Consommation d'énergie",
        dutch: "Energieverbruik",
        vietnamese: "Tiêu Thụ Năng Lượng",
        portugese: "Consumo de Energia",
        swahili: "Matumizi ya Nishati",
        indonesian: "Konsumsi Energi",
      },
      // Calcium Unit
      {
        english: "Calcium Unit",
        spanish: "Unidad de Calcio",
        french: "Unité de calcium",
        dutch: "Calcium Eenheid",
        vietnamese: "Đơn Vị Canxi",
        portugese: "Unidade de Cálcio",
        swahili: "Kitengo cha Calcium",
        indonesian: "Satuan Kalsium",
      },
      // Nitrogen Unit
      {
        english: "Nitrogen Unit",
        spanish: "Unidad de Nitrógeno",
        french: "Unité d'azote",
        dutch: "Stikstof Eenheid",
        vietnamese: "Đơn Vị Nitơ",
        portugese: "Unidade de Nitrogênio",
        swahili: "Kitengo cha Nitrogen",
        indonesian: "Satuan Nitrogen",
      },

      // Zinc Unit
      {
        english: "Zinc Unit",
        spanish: "Unidad de Zinc",
        french: "Unité de zinc",
        dutch: "Zink Eenheid",
        vietnamese: "Đơn Vị Kẽm",
        portugese: "Unidade de Zinco",
        swahili: "Kitengo cha Zinki",
        indonesian: "Satuan Seng",
      },

      // Boron Unit
      {
        english: "Boron Unit",
        spanish: "Unidad de Boro",
        french: "Unité de bore",
        dutch: "Boor Eenheid",
        vietnamese: "Đơn Vị Boron",
        portugese: "Unidade de Boro",
        swahili: "Kitengo cha Boroni",
        indonesian: "Satuan Boron",
      },

      //Soil Organic Carbon Unit
      {
        english: "Soil Organic Carbon Unit",
        spanish: "Unidad de Carbono Orgánico del Suelo",
        french: "Unité de carbone organique du sol",
        dutch: "Eenheid organische koolstof in de bodem",
        vietnamese: "Đơn Vị Carbon Hữu Cơ Đất",
        portugese: "Unidade de Carbono Orgânico do Solo",
        swahili: "Kitengo cha Kaboni ya Kikaboni",
        indonesian: "Satuan Karbon Organik Tanah",
      },
      // Weight,
      {
        english: "Weight",
        spanish: "Peso",
        french: "Poids",
        dutch: "Gewicht",
        vietnamese: "Trọng Lượng",
        portugese: "Peso",
        swahili: "Uzito",
        indonesian: "Berat",
      },
      // Length
      {
        english: "Length",
        spanish: "Longitud",
        french: "Longueur",
        dutch: "Lengte",
        vietnamese: "Chiều dài",
        portugese: "Comprimento",
        swahili: "Urefu",
        indonesian: "Panjang",
      },
      // Volume Area
      {
        english: "Volume Area",
        spanish: "Área de Volumen",
        french: "Zone de Volume",
        dutch: "Volumegebied",
        vietnamese: "Diện tích thể tích",
        portugese: "Área de Volume",
        swahili: "Eneo la Kiasi",
        indonesian: "Luas Volume",
      },
      // Weight Area
      {
        english: "Weight Area",
        spanish: "Área de Peso",
        french: "Zone de Poids",
        dutch: "Gewichtsgebied",
        vietnamese: "Diện tích trọng lượng",
        portugese: "Área de Peso",
        swahili: "Eneo la Uzito",
        indonesian: "Luas Berat",
      },
      // Area
      {
        english: "Area",
        spanish: "Área",
        french: "Zone",
        dutch: "Gebied",
        vietnamese: "Khu vực",
        portugese: "Área",
        swahili: "Eneo",
        indonesian: "Area",
      },
      // Herbicide Used
      {
        english: "Herbicide Used",
        spanish: "Herbicida Usado",
        french: "Herbicide Utilisé",
        dutch: "Gebruikte Herbicide",
        vietnamese: "Thuốc diệt cỏ đã sử dụng",
        portugese: "Herbicida Usado",
        swahili: "Dawa ya Magugu Iliyotumika",
        indonesian: "Herbisida yang Digunakan",
      },
      // Thickness
      {
        english: "Thickness",
        spanish: "Grosor",
        french: "Épaisseur",
        dutch: "Dikte",
        vietnamese: "Độ dày",
        portugese: "Espessura",
        swahili: "Unene",
        indonesian: "Ketebalan",
      },
      // Potassium Unit
      {
        english: "Potassium Unit",
        spanish: "Unidad de Potasio",
        french: "Unité de Potassium",
        dutch: "Kalium Eenheid",
        vietnamese: "Đơn vị Kali",
        portugese: "Unidade de Potássio",
        swahili: "Kitengo cha Potasiamu",
        indonesian: "Satuan Kalium",
      },
      // Liming Rate Weight Area Unit
      {
        english: "Liming Rate Weight Area Unit",
        spanish: "Unidad de Peso de Tasa de Encala",
        french: "Unité de Poids de Taux de Chaulage",
        dutch: "Kalkdosering Gewichtsgebiedseenheid",
        vietnamese: "Đơn vị diện tích trọng lượng tỷ lệ vôi",
        portugese: "Unidade de Peso da Taxa de Calagem",
        swahili: "Kitengo cha Eneo la Uzito wa Kiwango cha Kuweka Chokaa",
        indonesian: "Satuan Luas Berat Tingkat Pengapuran",
      },
      // Total Lime Weight Unit
      {
        english: "Total Lime Weight Unit",
        spanish: "Unidad de Peso Total de Cal",
        french: "Unité de Poids Total de Chaux",
        dutch: "Totale Kalkgewichtseenheid",
        vietnamese: "Đơn vị trọng lượng vôi tổng cộng",
        portugese: "Unidade de Peso Total de Cal",
        swahili: "Kitengo cha Uzito wa Chokaa Jumla",
        indonesian: "Satuan Berat Total Kapur",
      },
      // Synthetic Fertilizer Application Rate Weight Area Unit
      {
        english: "Synthetic Fertilizer Application Rate Weight Area Unit",
        spanish: "Unidad de Peso de Tasa de Aplicación de Fertilizante Sintético",
        french: "Unité de Poids de Taux d'Application d'Engrais Synthétique",
        dutch: "Gewichtsgebiedseenheid van Toepassingssnelheid van Synthetische Meststof",
        vietnamese: "Đơn vị diện tích trọng lượng tỷ lệ bón phân tổng hợp",
        portugese: "Unidade de Peso da Taxa de Aplicação de Fertilizante Sintético",
        swahili: "Kitengo cha Eneo la Uzito wa Kiwango cha Matumizi ya Mbolea ya Kiwango",
        indonesian: "Satuan Luas Berat Tingkat Aplikasi Pupuk Sintetis",
      },
      // Total Synthetic Fertilizer Used Weight Unit
      {
        english: "Total Synthetic Fertilizer Used Weight Unit",
        spanish: "Unidad de Peso Total de Fertilizante Sintético Usado",
        french: "Unité de Poids Total d'Engrais Synthétique Utilisé",
        dutch: "Totale Gebruikte Synthetische Meststofgewichtseenheid",
        vietnamese: "Đơn vị trọng lượng phân bón tổng hợp đã sử dụng",
        portugese: "Unidade de Peso Total de Fertilizante Sintético Usado",
        swahili: "Kitengo cha Uzito wa Mbolea ya Kiwango Iliyotumika",
        indonesian: "Satuan Berat Total Pupuk Sintetis yang Digunakan",
      },
      // Organic Input Application Rate Weight Area Unit
      {
        english: "Organic Input Application Rate Weight Area Unit",
        spanish: "Unidad de Peso de Tasa de Aplicación de Insumo Orgánico",
        french: "Unité de Poids de Taux d'Application d'Intrant Organique",
        dutch: "Gewichtsgebiedseenheid van Toepassingssnelheid van Organische Input",
        vietnamese: "Đơn vị diện tích trọng lượng tỷ lệ bón phân hữu cơ",
        portugese: "Unidade de Peso da Taxa de Aplicação de Insumo Orgânico",
        swahili: "Kitengo cha Eneo la Uzito wa Kiwango cha Matumizi ya Pembejeo za Kikaboni",
        indonesian: "Satuan Luas Berat Tingkat Aplikasi Input Organik",
      },
      // Total Organic Input Applied Weight Unit
      {
        english: "Total Organic Input Applied Weight Unit",
        spanish: "Unidad de Peso Total de Insumo Orgánico Aplicado",
        french: "Unité de Poids Total d'Intrant Organique Appliqué",
        dutch: "Totale Toegepaste Organische Inputgewichtseenheid",
        vietnamese: "Đơn vị trọng lượng phân bón hữu cơ đã áp dụng",
        portugese: "Unidade de Peso Total de Insumo Orgânico Aplicado",
        swahili: "Kitengo cha Uzito wa Pembejeo za Kikaboni Zilizotumika",
        indonesian: "Satuan Berat Total Input Organik yang Diterapkan",
      },
      // Phosphorus Unit
      {
        english: "Phosphorus Unit",
        spanish: "Unidad de Fósforo",
        french: "Unité de Phosphore",
        dutch: "Fosfor Eenheid",
        vietnamese: "Đơn vị Phốt pho",
        portugese: "Unidade de Fósforo",
        swahili: "Kitengo cha Fosforasi",
        indonesian: "Satuan Fosfor",
      },
      // Bulk Density
      {
        english: "Bulk Density",
        spanish: "Densidad a Granel",
        french: "Densité en Vrac",
        dutch: "Bulkdichtheid",
        vietnamese: "Mật độ khối",
        portugese: "Densidade a Granel",
        swahili: "Msongamano wa Wingi",
        indonesian: "Kepadatan Massal",
      },
      // Sulphur Unit
      {
        english: "Sulphur Unit",
        spanish: "Unidad de Azufre",
        french: "Unité de Soufre",
        dutch: "Zwavel Eenheid",
        vietnamese: "Đơn vị Lưu huỳnh",
        portugese: "Unidade de Enxofre",
        swahili: "Kitengo cha Kiberiti",
        indonesian: "Satuan Belerang",
      },
      // Synthetic Fertilizer Nitrogen Unit
      {
        english: "Synthetic Fertilizer Nitrogen Unit",
        spanish: "Unidad de Nitrógeno de Fertilizante Sintético",
        french: "Unité d'Azote d'Engrais Synthétique",
        dutch: "Stikstof Eenheid van Synthetische Meststof",
        vietnamese: "Đơn vị Nitơ của phân bón tổng hợp",
        portugese: "Unidade de Nitrogênio de Fertilizante Sintético",
        swahili: "Kitengo cha Nitrojeni ya Mbolea ya Kiwango",
        indonesian: "Satuan Nitrogen Pupuk Sintetis",
      },
      // Synthetic Fertilizer Phosphorous Unit
      {
        english: "Synthetic Fertilizer Phosphorous Unit",
        spanish: "Unidad de Fósforo de Fertilizante Sintético",
        french: "Unité de Phosphore d'Engrais Synthétique",
        dutch: "Fosfor Eenheid van Synthetische Meststof",
        vietnamese: "Đơn vị Phốt pho của phân bón tổng hợp",
        portugese: "Unidade de Fósforo de Fertilizante Sintético",
        swahili: "Kitengo cha Fosforasi ya Mbolea ya Kiwango",
        indonesian: "Satuan Fosfor Pupuk Sintetis",
      },
      // Synthetic Fertilizer Potassium Unit
      {
        english: "Synthetic Fertilizer Potassium Unit",
        spanish: "Unidad de Potasio de Fertilizante Sintético",
        french: "Unité de Potassium d'Engrais Synthétique",
        dutch: "Kalium Eenheid van Synthetische Meststof",
        vietnamese: "Đơn vị Kali của phân bón tổng hợp",
        portugese: "Unidade de Potássio de Fertilizante Sintético",
        swahili: "Kitengo cha Potasiamu ya Mbolea ya Kiwango",
        indonesian: "Satuan Kalium Pupuk Sintetis",
      },
      // Density
      {
        english: "Density",
        spanish: "Densidad",
        french: "Densité",
        dutch: "Dichtheid",
        vietnamese: "Mật độ",
        portugese: "Densidade",
        swahili: "Msongamano",
        indonesian: "Kepadatan",
      },
      // Coffee Parchment Density Unit
      {
        english: "Coffee Parchment Density Unit",
        spanish: "Unidad de Densidad de Pergamino de Café",
        french: "Unité de Densité de Parchment de Café",
        dutch: "Koffie Pergament Dichtheidseenheid",
        vietnamese: "Đơn vị mật độ giấy da cà phê",
        portugese: "Unidade de Densidade de Pergaminho de Café",
        swahili: "Kitengo cha Msongamano wa Karatasi ya Kahawa",
        indonesian: "Satuan Kepadatan Parchment Kopi",
      },
      // Magnesium Unit
      {
        english: "Magnesium Unit",
        spanish: "Unidad de Magnesio",
        french: "Unité de Magnésium",
        dutch: "Magnesium Eenheid",
        vietnamese: "Đơn vị Magiê",
        portugese: "Unidade de Magnésio",
        swahili: "Kitengo cha Magnesiamu",
        indonesian: "Satuan Magnesium",
      },
      // Iron Unit
      {
        english: "Iron Unit",
        spanish: "Unidad de Hierro",
        french: "Unité de Fer",
        dutch: "Ijzer Eenheid",
        vietnamese: "Đơn vị Sắt",
        portugese: "Unidade de Ferro",
        swahili: "Kitengo cha Chuma",
        indonesian: "Satuan Besi",
      },
    ];
    for (const row of data) {
      let sql =
        "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global_trans = await queryInterface.sequelize.query(sql,{
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
