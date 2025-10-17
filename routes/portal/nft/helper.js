const moment = require('moment');

function parseMetadataAttributes(attributes) {
  const parsedMetadataAttributes = [];
  for (const attribute of attributes) {
    if (
      attribute &&
      attribute.traitType &&
      attribute.traitType.toString().length &&
      typeof attribute.value !== 'undefined' &&
      attribute.value !== null &&
      attribute.value.toString().length
    ) {
      const parsedAttribute = {};
      const isNumericValue = !isNaN(Number(attribute.value));
      parsedAttribute.trait_type = attribute.traitType;
      parsedAttribute.value =
        attribute.displayType === 'number' && isNumericValue ? Number(attribute.value) : attribute.value;

      if (isNumericValue && attribute.maxValue && !isNaN(Number(attribute.maxValue))) {
        parsedAttribute.max_value = Number(attribute.maxValue);
      }

      if (attribute.displayType) {
        parsedAttribute.display_type = attribute.displayType;
      }
      for (const attribute in parsedAttribute) {
        if (
          parsedAttribute[attribute] === null ||
          typeof parsedAttribute[attribute] === 'undefined' ||
          (typeof parsedAttribute[attribute] === 'string' && parsedAttribute[attribute].trim().length === 0)
        ) {
          delete parsedAttribute[attribute];
        }
      }
      parsedMetadataAttributes.push(parsedAttribute);
    }
  }
  return parsedMetadataAttributes;
}
exports.parseMetadataAttributes = parseMetadataAttributes;

function parseSnapshotFromSnapshotInstance(snapshot) {
  const parsedSnapshot = {
    ...snapshot.dataValues,
    metadata: {
      name: `SnapshotID${snapshot.id}${
        snapshot.snapshottedAt ? '@' + moment(snapshot.snapshottedAt).format('YYYY-MM-DD') : ''
      }`,
      external_url: `https://portal.dimitra.io/nfts/${snapshot.id}`,
      image: snapshot.filePath,
      description: `Snapshot ID:${snapshot.id} snapshotted${
        snapshot.snapshottedAt ? ' at ' + moment(snapshot.snapshottedAt).format('DD MMMM, YYYY') : ''
      } at ${snapshot.lat} latitude and ${snapshot.lng} longitude`,
      attributes: parseMetadataAttributes([
        ...(snapshot.extraAttributes ?? []),
        {
          traitType: 'Snapshotted At',
          displayType: 'date',
          value: snapshot.snapshottedAt ? new Date(snapshot.snapshottedAt).getTime() : null,
        },
        {
          traitType: 'GPS Latitude',
          value: snapshot.lat,
        },
        {
          traitType: 'GPS Longitude',
          value: snapshot.lng,
        },
        {
          traitType: 'Altitude',
          value: snapshot.altitude,
        },
      ]),
    },
  };
  if ('extraAttributes' in parsedSnapshot) {
    delete parsedSnapshot.extraAttributes;
  }
  return parsedSnapshot;
}
exports.parseSnapshotFromSnapshotInstance = parseSnapshotFromSnapshotInstance;
