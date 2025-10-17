const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const XLSX = require('xlsx');
const pdf = require('html-pdf');
const moment = require('moment');
const db = require(rootPath + "/models");
const { Op, literal } = require("sequelize");
const html_to_pdf = require('html-pdf-node');

const calculateYieldData = (data, userUnit, byTimeStartDate, byTimeEndDate, comparisonTimeStartDate, comparisonTimeEndDate) => {

    const startDate = new Date(byTimeStartDate);
    const endDate = new Date(byTimeEndDate);
    const startDate2 = new Date(comparisonTimeStartDate);
    const endDate2 = new Date(comparisonTimeEndDate);
    const speciesData = groupAndSumBySpecies(data, userUnit, startDate, endDate, startDate2, endDate2);
    const varietyData = groupAndSumByVariety(data, userUnit, startDate, endDate, startDate2, endDate2);
    return { speciesData, varietyData }
}


function weightConversion(value, weightUnit, targetUnit) {
    // Define conversion factors in a single object
    const conversionFactors = {
        gm: {
            kg: 0.001,
            lb: 0.00220462,
        },
        kg: {
            gm: 1000,
            lb: 2.20462262185,
        },
        lb: {
            gm: 453.592,
            kg: 0.45359237,
        },
    };

    // Check if units are valid
    if (!(weightUnit in conversionFactors) || !(targetUnit in conversionFactors[weightUnit])) {

        //return same value if no conversion factors
        return value;
    }

    // Perform the conversion
    return +(value * conversionFactors[weightUnit][targetUnit]).toFixed(2);
}

function groupAndSumBySpecies(data, userUnit, startDate, endDate, startDate2, endDate2) {
    const groupedData = [];

    data.forEach(farm => {
        const speciesMap = new Map();
        const targetYieldUnit = userUnit || 'kg'

        farm.data.forEach(entry => {
            const harvestingDate = new Date(entry.harvestingDate);

            if (harvestingDate >= startDate && harvestingDate <= endDate) {
                const speciesId = entry.coffeeSpecies.id;

                if (speciesMap.has(speciesId)) {
                    const currentYield = speciesMap.get(speciesId);
                    speciesMap.set(speciesId, currentYield + parseFloat(entry.coffeeYield));
                } else {
                    speciesMap.set(speciesId, parseFloat(entry.coffeeYield));
                }
            }

            // Additional check for the second date range
            else if (harvestingDate >= startDate2 && harvestingDate <= endDate2) {
                const speciesId = entry.coffeeSpecies.id;

                if (speciesMap.has(speciesId)) {
                    const currentYield = speciesMap.get(speciesId);
                    speciesMap.set(speciesId, currentYield + parseFloat(entry.coffeeYield));
                } else {
                    speciesMap.set(speciesId, parseFloat(entry.coffeeYield));
                }
            }
        });

        const speciesData = Array.from(speciesMap, ([speciesId, yield]) => ({
            coffeeSpecies: {
                id: speciesId,
                name: farm.data.find(entry => entry.coffeeSpecies.id === speciesId).coffeeSpecies.name
            },
            byTimeYield: yield,
            comparisonYield: yield  // Set comparisonYield to yield for now
        }));

        groupedData.push({
            farm_id: farm.farm_id,
            farmName: farm.farmName,
            data: speciesData
        });
    });

    return groupedData;
}

function groupAndSumByVariety(data, userUnit, startDate, endDate, startDate2, endDate2) {
    const groupedData = [];

    data.forEach(farm => {
        const varietyMap = new Map();
        const targetYieldUnit = userUnit || 'kg'

        farm.data.forEach(entry => {
            const harvestingDate = new Date(entry.harvestingDate);

            if (harvestingDate >= startDate && harvestingDate <= endDate) {
                const varietyId = entry.coffeeVariety.id;

                if (varietyMap.has(varietyId)) {
                    const currentYield = varietyMap.get(varietyId);
                    varietyMap.set(varietyId, currentYield + parseFloat(entry.coffeeYield));
                } else {
                    varietyMap.set(varietyId, parseFloat(entry.coffeeYield));
                }
            }

            else if (harvestingDate >= startDate2 && harvestingDate <= endDate2) {
                const varietyId = entry.coffeeVariety.id;

                if (varietyMap.has(varietyId)) {
                    const currentYield = varietyMap.get(varietyId);
                    varietyMap.set(varietyId, currentYield + parseFloat(entry.coffeeYield));
                } else {
                    varietyMap.set(varietyId, parseFloat(entry.coffeeYield));
                }
            }
        });

        const varietyData = Array.from(varietyMap, ([varietyId, yield]) => ({
            coffeeVariety: {
                id: varietyId,
                name: farm.data.find(entry => entry.coffeeVariety.id === varietyId).coffeeVariety.name
            },
            byTimeYield: yield,
            comparisonYield: yield  // Set comparisonYield to yield for now
        }));

        groupedData.push({
            farm_id: farm.farm_id,
            farmName: farm.farmName,
            data: varietyData
        });
    });

    return groupedData;
}
module.exports.generatePDFReport = async (response, varietyData, byTimeText, comparisonTimeText, byTimeStartDate,
    byTimeEndDate,
    comparisonTimeStartDate,
    comparisonTimeEndDate) => {

    return new Promise( async (resolve, reject) => {
        try {
        
            const today = moment().format('YYYY-MM-DD');
            let projectedHarvest = 0;
            let totalHarvestToDate = 0;
            let totalHarvested = 0;
            for(const row of response) {
                projectedHarvest += parseFloat(row.plantation.expected_yield);
                const harvestingDate = new Date(row.harvestingDate);
                if(harvestingDate < today) {
                    totalHarvestToDate += parseFloat(row.coffeeYield);
                }
                totalHarvested += parseFloat(row.coffeeYield);
            }
            projectedHarvest = projectedHarvest === 0 ? 1 : projectedHarvest;
            let harvestCompleted = parseInt(totalHarvested*100*100/projectedHarvest)/100;
    
            const availableVariety = [];
            for(const item of varietyData) {
                for( const row of item.data) {
                    const existVariety = availableVariety.find( x => x.id === row.coffeeVariety.id);
                    if(!existVariety) {
                        availableVariety.push({
                            id: row.coffeeVariety.id,
                            name: row.coffeeVariety.name
                        })
                    }
                }
            }
            const output = [];
            const numericOutput = [];
            let counter = 0;
            for(const row of varietyData) {
                output[counter] = [];
                numericOutput[counter] = [];
                output[counter].push(`
                    <div><b>${row.farmName}</b></div>
                    <div>${byTimeText}</div>
                    <div>${comparisonTimeText}</div>
                `)
                let byTimeYieldSum = 0;
                let comparisonTimeYieldSum = 0;
                for( const aVdata of availableVariety) {
                    const result = {
                        byTimeYield: 0,
                        comparisonYield: 0
                    }
                    for(const ee of row.data) {
                        if(aVdata.id === ee.coffeeVariety.id) {
                            result.byTimeYield += ee.byTimeYield;
                            result.comparisonYield += ee.comparisonYield;
                            byTimeYieldSum += ee.byTimeYield;
                            comparisonTimeYieldSum += ee.comparisonYield;
                        }
                    }
                    output[counter].push(`
                        <div>&nbsp;</div>
                        <div>${result.byTimeYield}</div>
                        <div>${result.comparisonYield}</div>
                    `)
                    numericOutput[counter].push([
                        result.byTimeYield,
                        result.comparisonYield
                    ])
                }
                output[counter].push(`<b>${byTimeYieldSum}</b>`);
                output[counter].push(`<b>${comparisonTimeYieldSum}</b>`);
                counter++;
            }
            output[counter] = [];
            output[counter].push(`
                <div><b>Total Harvest per Variety</b></div>
                <div><b>${byTimeText}</b></div>
                <div><b>${comparisonTimeText}</b></div>
            `)
            
            let byTimeSum = 0;
            let comparisonTimeSum = 0;
            for( let i = 0; i < availableVariety.length; i++) {
                let totalByTimeSum = 0;
                let totalComparisonTimeSum = 0;
                for (let j = 0; j < numericOutput.length; j++) {
                    totalByTimeSum += numericOutput[j][i][0];
                    totalComparisonTimeSum += numericOutput[j][i][1];
                }
                output[counter].push(`
                    <div>&nbsp;</div>
                    <div>${totalByTimeSum}</div>
                    <div>${totalComparisonTimeSum}</div>
                `)
                byTimeSum += totalByTimeSum;
                comparisonTimeSum += totalComparisonTimeSum;
            }
            output[counter].push(`<b>${byTimeSum}</b>`);
            output[counter].push(`<b>${comparisonTimeSum}</b>`);
    
            const data = {
                availableVariety: availableVariety,
                byTimeText: byTimeText,
                byTimeTextDate: formatPdfHeaderDates(byTimeStartDate, byTimeEndDate),
                comparisonTimeText: comparisonTimeText,
                year: moment().format('YYYY'),
                comparisonYear: moment(comparisonTimeStartDate).format('YYYY'),
                result: output,
                projectedHarvest: projectedHarvest,
                totalHarvestToDate: totalHarvestToDate,
                totalHarvested: totalHarvested,
                harvestCompleted: harvestCompleted,
            };
            // const filePathName = path.resolve(__dirname, 'htmltopdf.ejs');
            // const htmlString = fs.readFileSync(filePathName).toString();
            // let  options = { format: 'Letter' };
            // const ejsData = ejs.render(htmlString, data);
            // const filepath = path.resolve(__dirname, `../../../files/coffee-cherry-harvest.pdf`);
            // pdf.create(ejsData, options).toFile(filepath,(err, response) => {
            //     if (err) return console.log(err);
            //     resolve(filepath);
            // });
            
            resolve(data)
           
        } catch (err) {
            console.log("Error processing request: " + err);
            reject(err);
        }
    });
}

