import './App.css';
import React, { useState, useEffect } from 'react';
import {game} from './variables/vars.js';
import {techs} from './variables/tech.js';
import {army} from './variables/army.js';
import Header from './components/Header';

var tech = [];
tech = techs;
var military = [];
military = army;
/*
if(true){
  var scienceFlags = []
  for(let i = 0; i<tech.length;i++){
    localStorage.setItem("game",JSON.stringify(game));
    scienceFlags.push(tech[i].flag);
  }
  localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
  var militaryFlags = []
  for(let i = 0; i<military.length;i++){
    localStorage.setItem("game",JSON.stringify(game));
    militaryFlags.push(military[i].flag);
  }
  localStorage.setItem("scienceFlags",JSON.stringify(militaryFlags));
}

*/
var cornInterval;
var wheatInterval;
var melonInterval;
var scienceInterval;
const resourceString = ["g", "w", "s"]
const App = () =>{
  
  var loadGame;
  
  var scienceFlags = [];
  
  
  if (localStorage.getItem("game") === "undefined"){
    localStorage.setItem("game",JSON.stringify(game));
  }
  if (localStorage.getItem("scienceFlags") === "undefined"){
    for(let i = 0; i<tech.length;i++){
      scienceFlags.push(tech[i].flag);
    }
    localStorage.setItem("scienceFlags",JSON.stringify(scienceFlags));
  }
  
  scienceFlags = JSON.parse(localStorage.getItem("scienceFlags"));

  loadGame = JSON.parse(localStorage.getItem("game"));
  
  //for(let i = 0; i<tech.length;i++){
   // tech[i].flag = scienceFlags[i];
  //}
  
  const [stage, setStage] = useState(loadGame.stage);
  const stageIncrements = [5,20,100,800];
  const [techFlag, setTechFlag] = useState(scienceFlags);
  
  function saveVar(){
    //loadGame.stage = 4
    //setStage(loadGame.stage);
    
    manageTech();
    manageMilitaryUnits();
    
    if(loadGame.money >= stageIncrements[stage]){
      loadGame.stage +=1;
      setStage(loadGame.stage);
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
    scienceFlags = []
    for(let i = 0; i<tech.length; i++){
      scienceFlags.push(tech[i].flag);
    }

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

    document.getElementById("cornSeedsCount").innerHTML = loadGame.cornSeedsCount;
    document.getElementById("cornCount").innerHTML = loadGame.cornCount;

    document.getElementById("totalMilitaryPower").innerHTML = loadGame.totalMilitaryPower;
    if(stage >=1){
      document.getElementById("wheatSeedsCount").innerHTML = loadGame.wheatSeedsCount;
      document.getElementById("wheatCount").innerHTML = loadGame.wheatCount;
    }
    if(stage >= 2){
      document.getElementById("melonSeedsCount").innerHTML = loadGame.melonSeedsCount;
      document.getElementById("melonCount").innerHTML = loadGame.melonCount;
    }
    if(stage >= 3){
      document.getElementById("totalFarmers").innerHTML = loadGame.totalFarmers;
      document.getElementById("cornFarmers").innerHTML = loadGame.cornFarmers;
      document.getElementById("wheatFarmers").innerHTML = loadGame.wheatFarmers;
      document.getElementById("melonFarmers").innerHTML = loadGame.melonFarmers;
      document.getElementById("farmerPrice").innerHTML = loadGame.farmerPrice.toFixed(2);
    }
    if(stage >= 4){
      document.getElementById("totalTraders").innerHTML = loadGame.totalTraders;
    }
    //clearInterval(scienceInterval);
    //scienceInterval = setInterval(() => {
     // loadGame.science += loadGame.population;
     // localStorage.setItem("game",JSON.stringify(loadGame));
    //},loadGame.loadScienceTime);
  }

  function addCornInterval(){
    if(loadGame.cornFarmers <= 0){
      cornInterval = setInterval(() => {},loadGame.farmerSpeed * 1000/(loadGame.cornFarmers));
    }
    else{
      cornInterval = setInterval(() => {
        growCorn();
      },loadGame.farmerSpeed * 1000/(loadGame.cornFarmers));
    }
  }
  function addWheatInterval(){
    if(loadGame.wheatFarmers <= 0){
      wheatInterval = setInterval(() => {},loadGame.farmerSpeed * 1000/(loadGame.wheatFarmers));
    }
    else{
      wheatInterval = setInterval(() => {
        growWheat();
      },loadGame.farmerSpeed * 1000/(loadGame.wheatFarmers));
    }
  }
  function addMelonInterval(){
    if(loadGame.melonFarmers <= 0){
      melonInterval = setInterval(() => {},loadGame.farmerSpeed * 1000/(loadGame.melonFarmers));
    }
    else{
      melonInterval = setInterval(() => {
        growMelon();
      },loadGame.farmerSpeed * 1000/(loadGame.melonFarmers));
    }
  }

  useEffect(() => {
    
    manageTech();
    manageMilitaryUnits();

    addCornInterval();
    addWheatInterval();
    addMelonInterval();

    const cornSeedInterval = setInterval(() => {
      adjustCornSeedPrice();
    },(Math.random()*3+7)*1000);
    if(stage>=1){}
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

  function manageTech(){
    var scienceDiv = document.getElementById("scienceDiv");
    while (scienceDiv.firstChild) {
      scienceDiv.removeChild(scienceDiv.firstChild);
    }
    for(let i = 0;i<tech.length;i++){
      if(tech[i].flag ===0){
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
      if(t.id === "animalHusbandryTech"){
        setTechFlag([1,tech[1].flag]);
      }
      if(t.id === "miningTech"){
        setTechFlag([tech[0].flag,1]);
      }
      loadGame.science -= t.cost;
      for(let i = 0; i<t.next.length;i++){
        tech[t.next[i]].flag = 0;
      }
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
      if(military[i].flag ===1){
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
    var span = document.createElement("span");
    span.style.fontWeight = "bold"
    //span.style.fontFamily = "Times New Roman"
    var title = document.createTextNode(t.id);
    span.appendChild(title);
    button.appendChild(span);
    t.element.appendChild(button)
    t.element.appendChild(document.createElement("br"));
    var cost = document.createTextNode("Cost: ");
    t.element.appendChild(cost);
    for(let i =0; i<t.price.length; i++){
      t.element.appendChild(document.createTextNode(t.price[i]));
      t.element.appendChild(document.createTextNode(resourceString[t.priceIndex[i]]));
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
      loadGame.money -=t.price[0];
    }
    saveVar();
  }
  

  function adjustCornSeedPrice(){
    loadGame.cornSeedPrice = (Math.random()*.1+0.01);
    document.getElementById("cornSeedPrice").innerHTML = loadGame.cornSeedPrice.toFixed(2);
  } 
  function adjustWheatSeedPrice(){
    if(stage>=1){
      var wheatSeedPrice = document.getElementById("wheatSeedPrice");
      loadGame.wheatSeedPrice = (Math.random()*.3+.31);
      wheatSeedPrice.innerHTML = loadGame.wheatSeedPrice.toFixed(2);
    }
  } 
  function adjustMelonSeedPrice(){
    if(stage >=2){
      var melonSeedPrice = document.getElementById("melonSeedPrice");
      loadGame.melonSeedPrice = (Math.random()*2+2.01);
      melonSeedPrice.innerHTML = loadGame.melonSeedPrice.toFixed(2);
    }
  } 
  function adjustCornSell(){
    loadGame.cornSell = (Math.random()*.2+0.11);
    document.getElementById("cornSell").innerHTML = loadGame.cornSell.toFixed(2);
  }
  function adjustWheatSell(){
    if(stage >=1){
      loadGame.wheatSell = (Math.random()+1.00);
      document.getElementById("wheatSell").innerHTML = loadGame.wheatSell.toFixed(2);
    }
    
  }
  function adjustMelonSell(){
    if(stage >=2){
      loadGame.melonSell = (Math.random()*4+4.01);
      document.getElementById("melonSell").innerHTML = loadGame.melonSell.toFixed(2);
    }
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
    //loadGame.land -= x;
    loadGame.farmLand += x;
    loadGame.unusedFarmLand += x
    saveVar();
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyLand(){
    if (loadGame.landPrice <= loadGame.money){
      loadGame.land += 1;
      loadGame.unusedLand += 1;
      loadGame.money -= loadGame.landPrice;
      loadGame.landPrice *= (Math.random()*0.2+1);
      saveVar()
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyCornSeed(){
    if(loadGame.cornSeedPrice <= loadGame.money){
      loadGame.cornSeedsCount += loadGame.seedBundle;
      loadGame.money -= loadGame.cornSeedPrice;
      saveVar();
    }
  }
  function growCorn(){
    
    if(loadGame.cornSeedsCount > 0 && loadGame.unusedFarmLand > 0){
      loadGame.cornSeedsCount -= 1;
      if(Math.random() < loadGame.cornGrowChance){
        loadGame.cornCount += 1;
        loadGame.unusedFarmLand -=1;
      }
      saveVar();
    }
  }
  function sellCorn(){
    
    if(loadGame.cornCount > 0){
      loadGame.cornCount -= 1;
      loadGame.money += loadGame.cornSell;
      loadGame.unusedFarmLand +=1;
      saveVar();
      
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyWheatSeed(){
    if(loadGame.wheatSeedPrice <= loadGame.money){
      loadGame.wheatSeedsCount += loadGame.seedBundle;
      loadGame.money -= loadGame.wheatSeedPrice;
      saveVar();
    }
    
  }
  function growWheat(){
    if(loadGame.wheatSeedsCount > 0 && loadGame.unusedFarmLand > 0 ){
      loadGame.wheatSeedsCount -= 1;
      if(Math.random() < loadGame.wheatGrowChance){
        loadGame.wheatCount += 1;
        loadGame.unusedFarmLand -=1;
      }
      saveVar();
    }
  }
  function sellWheat(){
    if(loadGame.wheatCount > 0){
      loadGame.wheatCount -= 1;
      loadGame.money += loadGame.wheatSell;
      loadGame.unusedFarmLand +=1;
      saveVar();
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function buyMelonSeed(){
    if(loadGame.melonSeedPrice <= loadGame.money){
      loadGame.melonSeedsCount += loadGame.seedBundle;
      loadGame.money -= loadGame.melonSeedPrice;
      saveVar();
    }
    
  }
  function growMelon(){
    if(loadGame.melonSeedsCount > 0 && loadGame.unusedFarmLand > 0){
      loadGame.melonSeedsCount -= 1;
      if(Math.random() < loadGame.melonGrowChance){
        loadGame.melonCount += 1;
        loadGame.unusedFarmLand -=1;
      }
      saveVar();
    }
  }
  function sellMelon(){
    if(loadGame.melonCount > 0){
      loadGame.melonCount -= 1;
      loadGame.money += loadGame.melonSell;
      loadGame.unusedFarmLand +=1;
      saveVar();
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
  function addCornFarmer(b){
    if((loadGame.unusedFarmers > 0 && b === 1) || (loadGame.cornFarmers > 0 && b === -1)){
      loadGame.unusedFarmers -= b;
      loadGame.cornFarmers += b;
      if(cornInterval){
        clearInterval(cornInterval);
      }
      addCornInterval();
      saveVar()
    }
  }
  function addWheatFarmer(b){
    if((loadGame.unusedFarmers > 0 && b === 1) || (loadGame.wheatFarmers > 0 && b === -1)){
      loadGame.unusedFarmers -= b;
      loadGame.wheatFarmers += b;
      if(wheatInterval){
        clearInterval(wheatInterval);
      }
      addWheatInterval();
      saveVar()
    }
  }
  function addMelonFarmer(b){
    if((loadGame.unusedFarmers > 0 && b === 1) || (loadGame.melonFarmers > 0 && b === -1)){
      loadGame.unusedFarmers -= b;
      loadGame.melonFarmers += b;
      if(melonInterval){
        clearInterval(melonInterval);
      }
      addMelonInterval();
      saveVar();
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
          
          <div id = "farmDiv">
            <b>Agriculture</b> <span> </span>
            <button className = "increment" onClick = {()=>incrementFarmLand(-1)}>-</button> <span> </span>
            <span id = "farmLand">{loadGame.farmLand}</span> <span> </span>
            <button className = "increment" onClick = {()=>incrementFarmLand(1)}>+</button> <span> </span>
            <hr/>
            <div id = "seedDiv">
              <button className = "buySeed" onClick = {()=>buyCornSeed()}>CornSeed</button> <span> </span>
              <span id = "cornSeedsCount"> {loadGame.cornSeedsCount}</span>
              <br/>
              Price:<span> </span>
              <span id = "cornSeedPrice"> {loadGame.cornSeedPrice.toFixed(2)}</span>
              g
              <br/>
              {
                (stage >= 1) && 
                <>
                  <button className = "buySeed" onClick = {()=>buyWheatSeed()}>WheatSeed</button> <span> </span>
                  <span id = "wheatSeedsCount"> {loadGame.wheatSeedsCount}</span>
                  <br/>
                  Price:<span> </span>
                  <span id = "wheatSeedPrice"> {loadGame.wheatSeedPrice.toFixed(2)}</span>
                  g
                </>
              }
              
              <br/>
              {
                (stage >= 2) &&
                <>
                  <button className = "buySeed" onClick = {()=>buyMelonSeed()}>MelonSeed</button> <span> </span>
                  <span id = "melonSeedsCount"> {loadGame.melonSeedsCount}</span>
                  <br/>
                  Price:<span> </span>
                  <span id = "melonSeedPrice"> {loadGame.melonSeedPrice.toFixed(2)}</span>
                  g
                </>
              }
              
            </div>
            
            <div id = "cropDiv">
              <button className = "growCrop" onClick = {()=>growCorn()}>GrowCorn</button> <span> </span>
              <span id = "cornCount"> {loadGame.cornCount}</span>
              <br/>
              <button className = "growCrop" onClick = {()=>sellCorn()}>SellCorn</button> <span> </span>
              <span> </span>
              <span id = "cornSell"> {loadGame.cornSell.toFixed(2)}</span>
              g
              <br/>
              {
                (stage>=1) &&
                <>
                  <button className = "growCrop" onClick = {()=>growWheat()}>GrowWheat</button> <span> </span>
                  <span id = "wheatCount"> {loadGame.wheatCount}</span>
                  <br/>
                  <button className = "growCrop" onClick = {()=>sellWheat()}>SellWheat</button> <span> </span>
                  <span id = "wheatSell"> {loadGame.wheatSell.toFixed(2)}</span>
                  g
                </> 
              }
              <br/>
              {
                (stage>=2) &&
                <>
                  <button className = "growCrop" onClick = {()=>growMelon()}>GrowMelon</button> <span> </span>
                  <span id = "melonCount"> {loadGame.melonSeedsCount}</span>
                  <br/>
                  <button className = "growCrop" onClick = {()=>sellMelon()}>SellMelon</button> <span> </span>
                  <span id = "melonSell"> {loadGame.melonSell.toFixed(2)}</span>
                g
                </>
              }
              
            </div>

            <div id = "farmerDiv">
            {
              (stage >= 3) &&
              <>
                <button className = "buySeed" onClick = {()=>buyFarmer()}>Farmer</button> <span> </span>
                <span id = "totalFarmers">{loadGame.totalFarmers}</span> <span> </span>
                <br/>
                Price:<span> </span>
                <span id = "farmerPrice"> {loadGame.farmerPrice.toFixed(2)}</span>
                g
                <br/>
                Corn Farmers:<span> </span>
                <button className = "increment" onClick = {()=>addCornFarmer(-1)}>-</button> <span> </span>
                <span id = "cornFarmers">{loadGame.cornFarmers}</span> <span> </span>
                <button className = "increment" onClick = {()=>addCornFarmer(1)}>+</button> <span> </span>
                <br/>
                Wheat Farmers:<span> </span>
                <button className = "increment" onClick = {()=>addWheatFarmer(-1)}>-</button> <span> </span>
                <span id = "wheatFarmers">{loadGame.wheatFarmers}</span> <span> </span>
                <button className = "increment" onClick = {()=>addWheatFarmer(1)}>+</button> <span> </span>
                <br/>
                Melon Farmers:<span> </span>
                <button className = "increment" onClick = {()=>addMelonFarmer(-1)}>-</button> <span> </span>
                <span id = "melonFarmers">{loadGame.melonFarmers}</span> <span> </span>
                <button className = "increment" onClick = {()=>addMelonFarmer(1)}>+</button> <span> </span>
              </>
            }
            </div>

            <div id = "traderDiv">
            {
              (stage >= 4) &&
              <>
                <button className = "buySeed">Trader</button> <span> </span>
                <span id = "totalTraders">{loadGame.totalTraders}</span>
                <br/>
                Price:<span> </span>
                <span id = "traderPrice">{loadGame.traderPrice.toFixed(2)}</span>
                g
              </>
            }
            </div>
          </div>
          <br/>
          {
            (techFlag[0]  === 1) &&
            <>
              <div id = "livestockDiv">
              <b>Livestock</b>
              <hr/>
              </div>
            </>
          }
          <br/>
          {
            (techFlag[1] === 1) &&
            <>
              <div id = "miningDiv">
              <b>Mining</b>
              <hr/>
              </div>
            </>
          }
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
        </div>
        <div id = "columnC" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
          <div id = "militaryDiv">
            <b>Military</b>
            <hr/>
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
