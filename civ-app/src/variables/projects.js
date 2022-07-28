var projects_ = [];

function triggerA(t){
    var sFlag = JSON.parse(localStorage.getItem("scienceFlags"));
    var pFlags = JSON.parse(localStorage.getItem("projectsFlags"));
    if(sFlag[t.scienceReq]!== 2){
        return false;
    }
    if(pFlags[t.projectReq]!==1 && t.projectReq !== null){
        return false;
    }
    if(t.flag ===1){
        return false;
    }
    return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project1 = {

    id: "project1",
    scienceReq: 0,
    projectReq: null,
    description: "Better Water System",
    description2: "Increase Seed Growth Chance",
    priceTag: "(50 science): ",
    cost: 50,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project1);},
    effect: function(){
        project1.flag = 1;
        project1.element.parentNode.removeChild(project1.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project1.cost;
        for(let i = 0; i<loadGame.cropGrowChance.length;i++){
            loadGame.cropGrowChance[i] *= (Math.random()*0.4+1)
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project1);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project2 = {

    id: "project2",
    scienceReq: 0,
    projectReq: 0,
    description: "Wood Sickles & Hoes",
    description2: "Increase Seed Growth Chance",
    priceTag: "(75 science): ",
    cost: 75,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project2);},
    effect: function(){
        project2.flag = 1;
        project2.element.parentNode.removeChild(project2.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project2.cost;
        for(let i = 0; i<loadGame.cropGrowChance.length;i++){
            loadGame.cropGrowChance[i] *= (Math.random()*0.4+1)
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project2);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project3 = {

    id: "project3",
    scienceReq: 0,
    projectReq: null,
    description: "Educate Farmers",
    description2: "Farmers can Buy Their own Seeds",
    priceTag: "(200 science): ",
    cost: 200,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project3);},
    effect: function(){
        
        project3.flag = 1;
        project3.element.parentNode.removeChild(project3.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project3.cost;
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project3);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project4 = {

    id: "project4",
    scienceReq: 1,
    projectReq: null,
    description: "Cattle Ploughs",
    description2: "Farmers work Faster",
    priceTag: "(200 science): ",
    cost: 200,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project4);},
    effect: function(){
        
        project4.flag = 1;
        project4.element.parentNode.removeChild(project4.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project4.cost;
        loadGame.farmerSpeed /= (Math.random()*0.3+1);
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project4);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var project5 = {

    id: "project5",
    scienceReq: 1,
    projectReq: null,
    description: "Fodder",
    description2: "Animals Breed Easier",
    priceTag: "(220 science): ",
    cost: 220,
    flag: 0,
    element: null,
    trigger: function(){return triggerA(project5);},
    effect: function(){
        
        project5.flag = 1;
        project5.element.parentNode.removeChild(project5.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project5.cost;
        
        for(let i = 0; i<loadGame.livestockBreedChance.length;i++){
            loadGame.livestockBreedChance[i] *= (Math.random()*0.5+1)
        }
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project5);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {projects_};