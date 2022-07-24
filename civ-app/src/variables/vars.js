


let game = {

    money: 0,
    population: 0,
    unusedPopulation: 0,
    stage: 0,
    science: 0,
    loadScienceTime: 10000,
    land: 20,
    unusedLand: 20,
    landPrice: 5,
    techs: [0,0],
    thinkSpeed: 7,

    cropCount:[0,0,0],
    seedsCount:[10,0,0],
    seedPrice:[(Math.random()*.1+0.01), (Math.random()*.3+.31), (Math.random()*2+2.01)],
    cropSell:[(Math.random()*.2+0.11), (Math.random()+1.00), (Math.random()*4+4.01)],
    cropGrowChance:[0.5,0.4,0.3],
    seedBundle:3,

    farmLand:0,
    unusedFarmLand:0,
    farmersCount: [0,0,0],
    farmerPrice: 300,
    totalFarmers: 0,
    unusedFarmers: 0,
    farmerCount:[0,0,0],
    farmerSpeed: 5,
    traderPrice: 1000,
    cropTraders: 0,
    traderSpeed: 4,

    livestockCount:[0],
    livestockPrice: [(Math.random()*100+200)],
    livestockBreedChance:[0.1],
    totalHerders:0,
    unusedHerders: 0,
    herderCount:[0],
    breedSpeed: 10,
    keepLivestock: 5,

    livestockLand:0,
    unusedLivestockLand:0,

    totalMilitaryPower: 0,
    resources: [0,0,0,0,0]
};

export {game};