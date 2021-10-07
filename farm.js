const costsForOnePlant = 1;

const getCostsForCrop = (input) => input.numCrops * costsForOnePlant;

const getRevenueForCrop = (input, environmentfactors) =>
  getYieldForCrop(input, environmentfactors) * input.salesPrice;

const getProfitForCrop = (input, environmentFactors) =>
  getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);

const getYieldForPlant = (crop, environmentFactors) => {
  if (!environmentFactors) {
    return crop.yield;
  }
  let sun;
  let rain;
  let wind;
  if (!environmentFactors.sun) {
    sun = 1;
  } else {
    switch (environmentFactors.sun) {
      case "low":
        sun = (100 + crop.factors.sun.low) / 100;
        break;
      case "medium":
        sun = (100 + crop.factors.sun.medium) / 100;
        break;
      case "high":
        sun = (100 + crop.factors.sun.high) / 100;
        break;
      default:
        sun = 1;
    }
  }

  if (!environmentFactors.rain) {
    rain = 1;
  } else {
    switch (environmentFactors.rain) {
      case "low":
        rain = (100 + crop.factors.rain.low) / 100;
        break;
      case "medium":
        rain = (100 + crop.factors.rain.medium) / 100;
        break;
      case "high":
        rain = (100 + crop.factors.rain.high) / 100;
        break;
      default:
        rain = 1;
    }
  }

  if (!environmentFactors.wind) {
    wind = 1;
  } else {
    switch (environmentFactors.wind) {
      case "low":
        wind = (100 + crop.factors.wind.low) / 100;
        break;
      case "medium":
        wind = (100 + crop.factors.wind.medium) / 100;
        break;
      case "high":
        wind = (100 + crop.factors.wind.high) / 100;
        break;
      default:
        wind = 1;
    }
  }
  const yieldPerPlant = crop.yield * sun * rain * wind;
  return parseFloat(yieldPerPlant.toFixed(2));
};

const getYieldForCrop = (input, environmentFactors) => {
  if (!environmentFactors || input.numCrops === 0) {
    return input.numCrops * input.crop.yield;
  }
  return input.numCrops * getYieldForPlant(input.crop, environmentFactors);
};

const getTotalYield = ({ crops }, environmentFactors) => {
  const yieldPerCrop = crops.map((crop) =>
    getYieldForCrop(crop, environmentFactors)
  );
  const reducer = (acc, curr) => acc + curr;
  const totalYield = yieldPerCrop.reduce(reducer);
  return parseFloat(totalYield.toFixed(2));
};

const getTotalProfit = ({ crops }, environmentFactors) => {
  const profitPerCrop = crops.map((crop) =>
    getProfitForCrop(crop, environmentFactors)
  );
  const reducer = (acc, curr) => acc + curr;
  const totalProfit = profitPerCrop.reduce(reducer);
  return parseFloat(totalProfit.toFixed(2));
};

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
