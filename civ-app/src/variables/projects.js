var projects_ = [];

var project1 = {

    id: "project1",
    scienceReq: 0,
    projectReq: null,
    description: "Better Water System",
    description2: "Increase Seed Growth Chance",
    priceTag: "(100 science): ",
    cost: 100,
    flag: 0,
    element: null,
    effect: function(){
        project1.flag = 1;
        project1.element.parentNode.removeChild(project1.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project1.cost;
        loadGame.cornGrowChance*=(Math.random()*0.3+1);
        loadGame.wheatGrowChance*=(Math.random()*0.3+1);
        loadGame.melonGrowChance*=(Math.random()*0.3+1);
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project1);

var project2 = {

    id: "project2",
    scienceReq: 0,
    projectReq: null,
    description: "Develop Farming Tools",
    description2: "Increase Seed Growth Chance",
    priceTag: "(150 science): ",
    cost: 100,
    flag: 0,
    element: null,
    effect: function(){
        project2.flag = 1;
        project2.element.parentNode.removeChild(project2.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));
        loadGame.science-=project2.cost;
        loadGame.cornGrowChance*=(Math.random()*0.3+1);
        loadGame.wheatGrowChance*=(Math.random()*0.3+1);
        loadGame.melonGrowChance*=(Math.random()*0.3+1);
        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project2);

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
    effect: function(){
        project3.flag = 1;
        project3.element.parentNode.removeChild(project2.element);
        var loadGame = JSON.parse(localStorage.getItem("game"));

        localStorage.setItem("game",JSON.stringify(loadGame));
    },
}
projects_.push(project3);

export {projects_};