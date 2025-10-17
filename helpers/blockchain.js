var initializeEtherContract = require('././../components/etherContract');
var {utils} = require('ethers');
var { toDataURL } = require('qrcode');


module.exports = async function writeToBlockChain(farm) {
    const json = {
      title: 'Farm Report',
      version: '1.0',
      farmGUID: farm.id,
      farmName: farm.farmName,
      farmerName: farm.farmerName,
      country: farm.country,
      state: farm.state,
      address: farm.address,
      farmLocation: {
        latitude: farm.lat,
        longitude: farm.log,
      },
      userId: farm.userId,
      geofenceData: farm.coordinates,
      zones: farm.zones,
      createdAt: new Date(),
    };

    try {
      const contract = await initializeEtherContract();

      const testString = JSON.stringify(json);
      const expectedHash = utils.keccak256(utils.toUtf8Bytes(testString));

      //Send string to smart contract function expecting hash
      const transaction = await contract.mapSerializedReportData(testString);
      const link = `${process.env.ETHER_SCAN}/${transaction.hash}`;
      const qrCode = await toDataURL(link);

      const qrBase64Img = qrCode.split(',')[1]
      return { qrBase64Img } 
    } catch (err) {
      console.log("Error", err)
    }
}