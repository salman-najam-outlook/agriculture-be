"use strict";

const moment = require("moment");

const languageObjects = [
  {
    "english": "Your GeoJson file is ready to be downloaded.",
    "portugese": "Seu arquivo GeoJson está pronto para ser baixado.",
    "spanish": "Su archivo GeoJson está listo para ser descargado.",
    "indonesian": "File GeoJson Anda siap diunduh.",
    "italian": "Il tuo file GeoJson è pronto per essere scaricato.",
    "dutch": "Uw GeoJson-bestand is klaar om te worden gedownload.",
    "swahili": "Faili yako ya GeoJson iko tayari kupakuliwa."
  },
  {
    "english": "Your file is ready!",
    "portugese": "Seu arquivo está pronto!",
    "spanish": "¡Tu archivo está listo!",
    "indonesian": "File Anda sudah siap!",
    "italian": "Il tuo file è pronto!",
    "dutch": "Je bestand is klaar!",
    "swahili": "Faili yako iko tayari!"
  },
  {
    "english": "PDF report generation failed.",
    "portugese": "Falha na geração do relatório PDF.",
    "spanish": "Error al generar el informe PDF.",
    "indonesian": "Pembuatan laporan PDF gagal.",
    "italian": "La generazione del report PDF non è riuscita.",
    "dutch": "Het genereren van PDF-rapporten is mislukt.",
    "swahili": "Uzalishaji wa ripoti ya PDF umeshindwa."
  },
  {
    "english": "Survey ID is required",
    "portugese": "O ID da pesquisa é obrigatório",
    "spanish": "Se requiere identificación de encuesta",
    "indonesian": "ID Survei diperlukan",
    "italian": "L'ID sondaggio è obbligatorio",
    "dutch": "Enquête-ID is vereist",
    "swahili": "Kitambulisho cha uchunguzi kinahitajika"
  },
  {
    "english": "data is required",
    "portugese": "dados são necessários",
    "spanish": "se requieren datos",
    "indonesian": "data diperlukan",
    "italian": "i dati sono richiesti",
    "dutch": "gegevens zijn vereist",
    "swahili": "data inahitajika"
  },
  {
    "english": "Survey not found",
    "portugese": "Pesquisa não encontrada",
    "spanish": "Encuesta no encontrada",
    "indonesian": "Survei tidak ditemukan",
    "italian": "Sondaggio non trovato",
    "dutch": "Enquête niet gevonden",
    "swahili": "Utafiti haujapatikana"
  },
  {
    "english": "At least one question is required for published survey",
    "portugese": "É necessária pelo menos uma pergunta para pesquisas publicadas",
    "spanish": "Se requiere al menos una pregunta para la encuesta publicada.",
    "indonesian": "Setidaknya satu pertanyaan diperlukan untuk survei yang dipublikasikan",
    "italian": "Per il sondaggio pubblicato è richiesta almeno una domanda",
    "dutch": "Voor een gepubliceerde enquête is ten minste één vraag vereist",
    "swahili": "Angalau swali moja linahitajika kwa utafiti uliochapishwa"
  },
  {
    "english": "User Entity id is required",
    "portugese": "O ID da entidade do usuário é obrigatório",
    "spanish": "Se requiere identificación de entidad de usuario",
    "indonesian": "ID Entitas Pengguna wajib diisi",
    "italian": "L'ID entità utente è obbligatorio",
    "dutch": "Gebruikersentiteits-ID is vereist",
    "swahili": "Kitambulisho cha Huluki ya Mtumiaji kinahitajika"
  },
  {
    "english": "Question ID is required",
    "portugese": "O ID da pergunta é obrigatório",
    "spanish": "Se requiere ID de pregunta",
    "indonesian": "ID pertanyaan wajib diisi",
    "italian": "L'ID della domanda è obbligatorio",
    "dutch": "Vraag-ID is vereist",
    "swahili": "Kitambulisho cha Swali kinahitajika"
  },
  {
    "english": "Survey response download successfully queued",
    "portugese": "Download da resposta da pesquisa enfileirado com sucesso",
    "spanish": "La descarga de la respuesta de la encuesta se puso en cola correctamente",
    "indonesian": "Unduhan respons survei berhasil dimasukkan dalam antrean",
    "italian": "Download della risposta al sondaggio messo in coda correttamente",
    "dutch": "Downloaden van onderzoeksantwoorden succesvol in wachtrij geplaatst",
    "swahili": "Upakuaji wa majibu ya utafiti umefaulu kwenye foleni"
  },
  {
    "english": "Survey not found",
    "portugese": "Pesquisa não encontrada",
    "spanish": "Encuesta no encontrada",
    "indonesian": "Survei tidak ditemukan",
    "italian": "Sondaggio non trovato",
    "dutch": "Enquête niet gevonden",
    "swahili": "Utafiti haujapatikana"
  },
  {
    "english": "Cannot publish empty survey",
    "portugese": "Não é possível publicar uma pesquisa vazia",
    "spanish": "No se puede publicar una encuesta vacía",
    "indonesian": "Tidak dapat mempublikasikan survei kosong",
    "italian": "Impossibile pubblicare un sondaggio vuoto",
    "dutch": "Kan lege enquête niet publiceren",
    "swahili": "Haiwezi kuchapisha utafiti tupu"
  },
  {
    "english": "Survey updated successfully",
    "portugese": "Pesquisa atualizada com sucesso",
    "spanish": "Encuesta actualizada exitosamente",
    "indonesian": "Survei berhasil diperbarui",
    "italian": "Sondaggio aggiornato con successo",
    "dutch": "Enquête is succesvol bijgewerkt",
    "swahili": "Utafiti umesasishwa"
  },
  {
    "english": "High production Alert! Farm",
    "portugese": "Alerta de alta produção! Fazenda",
    "spanish": "¡Alerta de alta producción! Granja",
    "indonesian": "Peringatan produksi tinggi! Peternakan",
    "italian": "Avviso di alta produzione! Azienda agricola",
    "dutch": "Hoge productie Waarschuwing! Boerderij",
    "swahili": "Tahadhari ya uzalishaji wa juu! Shamba"
  },
  {
    "english": "Farmer:",
    "portugese": "Agricultor:",
    "spanish": "Agricultor:",
    "indonesian": "Petani:",
    "italian": "Contadino:",
    "dutch": "Boer:",
    "swahili": "Mkulima:"
  },
  {
    "english": "Crop: Cacao, Total reported:",
    "portugese": "Safra: Cacau, Total reportado:",
    "spanish": "Cultivo: Cacao, Total reportado:",
    "indonesian": "Tanaman: Kakao, Total yang dilaporkan:",
    "italian": "Coltura: Cacao, Totale riportato:",
    "dutch": "Gewas: Cacao, Totaal gerapporteerd:",
    "swahili": "Mazao: Kakao, Jumla imeripotiwa:"
  },
  {
    "english": "Max allowed:",
    "portugese": "Máximo permitido:",
    "spanish": "Máximo permitido:",
    "indonesian": "Maksimum yang diperbolehkan:",
    "italian": "Massimo consentito:",
    "dutch": "Maximaal toegestaan:",
    "swahili": "Upeo unaoruhusiwa:"
  },
  {
    "english": "High production Alert! Farmer:",
    "portugese": "Alerta de alta produção! Agricultor:",
    "spanish": "¡Alerta de alta producción! Agricultor:",
    "indonesian": "Peringatan produksi tinggi! Petani:",
    "italian": "Avviso di alta produzione! Contadino:",
    "dutch": "Hoge productie Waarschuwing! Boer:",
    "swahili": "Tahadhari ya uzalishaji wa juu! Mkulima:"
  },
  {
    "english": "High production Alert!",
    "portugese": "Alerta de alta produção!",
    "spanish": "¡Alerta de alta producción!",
    "indonesian": "Peringatan produksi tinggi!",
    "italian": "Avviso di alta produzione!",
    "dutch": "Hoge productie Waarschuwing!",
    "swahili": "Tahadhari ya uzalishaji wa juu!"
  },
  {
    "english": "months ago",
    "portugese": "meses antes",
    "spanish": "Hace meses",
    "indonesian": "bulan yang lalu",
    "italian": "mesi fa",
    "dutch": "maanden geleden",
    "swahili": "miezi iliyopita"
  },
  {
    "english": "days ago",
    "portugese": "dias atrás",
    "spanish": "hace dias",
    "indonesian": "beberapa hari yang lalu",
    "italian": "giorni fa",
    "dutch": "dagen geleden",
    "swahili": "siku zilizopita"
  },
  {
    "english": "year ago",
    "portugese": "ano atrás",
    "spanish": "hace un año",
    "indonesian": "tahun yang lalu",
    "italian": "anno fa",
    "dutch": "jaar geleden",
    "swahili": "mwaka uliopita"
  },
  {
    "english": "Farm data has been successfully uploaded. Tap here to review.",
    "portugese": "Os dados da fazenda foram carregados com sucesso. Toque aqui para revisar.",
    "spanish": "Los datos de la granja se han cargado correctamente. Toque aquí para revisar.",
    "indonesian": "Data peternakan telah berhasil diunggah. Ketuk di sini untuk meninjau.",
    "italian": "I dati dell'azienda agricola sono stati caricati con successo. Tocca qui per rivedere.",
    "dutch": "Bedrijfsgegevens zijn succesvol geüpload. Tik hier om te beoordelen.",
    "swahili": "Data ya shamba imepakiwa kwa ufanisi. Gonga hapa ili ukague."
  },
  {
    "english": "Your GeoJson file have been downloaded successfully.",
    "portugese": "Seu arquivo GeoJson foi baixado com sucesso.",
    "spanish": "Su archivo GeoJson se ha descargado correctamente.",
    "indonesian": "File GeoJson Anda telah berhasil diunduh.",
    "italian": "Il tuo file GeoJson è stato scaricato correttamente.",
    "dutch": "Uw GeoJson-bestand is succesvol gedownload.",
    "swahili": "Bedrijfsgegevens zijn succesvol geüpload. Tik hier om te beoordelen."
  },
  {
    "english": "Deforestation report generate. Tap here to review.",
    "portugese": "Relatório de desmatamento gerado. Toque aqui para revisar.",
    "spanish": "Informe de deforestación generado. Toque aquí para revisar.",
    "indonesian": "Laporan deforestasi dihasilkan. Ketuk di sini untuk meninjau.",
    "italian": "Genera rapporto deforestazione. Tocca qui per rivedere.",
    "dutch": "Ontbossingsrapport genereren. Tik hier om te beoordelen.",
    "swahili": "Ripoti ya ukataji miti imeundwa. Gonga hapa ili ukague."
  },
  {
    "english": "Deforestation report generated. Tap here to review.",
    "portugese": "Relatório de desmatamento gerado. Toque aqui para revisar.",
    "spanish": "Informe de deforestación generado. Toque aquí para revisar.",
    "indonesian": "Laporan deforestasi dihasilkan. Ketuk di sini untuk meninjau.",
    "italian": "Genera rapporto deforestazione. Tocca qui per rivedere.",
    "dutch": "Ontbossingsrapport genereren. Tik hier om te beoordelen.",
    "swahili": "Ripoti ya ukataji miti imeundwa. Gonga hapa ili ukague."
  }

]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const row of languageObjects) {
        let sql =
          "SELECT * FROM global_translation_metadata WHERE english = :english";
        const global_trans = await queryInterface.sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { english: row.english },
        });

        // update case
        if (global_trans && global_trans.length > 0) {
          let item = {};
          for (let key in row) {
            const language = key.toLowerCase().trim();
            item[language] = row[key];
          }
          await queryInterface.bulkUpdate("global_translation_metadata", item, {
            id: global_trans?.map(item => item.id)
          });
        }
        // insert case
        else {
          let item = {};
          for (let key in row) {
            const language = key.toLowerCase().trim();
            item[language] = row[key] != null ? row[key] : ''; // Default to an empty string
          }
          await queryInterface.bulkInsert("global_translation_metadata", [item]);
        }
      }
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    for (const obj of languageObjects) {
      await queryInterface.bulkDelete(
        "global_translation_metadata",
        { english: obj.english },
        {},
        {}
      );
    }
  },
};