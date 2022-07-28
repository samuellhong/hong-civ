var buildings_ = [];

function triggerA(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    var pFlags = JSON.parse(localStorage.getItem("projectsFlags"));
    if(sFlag[t.scienceReq]!== 2){
        return false;
    }
    if(pFlags[t.projectReq]!==1 && t.projectReq !== null){
        return false;
    }
    return true;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tent = {
    id: "Tent",
    description: "[Houses 1 person; Occupies 1 Land]",
    scienceReq: 0,
    projectReq: null,
    price:[30],
    priceIndex:[0],
    landSpace: 1,
    index: 0,
    prev: null,
    manpower: 0,
    trigger: function(){
        return triggerA(tent);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        var temp = true;
        for(let i = 0; i<tent.price.length;i++){
            if(tent.price[i] > loadGame.resources[tent.priceIndex[i]]){
                temp = false;
            }
        }
        if(loadGame.unusedLand >0 && temp){
            loadGame.housing+=1;
            loadGame.unusedHousing+=1;
            loadGame.unusedLand -= 1;
            loadGame.buildingCount[0] += 1;
            for(let i = 0; i<tent.price.length;i++){
                loadGame.resources[tent.priceIndex[i]] -= tent.price[i];
            }
            loadGame.money = loadGame.resources[0];
        }

        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(tent)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var granary = {
    id: "Granary",
    description: "[Store 100 crops; Occupies 2 Land]",
    scienceReq: 2,
    projectReq: null,
    price:[300],
    priceIndex:[0],
    landSpace: 2,
    index: 1,
    prev:null,
    manpower: 100,
    trigger: function(){
        return triggerA(granary);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(granary.price[0]> loadGame.money){
            return;
        }
        if(loadGame.unusedLand > 1 && loadGame.manPower > granary.manpower){
            loadGame.cropStorageSpace+=100;
            loadGame.unusedLand -= 2;
            loadGame.buildingCount[1] += 1;
            loadGame.money -= granary.price[0];
            loadGame.manPower -= granary.manpower;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(granary)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mudhouse = {
    id: "Mudhouse",
    description: "[Houses 5 people; Occupies 1 Land]",
    upgradeDescription: "[Houses 4 more people]",
    scienceReq: 2,
    projectReq: null,
    price:[100],
    priceIndex:[0],
    landSpace: 1,
    index: 2,
    prev:0,
    upgradePrice: [80],
    upgradePriceIndex: [0],
    upgradeManpower: 150,
    manpower: 200,
    trigger: function(){
        return triggerA(granary);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(mudhouse.price[0]> loadGame.money){
            return;
        }
        if(loadGame.unusedLand >0 && loadGame.manPower > mudhouse.manpower){
            loadGame.housing+=5;
            loadGame.unusedHousing+=5;
            loadGame.unusedLand -= 1;
            loadGame.buildingCount[2] += 1;
            loadGame.money -= mudhouse.price[0];
            loadGame.manPower -= mudhouse.manpower;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
    effect2: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        if(mudhouse.upgradePrice[0]> loadGame.money){
            return;
        }
        if(loadGame.buildingCount[0] >0 && loadGame.manPower > mudhouse.upgradeManpower){
            loadGame.housing+=4;
            loadGame.unusedHousing+=4;
            loadGame.buildingCount[2] += 1;
            loadGame.buildingCount[0] -= 1;
            loadGame.money -= mudhouse.upgradePrice[0];
            loadGame.manPower -= mudhouse.manpower;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(mudhouse)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {buildings_};