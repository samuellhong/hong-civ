


let game = {

    money: 0,
    population: 0,
    unusedPopulation: 0,
    stage: 0,
    science: 75,
    land: 20,
    unusedLand: 20,
    landPrice: 5,
    techs: [0,0],
    thinkSpeed: 7,
    
    farmLand:0,
    unusedFarmLand:0,

    seedBundle:3,
    
    cornSeedsCount: 10,
    wheatSeedsCount: 0,
    melonSeedsCount: 0,
    cornCount: 0,
    wheatCount: 0,
    melonCount: 0,
    
    cornGrowChance: 0.5,
    wheatGrowChance: 0.4,
    melonGrowChance: 0.3,
    cornSell: (Math.random()*.2+0.11),        //0.11 -> 0.31
    cornSeedPrice: (Math.random()*.1+0.01),   //0.01 -> 0.11 
    wheatSell: (Math.random()+1.00),          //1.00 -> 1.99
    wheatSeedPrice: (Math.random()*.3+.31),   //0.31 -> 0.61
    melonSell: (Math.random()*4+4.01),        //4.01 -> 7.96
    melonSeedPrice: (Math.random()*2+2.01),   //2.01 -> 3.99
    buySeedRate: 1,
    growSeedRate: 1,

    farmerPrice: .300,
    totalFarmers: 0,
    unusedFarmers: 0,
    cornFarmers: 0,
    wheatFarmers: 0,
    melonFarmers: 0,
    farmerSpeed: 5,

    traderPrice: 1000,
    totalTraders: 0,
    traderSpeed: 2,

    liveStockFlag:0,
    miningFlag:0,

    totalMilitaryPower: 0,
};

export {game};