module.exports.generateExcelReport = async (csvOrXlsx, response, varietyData, byTimeText, comparisonTimeText, byTimeStartDate,
    byTimeEndDate,
    comparisonTimeStartDate,
    comparisonTimeEndDate) => {

    try {
        const workbook = XLSX.utils.book_new();
        const today = moment().format('YYYY-MM-DD');
        let projectedHarvest = 0;
        let totalHarvestToDate = 0;
        let totalHarvested = 0;
        for(const row of response) {
            projectedHarvest += parseFloat(row.plantation.expected_yield);
            const harvestingDate = new Date(row.harvestingDate);
            if(harvestingDate < today) {
                totalHarvestToDate += parseFloat(row.coffeeYield);
            }
            totalHarvested += parseFloat(row.coffeeYield);
        }
        projectedHarvest = projectedHarvest === 0 ? 1 : projectedHarvest;
        let harvestCompleted = parseInt(totalHarvested*100*100/projectedHarvest)/100;

        // const csvData = [];
        const excelData = [
            ['Coffee Cherry Harvest'],
            [byTimeText, formatPdfHeaderDates(byTimeStartDate, byTimeEndDate)],
            [comparisonTimeText, moment(comparisonTimeStartDate).format('YYYY')],
            ['Projected Harvest(lb)', projectedHarvest, 'Total Harvested To Date(lb)', totalHarvestToDate],
            ['Harvesting Completed', harvestCompleted, 'Total Harvested', totalHarvested],
            [moment(comparisonTimeStartDate).format('YYYY')],
          ];

        const tableTopHeader = ['Farms', 'Quantity Per Variety']; 
        const tableSubHeader = ['']; 
        let count = 0;
        const availableVariety = [];
        for(const item of varietyData) {
            for( const row of item.data) {
                const existVariety = availableVariety.find( x => x.id === row.coffeeVariety.id);
                if(!existVariety) {
                    availableVariety.push({
                        id: row.coffeeVariety.id,
                        name: row.coffeeVariety.name
                    })
                    tableSubHeader.push(row.coffeeVariety.name);
                    if(count > 0) {
                        tableTopHeader.push('');
                    }
                    count++;
                }
            }
        }
        tableSubHeader.push('');
        tableSubHeader.push('');
        tableTopHeader.push(`Total Collected ${byTimeText}`);
        tableTopHeader.push(`Total Harvest Per Farm`);
        excelData.push(tableTopHeader);
        excelData.push(tableSubHeader);

        const output = [];
        const numericOutput = [];
        let counter = 0;
        for(const row of varietyData) {
            output[counter] = [];
            numericOutput[counter] = [];
            output[counter].push([
                row.farmName,
                byTimeText,
                comparisonTimeText
            ])
            let byTimeYieldSum = 0;
            let comparisonTimeYieldSum = 0;
            for( const aVdata of availableVariety) {
                const result = {
                    byTimeYield: 0,
                    comparisonYield: 0
                }
                for(const ee of row.data) {
                    if(aVdata.id === ee.coffeeVariety.id) {
                        result.byTimeYield += ee.byTimeYield;
                        result.comparisonYield += ee.comparisonYield;
                        byTimeYieldSum += ee.byTimeYield;
                        comparisonTimeYieldSum += ee.comparisonYield;
                    }
                }
                output[counter].push([
                    '',
                    result.byTimeYield,
                    result.comparisonYield
                ])
                numericOutput[counter].push([
                    result.byTimeYield,
                    result.comparisonYield
                ])
            }
            output[counter].push([
                '',
                byTimeYieldSum,
                ''
            ]);
            output[counter].push([
                '',
                comparisonTimeYieldSum,
                ''
            ]);
            for(let a = 0; a < 3; a++) {
                let myrow = [];
                for( const aa of output[counter]) {
                    myrow.push(aa[a]);
                }
                excelData.push(myrow);
            }
            counter++;
        }
        output[counter] = [];
        output[counter].push([
            'Total Harvest per Variety',
            'byTimeText',
            'comparisonTimeText'
        ])
        
        let byTimeSum = 0;
        let comparisonTimeSum = 0;
        for( let i = 0; i < availableVariety.length; i++) {
            let totalByTimeSum = 0;
            let totalComparisonTimeSum = 0;
            for (let j = 0; j < numericOutput.length; j++) {
                totalByTimeSum += numericOutput[j][i][0];
                totalComparisonTimeSum += numericOutput[j][i][1];
            }
            output[counter].push([
                '',
                totalByTimeSum,
                totalComparisonTimeSum
            ])
            byTimeSum += totalByTimeSum;
            comparisonTimeSum += totalComparisonTimeSum;
        }
        output[counter].push([
            '',
            byTimeSum,
            ''
        ]);
        output[counter].push([
            '',
            comparisonTimeSum,
            ''
        ]);
        for(let a = 0; a < 3; a++) {
            let myrow = [];
            for( const aa of output[counter]) {
                myrow.push(aa[a]);
            }
            excelData.push(myrow);
        }
      
        const directoryPath = 'files';
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Coffee Cherry Harvest Report');
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 0 + count + 2 } },
            { s: { r: 6, c: 1 }, e: { r: 6, c: 0 + count } },
            { s: { r: 6, c: 0 }, e: { r: 7, c: 0 } },
            { s: { r: 6, c: 1 + count }, e: { r: 7, c: 1 + count } },
            { s: { r: 6, c: 2 + count }, e: { r: 7, c: 2 + count } },
        ];

        const columnWidth = 25;
        worksheet['!cols'] = []
        for(let i = 0; i < count + 3; i++) {
            worksheet['!cols'].push({ width: columnWidth, wrapText: true, align: 'center' });
        }

        const filePath = path.resolve(__dirname, `../../../files/coffee-cherry-harvest.xlsx`);
        XLSX.writeFile(workbook, filePath);

        if (csvOrXlsx === 'xlsx') {
            return filePath    
        }
        
        if (csvOrXlsx === 'csv') {
            const csvWorkbook = XLSX.readFile(filePath);
            const csvWorksheet = csvWorkbook.Sheets[csvWorkbook.SheetNames[0]];
            const csvData = XLSX.utils.sheet_to_csv(csvWorksheet);
            const csvFilePath = path.resolve(__dirname, `../../../files/coffee-cherry-harvest.csv`);
            require('fs').writeFileSync(csvFilePath, csvData, 'utf-8');
            return csvFilePath;
        }
        
       return;
    } catch (err) {
        console.log("Error processing request: " + err);
    }
}

function formatPdfHeaderDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = start.toLocaleString('default', { month: 'short' });
    const year = start.getFullYear();
  
    let result = `${startDay}-${endDay} ${month} ${year}`;
  
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      result = `${startDay}-${endDay} ${month} ${year}`;
    } else if (start.getMonth() !== end.getMonth() && start.getFullYear() === end.getFullYear()) {
      const endMonth = end.toLocaleString('default', { month: 'short' });
      result = `${startDay} ${month}-${endDay} ${endMonth} ${year}`;
    } else {
      const endMonth = end.toLocaleString('default', { month: 'short' });
      const endYear = end.getFullYear();
      result = `${startDay} ${month} ${year}-${endDay} ${endMonth} ${endYear}`;
    }
  
    return result;
}

module.exports.prepareHarvestData = async (req) => {
    let {
        page = 1,
        limit = 10,
        farm,
        coffeeVariety,
        coffeeSpecies,
        searchPhrase,
        order = "createdAt",
        orderType = "DESC",
        byTimeStartDate,
        byTimeEndDate,
        comparisonTimeStartDate,
        comparisonTimeEndDate,
        byTimeText,
        comparisonTimeText
    } = req.query;

    if(farm) {
        farm = farm.split('-');
    }
    if(coffeeVariety) {
        coffeeVariety = coffeeVariety.split('-');
    }
    if(coffeeSpecies) {
        coffeeSpecies = coffeeSpecies.split('-');
    }
    
    const userId = req.user.id;

    let where = {
        [Op.and]: [
            {
                userId: userId,
                isDeleted: false,
            },
        ],
    };
    let plantationWhere = {}, plantationVarietyWhere = {}
    let farmWhere = {};
    if (searchPhrase) {
        where
        plantationWhere.plantation_name = {
            [Op.like]: `%${searchPhrase}%`,
        };
    }

    if (farm && farm[0] != "All") {
        farmWhere.id = {
            [Op.in]: farm,
        };
    }
    if (coffeeSpecies && coffeeSpecies[0] != "All") {
        plantationWhere.coffee_species = {
            [Op.in]: coffeeSpecies,
        };
    }
    if (coffeeVariety && coffeeVariety[0] != "All") {
        plantationVarietyWhere.id = {
            [Op.in]: coffeeVariety,
        };
    }
    
    let query = {};
    
    query.order = [];
    if (!order) {
        query.order.push(["createdAt", "DESC"]);
    } else {
        query.order.push([order, orderType]);
    }
    query.where = where;
    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        query.offset = (page - 1) * limit;
        query.limit = limit;
    }
    const count = await db.CoffeeHarvesting.count({
        ...query,
      });
    const response = await db.CoffeeHarvesting.findAll({
        ...query,
        attributes: {
            exclude: [
                "isDeleted",
            ]
        },
        include: [
            {
                model: db.UnitsList,
                as: "yieldUnit",
                attributes: ["id", "name", "abbvr"],
            },
            {
                attributes: ["id", "plantation_name", "coffee_species", "expected_yield"],
                model: db.Plantations,
                as: "plantation",
                where: plantationWhere,
                include: [
                    {
                        model: db.user_farm,
                        as: "userFarms",
                        through: {
                            model: db.PlantationsUserFarmsMap,
                            attributes: ["id", "farm_id"],
                        },
                        attributes: ["farmName"],
                        where: farmWhere
                    },
                    {
                        model: db.CoffeeVariety,
                        as: "coffeeVariety",
                        through: {
                            model: db.CoffeePlantationVarieties,
                        },
                        attributes: ["id", "name", "coffee_species"],
                        where: plantationVarietyWhere,
                    },
                    {
                        model: db.CoffeeSpecies,
                        as: "coffeeSpecies",
                        attributes: ["id", "name"],
                    },
                ]
            },
            {
                model: db.harvest_reason_for_loss,
                as: "reasonForLoss",
                attributes: ["id", "name"],
            },
        ]
    })
    const farmInfo = [];
    for(const row of response) {
        for(const farm of row.plantation.userFarms) {
            farmInfo.push({
                farm_id: farm.PlantationsUserFarmsMap.farm_id,
                farmName: farm.farmName,
                coffeeSpecies: row.plantation.coffeeSpecies,
                coffeeVariety: row.plantation.coffeeVariety,
                coffeeYield: row.coffeeYield,
                yieldUnit: row.yieldUnit,
                harvestingDate: row.harvestingDate
            })
        }
    }
    const groupedData = Object.values(farmInfo.reduce((acc, obj) => {
        const { farm_id, coffeeSpecies, coffeeVariety, coffeeYield, yieldUnit, farmName, harvestingDate } = obj;
        if(!acc[farm_id]) acc[farm_id] = {farm_id, farmName };
        if(!acc[farm_id].data) acc[farm_id].data = [];
        acc[farm_id].data.push({
            coffeeSpecies,
            coffeeVariety,
            coffeeYield,
            yieldUnit,
            harvestingDate
        })
        return acc;
      }, {}));


    const userWeightUnit = await db.UnitTypes.findOne({
        where: { name: 'Weight' },
        attributes: [],
        include: [
            {
                model: db.UserUnitConfiguration,
                as: 'units_user',
                where: { userId: req.user.id, },
                include: {
                    model: db.UnitsList,
                    as: 'user_config_unit',
                },
            },
        ],
    });

    const comparisonData = calculateYieldData(
        groupedData,
        userWeightUnit?.units_user[0]?.user_config_unit?.abbvr,
        byTimeStartDate,
        byTimeEndDate,
        comparisonTimeStartDate,
        comparisonTimeEndDate
    );  

    return {
        count,
        response,
        comparisonData
    }
}

module.exports.generatePDF = async (data) => {
    try {
      // Read HTML Template
      const template = fs.readFileSync(path.resolve(__dirname, "../../../views/coffee/harvesting/coffee-report.html"), 'utf8');
      // console.log(template, 'template')
      let html = await ejs.render(template, data);
      // console.log(html, 'html')
      let fileName = 'coffee-harvest-report-' + Date.now() + '.pdf'
      fileName = fileName.replace(/\//g, '-')
      const fileDestination = path.resolve(__dirname, `../../../views/reports/${fileName}`)
      const options = {
        path: fileDestination,
        printBackground: true
      }
      let file = { content: html };
      let pdf = await html_to_pdf.generatePdf(file, options)
      console.log(pdf, 'pdf')
      if (pdf) {
        return {
          fileName,
          path: fileDestination
        }
      }
    } catch (error) {
      console.log(error)
    }
  }