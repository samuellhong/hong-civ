import './App.css';
import React from 'react';
import Header from './components/Header';
import loadAll from './loadAll.js'
import saveAll from './saveAll.js'

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
**/
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
export default App;
