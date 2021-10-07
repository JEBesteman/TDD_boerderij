const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

//this test may not be altered!
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForPlant", () => {
  test("Get yield for plant with low sun environment factor", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });
});

describe("getYieldForPlant", () => {
  test("Get yield for plant, with high rain environment factor", () => {
    const pumpkin = {
      name: "pumpkin",
      yield: 30,
      factors: {
        rain: {
          low: -20,
          medium: 0,
          high: -50,
        },
      },
    };

    const environmentFactors = {
      rain: "high",
    };
    expect(getYieldForPlant(pumpkin, environmentFactors)).toBe(15);
  });
});

describe("getYieldForPlant", () => {
  test("Get yield for plant, with low wind and soil environment factor which has no influence on yield", () => {
    const apple = {
      name: "apple",
      yield: 25,
      factors: {
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };

    const environmentFactors = {
      wind: "low",
      soil: "sand",
    };
    expect(getYieldForPlant(apple, environmentFactors)).toBe(25);
  });
});

//this test may not be altered!!
describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, with environment factor sun and rain", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        rain: {
          low: -20,
          medium: 0,
          high: -50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      rain: "low",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(36);
  });
});

//this test may not be altered!
describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  test("Calculate costs for one crop of corn", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getCostsForCrop(input)).toBe(10);
  });

  test("Calculate costs for one crop of pumpkin", () => {
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const input = {
      crop: pumpkin,
      numCrops: 8,
    };
    expect(getCostsForCrop(input)).toBe(8);
  });
});

describe("getRevenueForCrop", () => {
  test("Calculate revenue for crop of corn without environmentfactor", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      salesPrice: 2,
    };
    expect(getRevenueForCrop(input)).toBe(60);
  });

  test("Calculate revenue for crop of pumpkin without environmentfactor", () => {
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const input = {
      crop: pumpkin,
      numCrops: 8,
      salesPrice: 3,
    };
    expect(getRevenueForCrop(input)).toBe(96);
  });
});

describe("getRevenueForCrop with environment factors", () => {
  const pumpkin = {
    name: "pumpkin",
    yield: 20,
    factors: {
      rain: {
        low: -20,
        medium: 0,
        high: -50,
      },
    },
  };

  const apple = {
    name: "apple",
    yield: 20,
    factors: {
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  test("Get revenue for crop, with high rain", () => {
    const input = {
      crop: pumpkin,
      numCrops: 10,
      salesPrice: 3,
    };

    const environmentFactors = {
      rain: "high",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(300);
  });

  test("Get revenue for crop, with high wind and low sun", () => {
    const input = {
      crop: apple,
      numCrops: 10,
      salesPrice: 2,
    };

    const environmentFactors = {
      wind: "high",
      sun: "low",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(80);
  });
});

describe("getProfitForCrop, simple", () => {
  test("Calculate profit for crop of corn without environmentfactor", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      salesPrice: 2,
    };
    expect(getProfitForCrop(input)).toBe(50);
  });
});

describe("getProfitForCrop with environment factors", () => {
  const corn = {
    name: "corn",
    yield: 3,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };
  const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factors: {
      rain: {
        low: -20,
        medium: 0,
        high: -50,
      },
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  test("Get profit for crop, with high sun", () => {
    const input = {
      crop: corn,
      numCrops: 10,
      salesPrice: 2,
    };

    const environmentFactors = {
      sun: "high",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(80);
  });

  test("calculate profit for crop, with low rain and high sun", () => {
    const input = {
      crop: pumpkin,
      numCrops: 10,
      salesPrice: 3,
    };

    const environmentFactors = {
      rain: "low",
      sun: "high",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(134);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit for multiple crops without environmentfactor", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5, salesPrice: 2 },
      { crop: pumpkin, numCrops: 2, salesPrice: 3 },
    ];
    expect(getTotalProfit({ crops })).toBe(47);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0, salesPrice: 2 }];
    expect(getTotalProfit({ crops })).toBe(0);
  });
});

describe("getTotalProfit with environment factors", () => {
  test("Calculate total profit multiple crops, with low wind and high sun", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const apple = {
      name: "apple",
      yield: 4,
      factors: {
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const crops = [
      { crop: corn, numCrops: 5, salesPrice: 2 },
      { crop: apple, numCrops: 2, salesPrice: 2 },
    ];

    const environmentFactors = {
      wind: "low",
      sun: "high",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(62);
  });
});
