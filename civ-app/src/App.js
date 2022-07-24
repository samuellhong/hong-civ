import './App.css';
import React, { useEffect } from 'react';
import {game} from './variables/vars.js';
import {crops_} from './variables/crops.js';
import {techs} from './variables/tech.js';
import {army} from './variables/army.js';
import {livestock_} from './variables/livestock.js';
import {projects_} from './variables/projects.js';
import Header from './components/Header';

var projects = projects_;
var crops = crops_;
var tech = techs;
var military = army;
var livestock = livestock_;

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
const resourceString = ["g", "wood", "stone"]
var loadGame;
  
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
loadGame = JSON.parse(localStorage.getItem("game"));

const App = () =>{
  
  
  function saveVar(){

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
    manageTech();
    manageMilitaryUnits();
    manageProjects();
    
    loadGame.resources = [loadGame.money];

    localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
    document.getElementById("money").innerHTML = loadGame.money.toFixed(2);
    document.getElementById("population").innerHTML = loadGame.population;
    document.getElementById("unusedPopulation").innerHTML = loadGame.unusedPopulation;
    document.getElementById("science").innerHTML = loadGame.science;
    document.getElementById("land").innerHTML = loadGame.land;
    document.getElementById("unusedLand").innerHTML = loadGame.unusedLand;
    document.getElementById("landPrice").innerHTML = loadGame.landPrice.toFixed(2);
    document.getElementById("farmLand").innerHTML = loadGame.farmLand;

    document.getElementById("totalMilitaryPower").innerHTML = loadGame.totalMilitaryPower;

    localStorage.setItem("game",JSON.stringify(loadGame));

  }

  useEffect(() => {
    manageCrops();
    manageLivestock();
    manageTech();
    manageMilitaryUnits();
    manageProjects();
    
    for (let i = 0;i<crops.length;i++){
      addCropInterval(i);
    }

    

    const cornSeedInterval = setInterval(() => {
      adjustCornSeedPrice();
    },(Math.random()*3+7)*1000);
    const wheatSeedInterval = setInterval(() => {
      adjustWheatSeedPrice();
    },(Math.random()*3+7)*1000);
    const melonSeedInterval = setInterval(() => {
      adjustMelonSeedPrice();
    },(Math.random()*3+7)*1000);
    const cornSellInterval = setInterval(() => {
      adjustCornSell();
    },(Math.random()*3+7)*1000);
    const wheatSellInterval = setInterval(() => {
      adjustWheatSell();
    },(Math.random()*3+7)*1000);
    const melonSellInterval = setInterval(() => {
      adjustMelonSell();
    },(Math.random()*3+7)*1000);
    scienceInterval = setInterval(() => {
      loadGame.science += loadGame.population;
      document.getElementById("science").innerHTML = loadGame.science;
      saveVar();
    },loadGame.loadScienceTime);
    return()=>{
      clearInterval(cornSeedInterval);
      clearInterval(wheatSeedInterval);
      clearInterval(melonSeedInterval);
      clearInterval(cornSellInterval);
      clearInterval(wheatSellInterval);
      clearInterval(melonSellInterval);
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
      farmerDiv.appendChild(document.createElement("br"));
      farmerDiv.appendChild(document.createTextNode("Price: "+loadGame.farmerPrice.toFixed(2)+"g"));
      var traderTag = document.createElement("button");
      traderTag.setAttribute("class","buySeed");
      traderTag.appendChild(document.createTextNode("Trader"))
      traderTag.onclick = (function(){
        buyCropTrader();
      })
      traderDiv.appendChild(traderTag);
      traderDiv.appendChild(document.createTextNode(" "+loadGame.cropTraders));
      traderDiv.appendChild(document.createElement("br"));
      traderDiv.appendChild(document.createTextNode("Price: "+loadGame.traderPrice.toFixed(2)+"g"));
    }
    
    for(let i = 0; i<crops.length;i++){
      if(scienceFlags[crops[i].scienceReq]===2){
        displayCrop(crops[i]);
      }
    }
  }

  function displayCrop(t){
    
    var seedDiv = document.getElementById("seedDiv");
    
    var buySeed = document.createElement("button");
    buySeed.setAttribute("class", "buySeed");

    var title = document.createTextNode(t.seedDescription);
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
    growCrop.appendChild(document.createTextNode(t.growDescription));
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
    sellCrop.appendChild(document.createTextNode(t.sellDescription));
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
      if(scienceFlags[livestock[i].scienceReq] === 2){
        displayLivestock(livestock[i]);
      }
    }
    //var livestockConfigDiv = document.getElementById("livestockConfigDiv");
    //while(livestockConfigDiv.firstChild){
    //  livestockConfigDiv.removeChild(livestockConfigDiv.firstChild);
   // }
    //livestockConfigDiv.appendChild(document.createTextNode("Keep:"))
  }
  function displayLivestock(t){
    var animalsDiv = document.getElementById("animalsDiv");
    var animalButton = document.createElement("button");
    animalButton.setAttribute("class","buySeed")
    animalButton.appendChild(document.createTextNode(t.id))
    animalsDiv.appendChild(animalButton);
    animalsDiv.appendChild(document.createTextNode(" "+loadGame.livestockCount[t.index]));
    animalsDiv.appendChild(document.createElement("br"));
    animalsDiv.appendChild(document.createTextNode("Price: "+loadGame.livestockPrice[t.index].toFixed(2)+"g"))
  }

  function manageTech(){
    var scienceDiv = document.getElementById("scienceDiv");
    while (scienceDiv.firstChild) {
      scienceDiv.removeChild(scienceDiv.firstChild);
    }
    for(let i = 0;i<tech.length;i++){
      var temp = true;
      if(tech[i].next !== null && scienceFlags[tech[i].next]!==2){
        temp = false;
      }
      if(tech[i].next1 !== null && scienceFlags[tech[i].next1] !==2){
        temp = false;
      }
      if(tech[i].flag ===0 && temp){
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
    if(t.cost <= loadGame.science){
      if(t.title === "Pastoralism"){
        beginWildAnimals();
      }
      loadGame.science -= t.cost;
      t.effect();
      saveVar();
    }
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
      var temp = true;
      if (projects[i].scienceReq !== null && scienceFlags[projects[i].scienceReq] !== 2){
        temp = false;
      }
      if (projects[i].projectReq !== null && projectsFlags[projects[i].projectReq] !== 1){
        temp = false;
      }
      
      if(projects[i].flag ===0 && temp){
        
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
      loadGame.science -= t.cost;
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
  function adjustCornSeedPrice(){
    loadGame.cornSeedPrice = (Math.random()*.1+0.01);
    loadGame.seedPrice[0] = loadGame.cornSeedPrice;
    localStorage.setItem("game",JSON.stringify(loadGame));
    manageCrops();
  } 
  function adjustWheatSeedPrice(){
    loadGame.wheatSeedPrice =(Math.random()*.3+.31);
    loadGame.seedPrice[1] = loadGame.wheatSeedPrice;
    localStorage.setItem("game",JSON.stringify(loadGame));
    manageCrops();
  } 
  function adjustMelonSeedPrice(){
    
    loadGame.melonSeedPrice =(Math.random()*2+2.01);
    loadGame.seedPrice[2] = loadGame.melonSeedPrice;
    localStorage.setItem("game",JSON.stringify(loadGame));
    manageCrops();
  } 
  function adjustCornSell(){
    loadGame.cornSell = (Math.random()*.2+0.11);
    loadGame.cropSell[0] = loadGame.cornSell;
    localStorage.setItem("game",JSON.stringify(loadGame));
    manageCrops();
  }
  function adjustWheatSell(){
    loadGame.wheatSell = (Math.random()+1.00);
    loadGame.cropSell[1] = loadGame.wheatSell;
    localStorage.setItem("game",JSON.stringify(loadGame));
    manageCrops();
    
  }
  function adjustMelonSell(){
    loadGame.melonSell = (Math.random()*4+4.01);
    loadGame.cropSell[2] = loadGame.melonSell;
    localStorage.setItem("game",JSON.stringify(loadGame));
    manageCrops();
  }
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
      if(wildAnimal === 0){
        loadGame.livestockCount[0] += 1;
      }
      saveVar();
      setTimeout(() => {beginWildAnimals();}, (Math.random()*5+5)*1000);
      
    }
  }
  function createWildAnimal(){
    var animalColors = ["#FFBDF9","#66422D","#fff8dc"]
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
    wildAnimal = Math.floor(Math.random()*3);
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
        manageCrops();
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
          manageCrops();
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
    if(loadGame.farmerPrice <= loadGame.money){
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
      manageCrops();
      saveVar();
    }
  }

  return(
    <>
      <Header/>
      <h2 style = {{fontSize: '1.5rem',fontWeight:'bold', fontFamily:'Times New Roman'}}>
        Gold:
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
          <button className = "increment" >-</button> <span> </span>
          <span id = "farmLand">{loadGame.livestockLand}</span> <span> </span>
          <button className = "increment" >+</button> <span> </span>
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
          <div id = "techDiv">
            <b>Technology</b>
            <hr/>
            Science:<span> </span>
            <span id = "science">{loadGame.science}</span>
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
