var techs = [];

var neolithic = {
    id: "Tech1",
    title: "Neolithic Revolution",
    priceTag: "",
    flag: 0,
    description: "Settle and Start your Civilization",
    trigger: function(){return true;},
    element: null,
    cost: 0,
    effect: function(){

        neolithic.flag = 2;
        neolithic.element.parentNode.removeChild(neolithic.element);

    },
    next: null,
    next1: null
}

techs.push(neolithic);

var animalHusbandry = {
    id: "animalHusbandryTech",
    title: "Pastoralism",
    priceTag: "(300 science): \n",
    flag: 0,
    description: "Unlock Livestock; Unlock Horseman",
    trigger: function(){return true;},
    element: null,
    cost: 300,
    effect: function(){
        animalHusbandry.flag = 2;
        animalHusbandry.element.parentNode.removeChild(animalHusbandry.element);
    },
    next: 0,
    next1: null
}
techs.push(animalHusbandry)

var mining = {
    id: "miningTech",
    title: "Mining",
    priceTag: "(550 science): ",
    flag: 0,
    description: "Unlock Mining; Unlock Warrior; Unlocks Buildings",
    trigger: function(){return true},
    element: null,
    cost: 550,
    effect: function(){
        mining.flag = 2;
        mining.element.parentNode.removeChild(mining.element);
    },
    next: 0,
    next1: null
}
techs.push(mining)

var archery = {
    id: "archeryTech",
    title: "Archery",
    priceTag: "(900 science): ",
    flag: 0,
    description: "Unlock Archers",
    trigger: function(){return true},
    element: null,
    cost: 900,
    effect: function(){
        archery.flag = 2;
        archery.element.parentNode.removeChild(archery.element);
    },
    next: 1,
    next1: null
}
techs.push(archery)

export {techs}