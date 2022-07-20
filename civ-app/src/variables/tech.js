var techs = [];
var activeTechs = [];

var animalHusbandry = {
    id: "animalHusbandryTech",
    title: "Animal Husbandry",
    priceTag: "(50 science)",
    flag: 0,
    description: "Can grow livestock/nCan train archers/nGive units horses",
    trigger: function(){return false;},
    element: null,
    cost: 50,
    effect: function(){
        animalHusbandry.flag = 1;
        animalHusbandry.element.parentNode.removeChild(animalHusbandry.element);
    }
}

techs.push(animalHusbandry)

var mining = {
    id: "miningTech",
    title: "Mining",
    priceTag: "(75 science)",
    flag: 0,
    trigger: function(){return true},
    element: null,
    cost: 75,
    effect: function(){
        mining.flag = 1;
        mining.element.parentNode.removeChild(mining.element);
    }
}

techs.push(mining)

export {techs, activeTechs}