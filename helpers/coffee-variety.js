const sortCoffeeVarieties = (coffeeVarieties) => {
  if (!Array.isArray(coffeeVarieties)) return coffeeVarieties;
  const firstOptionNames = ['blend', 'others', 'unknown'];
  coffeeVarieties.sort((variety1, variety2) => {
    const variety1Name = variety1.name?.toLowerCase();
    const variety2Name = variety2.name?.toLowerCase();
    const isVariety1FirstOptions = firstOptionNames.includes(variety1Name);
    const isVariety2FirstOptions = firstOptionNames.includes(variety2Name);

    if (isVariety1FirstOptions && isVariety2FirstOptions) {
      return firstOptionNames.indexOf(variety1Name) - firstOptionNames.indexOf(variety2Name);
    } else if (isVariety1FirstOptions) {
      return -1;
    } else if (isVariety2FirstOptions) {
      return 1;
    } else {
      if (!variety1Name) return -1;
      if (!variety2Name) return 1;
      return variety1Name.localeCompare(variety2Name);
    }
  });
};

module.exports = {
  sortCoffeeVarieties,
};
