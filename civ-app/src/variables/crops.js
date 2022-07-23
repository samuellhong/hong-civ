var crops_ = []

function buySeed(i){
    
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.seedPrice[i] <= loadGame.money){
        loadGame.seedsCount[i] += loadGame.seedBundle;
        loadGame.money -= loadGame.seedPrice[i];
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
function growCrop(i){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.seedsCount[i] > 0 && loadGame.unusedFarmLand > 0){
        loadGame.seedsCount[i] -= 1;
        if(Math.random() < loadGame.cropGrowChance[i]){
            loadGame.cropCount[i] += 1;
            loadGame.unusedFarmLand -=1;
        }
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
function sellCrop(i){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.cropCount[i] > 0){
        loadGame.cropCount[i] -= 1;
        loadGame.money += loadGame.cropSell[i];
        loadGame.unusedFarmLand +=1;
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}

var corn = {

    id: "Corn",
    scienceReq: 0,
    projectReq: null,
    seedDescription: "CornSeed",
    growDescription: "GrowCorn",
    sellDescription: "SellCorn",
    growChance: 0.5,
    seedCost: (Math.random()*.1+0.01),
    sellPrice:(Math.random()*.2+0.11),
    flag: 0,
    index: 0,
    element: null,
    generatePrice: function(){
        corn.seedCost = (Math.random()*.1+0.01);
        return corn.seedCost;
    },
    buySeed: function(){
        buySeed(0);
    },
    growCrop: function(){
        growCrop(0);
    },
    sellCrop: function(){
        sellCrop(0);
    }
}
crops_.push(corn)
var wheat = {

    id: "Wheat",
    scienceReq: 0,
    projectReq: null,
    seedDescription: "WheatSeed",
    growDescription: "GrowWheat",
    sellDescription: "SellWheat",
    growChance: 0.5,
    seedCost: (Math.random()*.3+.31),
    sellPrice:(Math.random()+1.00),
    flag: 0,
    index: 1,
    element: null,
    generatePrice: function(){
        wheat.seedCost = (Math.random()*.3+.31);
        return wheat.seedCost;
    },
    buySeed: function(){
        buySeed(1);
    },
    growCrop: function(){
        growCrop(1);
    },
    sellCrop: function(){
        sellCrop(1);
    }
}

crops_.push(wheat);

var melon = {

    id: "Melon",
    scienceReq: 0,
    projectReq: null,
    seedDescription: "MelonSeed",
    growDescription: "GrowMelon",
    sellDescription: "SellMelon",
    growChance: 0.5,
    seedCost: (Math.random()*2+2.01),
    sellPrice:(Math.random()*4+4.01),
    flag: 0,
    index: 2,
    element: null,
    generatePrice: function(){
        melon.seedCost = (Math.random()*2+2.01);
        return melon.seedCost;
    },
    buySeed: function(){
        buySeed(2);
    },
    growCrop: function(){
        growCrop(2);
    },
    sellCrop: function(){
        sellCrop(2);
    }
}

crops_.push(melon);

export {crops_};