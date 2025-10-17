exports.treeDetailValidator = (tree) => {
    const errors = [];

    // Validate treeName
    if (!tree.treeName || typeof tree.treeName !== 'string') {
        errors.push('Tree name is required and must be a string.');
    }

    // Validate importImageName
    if (tree.importImageName && typeof tree.importImageName !== 'string') {
        errors.push('Import image name must be a string.');
    }

    // Validate clientFarmId
    if (tree.clientFarmId && typeof tree.clientFarmId !== 'string') {
        errors.push('Client farm ID must be a string.');
    }

    // Validate clientZoneId
    if (tree.clientZoneId && typeof tree.clientZoneId !== 'string') {
        errors.push('Client zone ID must be a string.');
    }

    // Validate clientTimestamp
    if (tree.clientTimestamp && typeof tree.clientTimestamp !== 'number') {
        errors.push('Client timestamp must be a number.');
    }

    // Validate clientDatestamp
    if (!tree.clientDatestamp || typeof tree.clientDatestamp !== 'number') {
        errors.push('Client datestamp is required and must be a number.');
    }

    // Validate latitude
    if (!tree.latitude || typeof tree.latitude !== 'number') {
        errors.push('Latitude is required and must be a number.');
    }

    // Validate longitude
    if (!tree.longitude || typeof tree.longitude !== 'number') {
        errors.push('Longitude is required and must be a number.');
    }

    // Validate altitude
    if (tree.altitude && typeof tree.altitude !== 'number') {
        errors.push('Altitude must be a number.');
    }

    return errors;
}

exports.invalidTreeDetail = (tree) => {

    if ((!tree.treeName || tree.treeName == '') 
        && (!tree.importImageName || tree.importImageName == '')
        && (!tree.clientFarmId || tree.clientFarmId == '')
        && (!tree.clientZoneId || tree.clientZoneId == '')
        && (!tree.clientTimestamp || tree.clientTimestamp == '')
        && (!tree.latitude || tree.latitude == '')
        && (!tree.longitude || tree.longitude == '')
        && (!tree.altitude || tree.altitude == '')
        && (!tree.clientDatestamp || tree.clientDatestamp == '')) {
        return true;
    }

    return false;

}
