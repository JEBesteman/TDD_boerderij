const costsForOnePlant = 1;

const getCostsForCrop = (input) => {    
    const totalCosts = input.numCrops * costsForOnePlant;
    return totalCosts;
};



 


module.exports = { 
    // getYieldForPlant, 
    // getYieldForCrop, 
    // getTotalYield,
    getCostsForCrop };