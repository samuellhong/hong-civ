var army = [];

function trigger(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    var pFlags = JSON.parse(localStorage.getItem("projectsFlags"));
    if(sFlag[t.scienceReq]!== 2){
        return false;
    }
    if(pFlags[t.projectReq]!==1 && t.projectReq !== null){
        return false;
    }
    if(sFlag[t.obsolete]===2){
        return false;
    }
    return true;
}


function train(t){
    var loadGame = JSON.parse(localStorage.getItem("game"));
    if(loadGame.militaryUnusedHousing <= 0){
        
        return;
    }
    for(let i = 0;i<t.price.length;i++){
        if(t.price[i] > loadGame.resources[t.priceIndex[i]]){
            
            return
        }
    }
    for(let i = 0;i<t.price.length;i++){
        loadGame.resources[t.priceIndex[i]]-=t.price[i];
    }
    loadGame.money = loadGame.resources[0];
    loadGame.wood = loadGame.resources[1];
    loadGame.stone = loadGame.resources[2];

    var power = t.range * (Math.random()+0.6+0.8) + t.melee * (Math.random()+0.2+0.9) +t.strength +t.iq * (Math.random()+0.6+0.8) +t.mobility * (Math.random()+0.2+0.4);
    loadGame.totalMilitaryPower += power;
    loadGame.militaryUnits[t.index] +=1;
    loadGame.militaryValues[t.index].push(power);
    loadGame.militaryUnusedHousing -= 1;

    localStorage.setItem("game",JSON.stringify(loadGame));
}

var fighter = {
    id:"fighter",
    price:[50],
    scienceReq: 0,
    projectReq:null,
    obsolete:9,
    priceIndex:[0],
    index: 0,
    range: 0,
    melee:1,
    strength:1,
    iq:1,
    mobility:2,
    element:null,
    trigger: function(){
        return trigger(fighter);
    },
    train: function(){
        train(fighter);
    },
    trainEnemy:function(){
        const power = fighter.range * (Math.random()+0.6+0.8) + fighter.melee * (Math.random()+0.2+0.9) +fighter.strength +fighter.iq * (Math.random()+0.6+0.8) +fighter.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(fighter)

var slinger = {
    id:"slinger",
    scienceReq:0,
    projectReq:null,
    obsolete:5,
    price:[100],
    priceIndex:[0],
    index: 1,
    range: 1,
    melee: 0,
    strength:1,
    iq:1,
    mobility:2,
    element:null,
    trigger: function(){
        return trigger(slinger);
    },
    train: function(){
        train(slinger);
    },
    trainEnemy:function(){
        const power = slinger.range * (Math.random()+0.6+0.8) + slinger.melee * (Math.random()+0.2+0.9) +slinger.strength +slinger.iq * (Math.random()+0.6+0.8) +slinger.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(slinger)

var warrior = {
    id:"warrior",
    price:[300,10,10],
    scienceReq:3,
    projectReq:null,
    obsolete:null,
    priceIndex:[0,1,2],
    index: 2,
    range: 0,
    melee: 3,
    strength:3,
    iq:1,
    mobility:4,
    element:null,
    trigger: function(){
        return trigger(warrior);
    },
    train: function(){
        train(warrior);
    },
    trainEnemy:function(){
        const power = warrior.range * (Math.random()+0.6+0.8) + warrior.melee * (Math.random()+0.2+0.9) +warrior.strength +warrior.iq * (Math.random()+0.6+0.8) +warrior.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(warrior)

var archer = {
    id:"archer",
    price:[300,10],
    obsolete:null,
    priceIndex:[0,1],
    scienceReq:7,
    projectReq:null,
    index: 3,
    range: 5,
    melee: 1,
    strength: 2,
    iq: 3,
    mobility:2,
    element:null,
    trigger: function(){
        return trigger(archer);
    },
    train: function(){
        train(archer);
    },
    trainEnemy:function(){
        const power = archer.range * (Math.random()+0.6+0.8) + archer.melee * (Math.random()+0.2+0.9) +archer.strength +archer.iq * (Math.random()+0.6+0.8) +archer.mobility * (Math.random()+0.2+0.4);
        return power;
    },
}
army.push(archer)

export {army};