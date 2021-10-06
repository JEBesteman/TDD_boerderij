const costsForOnePlant = 1;

const getCostsForCrop = (input) => {    
    const totalCosts = input.numCrops * costsForOnePlant;
    return totalCosts;
};

const getRevenueForCrop = (input) => {
    const revenueForCrop = input.crop.yield * input.numCrops * input.salesPrice;
    return revenueForCrop;
};

const getProfitForCrop = (input) => {
    const profitForCrop = getRevenueForCrop(input) - getCostsForCrop(input);
    return profitForCrop;
};

const getTotalProfit = (input) => {
    const crops = input.crops;
    const profit = crops.map(input => getProfitForCrop(input));
    return profit.reduce((acc, cur) => acc + cur);
};




module.exports = { 
    // getYieldForPlant, 
    // getYieldForCrop, 
    // getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit };