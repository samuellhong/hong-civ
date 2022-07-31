const varUnits = 4;
const varBuildings = 5;

let game = {

    money: 0,
    population: 0,
    unusedPopulation: 0,
    stage: 0,
    science: 0,
    maxScience: 1000,
    loadScienceTime: 10000,
    land: 20,
    unusedLand: 20,
    landPrice: 5,
    techs: [0,0],
    thinkSpeed: 7,
    hungryStatus: 0,
    distributedFood: 0,
    scienceInt: 0,
    scienceMultiplier: 1,
    storedFood: 0,

    housing:0,
    unusedHousing:0,

    builders:0,
    manPower: 0,
    manPowerMultiplier: 1,
    builderPrice: 300,
    maxManPower: 500,

    cropCount:[0,0,0],
    seedsCount:[10,0,0],
    seedPrice:[(Math.random()*.1+0.01), (Math.random()*.3+.31), (Math.random()*2+2.01)],
    cropSell:[(Math.random()*.2+0.11), (Math.random()+1.00), (Math.random()*4+4.01)],
    cropGrowChance:[0.7,0.6,0.5],
    seedBundle: 3,
    keepCrop: 5,
    storedCrops:[0,0,0],
    cropStorage:20,
    cropStorageSpace:20, 

    farmLand:0,
    unusedFarmLand:0,
    farmersCount: [0,0,0],
    farmerPrice: 200,
    totalFarmers: 0,
    unusedFarmers: 0,
    farmerCount:[0,0,0],
    farmerSpeed: 5,
    traderPrice: 500,
    cropTraders: 0,
    cropTraderStatus: 0,

    traderSpeed: 4,

    livestockCount:[0,0],
    livestockPrice: [(Math.random()*15+15),(Math.random()*15+20),(Math.random()*20+25)],
    livestockBreedChance:[0.1,0.1],
    totalHerders:0,
    unusedHerders: 0,
    herderCount:[0,0],
    herderPrice: 400,
    breedSpeed: 10,
    keepLivestock: 5,
    storedMeat:[0,0],
    livestockTraders: 0,
    livestockTraderStatus:0,

    meatStorage:10,
    meatStorageSpace:10, 

    livestockLand:0,
    unusedLivestockLand:0,

    buildingCount: Array(varBuildings).fill(0),
    totalMilitaryPower: 0,
    currentMilitaryPower: 0,
    currentMilitaryUnits: Array(varUnits).fill(0),
    currentMilitaryValues: Array(varUnits).fill([]),

    militaryUnits: Array(varUnits).fill(0),
    militaryValues: Array(varUnits).fill([]),

    enemyMilitaryUnits: Array(varUnits).fill(0),
    enemyMilitaryValues: Array(varUnits).fill([]),
    foundFight: false,
    inFight: false,
    goldPrize: 0,
    landPrize: 0,
    captives: 0,
    winner:1,

    militaryHousing: 5,
    militaryUnusedHousing: 5,

    wood:0,
    stone:0,
    miningLand:0,
    unusedMiningLand:0,
    materialPrice: [(Math.random()*4+2),(Math.random()*3+6)],
    materialCount: [0,0],
    materialWorkers: [0,0],
    materialStorage: [50,50],
    matSpeed:7000,
    
};

export {game};