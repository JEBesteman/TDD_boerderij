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
    const totalProfit = profit.reduce((acc, cur) => acc + cur);
    return totalProfit;
};

const getYieldForPlant = (input, environmentFactors) => {
    if (!environmentFactors || environmentFactors.sun === "medium") {
        return input.yield;
    } 
    if (!environmentFactors.sun) {
        sun = 1;
    } else {
        switch(environmentFactors.sun) {
            case "low":
                sun = (100 + input.factors.sun.low)/100;
                break;
            case "medium":
                sun = (100 + input.factors.sun.medium)/100;
                break;
            case "high":
                sun = (100 + input.factors.sun.high)/100;
                break;  
            default:
                sun = 1;          
        };
    };    
    const yieldPerPlant = input.yield * sun;
    return parseFloat(yieldPerPlant.toFixed(1)); 
};

module.exports = { 
    getYieldForPlant, 
    // getYieldForCrop, 
    // getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit };