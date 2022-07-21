var techs = [];
var activeTechs = [];

var animalHusbandry = {
    id: "animalHusbandryTech",
    title: "Animal Husbandry",
    priceTag: "(50 science): \n",
    flag: 0,
    description: "Unlock Livestock; Unlock Horseman",
    trigger: function(){return true;},
    element: null,
    cost: 50,
    effect: function(){
        animalHusbandry.flag = 2;
        animalHusbandry.element.parentNode.removeChild(animalHusbandry.element);
    },
    next: []
}

techs.push(animalHusbandry)

var mining = {
    id: "miningTech",
    title: "Mining",
    priceTag: "(75 science): ",
    flag: 0,
    description: "Unlock Mining; Unlock Warrior; Unlocks Buildings",
    trigger: function(){return true},
    element: null,
    cost: 75,
    effect: function(){
        mining.flag = 2;
        mining.element.parentNode.removeChild(mining.element);
    },
    next: []
}

techs.push(mining)

export {techs, activeTechs}