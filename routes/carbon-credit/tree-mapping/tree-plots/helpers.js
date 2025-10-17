const db = require(rootPath + '/models');
const { Op } = require('sequelize');

/**
 * Generates a unique plot number based on the country name.
 * Format: [First letter of country][Two alphabets][Three digits]
 * Example: MAD022 for Mexico
 */
async function generatePlotNumber(country) {
    try {
        if (!country || typeof country !== 'string' || country.trim() === '' || country === 'Unknown') {
            throw new Error('Country is required to generate a valid plot number.');
        }

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const countryFirstLetter = country[0].toUpperCase();

        // Fetch ALL existing plot numbers with this prefix (including soft-deleted plots)
        const existingPlots = await db.TreeMappingPlot.findAll({
            attributes: ['plot_no'],
            where: {
                plot_no: {
                    [Op.like]: `${countryFirstLetter}%`
                }
            },
            paranoid: false,
            raw: true
        });

        const existingPlotSet = new Set(existingPlots.map(p => p.plot_no));

        for (let i = 0; i < alphabet.length; i++) {
            for (let j = 0; j < alphabet.length; j++) {
                const firstAlpha = alphabet[i];
                const secondAlpha = alphabet[j];
                for (let num = 1; num <= 999; num++) {
                    const numStr = String(num).padStart(3, '0');
                    const plotNo = `${countryFirstLetter}${firstAlpha}${secondAlpha}${numStr}`;
                    
                    if (!existingPlotSet.has(plotNo)) {
                        return plotNo;
                    }
                }
            }
        }

        throw new Error(`Unable to generate a new plot number for country code '${countryFirstLetter}'. All possible combinations have been used. Please contact system support.`);
    } catch (error) {
        console.error('Error generating plot number:', error.message);
        throw error;
    }
}

module.exports = {
    generatePlotNumber
};
