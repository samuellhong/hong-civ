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


var tent = {
    id: "Tent",
    description: "[Houses 2 people; Occupies 1 Land]",
    scienceReq: 0,
    projectReq: null,
    price:[30],
    priceIndex:[0],
    landSpace: 1,
    index: 0,
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
            loadGame.housing+=2;
            loadGame.unusedHousing+=2;
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

var granary = {
    id: "Granary",
    description: "[Store 100 crops; Occupies 2 Land]",
    scienceReq: 2,
    projectReq: null,
    price:[300],
    priceIndex:[0],
    landSpace: 2,
    index: 1,
    trigger: function(){
        return triggerA(granary);
    },
    effect: function(){
        var loadGame = JSON.parse(localStorage.getItem("game"));
        var temp = true;
        for(let i = 0; i<tent.price.length;i++){
            if(tent.price[i] > loadGame.resources[tent.priceIndex[i]]){
                temp = false;
            }
        }
        if(loadGame.unusedLand >1 && temp){
            loadGame.cropStorage+=100;
            loadGame.unusedLand -= 2;
            loadGame.buildingCount[1] += 1;
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    }
}

buildings_.push(granary)

export {buildings_};