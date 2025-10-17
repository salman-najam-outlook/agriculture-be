const restructureResponseWithPlantations = (data) => {
    if (!data) return null;
    
    // Handle both single objects and arrays
    const isArray = Array.isArray(data);
    const items = isArray ? data : [data];
    
    const processItem = (item) => {
        if (!item) return null;
        
        // Convert Sequelize instance to plain object if needed
        const plainItem = item.toJSON ? item.toJSON() : item;
        
        const restructured = {
          ...plainItem,
          plantations: [],
        };

        // Extract sowing data from traceability
        if (restructured.traceability) {
          const plantationMap = new Map();
          
          // Handle both single traceability object and array of traceability objects
          const traceabilityArray = Array.isArray(restructured.traceability) 
            ? restructured.traceability 
            : [restructured.traceability];
          
          traceabilityArray.forEach((trace) => {
            if (trace?.sowing) {
              const plantationId = trace.sowing.plantation_id;

              if (!plantationMap.has(plantationId)) {
                plantationMap.set(plantationId, trace.sowing);
              }
            }
          });
          
          restructured.plantations = Array.from(plantationMap.values());
        } else {
          // If no traceability data, initialize empty plantations array
          restructured.plantations = [];
        }
        
        // Remove the original traceability array
        delete restructured.traceability;
        
        return restructured;
    };
    
    const processedItems = items.map(processItem).filter(Boolean);
    
    // Return array if input was array, single object if input was single object
    return isArray ? processedItems : processedItems[0] || null;
  };

module.exports = {
  restructureResponseWithPlantations,
};
