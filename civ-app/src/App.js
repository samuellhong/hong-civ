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
      stage: 0,
      science: 0,
      cornSeedsCount: 10,
      wheatSeedsCount: 0,
      melonSeedsCount: 0,
      cornCount: 0,
      wheatCount: 0,
      melonCount: 0,
      
      cornGrowChance: 0.7,
      wheatGrowChance: 0.6,
      melonGrowChance: 0.5,
      cornSell: (Math.random()*2+0.01),         //0->2
      cornSeedPrice: (Math.random()*0.5+0.01),  //0->0.5
      wheatSell: (Math.random()*5+5),           //5->10
      wheatSeedPrice: (Math.random()*3+2),      //2->5
      melonSell: (Math.random()*10+25),         //25->35
      melonSeedPrice: (Math.random()*8+7),      //7->15

      farmerPrice: 700,
      totalFarmers: 0,
      unusedFarmers: 0,
      cornFarmers: 0,
      wheatFarmers: 0,
      melonFarmers: 0,
      farmerSpeed: 5,

      traderPrice: 2000,
      totalTraders: 0,
      traderSpeed: 2,
    }
    
    
  }
  componentDidMount(){
    
    if (JSON.parse(localStorage.getItem("money"))){
      loadAll(this);
    }
    
    saveAll(this);
    
    setInterval(() => this.setState({cornSell: (Math.random()*2+0.01)}),10000, function(){this.updateAll();});
    setInterval(() => this.setState({cornSeedPrice: (Math.random()*0.5+0.01)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({wheatSell: (Math.random()*5+5)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({wheatSeedPrice: (Math.random()*3+2)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({melonSell: (Math.random()*10+25)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    setInterval(() => this.setState({melonSeedPrice: (Math.random()*8+7)}),(Math.random()*3+7)*1000, function(){this.updateAll();});
    
    this.scienceInterval = setInterval(() => this.setState({science: this.state.science+this.state.population}),(Math.random()*3+7)*1000, function(){this.updateAll();});

    this.cornFarmerInterval = setInterval(() => this.automateCorn(),this.state.farmerSpeed*1000/(this.state.cornFarmers+1), function(){this.updateAll();});
    this.wheatFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(this.state.wheatFarmers+1), function(){this.updateAll();});
    this.melonFarmerInterval = setInterval(() => this.automateMelon(),this.state.farmerSpeed*1000/(this.state.melonFarmers+1), function(){this.updateAll();});
    
    this.traderInterval = setInterval(() => this.automateTrade(),this.state.tradeSpeed*1000/(this.state.totalTraders+1), function(){this.updateAll();});
  }

  updateAll(){
    if(this.state.money >=50 && this.state.stage === 0){
      this.setState({stage:1});
    }
    if(this.state.money >=200 && this.state.stage===1){
      this.setState({stage:2});
    }
    if(this.state.money >=500 && this.state.stage===2){
      this.setState({stage:3});
    }
    if(this.state.money >=1000 && this.state.stage===3){
      this.setState({stage:4});
    }
    
    clearInterval(this.cornFarmerInterval);
    clearInterval(this.wheatFarmerInterval);
    clearInterval(this.melonFarmerInterval);
    clearInterval(this.traderInterval);
    this.cornFarmerInterval = setInterval(() => this.automateCorn(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.cornFarmers)), function(){this.updateAll();});
    this.wheatFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.wheatFarmers)), function(){this.updateAll();});
    this.melonFarmerInterval = setInterval(() => this.automateMelon(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.melonFarmers)), function(){this.updateAll();});
    this.traderInterval = setInterval(() => this.automateTrade(),this.state.traderSpeed*1000/(Math.pow(2,this.state.totalTraders)), function(){this.updateAll();});

    saveAll(this);
  }
  improveScience(value){
    this.setState({science:this.state.science + value})
  }

  ///////////////////////////////////////////////////////////////////

  GrowCorn=()=>{
    if(this.cornSeedsCount <= 0){
      return;
    }
    if(Math.random() < this.state.cornGrowChance){
      this.setState({cornCount:this.state.cornCount + 1}, function(){this.updateAll();});
    }
    this.setState({cornSeedsCount:this.state.cornSeedsCount -1}, function(){this.updateAll();});
    return
  }
  SellCorn=()=>{
    this.setState({money:this.state.money + this.state.cornSell}, function(){this.updateAll();})
    
    this.setState({cornCount:this.state.cornCount - 1}, function(){this.updateAll();})
    return
  }
  BuyCornSeed = () =>{
    if(this.state.cornSeedPrice > this.state.money){
      return;
    }
    this.setState({money:this.state.money - this.state.cornSeedPrice})
    this.setState({cornSeedsCount:this.state.cornSeedsCount +1}, function(){this.updateAll();})
  }
  automateCorn(){
    if (this.state.cornFarmers <= 0){
      return;
    }
    if(this.state.money < this.state.cornSeedPrice){
      if(this.state.cornSeedsCount <= 0){
        return
      }
      this.setState({cornSeedsCount:this.state.cornSeedsCount - 1}, function(){this.updateAll();});
    }
    if(Math.random() < this.state.cornGrowChance){
      this.setState({cornCount:this.state.cornCount + 1}, function(){this.updateAll();});
    }
    if(this.state.money>=this.state.cornSeedPrice){
      this.setState({money:this.state.money - this.state.cornSeedPrice}, function(){this.updateAll();})
    }
  }

  ///////////////////////////////////////////////////////////////////

  GrowWheat=()=>{
    if(Math.random() < this.state.wheatGrowChance){
      this.setState({wheatCount:this.state.wheatCount + 1})
    }
    this.setState({wheatSeedsCount:this.state.wheatSeedsCount - 1}, function(){this.updateAll();})
    return
  }
  SellWheat=()=>{
    this.setState({money:this.state.money + this.state.wheatSell}, function(){this.updateAll();})
    this.setState({wheatCount:this.state.wheatCount - 1}, function(){this.updateAll();})
    return
  }
  BuyWheatSeed = () =>{
    this.setState({money:this.state.money - this.state.wheatSeedPrice})
    this.setState({wheatSeedsCount:this.state.wheatSeedsCount +1}, function(){this.updateAll();})
  }
  automateWheat(){
    if (this.state.wheatFarmers <= 0){
      return;
    }
    if(this.state.money < this.state.wheatSeedPrice){
      if(this.state.wheatSeedsCount <= 0){
        return
      }
      this.setState({wheatSeedsCount:this.state.wheatSeedsCount - 1}, function(){this.updateAll();});
    }
    if(Math.random() < this.state.wheatGrowChance){
      this.setState({wheatCount:this.state.wheatCount + 1}, function(){this.updateAll();});
    }
    if(this.state.money>=this.state.wheatSeedPrice){
      this.setState({money:this.state.money - this.state.wheatSeedPrice}, function(){this.updateAll();})
    }
  }

  ///////////////////////////////////////////////////////////////////

  GrowMelon=()=>{
    if(Math.random() < this.state.melonGrowChance){
      this.setState({melonCount:this.state.melonCount + 1})
    }
    this.setState({melonSeedsCount:this.state.melonSeedsCount -1}, function(){this.updateAll();})
    return
  }
  SellMelon=()=>{
    this.setState({money:this.state.money + this.state.melonSell})
    this.setState({melonCount:this.state.melonCount - 1}, function(){this.updateAll();})
    return
  }
  BuyMelonSeed = () =>{
    this.setState({money:this.state.money - this.state.melonSeedPrice})
    this.setState({melonSeedsCount:this.state.melonSeedsCount +1}, function(){this.updateAll();})
  }
  automateMelon(){
    if (this.state.melonFarmers <= 0){
      return;
    }
    if(this.state.money < this.state.melonSeedPrice){
      if(this.state.melonSeedsCount <= 0){
        return
      }
      this.setState({melonSeedsCount:this.state.melonSeedsCount - 1}, function(){this.updateAll();});
    }
    if(Math.random() < this.state.melonGrowChance){
      this.setState({melonCount:this.state.melonCount + 1}, function(){this.updateAll();});
    }
    if(this.state.money>=this.state.melonSeedPrice){
      this.setState({money:this.state.money - this.state.melonSeedPrice}, function(){this.updateAll();})
    }
  }

  ///////////////////////////////////////////////////////////////////

  BuyFarmer = () =>{
    this.setState({money:this.state.money - this.state.farmerPrice})
    this.setState({totalFarmers:this.state.totalFarmers + 1})
    this.setState({unusedFarmers:this.state.unusedFarmers + 1})
    this.setState({farmerPrice:this.state.farmerPrice * (1+Math.random()*0.5)})
    this.setState({population:this.state.population + 1}, function(){this.updateAll();})
  }
  RetractCornFarmer = () =>{
    this.setState({cornFarmers:this.state.cornFarmers - 1}, function(){this.updateAll();})
    this.setState({unusedFarmers:this.state.unusedFarmers + 1}, function(){this.updateAll();})
    clearInterval(this.cornFarmerInterval);
    if(this.state.cornFarmers-1 >0){
      this.cornFarmerInterval = setInterval(() => this.automateCorn(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.cornFarmers)), function(){this.updateAll();});

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
      this.wheatFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.wheatFarmers)), function(){this.updateAll();});
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
      this.melonFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(2,Math.pow(this.state.melonFarmers)), function(){this.updateAll();});
    }
  }
  DeployMelonFarmer = () =>{
    this.setState({melonFarmers:this.state.melonFarmers + 1}, function(){this.updateAll();})
    this.setState({unusedFarmers:this.state.unusedFarmers - 1}, function(){this.updateAll();})
    clearInterval(this.melonFarmerInterval);
    this.melonFarmerInterval = setInterval(() => this.automateWheat(),this.state.farmerSpeed*1000/(Math.pow(2,this.state.melonFarmers)), function(){this.updateAll();});
  }

  ///////////////////////////////////////////////////////////////////

  BuyTrader = () =>{
    this.setState({money:this.state.money - this.state.traderPrice})
    this.setState({totalTraders:this.state.totalTraders + 1})
    this.setState({traderPrice:this.state.traderPrice * (1+Math.random()*0.2)})
    this.setState({population:this.state.population + 1}, function(){this.updateAll();})
    clearInterval(this.traderInterval);
    this.traderInterval = setInterval(() => this.automateTrade(),this.state.traderSpeed*1000/(Math.pow(2,this.state.totalTraders)), function(){this.updateAll();});
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
            Money:
            <span> {this.state.money.toFixed(2)}g</span>
            <br/>
            Science: 
            <span> {this.state.science}bp</span>
            <br/>
            Population: 
            <span> {this.state.population}</span>
          </h2>
        </div>
        <div id = "leftColumn">
            <b>Agriculture</b>
          <div className = "agricultureClass">
            <div id="SeedsColumn">
              Seeds
              <br/>
              <button className="buySeedBtn" onClick={() => this.BuyCornSeed()} disabled = {this.state.money<this.state.cornSeedPrice}>CornSeed</button>
              <span> {this.state.cornSeedsCount}</span>
              <br/>
              Price:
              <span> {this.state.cornSeedPrice.toFixed(2)}g</span>
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
                  <span>{this.state.melonSeedPrice.toFixed(2)}g</span>
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
      </>
    );

  }
}
export default App;
