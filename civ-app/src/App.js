import './App.css';
import React, { useEffect } from 'react';
import {game} from './variables/vars.js';
import {crops_} from './variables/crops.js';
import {techs} from './variables/tech.js';
import {army} from './variables/army.js';
import {livestock_} from './variables/livestock.js';
import {projects_} from './variables/projects.js';
import {buildings_} from './variables/buildings.js';
import Header from './components/Header';

var projects = projects_;
var crops = crops_;
var tech = techs;
var military = army;
var livestock = livestock_;
var buildings = buildings_;

var scienceFlags = [];
var militaryFlags = [];
var projectsFlags = [];

if(true){
  localStorage.setItem("game",JSON.stringify(game));

  for(let i = 0; i<tech.length;i++){
    scienceFlags.push(tech[i].flag);
  }
  localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
  for(let i = 0; i<military.length;i++){
    militaryFlags.push(military[i].flag);
  }
  localStorage.setItem("militaryFlags",JSON.stringify(militaryFlags));
  for(let i = 0; i<projects.length;i++){
    projectsFlags.push(projects[i].flag);
  }
  localStorage.setItem("projectsFlags",JSON.stringify(projectsFlags));
}
var cropTraderInterval;
var scienceInterval;
var growIntervals = [null,null,null];
var seedPriceIntervals = [null,null,null];
var cropPriceIntervals = [null,null,null];
var livestockPriceIntervals = [null,null,null];
const resourceString = ["g", "wood", "stone"]
  
if (localStorage.getItem("game") === "undefined"){
  localStorage.setItem("game",JSON.stringify(game));
}
if (localStorage.getItem("scienceFlags") === "undefined"){
  for(let i = 0; i<tech.length;i++){
    scienceFlags.push(tech[i].flag);
  }
  localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
}
if (localStorage.getItem("militaryFlags") === "undefined"){
  for(let i = 0; i<army.length;i++){
    militaryFlags.push(army[i].flag);
  }
  localStorage.setItem("militaryFlags",JSON.stringify(militaryFlags));
}
if (localStorage.getItem("projectsFlags") === "undefined"){
  for(let i = 0; i<projects.length;i++){
    projectsFlags.push(projects[i].flag);
  }
  localStorage.setItem("projectsFlags",JSON.stringify(projectsFlags));
}

