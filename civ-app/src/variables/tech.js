var techs = [];

function triggerA(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    for(let i = 0;i<t.req.length;i++){
        if(sFlag[t.req[i]]!== 2){
            return false;
        }
    }
    if(t.flag ===2){
        return false;
    }
    return true;
}

function buyTech(t){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(t.cost <= loadGame.science){
        loadGame.science -= t.cost;
        t.flag = 2;
        t.element.parentNode.removeChild(t.element);
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
}

var neolithic = {
    id: "Tech1",
    title: "Neolithic Revolution",
    priceTag: "",
    flag: 0,
    description: "Settle and Start your Civilization",
    trigger: function(){return triggerA(neolithic);},
    element: null,
    cost: 0,
    effect: function(){
        buyTech(neolithic);
    },
    req: [],
}

techs.push(neolithic);

var animalHusbandry = {
    id: "animalHusbandryTech",
    title: "Pastoralism",
    priceTag: "(200 science): \n",
    flag: 0,
    description: "Unlock Livestock; Unlock Horseman",
    trigger: function(){return triggerA(animalHusbandry);},
    element: null,
    cost: 200,
    effect: function(){
        buyTech(animalHusbandry);
    },
    req: [0]
}
techs.push(animalHusbandry)

var pottery = {
    id: "potteryTech",
    title: "Pottery",
    priceTag: "(250 science): ",
    flag: 0,
    description: "Unlock Granary;",
    trigger: function(){return triggerA(pottery);},
    element: null,
    cost: 250,
    effect: function(){
        buyTech(pottery);
    },
    req: [0]
}
techs.push(pottery)

var mining = {
    id: "miningTech",
    title: "Mining",
    priceTag: "(250 science): ",
    flag: 0,
    description: "Unlock Mining; Unlock Warrior; Unlocks Buildings",
    trigger: function(){return triggerA(mining);},
    element: null,
    cost: 250,
    effect: function(){
        buyTech(mining);
    },
    req: [0]
}
techs.push(mining)

var writing = {
    id: "writingTech",
    title: "Writing",
    priceTag: "(550 science): ",
    flag: 0,
    description: "Unlock Library",
    trigger: function(){return triggerA(writing);},
    element: null,
    cost: 550,
    effect: function(){
        buyTech(writing);
    },
    req: [0]
}
techs.push(writing)

var sailing = {
    id: "sailingTech",
    title: "Sailing",
    priceTag: "(500 science): ",
    flag: 0,
    description: "Unlock Fishing",
    trigger: function(){return triggerA(sailing);},
    element: null,
    cost: 500,
    effect: function(){
        buyTech(sailing);
    },
    req: [0]
}
techs.push(sailing)

var hunting = {
    id: "huntingTech",
    title: "Hunting",
    priceTag: "(580 science): ",
    flag: 0,
    description: "Unlock Hunting Animals",
    trigger: function(){return triggerA(hunting);},
    element: null,
    cost: 580,
    effect: function(){
        hunting.flag = 2;
        hunting.element.parentNode.removeChild(hunting.element);
    },
    req: [1]
}
techs.push(hunting)

var archery = {
    id: "archeryTech",
    title: "Archery",
    priceTag: "(900 science): ",
    flag: 0,
    description: "Unlock Archers",
    trigger: function(){return triggerA(archery);},
    element: null,
    cost: 900,
    effect: function(){
        archery.flag = 2;
        archery.element.parentNode.removeChild(archery.element);
    },
    req: [1]
}
techs.push(archery)

export {techs}