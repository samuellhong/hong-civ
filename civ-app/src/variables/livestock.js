var livestock_ = [];

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
function sellLivestock(i){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.livestockCount[i] > 0){
        loadGame.livestockCount[i] -= 1;
        loadGame.money += loadGame.livestockPrice[i];
        loadGame.unusedLivestockLand +=1;
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sheep = {
    id: "Sheep",
    meat: "Mutton",
    scienceReq: 1,
    projectReq: null,
    index: 0,
    feed: 10,
    occ: "Sheep Herders",
    trigger: function(){
        return triggerA(sheep);
    },
    price: [15,20],
    sell: function(){sellLivestock(sheep.index)},
}
livestock_.push(sheep);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var cattle = {
    id: "Cattle",
    meat: "Beef",
    scienceReq: 1,
    projectReq: null,
    index: 1,
    feed: 15,
    occ: "Cattle Herders",
    trigger: function(){
        return triggerA(cattle);
    },
    price: [20,25],
    sell: function(){sellLivestock(cattle.index)},
}
livestock_.push(cattle);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var horse = {
    id: "Horse",
    meat: "Beef",
    scienceReq: 7,
    projectReq: null,
    index: 2,
    feed: 15,
    occ: "Horse Breeders",
    trigger: function(){
        return triggerA(horse);
    },
    price: [25,30],
    sell: function(){sellLivestock(horse.index)},
}
livestock_.push(horse);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var fish = {
    id: "Fish",
    meat: "Fish",
    scienceReq: 7,
    projectReq: null,
    index: 3,
    feed: 7,
    occ: "Fishermen",
    trigger: function(){
        return triggerA(fish);
    },
    price: [10,10],
    sell: function(){sellLivestock(fish.index)},
}
livestock_.push(fish);

export {livestock_};