scienceFlags = JSON.parse(localStorage.getItem("scienceFlags"));
for(let i = 0; i<tech.length;i++){
  tech[i].flag = scienceFlags[i];
}
projectsFlags = JSON.parse(localStorage.getItem("projectsFlags"));
for(let i = 0; i<projects.length;i++){
  projects[i].flag = projectsFlags[i];
}
var loadGame = JSON.parse(localStorage.getItem("game"));
var status = 0;
var gameStart = 0;
const App = () =>{
  
  function saveVar(){
    if(loadGame.hungryStatus ===0){
      loadGame.scienceInt = loadGame.population;
    }
    else{
      loadGame.scienceInt = 0;
    }
    if(tech[1].flag===2 && status ===0){
      beginWildAnimals();
      status=1;
    }
    if (gameStart ===0){
      /* eslint-disable no-unused-vars */
      
      setInterval(()=>{
        if(loadGame.population >0){
          feed();
          storeExtraCrops();
        }
      },40000);
      for(let i = 0;i<crops.length;i++){
        if(scienceFlags[crops[i].scienceReq]===2){
          seedPriceIntervals[i] = setInterval(()=>{
            createSeedInterval(i);
          },(Math.random()*3+7)*1000);
          cropPriceIntervals[i] = setInterval(()=>{
            createCropInterval(i);
          },(Math.random()*3+7)*1000);
        }
      }
      for(let i = 0;i<livestock.length;i++){
        if(scienceFlags[livestock[i].scienceReq] ===2){
          livestockPriceIntervals[i] = setInterval(()=>{
            createLivestockPriceInterval(i);
          },(Math.random()*3+10)*1000)
        }
      }
      gameStart = 1;
    }
    scienceFlags = []
    for(let i = 0; i<tech.length; i++){
      scienceFlags.push(tech[i].flag);
    }
    localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));

    projectsFlags = []
    for(let i = 0; i<projects.length; i++){
      projectsFlags.push(projects[i].flag);
    }
    localStorage.setItem("projectsFlags",JSON.stringify(projectsFlags));

    manageCrops();
    manageLivestock();
    manageFood();
    manageTech();
    manageProjects();
    manageBuildings();
    manageMilitaryUnits();
   
    loadGame.resources = [loadGame.money];

    localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
    document.getElementById("money").innerHTML = loadGame.money.toFixed(2);
    document.getElementById("population").innerHTML = loadGame.population;
    document.getElementById("unusedPopulation").innerHTML = loadGame.unusedPopulation;
    document.getElementById("land").innerHTML = loadGame.land;
    document.getElementById("unusedLand").innerHTML = loadGame.unusedLand;
    document.getElementById("landPrice").innerHTML = loadGame.landPrice.toFixed(2);
    document.getElementById("farmLand").innerHTML = loadGame.farmLand;
    document.getElementById("livestockLand").innerHTML = loadGame.livestockLand;
    document.getElementById("totalMilitaryPower").innerHTML = loadGame.totalMilitaryPower;

    localStorage.setItem("game",JSON.stringify(loadGame));

  }

  function feed(){
    
    var hunger = loadGame.population*3 - loadGame.distributedFood;
    loadGame.distributedFood = 0;
    loadGame.hungryStatus = 0;
    while(hunger > 0){
      var totalCrops = 0;
      var totalMeat = 0;
      for(let i = 0;i<crops.length;i++){
        totalCrops += loadGame.storedCrops[i];
      }
      for(let i =0;i<livestock.length;i++){
        totalMeat += loadGame.storedMeat[i];
      }
      if(totalCrops + totalMeat <=0){
        loadGame.hungryStatus = 1;
        saveVar();
        return;
      }
      var odds = [totalCrops/totalCrops+totalMeat, totalMeat/totalCrops+totalMeat];
      if(Math.random() < odds[0]){
        var odds2 = [];
        for(let i = 0; i<crops.length; i++){
          odds2.push(loadGame.storedCrops[i]/totalCrops);
        }
        const chance = Math.random();
        var sum = 0;
        for(let i =0;i<crops.length;i++){
          if(chance <odds2[i]+sum){
            totalCrops -= 1;
            loadGame.storedCrops[i] -= 1;
            loadGame.storedFood -=1;
            loadGame.cropStorageSpace += 1;
            hunger -= crops[i].feed;
            localStorage.setItem("game",JSON.stringify(loadGame));
            loadGame = JSON.parse(localStorage.getItem("game"));
            saveVar();
          }
          else{
            sum += odds2[i];
          }
        }
      }
      else{
        let odds2 = [];
        for(let i = 0; i<livestock.length; i++){
          odds2.push(loadGame.storedMeat[i]/totalMeat);
        }
        const chance = Math.random();
        let sum = 0;
        for(let i =0;i<livestock.length;i++){
          if(chance < odds2[i]+sum){
            totalMeat -= 1;
            loadGame.storedMeat[i] -= 1;
            loadGame.storedFood -=1;
            loadGame.meatStorageSpace += 1;
            hunger -= livestock[i].feed;
            localStorage.setItem("game",JSON.stringify(loadGame));
            loadGame = JSON.parse(localStorage.getItem("game"));
            saveVar();

          }
          else{
            sum += odds2[i];
          }
        }
      }
    }
    
    loadGame.distributedFood -= hunger;
  }

  function storeExtraCrops(){
    while(loadGame.cropStorageSpace > 0){
      var odds = []
      var totCrops=0;
      for(let j =0;j<crops.length;j++){
        if(loadGame.cropCount[j]>loadGame.keepCrop){
          totCrops += loadGame.cropCount[j]-loadGame.keepCrop;
        }
      }          
      if(totCrops>0){
        for(let j =0;j<crops.length;j++){
          if(loadGame.cropCount[j]>loadGame.keepCrop){
            odds.push((loadGame.cropCount[j]-loadGame.keepCrop)/totCrops);
          }
          else{
            odds.push(0);
          }
        }
        const chance2 = Math.random();
        var sum2 = 0;
        for(let j = 0;j<crops.length;j++){
          if(chance2 < odds[j]+sum2){
            loadGame.storedCrops[j] += 1;
            loadGame.storedFood +=1;
            loadGame.cropStorageSpace -= 1;
            loadGame.cropCount[j] -= 1;
            loadGame.unusedFarmLand +=1;
            break;
          }
          sum2+=odds[j]
        }
      }
      else{
        saveVar();
        return;
      }
    }
    saveVar();
  }

  function createSeedInterval(i){
    loadGame.seedPrice[i] = (Math.random()*crops[i].seedMult[0]+crops[i].seedMult[1]);
    localStorage.setItem("game",JSON.stringify(loadGame));
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
  }
  function createCropInterval(i){
    loadGame.cropSell[i] = (Math.random()*crops[i].cropMult[0]+crops[i].cropMult[1]);
    localStorage.setItem("game",JSON.stringify(loadGame));
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
  }
  function createLivestockPriceInterval(i){
    loadGame.livestockPrice[i] = (Math.random()*livestock[i].price[0]+livestock[i].price[1]);
    localStorage.setItem("game",JSON.stringify(loadGame));
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
  }

  useEffect(() => {
    manageCrops();
    manageLivestock();
    manageFood();
    manageTech();
    manageBuildings();
    manageMilitaryUnits();
    manageProjects();

    
    
    for (let i = 0;i<crops.length;i++){
      addCropInterval(i);
    }
    scienceInterval = setInterval(() => {
      loadGame.science += loadGame.scienceInt;
      saveVar();
    },loadGame.loadScienceTime);
    return()=>{

      clearInterval(scienceInterval);
    }
  })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function manageCrops(){
    var seedDiv = document.getElementById("seedDiv");
    while (seedDiv.firstChild) {
      seedDiv.removeChild(seedDiv.firstChild);
    }
    var cropDiv = document.getElementById("cropDiv");
    while (cropDiv.firstChild) {
      cropDiv.removeChild(cropDiv.firstChild);
    }
    var farmerDiv = document.getElementById("farmerDiv");
    while (farmerDiv.firstChild) {
      farmerDiv.removeChild(farmerDiv.firstChild);
    }
    var traderDiv = document.getElementById("traderDiv");
    while (traderDiv.firstChild) {
      traderDiv.removeChild(traderDiv.firstChild);
    }
    if(scienceFlags[0]===2){
      var farmerTag = document.createElement("button");
      farmerTag.setAttribute("class","buySeed");
      farmerTag.appendChild(document.createTextNode("Farmer"))
      farmerTag.onclick = (function(){
        buyFarmer();
      })
      farmerDiv.appendChild(farmerTag);
      farmerDiv.appendChild(document.createTextNode(" "+loadGame.totalFarmers));
      for(let i =loadGame.totalFarmers.toString().length;i<9;i++){
        farmerDiv.appendChild(document.createTextNode('\u00A0\u00A0'));
      }
      
      farmerDiv.appendChild(document.createTextNode("Keep "));
      var dec = document.createElement("button");
      dec.setAttribute("class", "increment");
      dec.appendChild(document.createTextNode("-"));
      dec.onclick = function(){
        if(loadGame.keepCrop >0){
          loadGame.keepCrop -=1;
          saveVar();
        }
      }
      farmerDiv.appendChild(dec);
      farmerDiv.appendChild(document.createTextNode(" "+loadGame.keepCrop+" "));
      var dec2 = document.createElement("button");
      dec2.setAttribute("class", "increment");
      dec2.appendChild(document.createTextNode("+"));
      dec2.onclick = function(){
        loadGame.keepCrop +=1;
        saveVar();
      }
      farmerDiv.appendChild(dec2);
      
      farmerDiv.appendChild(document.createElement("br"));
      farmerDiv.appendChild(document.createTextNode("Price: "+loadGame.farmerPrice.toFixed(2)+"g"));
      var traderTag = document.createElement("button");
      traderTag.setAttribute("class","buySeed");
      traderTag.appendChild(document.createTextNode("Trader"))
      traderTag.onclick = (function(){
        buyCropTrader();
      })
      traderDiv.appendChild(traderTag);
      traderDiv.appendChild(document.createTextNode(" "+loadGame.cropTraders+" "));
      var switchBtn = document.createElement("button");
      switchBtn.setAttribute("class","switch");
      if(loadGame.cropTraderStatus === 1){
        switchBtn.appendChild(document.createTextNode("Active"));
      }
      else{
        switchBtn.appendChild(document.createTextNode("Sleep"));
      }
      switchBtn.onclick = function(){
        if(cropTraderInterval){
          clearInterval(cropTraderInterval);
        }
        if(loadGame.cropTraderStatus === 1){
          loadGame.cropTraderStatus = 0
        }
        else{
          loadGame.cropTraderStatus = 1
          addCropTInterval();
        }
        saveVar();
      }
      traderDiv.append(switchBtn);
      traderDiv.appendChild(document.createElement("br"));
      traderDiv.appendChild(document.createTextNode("Price: "+loadGame.traderPrice.toFixed(2)+"g"));
    }
    
    for(let i = 0; i<crops.length;i++){
      if(crops[i].trigger()){
        displayCrop(crops[i]);
      }
    }
  }

  function displayCrop(t){
    
    var seedDiv = document.getElementById("seedDiv");
    
    var buySeed = document.createElement("button");
    buySeed.setAttribute("class", "buySeed");

    var title = document.createTextNode(t.id+"Seed");
    buySeed.appendChild(title);
    buySeed.onclick = (function(){
      t.buySeed();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    seedDiv.appendChild(buySeed);
    seedDiv.appendChild(document.createTextNode(" "+loadGame.seedsCount[t.index]));
    seedDiv.appendChild(document.createElement("br"));
    seedDiv.appendChild(document.createTextNode("Price: " + loadGame.seedPrice[t.index].toFixed(2)+"g"));

    var cropDiv = document.getElementById("cropDiv");
    var growCrop = document.createElement("button");
    growCrop.setAttribute("class", "buySeed");
    growCrop.appendChild(document.createTextNode("Grow"+t.id));
    growCrop.onclick = (function(){
      t.growCrop();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    cropDiv.appendChild(growCrop);
    cropDiv.appendChild(document.createTextNode(" "+loadGame.cropCount[t.index]));
    cropDiv.appendChild(document.createElement("br"));

    var sellCrop = document.createElement("button");
    sellCrop.setAttribute("class", "buySeed");
    sellCrop.appendChild(document.createTextNode("Sell"+t.id));
    sellCrop.onclick = (function(){
      t.sellCrop();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    cropDiv.appendChild(sellCrop);
    cropDiv.append(document.createTextNode(" "+loadGame.cropSell[t.index].toFixed(2)+"g"));

    var farmerDiv = document.getElementById("farmerDiv");
    farmerDiv.appendChild(document.createElement("br"));
    farmerDiv.appendChild(document.createTextNode(t.id+" Farmers "))
    var dec = document.createElement("button");
    dec.appendChild(document.createTextNode("-"));
    dec.onclick = (function(){
      addFarmer(t.index,-1);
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    dec.setAttribute("class","increment");
    farmerDiv.appendChild(dec);
    farmerDiv.appendChild(document.createTextNode(" "+loadGame.farmersCount[t.index]+" "));
    var dec2 = document.createElement("button");
    dec2.appendChild(document.createTextNode("+"));
    dec2.setAttribute("class","increment");
    dec2.onclick = (function(){
      addFarmer(t.index,1);
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    })
    farmerDiv.appendChild(dec2);
  }

  function manageLivestock(){
    var animalsDiv = document.getElementById("animalsDiv");
    while(animalsDiv.firstChild){
      animalsDiv.removeChild(animalsDiv.firstChild);
    }
    var herdersDiv = document.getElementById("herdersDiv");
    while(herdersDiv.firstChild){
      herdersDiv.removeChild(herdersDiv.firstChild);
    }
    var livestockTraderDiv = document.getElementById("livestockTraderDiv");
    while(livestockTraderDiv.firstChild){
      livestockTraderDiv.removeChild(livestockTraderDiv.firstChild);
    }
    for (let i = 0;i<livestock.length;i++){
      if(livestock[i].trigger()){
        displayLivestock(livestock[i]);
      }
    }

  }
  function displayLivestock(t){
    var animalsDiv = document.getElementById("animalsDiv");
    var animalButton = document.createElement("button");
    animalButton.setAttribute("class","buySeed");
    animalButton.appendChild(document.createTextNode("Sell"+t.id));
    animalButton.onclick = function(){
      t.sell();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    }
    animalsDiv.appendChild(animalButton);
    animalsDiv.appendChild(document.createTextNode(" "+loadGame.livestockCount[t.index]));
    animalsDiv.appendChild(document.createElement("br"));
    animalsDiv.appendChild(document.createTextNode("Price: "+loadGame.livestockPrice[t.index].toFixed(2)+"g"))
  }

  function manageFood(){
    var foodDiv = document.getElementById("foodDiv");
    while (foodDiv.firstChild) {
      foodDiv.removeChild(foodDiv.firstChild);
    }
    foodDiv.appendChild(document.createTextNode("Housing: "+(loadGame.housing-loadGame.unusedHousing)+"/"+loadGame.housing));
    foodDiv.appendChild(document.createElement("br"));
    foodDiv.appendChild(document.createTextNode("Reserved: "+loadGame.storedFood+" (-"+(loadGame.population*3)+")"))
    foodDiv.appendChild(document.createElement("br"));
    var tracker = 1;
    for(let i = 0;i<crops.length;i++){
      if(crops[i].scienceReq === null || scienceFlags[crops[i].scienceReq]===2){
        foodDiv.appendChild(document.createTextNode(crops[i].id+": "+loadGame.storedCrops[i]));
        for (let j =crops[i].id.length+loadGame.storedCrops[i].toString().length+2;j<17;j++){
          foodDiv.appendChild(document.createTextNode('\u00A0'))
        }
        if (tracker %3===0){
          foodDiv.appendChild(document.createElement("br"));
        }
        tracker+=1;
      }
    }
    for(let i = 0;i<livestock.length;i++){
      if(livestock[i].scienceReq ===null || scienceFlags[livestock[i].scienceReq]===2){
        foodDiv.appendChild(document.createTextNode(livestock[i].meat+": "+loadGame.storedMeat[i]));
        foodDiv.appendChild(document.createTextNode('\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'));
        if (tracker %3===0){
          foodDiv.appendChild(document.createElement("br"));
        }
        tracker+=1;
      }
    }
  }

  function manageTech(){
    var scienceDiv = document.getElementById("scienceDiv");
    while (scienceDiv.firstChild) {
      scienceDiv.removeChild(scienceDiv.firstChild);
    }
    scienceDiv.appendChild(document.createTextNode("Science: "+loadGame.science+" (+"+loadGame.scienceInt+")"));
    for(let i = 0;i<tech.length;i++){
      if(tech[i].trigger()){
        displayTech(tech[i]);
      }
    }
  }

  function displayTech(t){
    
    var tempdiv = document.getElementById("scienceDiv");
    t.element = document.createElement("button");
    t.element.setAttribute("id", t.id);
    t.element.setAttribute("class", "scienceButton");
    var span = document.createElement("span");
    span.style.fontWeight = "bold"
    //span.style.fontFamily = "Times New Roman"
    var title = document.createTextNode(t.title+" ");
    span.appendChild(title);
    var cost = document.createTextNode(t.priceTag+"\n");
    t.element.append(span);
    t.element.append(cost);
    var space = document.createElement("br");
    t.element.append(space);

    var span2 = document.createElement("span");
    var title2 = document.createTextNode(t.description+" ");
    span2.appendChild(title2);
    t.element.append(span2);

    t.element.onclick = (function(){canBuyScience(t)});
    
    tempdiv.appendChild(t.element);
  }

  function canBuyScience(t){
    t.effect();
    loadGame = JSON.parse(localStorage.getItem("game"));
    saveVar();
    if(t.cost <= loadGame.science){
      
      if(t.title === "Pastoralism"){
        beginWildAnimals();
      }
      
      if(t.id === "Tech1"){
        for(let i = 0;i<crops.length;i++){
          seedPriceIntervals[i] = setInterval(()=>{
            createSeedInterval(i);
          },(Math.random()*3+7)*1000);
          cropPriceIntervals[i] = setInterval(()=>{
            createCropInterval(i);
          },(Math.random()*3+7)*1000);
        }
        gameStart = 1;
      }
      if(t.id ==="animalHusbandryTech"){
        for(let i = 0;i<livestock.length;i++){
          livestockPriceIntervals[i] = setInterval(()=>{
            createLivestockPriceInterval(i);
          },(Math.random()*3+10)*1000);
        }
      }
    }
  }

  function manageBuildings(){
    var buildingDiv = document.getElementById("buildingDiv");
    while (buildingDiv.firstChild) {
      buildingDiv.removeChild(buildingDiv.firstChild);
    }
    for(let i = 0;i<buildings.length;i++){
      if(buildings[i].trigger()){
        displayBuilding(buildings[i]);
      }
    }
  }
  function displayBuilding(t){
    var buildingDiv = document.getElementById("buildingDiv");
    var button = document.createElement("button");
    button.setAttribute("class","buildingButton");
    button.appendChild(document.createTextNode(t.id));
    button.appendChild(document.createElement("br"));

    var description = document.createElement("a");
    description.setAttribute("class","ghostLabel");
    description.appendChild(document.createTextNode(t.description));
    button.appendChild(description);
    button.onclick = function(){
      t.effect();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    }
    
    buildingDiv.appendChild(button);
    buildingDiv.appendChild(document.createTextNode(" "+loadGame.buildingCount[t.index]));
    buildingDiv.appendChild(document.createElement("br"));
    buildingDiv.appendChild(document.createTextNode("Price: "));
    for(let i =0; i<t.price.length; i++){
      buildingDiv.appendChild(document.createTextNode(t.price[i]));
      buildingDiv.appendChild(document.createTextNode(resourceString[t.priceIndex[i]]+" "));
    }
    buildingDiv.appendChild(document.createElement("br"));

  }

  function manageMilitaryUnits(){
    var militaryDiv = document.getElementById("militaryUnitsDiv");
    while (militaryDiv.firstChild) {
      militaryDiv.removeChild(militaryDiv.firstChild);
    }
    for(let i = 0;i<military.length;i++){
      if(scienceFlags[military[i].scienceReq]===2){
        displayMilitaryUnit(military[i]);
      }
    }
  }

  function displayMilitaryUnit(t){
    
    var tempdiv = document.getElementById("militaryUnitsDiv");
    t.element = document.createElement("div");
    var button = document.createElement("button");
    
    t.element.setAttribute("id", t.id);
    button.setAttribute("class", "buyUnitButton");
    var span = document.createElement("a");
    var title = document.createTextNode(t.id);
    span.appendChild(title);
    button.appendChild(span);
    t.element.appendChild(button);

    var list = document.createElement("ul");
    list.setAttribute("class", "ghostLabel");
    list.append(document.createElement("li").appendChild(document.createTextNode("Range: " + t.range)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("Melee: " + t.melee)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("Strength: " + t.strength)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("IQ: " + t.iq)));
    list.append(document.createElement("br"));
    list.append(document.createElement("li").appendChild(document.createTextNode("Mobility: " + t.mobility)));
    button.appendChild(list);

    t.element.appendChild(document.createElement("br"));
    var cost = document.createTextNode("Cost: ");
    t.element.appendChild(cost);
    for(let i =0; i<t.price.length; i++){
      t.element.appendChild(document.createTextNode(t.price[i]));
      t.element.appendChild(document.createTextNode(resourceString[t.priceIndex[i]]+" "));
    }
    t.element.onclick = (function(){canBuyUnit(t)});
    tempdiv.appendChild(t.element);
  }
  function canBuyUnit(t){
    var canBuy = true;
    for(let i = 0;i<t.price.length; i++){
      if(i===0 && t.price[i]>loadGame.money){
        canBuy = false;
        return;
      }
    }
    if(canBuy){
      ///ADD POWER
      loadGame.money -=t.price[0];
    }
    saveVar();
  }
  
  function manageProjects(){
    var projectsDiv = document.getElementById("pDiv");
    while (projectsDiv.firstChild) {
      projectsDiv.removeChild(projectsDiv.firstChild);
    }
    for(let i = 0;i<projects.length;i++){
      
      if(projects[i].trigger()){
        
        displayProject(projects[i]);
      }
    }
  }

  function displayProject(t){
    var tempDiv = document.getElementById("pDiv");

    t.element = document.createElement("button");
    t.element.setAttribute("id", t.id);
    t.element.setAttribute("class","scienceButton");
    var span = document.createElement("span");
    span.style.fontWeight = "bold"
    var title = document.createTextNode(t.description+" ");
    span.appendChild(title);
    var cost = document.createTextNode(t.priceTag+"\n");
    t.element.append(span);
    t.element.append(cost);
    var space = document.createElement("br");
    t.element.append(space);

    var span2 = document.createElement("span");
    var title2 = document.createTextNode(t.description2+" ");
    span2.appendChild(title2);
    t.element.append(span2);
    t.element.onclick = (function(){canBuyProject(t)});
    tempDiv.appendChild(t.element);
  }
  function canBuyProject(t){
    if(t.cost <= loadGame.science){
      t.effect();
      loadGame = JSON.parse(localStorage.getItem("game"));
      saveVar();
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var T = 0;
  var T1 = 0;
  var anId = false;
  var startX = 0;
  var startY = 0;
  var rateX = 1;
  var rateY = 1;
  var wildAnimal = 0;
  var color = "";
  function beginWildAnimals(){
    anId = false;
    createWildAnimal();
    animationLoop();
  }
  function animationLoop(timeStamp){
    if(anId){
      return;
    }
    T+=rateX;
    T1+=rateY;
    draw();
    window.requestAnimationFrame(animationLoop);
    
  }
  function draw(){
    var canvas = document.getElementById("livestockConfigDiv");
    canvas.width = "140";
    canvas.height = "140";
    canvas.addEventListener("mousedown", function(e){
      getMousePosition(canvas,e);
    });
    var context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillStyle = color;
    context.beginPath();
    context.arc(startX+T,startY+T1,7,0,2*Math.PI)
    context.stroke();
    context.fill()
    
    if(startX+T > 170 || startY+T1>170 || startX+T<-20 || startY+T1< -20){
      context.clearRect(0,0,canvas.width, canvas.height);
      T = 0;
      T1 = 0;
      startX=0;
      startY=0;
      window.cancelAnimationFrame(anId);
      anId = true;
      setTimeout(() => {beginWildAnimals();}, (Math.random()*5+5)*1000);
    }
  }
  function getMousePosition(canvas,event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    var x0 = startX+T;
    var y0 = startY+T1;
    if(Math.sqrt((x0-x)**2+(y0-y)**2)<7){
      canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
      T = 0;
      T1 = 0;
      startX=0;
      startY=0;
      window.cancelAnimationFrame(anId);
      anId = true;
      canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
      getWildAnimal(wildAnimal);
      saveVar();
      setTimeout(() => {beginWildAnimals();}, (Math.random()*5+5)*1000);
      
    }
  }
  function getWildAnimal(i){
    if(loadGame.unusedLivestockLand > 0){
      loadGame.livestockCount[i] += 1;
      loadGame.unusedLivestockLand -= 1;
      saveVar();
    }
  }
  function createWildAnimal(){
    var animalColors = ["#fff8dc","#66422D"]
    var top = Math.random();
    var left = Math.random();
    if(top <0.5){
      startX = Math.random()*-10+0.01
      rateX = Math.random()*1.8+0.1;
    }
    else{
      startX = Math.random()*10+150
      rateX = Math.random()*-1.8+0.1;
    }
    if(left<0.5){
      startY = Math.random()*-10+0.01
      rateY = Math.random()*1.8+0.1;
    }
    else{
      startY = Math.random()*10+150
      rateY = Math.random()*-1.8+0.1;
    }
    wildAnimal = Math.floor(Math.random()*2);
    color = animalColors[wildAnimal];
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function incrementFarmLand(x){
    if(x === -1 && (loadGame.farmLand <= 0 || loadGame.unusedFarmLand <= 0)){
      return;
    }
    if(x === 1 && (loadGame.unusedLand <= 0)){
      return;
    }
    loadGame.unusedLand -= x;
    loadGame.farmLand += x;
    loadGame.unusedFarmLand += x
    saveVar();
  }
  function incrementLivestockLand(x){
    if(x === -1 && (loadGame.livestockLand <= 0 || loadGame.unusedLivestockLand <= 5)){
      return;
    }
    if(x === 1 && (loadGame.unusedLand <= 5)){
      return;
    }
    
    loadGame.unusedLand -= (5*x);
    loadGame.livestockLand += x;
    loadGame.unusedLivestockLand += 5*x
    saveVar();
  }
  function addCropInterval(i){
    
    if(loadGame.farmersCount[i] <= 0){
      growIntervals[i] = setInterval(() => {},loadGame.farmerSpeed * 1000/(loadGame.farmersCount[i]));
    }
    else{
      growIntervals[i] = setInterval(() => {
        crops[i].growCrop();
        if(projects[2].flag===1){
          if(loadGame.seedsCount[i] <=0){
            crops[i].buySeed(i);
          }
        }
        loadGame = JSON.parse(localStorage.getItem("game"));
        saveVar();
      },loadGame.farmerSpeed * 1000/(loadGame.farmersCount[i]));
    }
  }

  function addCropTInterval(){
    if(loadGame.cropTraders <= 0){
      cropTraderInterval = setInterval(() => {},loadGame.traderSpeed * 1000/(loadGame.cropTraders));
    }
    else{
      cropTraderInterval = setInterval(() => {
        sellCrop();
      },loadGame.traderSpeed * 1000/(loadGame.cropTraders));
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyLand(){
    if (loadGame.landPrice <= loadGame.money){
      loadGame.land += 1;
      loadGame.unusedLand += 1;
      loadGame.money -= loadGame.landPrice;
      loadGame.landPrice *= (Math.random()*0.2+1);
      saveVar();
    }
  }
  function sellCrop(){
    
    var totalCrops = 0;
    for(let i =0;i<crops.length;i++){
      totalCrops += loadGame.cropCount[i];
    }
    if (totalCrops > 0){
      var odds = []
      for(let i =0;i<crops.length;i++){
        odds.push(loadGame.cropCount[i]/totalCrops)
      }
      const chance = Math.random();
      var sum = 0;
      for(let i =0;i<crops.length;i++){
        if(chance <odds[i]+sum){
          crops[i].sellCrop();
          loadGame = JSON.parse(localStorage.getItem("game"));
          saveVar();
          break;
        }
        else{
          sum += odds[i];
        }
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyFarmer(){
    if(loadGame.farmerPrice <= loadGame.money && loadGame.unusedHousing > 0){
      loadGame.unusedHousing -= 1;
      loadGame.money -= loadGame.farmerPrice;
      loadGame.farmerPrice *= (1+Math.random()*0.1);
      loadGame.totalFarmers +=1;
      loadGame.unusedFarmers +=1;
      loadGame.population += 1;
      saveVar()
    }
  }
  function addFarmer(i,b){
    if((loadGame.unusedFarmers > 0 && b === 1) || (loadGame.farmersCount[i] > 0 && b === -1)){
      loadGame.unusedFarmers -= b;
      loadGame.farmersCount[i] += b;
      if(growIntervals[i] !== null){
        clearInterval(growIntervals[i]);
      }
      addCropInterval(i);
      saveVar();
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function buyCropTrader(){
    if(loadGame.traderPrice <= loadGame.money){
      loadGame.money -= loadGame.traderPrice;
      loadGame.traderPrice *= (1+Math.random()*0.1);
      loadGame.cropTraders +=1;
      loadGame.population += 1;
      if(cropTraderInterval){
        clearInterval(cropTraderInterval);
      }
      addCropTInterval();
      saveVar();
    }
  }
  return(
    <>
      <Header/>
      <h2 style = {{fontSize: '1.5rem',fontWeight:'bold', fontFamily:'Times New Roman'}}>
        Gold:<span> </span>
        <span id = "money"> {loadGame.money.toFixed(2)}</span>
        <br/>
        Population:<span> </span>
        <span id = "population"> {loadGame.population}</span>
        <span> (</span>
        <span id = "unusedPopulation">{loadGame.unusedPopulation}</span>
        <span>)</span>
        <br/>
        Land:<span> </span>
        <span id = "land">{loadGame.land}</span>
        <span> (</span>
        <span id = "unusedLand">{loadGame.unusedLand}</span>
        <span>)</span>
      </h2>
      <div style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}> 
        <button className = "buySeed" onClick ={()=>buyLand()}>Land</button>
        <br/>
        Price:<span> </span>
        <span id = "landPrice" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>{loadGame.landPrice.toFixed(2)}</span>
        g
      </div>
      
      <br/>
      <div id = "mainDiv">
        <div id = "columnA" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <b>Agriculture</b> <span> </span>
          <button className = "increment" onClick = {()=>incrementFarmLand(-1)}>-</button> <span> </span>
          <span id = "farmLand">{loadGame.farmLand}</span> <span> </span>
          <button className = "increment" onClick = {()=>incrementFarmLand(1)}>+</button> <span> </span>
          <hr/>
          
          <div id = "farmDiv">
            <div id = "seedDiv"></div>
            <div id = "cropDiv"></div>
            <div id = "farmerDiv"></div>
            <div id = "traderDiv"></div>
          </div>
          
          <br/>
          <b>Livestock</b> <span> </span>
          <button className = "increment" onClick = {()=>incrementLivestockLand(-1)}>-</button> <span> </span>
          <span id = "livestockLand">{loadGame.livestockLand}</span> <span> </span>
          <button className = "increment" onClick = {()=>incrementLivestockLand(1)}>+</button> <span> </span>
          <hr/>
          <div id = "livestockDiv">
            
            <div id = "animalsDiv"></div>
            <canvas id = "livestockConfigDiv"></canvas>
            <div id = "herdersDiv"></div>
            <div id = "livestockTraderDiv"></div>
          </div>

          <br/>

          <div id = "miningDiv">
          <b>Mining</b>
          <hr/>
          </div>

        </div>
        <div id = "columnB" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <b>Food</b>
          <hr/>
          <div id = "foodDiv">
            
          </div>
          <div id = "techDiv">
            <b>Technology</b>
            <hr/>

            <div id = "scienceDiv">
            </div>
          </div>
          <div id = "projectDiv">
            <b>Projects</b>
            <hr/>
            <div id = "pDiv">
            </div>
            
          </div>
        </div>
        <div id = "columnC" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <b>Buildings</b>
            <hr/>
          <div id = "buildingDiv">

          </div>
          <b>Military</b>
          <hr/>
          <div id = "militaryDiv">
            
            Total Power:<span> </span>
            <span id = "totalMilitaryPower">{loadGame.totalMilitaryPower}</span>
            <div id = "militaryUnitsDiv">

            </div>
          </div>

        </div>
        <div id = "columnD" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>

        </div>
      </div>
    </>
  )
  
}

export default App;
