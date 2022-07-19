import './App.css';
import React, { useState, useEffect } from 'react';
import {game} from './variables/vars.js';
import Header from './components/Header';

/** 
class App extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      money: 0,
      population: 0,
      unusedPopulation: 0,
      stage: 0,
      science: 0,
      land: 20,
      landPrice: 5,
      
      farmLand:0,
      unusedFarmLand:0,

      unusedLand: 20,
      cornSeedsCount: 10,
      wheatSeedsCount: 0,
      melonSeedsCount: 0,
      cornCount: 0,
      wheatCount: 0,
      melonCount: 0,
      
      cornGrowChance: 0.7,
      wheatGrowChance: 0.6,
      melonGrowChance: 0.5,
      cornSell: (Math.random()*.2+0.11),        //0.11 -> 0.31
      cornSeedPrice: (Math.random()*.1+0.01),   //0.01 -> 0.11 
      wheatSell: (Math.random()+1.00),          //1.01 -> 2.00
      wheatSeedPrice: (Math.random()*.3+.31),   //0.31 -> 0.61
      melonSell: (Math.random()*4+4.01),        //4.01 -> 7.96
      melonSeedPrice: (Math.random()*2+2.01),   //2.01 -> 3.99
      buySeedRate: 1,
      growSeedRate: 1,

      farmerPrice: .300,
      totalFarmers: 0,
      unusedFarmers: 0,
      cornFarmers: 0,
      wheatFarmers: 0,
      melonFarmers: 0,
      farmerSpeed: 5,

      traderPrice: 1000,
      totalTraders: 0,
      traderSpeed: 2,
    }
    
  }
  componentDidMount(){
    if (localStorage.getItem("game") === "undefined"){
      localStorage.setItem("game",JSON.stringify(game));
    }
    else{
      this.loadGame = JSON.parse(localStorage.getItem("game"));
      console.log(this.loadGame);
    }    
    
    //saveAll(this.state);
    if (localStorage.getItem("traderPrice") !== "undefined"){
      loadAll(this);
    }
    else{
      saveAll(this.state);
      
    }    
        
    setInterval(() => this.setState({cornSell: (Math.random()/5+0.11)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({cornSeedPrice: (Math.random()/10+0.01)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({wheatSell: (Math.random()+1.00)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({wheatSeedPrice: (Math.random()*.3+.31)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({melonSell: (Math.random()*4+4.01)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({melonSeedPrice: (Math.random()*2+2.01)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    
    this.scienceInterval = setInterval(() => this.setState({science: this.state.science+this.state.population}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    
    this.cornFarmerInterval = setInterval(() => this.automateCorn(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.cornFarmers-1)), function(){this.updateAll();});
    this.wheatFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.wheatFarmers-1)), function(){this.updateAll();});
    this.melonFarmerInterval = setInterval(() => this.automateMelon(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.melonFarmers-1)), function(){this.updateAll();});
    this.traderInterval = setInterval(() => this.automateTrade(),this.state.traderSpeed*1000/(Math.pow(2,this.state.totalTraders-1)), function(){this.updateAll();});
    
  }

  updateAll(){
    if(this.state.money >=.200 && this.state.stage<=2){
      this.setState({stage:4});
    }
    if(this.state.money >=5 && this.state.stage === 0){
      this.setState({stage:1});
    }
    if(this.state.money >=20 && this.state.stage===1){
      this.setState({stage:2});
    }
    if(this.state.money >=100 && this.state.stage===2){
      this.setState({stage:3});
    }
    if(this.state.money >=800 && this.state.stage===3){
      this.setState({stage:4});
    }
    /**
    clearInterval(this.cornFarmerInterval);
    clearInterval(this.wheatFarmerInterval);
    clearInterval(this.melonFarmerInterval);
    clearInterval(this.traderInterval);
    this.cornFarmerInterval = setInterval(() => this.automateCorn(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.cornFarmers-1)), function(){this.updateAll();});
    this.wheatFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.wheatFarmers-1)), function(){this.updateAll();});
    this.melonFarmerInterval = setInterval(() => this.automateMelon(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.melonFarmers-1)), function(){this.updateAll();});
    this.traderInterval = setInterval(() => this.automateTrade(),this.state.traderSpeed*1000/(Math.pow(2,this.state.totalTraders-1)), function(){this.updateAll();});

    saveAll(this.state);
  }
  improveScience(value){
    this.setState({science:this.state.science + value})
  }
  nFormatter(num) {
    if(num<1){
      return num.toFixed(2);
    }
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "E3" },
      { value: 1e6, symbol: "E6" },
      { value: 1e9, symbol: "E9" },
      { value: 1e12, symbol: "E12" },
      { value: 1e15, symbol: "E15" },
      { value: 1e18, symbol: "E18" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(2).replace(rx, "$1") + item.symbol : "0";
  }

  BuyLand(){
    if(this.state.landPrice > this.state.money){
      return
    }
    this.setState({land:this.state.land + 1}, function(){this.updateAll();});
    this.setState({unusedLand:this.state.unusedLand + 1}, function(){this.updateAll();});
    this.setState({money:this.state.money - this.state.landPrice}, function(){this.updateAll();});
    this.setState({landPrice:this.state.landPrice * (Math.random()*0.2+1)}, function(){this.updateAll();});

  }
  increaseFarmLand(){
    this.setState({farmLand:this.state.farmLand + 1}, function(){this.updateAll();});
    this.setState({unusedFarmLand:this.state.unusedFarmLand + 1}, function(){this.updateAll();});
    this.setState({unusedLand:this.state.unusedLand - 1}, function(){this.updateAll();});
  }
  decreaseFarmLand(){
    this.setState({farmLand:this.state.farmLand - 1}, function(){this.updateAll();});
    this.setState({unusedFarmLand:this.state.unusedFarmLand - 1}, function(){this.updateAll();});
    this.setState({unusedLand:this.state.unusedLand + 1}, function(){this.updateAll();});
  }

  ///////////////////////////////////////////////////////////////////

  GrowCorn=()=>{
    
    for(let i = this.state.growSeedRate; i>0;i--){
      if(i <= this.state.cornSeedsCount && this.state.unusedFarmLand >= i){
        var successSeeds = 0;
        for(let j = 0; j<i;j++){
          if(Math.random()<=this.state.cornGrowChance){
            successSeeds++;
          }
        }
        this.setState({cornCount:this.state.cornCount + successSeeds}, function(){this.updateAll();});
        this.setState({unusedFarmLand:this.state.unusedFarmLand - successSeeds}, function(){this.updateAll();});
        this.setState({cornSeedsCount:this.state.cornSeedsCount - i}, function(){this.updateAll();});
        return
      }
    }
  }
  SellCorn=()=>{
    this.setState({money:this.state.money + this.state.cornSell}, function(){this.updateAll();})
    this.setState({cornCount:this.state.cornCount - 1}, function(){this.updateAll();})
    this.setState({unusedFarmLand:this.state.unusedFarmLand + 1}, function(){this.updateAll();});
    return
  }
  BuyCornSeed(){
    this.loadGame.money += 1;
    localStorage.setItem("game",JSON.stringify(this.loadGame));
    console.log(JSON.parse(localStorage.getItem("game")));
    for(let i = this.state.buySeedRate; i>0;i--){
      if(this.state.cornSeedPrice * i <= this.state.money){
        this.setState({money:this.state.money - (this.state.cornSeedPrice*i)});
        this.setState({cornSeedsCount:this.state.cornSeedsCount +i}, function(){this.updateAll();});
        return;
      }
    }
  }
  automateCorn(){
    if(this.state.cornFarmers<=0 || this.state.unusedFarmLand <= 0){
      return
    }
    this.BuyCornSeed();
    setTimeout(()=>{this.GrowCorn()},1);
    return;
  }

  ///////////////////////////////////////////////////////////////////

  GrowWheat=()=>{
    for(let i = this.state.growSeedRate; i>0;i--){
      if(i <= this.state.wheatSeedsCount && this.state.unusedFarmLand >= i){
        var successSeeds = 0;
        for(let j = 0; j<i;j++){
          if(Math.random()<=this.state.wheatGrowChance){
            successSeeds++;
          }
        }
        this.setState({wheatCount:this.state.wheatCount + successSeeds}, function(){this.updateAll();});
        this.setState({wheatSeedsCount:this.state.wheatSeedsCount - i}, function(){this.updateAll();});
        this.setState({unusedFarmLand:this.state.unusedFarmLand - successSeeds}, function(){this.updateAll();});
        return
      }
    }
  }
  SellWheat=()=>{
    this.setState({money:this.state.money + this.state.wheatSell}, function(){this.updateAll();})
    this.setState({wheatCount:this.state.wheatCount - 1}, function(){this.updateAll();})
    this.setState({unusedFarmLand:this.state.unusedFarmLand + 1}, function(){this.updateAll();});
    return
  }
  BuyWheatSeed = () =>{
    for(let i = this.state.buySeedRate; i>0;i--){
      if(this.state.wheatSeedPrice * i <= this.state.money){
        this.setState({money:this.state.money - (this.state.wheatSeedPrice*i)});
        this.setState({wheatSeedsCount:this.state.wheatSeedsCount + i}, function(){this.updateAll();});
        return;
      }
    }
  }
  automateWheat(){
    if(this.state.wheatFarmers<=0 || this.state.unusedFarmLand <= 0){
      return
    }
    this.BuyWheatSeed();
    setTimeout(()=>{this.GrowWheat()},100);
    return;
  }

  ///////////////////////////////////////////////////////////////////

  GrowMelon=()=>{
    for(let i = this.state.growSeedRate; i>0;i--){
      if(i <= this.state.melonSeedsCount && this.state.unusedFarmLand >= i){
        var successSeeds = 0;
        for(let j = 0; j<i;j++){
          if(Math.random()<=this.state.melonGrowChance){
            successSeeds++;
          }
        }
        this.setState({melonCount:this.state.melonCount + successSeeds}, function(){this.updateAll();});
        this.setState({melonSeedsCount:this.state.melonSeedsCount - i}, function(){this.updateAll();});
        this.setState({unusedFarmLand:this.state.unusedFarmLand - successSeeds}, function(){this.updateAll();});
        return
      }
    }
  }
  SellMelon=()=>{
    this.setState({money:this.state.money + this.state.melonSell})
    this.setState({melonCount:this.state.melonCount - 1}, function(){this.updateAll();})
    this.setState({unusedFarmLand:this.state.unusedFarmLand + 1}, function(){this.updateAll();});
    return
  }
  BuyMelonSeed = () =>{
    for(let i = this.state.buySeedRate; i>0;i--){
      if(this.state.melonSeedPrice * i <= this.state.money){
        this.setState({money:this.state.money - (this.state.melonSeedPrice*i)});
        this.setState({melonSeedsCount:this.state.melonSeedsCount + i}, function(){this.updateAll();});
        return;
      }
    }
  }
  automateMelon(){
    if(this.state.melonFarmers<=0 || this.state.unusedFarmLand <= 0){
      return
    }
    this.BuyMelonSeed();
    setTimeout(()=>{this.GrowMelon()},100);
    return;
  }

  ///////////////////////////////////////////////////////////////////

  BuyFarmer = () =>{
    this.setState({money:this.state.money - this.state.farmerPrice})
    this.setState({totalFarmers:this.state.totalFarmers + 1})
    this.setState({unusedFarmers:this.state.unusedFarmers + 1})
    this.setState({farmerPrice:this.state.farmerPrice * (1+Math.random()*0.3)})
    this.setState({population:this.state.population + 1}, function(){this.updateAll();})
  }
  RetractCornFarmer = () =>{
    this.setState({cornFarmers:this.state.cornFarmers - 1}, function(){this.updateAll();})
    this.setState({unusedFarmers:this.state.unusedFarmers + 1}, function(){this.updateAll();})
    clearInterval(this.cornFarmerInterval);
    if(this.state.cornFarmers-1 >0){
      this.cornFarmerInterval = setInterval(() => this.automateCorn(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.cornFarmers-2)), function(){this.updateAll();});
    }
  }
  DeployCornFarmer = () =>{
    this.setState({cornFarmers:this.state.cornFarmers + 1}, function(){this.updateAll();})
    this.setState({unusedFarmers:this.state.unusedFarmers - 1}, function(){this.updateAll();})
    clearInterval(this.cornFarmerInterval);
    this.cornFarmerInterval = setInterval(() => this.automateCorn(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.cornFarmers)), function(){this.updateAll();});

  }
  RetractWheatFarmer = () =>{
    this.setState({wheatFarmers:this.state.wheatFarmers - 1})
    this.setState({unusedFarmers:this.state.unusedFarmers + 1}, function(){this.updateAll();})
    clearInterval(this.wheatFarmerInterval);
    if(this.state.wheatFarmers-1 >0){
      this.wheatFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.wheatFarmers-2)), function(){this.updateAll();});
    }
  }
  DeployWheatFarmer = () =>{
    this.setState({wheatFarmers:this.state.wheatFarmers + 1}, function(){this.updateAll();})
    this.setState({unusedFarmers:this.state.unusedFarmers - 1}, function(){this.updateAll();})
    clearInterval(this.wheatFarmerInterval);
    this.wheatFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.wheatFarmers)), function(){this.updateAll();});
  }
  RetractMelonFarmer = () =>{
    this.setState({melonFarmers:this.state.melonFarmers - 1})
    this.setState({unusedFarmers:this.state.unusedFarmers + 1}, function(){this.updateAll();})
    clearInterval(this.melonFarmerInterval);
    if(this.state.melonFarmers-1 >0){
      this.melonFarmerInterval = setInterval(() => this.automateMelon(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.melonFarmers-2)), function(){this.updateAll();});
    }
  }
  DeployMelonFarmer = () =>{
    this.setState({melonFarmers:this.state.melonFarmers + 1}, function(){this.updateAll();})
    this.setState({unusedFarmers:this.state.unusedFarmers - 1}, function(){this.updateAll();})
    clearInterval(this.melonFarmerInterval);
    this.melonFarmerInterval = setInterval(() => this.automateMelon(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.melonFarmers)), function(){this.updateAll();});
  }

  ///////////////////////////////////////////////////////////////////

  BuyTrader = () =>{
    this.setState({money:this.state.money - this.state.traderPrice})
    this.setState({totalTraders:this.state.totalTraders + 1})
    this.setState({traderPrice:this.state.traderPrice * (1+Math.random()*0.3)})
    this.setState({population:this.state.population + 1}, function(){this.updateAll();})
    clearInterval(this.traderInterval);
    this.traderInterval = setInterval(() => this.automateTrade(),this.state.traderSpeed*1000/(Math.pow(2,this.state.totalTraders-1)), function(){this.updateAll();});
  }
  automateTrade = () =>{
    if(this.state.totalTraders>0){
      if(this.state.cornCount >0){
        this.setState({money:this.state.money + this.state.cornSell}, function(){this.updateAll();})
        this.setState({cornCount:this.state.cornCount - 1}, function(){this.updateAll();})
      }
      if(this.state.wheatCount >0){
        this.setState({money:this.state.money + this.state.wheatSell}, function(){this.updateAll();})
        this.setState({wheatCount:this.state.wheatCount - 1}, function(){this.updateAll();})
      }
      if(this.state.melonCount >0){
        this.setState({money:this.state.money + this.state.melonSell}, function(){this.updateAll();})
        this.setState({melonCount:this.state.melonCount - 1}, function(){this.updateAll();})
      }
    }
  }
  render(){
    return (
      <>
        <Header/>
        <div id = "InfoBar">
          <h2 style = {{fontSize: '1.5rem',fontWeight:'bold', fontFamily:'Times New Roman'}}>
            Gold:
            <span> {this.state.money.toFixed(2)}</span>
            <br/>
            <span> Population: {this.state.population} ({this.state.unusedPopulation})</span>
            <br/>
            <span> Land: {this.state.land} ({this.state.unusedLand})</span>
            <br/>
          </h2>
        </div>
        <div id = "AColumn">
          <button className="buySeedBtn" onClick={() => this.BuyLand()} disabled = {this.state.money<this.state.landPrice}>Land</button>
          <br/>
          Cost:
          <span> {this.state.landPrice.toFixed(2)}</span>
          <br/>
          <br/>
          <b>Farming</b>
          <div className = "farmingClass">
            <span>Land: </span>
            <button className="decreaseBtn" onClick={()=> this.decreaseFarmLand()} disabled = {this.state.farmLand<=0 || this.state.unusedFarmLand<=0}>-</button>
            <span> {this.state.farmLand} </span>
            <button className="decreaseBtn" onClick={() => this.increaseFarmLand()} disabled = {this.state.unusedLand <=0}>+</button>
            <span> ({this.state.unusedFarmLand}) </span>
            <div id="SeedsColumn">
              Seeds
              <br/>
              <button className="buySeedBtn" onClick={() => this.BuyCornSeed()} disabled = {this.state.money<this.state.cornSeedPrice}>CornSeed</button>
              <span> {this.state.cornSeedsCount}</span>
              <br/>
              Price:
              <span> {this.nFormatter(this.state.cornSeedPrice)}g</span>
              {
                (this.state.stage > 0) && 
                <>
                  <br/>
                  <button className="buySeedBtn" onClick={() => this.BuyWheatSeed()} disabled = {this.state.money<this.state.wheatSeedPrice}>WheatSeed</button>
                  <span> {this.state.wheatSeedsCount}</span>
                  <br/>
                  Price:
                  <span> {this.state.wheatSeedPrice.toFixed(2)}g</span>
                </>
              }
              {
                (this.state.stage > 1) && 
                <>
                  <br/>
                  <button className="buySeedBtn" onClick={() => this.BuyMelonSeed()} disabled = {this.state.money<this.state.melonSeedPrice}>MelonSeed</button>
                  <span> {this.state.melonSeedsCount}</span>
                  <br/>
                  Price:
                  <span> {this.state.melonSeedPrice.toFixed(2)}g</span>
                </>
              }
            </div>
            <div id="CropsColumn">
              Crops
              <br/>
              <button className="growBtn" onClick={()=>this.GrowCorn()} disabled = {this.state.cornSeedsCount<=0}>GrowCorn</button>
              <span> {this.state.cornCount}</span>
              <br/>
              <button className="growBtn" onClick={() => this.SellCorn()} disabled = {this.state.cornCount<=0}>SellCorn</button>
              <span> </span>
              Sell:
              <span> {this.state.cornSell.toFixed(2)}g</span>
              {
                (this.state.stage > 0) && 
                <>
                  <button className="growBtn" onClick={()=>this.GrowWheat()} disabled = {this.state.wheatSeedsCount<=0}>GrowWheat</button>
                  <span> {this.state.wheatCount}</span>
                  <br/>
                  <button className="growBtn" onClick={() => this.SellWheat()} disabled = {this.state.wheatCount<=0}>SellWheat</button>
                  <span> </span>
                  Sell:
                  <span> {this.state.wheatSell.toFixed(2)}g</span>
                </>
              }
              {
                (this.state.stage > 1) && 
                <>
                  <button className="growBtn" onClick={()=>this.GrowMelon()} disabled = {this.state.melonSeedsCount<=0}>GrowMelon</button>
                  <span> {this.state.melonCount}</span>
                  <br/>
                  <button className="growBtn" onClick={() => this.SellMelon()} disabled = {this.state.melonCount<=0}>SellMelon</button>
                  <span> </span>
                  Sell:
                  <span> {this.state.melonSell.toFixed(2)}g</span>
                </>
              }
              
            </div>
            {
              (this.state.stage > 2) &&
              <div id="FarmersDiv">
                <button className="buySeedBtn" onClick={() => this.BuyFarmer()} disabled = {this.state.money<this.state.farmerPrice}>BuyFarmer</button> 
                <span> {this.state.totalFarmers} </span>
                <br/>
                Cost:
                <span> {this.state.farmerPrice.toFixed(2)}g </span>
                <br/>
                CornFarmers:
                <span> </span>
                <button className="decreaseBtn" onClick={() => {this.RetractCornFarmer()}} disabled = {this.state.cornFarmers===0}>-</button>
                <span> {this.state.cornFarmers} </span>
                <button className="decreaseBtn" onClick={() => this.DeployCornFarmer()} disabled = {this.state.unusedFarmers===0}>+</button>
                <br/>
                WheatFarmers:
                <span> </span>
                <button className="decreaseBtn" onClick={() => this.RetractWheatFarmer()} disabled = {this.state.wheatFarmers===0}>-</button>
                <span> {this.state.wheatFarmers} </span>
                <button className="decreaseBtn" onClick={() => this.DeployWheatFarmer()} disabled = {this.state.unusedFarmers===0}>+</button>
                <br/>
                MelonFarmers:
                <span> </span>
                <button className="decreaseBtn" onClick={() => this.RetractMelonFarmer()} disabled = {this.state.melonFarmers===0}>-</button>
                <span> {this.state.melonFarmers} </span>
                <button className="decreaseBtn" onClick={() => this.DeployMelonFarmer()} disabled = {this.state.unusedFarmers===0}>+</button>
                
              </div>
            }
            {
              (this.state.stage >3) &&
              <>
                <br/>
                <button className="buySeedBtn" onClick={() => this.BuyTrader()} disabled = {this.state.money<this.state.traderPrice}>BuyTrader</button> 
                <span> {this.state.totalTraders} </span>
                <br/>
                Cost:
                <span> {this.state.traderPrice.toFixed(2)}g</span>
                <br/>
              </>
            }
            
          </div>
        </div>
        <div id = "BColumn">
        {
          (this.state.population > 0) &&
          <>
            <b>Technology</b>
            <div className = "scienceColumn">
              Science:
              <span> {this.state.science}</span>
            </div>
          </>
        }
        
        </div>
      </>
    );
  }
}
*/
const App = () =>{
  
  var loadGame;
  localStorage.setItem("game",JSON.stringify(game));
  if (localStorage.getItem("game") === "undefined"){
    localStorage.setItem("game",JSON.stringify(game));
  }
  loadGame = JSON.parse(localStorage.getItem("game"));
  const [stage, setStage] = useState(loadGame.stage);
  
  const stageIncrements = [5,20,100,800];

  function saveVar(){
    //if(loadGame.money >=.200 && stage<=2){
    //  loadGame.stage =4;
    //  setStage(loadGame.stage);
    //}
    if(loadGame.money >= stageIncrements[stage]){
      loadGame.stage +=1;
      setStage(loadGame.stage);
    }
    localStorage.setItem("game",JSON.stringify(loadGame));
    document.getElementById("money").innerHTML = loadGame.money.toFixed(2);
    document.getElementById("population").innerHTML = loadGame.population;
    document.getElementById("unusedPopulation").innerHTML = loadGame.unusedPopulation;
    //document.getElementById("science").innerHTML = loadGame.science;
    document.getElementById("land").innerHTML = loadGame.land;
    document.getElementById("unusedLand").innerHTML = loadGame.unusedLand;
    document.getElementById("landPrice").innerHTML = loadGame.landPrice.toFixed(2);
    document.getElementById("farmLand").innerHTML = loadGame.farmLand;

    document.getElementById("cornSeedsCount").innerHTML = loadGame.cornSeedsCount;
    document.getElementById("cornCount").innerHTML = loadGame.cornCount;
    if(stage >=1){
      document.getElementById("wheatSeedsCount").innerHTML = loadGame.wheatSeedsCount;
      document.getElementById("wheatCount").innerHTML = loadGame.wheatCount;
    }
    if(stage >= 2){
      document.getElementById("melonSeedsCount").innerHTML = loadGame.melonSeedsCount;
      document.getElementById("melonCount").innerHTML = loadGame.melonCount;
    }
    if(stage >= 3){
      document.getElementById("farmers").innerHTML = loadGame.farmers;
      document.getElementById("cornFarmers").innerHTML = loadGame.cornFarmers;
      document.getElementById("wheatFarmers").innerHTML = loadGame.wheatFarmers;
      document.getElementById("melonFarmers").innerHTML = loadGame.melonFarmers;
    }
    if(stage >= 4){
      document.getElementById("totalTrader").innerHTML = loadGame.totalTrader;
    }
  }

  useEffect(() => {
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
    return()=>{
      clearInterval(cornSeedInterval);
      clearInterval(wheatSeedInterval);
      clearInterval(melonSeedInterval);
      clearInterval(cornSellInterval);
      clearInterval(wheatSellInterval);
      clearInterval(melonSellInterval);
    }
  })
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
    if(x === 1 && (loadGame.unusedLand < 0)){
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
    if(loadGame.cornSeedPrice*loadGame.seedBundle <= loadGame.money){
      loadGame.cornSeedsCount += loadGame.seedBundle;
      loadGame.money -= loadGame.cornSeedPrice*loadGame.seedBundle;
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
    if(loadGame.wheatSeedPrice*loadGame.seedBundle <= loadGame.money){
      loadGame.wheatSeedsCount += loadGame.seedBundle;
      loadGame.money -= loadGame.wheatSeedPrice*loadGame.seedBundle;
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
    if(loadGame.melonSeedPrice*loadGame.seedBundle <= loadGame.money){
      loadGame.melonSeedsCount += loadGame.seedBundle;
      loadGame.money -= loadGame.melonSeedPrice*loadGame.seedBundle;
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return(
    <>
      <Header/>
      <h2 style = {{fontSize: '1.5rem',fontWeight:'bold', fontFamily:'Times New Roman'}}>
        Gold:
        <span id = "money"> {loadGame.money.toFixed(2)}</span>
        <br/>
        Population:
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
      <button className = "buySeed" onClick ={()=>buyLand()}>Land</button>
      <br/>
      <span id = "landPrice" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>Price: {loadGame.landPrice.toFixed(2)}g</span>
      <br/>
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
                <button className = "buySeed">Farmer</button> <span> </span>
                <span id = "unusedFarmers">{loadGame.unusedFarmers}</span> <span> </span>
                <br/>
                Corn Farmers:<span> </span>
                <button className = "increment" >-</button> <span> </span>
                <span id = "cornFarmers">{loadGame.cornFarmers}</span> <span> </span>
                <button className = "increment" >+</button> <span> </span>
                <br/>
                Wheat Farmers:<span> </span>
                <button className = "increment" >-</button> <span> </span>
                <span id = "wheatFarmers">{loadGame.wheatFarmers}</span> <span> </span>
                <button className = "increment" >+</button> <span> </span>
                <br/>
                Melon Farmers:<span> </span>
                <button className = "increment" >-</button> <span> </span>
                <span id = "MelonFarmers">{loadGame.melonFarmers}</span> <span> </span>
                <button className = "increment" >+</button> <span> </span>
              </>
            }
            </div>

            <div id = "traderDiv">
            {
              (stage >= 4) &&
              <>
                <button className = "buySeed">Trader</button> <span> </span>
                <span id = "traders">{loadGame.totalTraders}</span>
                <br/>
                Price:<span> </span>
                <span id = "traders">{loadGame.traderPrice.toFixed(2)}</span>
                g
              </>
            }
            </div>
          </div>
          <br/>
          
          <div id = "livestockDiv">
          <b>Livestock</b>
          <hr/>
          </div>
          <br/>
          
          <div id = "miningDiv">
          <b>Mining</b>
          <hr/>
          </div>
        </div>
        <div id = "columnB" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>
        </div>
        <div id = "columnC" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>

        </div>
        <div id = "columnD" style = {{fontSize: '1rem', fontFamily:'Times New Roman'}}>

        </div>
      </div>
    </>
  )
  
}

export default App;
