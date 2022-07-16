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
      science: 0,
      cornSeedsCount: 10,
      wheatSeedsCount: 0,
      melonSeedsCount: 0,
      cornCount: 0,
      wheatCount: 0,
      melonCount: 0,
      cornFarmers: 0,
      wheatFarmers: 0,
      melonFarmers: 0,
      cornGrowChance: 0.7,
      wheatGrowChance: 0.5,
      melonGrowChance: 0.3,
      cornSell: (Math.random()*2+0.01),         //0.01->2
      cornSeedPrice: (Math.random()*0.5+0.01),  //0.01->0.5
      wheatSell: (Math.random()*5+5),           //5->10
      wheatSeedPrice: (Math.random()*4+2),      //2->5
      melonSell: (Math.random()*10+20),         //20->30
      melonSeedPrice: (Math.random()*8+7),      //7->15
      stage: 0,
    }
    
  }
  componentDidMount(){
    loadAll(this)
    
    setInterval(() => this.setState({cornSell: (Math.random()*2+0.01)}),10000);
    setInterval(() => this.setState({cornSeedPrice: (Math.random()*0.5+0.01)}),(Math.random()*3+7)*1000);
    setInterval(() => this.setState({wheatSell: (Math.random()*5+5)}),(Math.random()*3+7)*1000);
    setInterval(() => this.setState({wheatSeedPrice: (Math.random()*3+2)}),(Math.random()*3+7)*1000);
    setInterval(() => this.setState({melonSell: (Math.random()*10+20)}),(Math.random()*3+7)*1000);
    setInterval(() => this.setState({mellonSeedPrice: (Math.random()*8+7)}),(Math.random()*3+7)*1000);
    setInterval(() => this.setState({science: this.state.science+1}),(Math.random()*3+7)*1000);
  }
  updateAll(){
    saveAll(this);
    localStorage.setItem("money",JSON.stringify(this.state.money));
    localStorage.setItem("science",JSON.stringify(this.state.science));
    localStorage.setItem("stage",JSON.stringify(this.state.stage));
    localStorage.setItem("cornSeedsCount",JSON.stringify(this.state.cornSeedsCount));
    localStorage.setItem("cornCount",JSON.stringify(this.state.cornCount));
    localStorage.setItem("wheatSeedsCount",JSON.stringify(this.state.wheatSeedsCount));
    localStorage.setItem("wheatCount",JSON.stringify(this.state.wheatCount));
    localStorage.setItem("melonSeedsCount",JSON.stringify(this.state.melonSeedsCount));
    localStorage.setItem("melonCount",JSON.stringify(this.state.melonCount));
    localStorage.setItem("cornGrowChance",JSON.stringify(this.state.cornGrowChance));
    localStorage.setItem("cornSell",JSON.stringify(this.state.cornSell));
    this.forceUpdate();
  }
  improveScience(value){
    this.setState({science:this.state.science + value})
  }
  ///////////////////////////////////////////////////////////////////
  GrowCorn=()=>{
    if(Math.random() < this.state.cornGrowChance){
      this.setState({cornCount:this.state.cornCount + 1})
    }
    this.setState({cornSeedsCount:this.state.cornSeedsCount -1}, function(){this.updateAll();})
    return
  }
  SellCorn=()=>{
    this.setState({money:this.state.money + this.state.cornSell}, function(){this.updateAll();})
    if(this.state.money >=20 && this.state.stage < 2){
      this.setState({stage:1})
    }
    if(this.state.money >=200){
      this.setState({stage:2})
    }
    this.setState({cornCount:this.state.cornCount - 1}, function(){this.updateAll();})
    //this.updateAll();
    return
  }
  BuyCornSeed = () =>{
    this.setState({money:this.state.money - this.state.cornSeedPrice})
    this.setState({cornSeedsCount:this.state.cornSeedsCount +1}, function(){this.updateAll();})
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
    if(this.state.money >=200){
      this.setState({stage:2})
    }
    this.setState({wheatCount:this.state.wheatCount - 1}, function(){this.updateAll();})
    return
  }
  BuyWheatSeed = () =>{
    this.setState({money:this.state.money - this.state.wheatSeedPrice})
    this.setState({wheatSeedsCount:this.state.wheatSeedsCount +1}, function(){this.updateAll();})
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
  ///////////////////////////////////////////////////////////////////
  render(){
    return (
      <>
        <Header/>
        <div id = "MoneyTitle">
          <h2 style = {{fontSize: '1.5rem',fontWeight:'bold', fontFamily:'Times New Roman'}}>
            Money: $
            <span>{this.state.money.toFixed(2)}</span>
            <br/>
            Science: 
            <span> {this.state.science}</span>
          </h2>
        </div>
        <div id = "leftColumn">
            <b>Agriculture</b>
            <hr align = "left"/>
          <div className = "agricultureClass">
            <div id="SeedsColumn">
              Seeds
              <br/>
              <button className="buySeedBtn" onClick={() => this.BuyCornSeed()} disabled = {this.state.money<this.state.cornSeedPrice}>CornSeed</button>
              <span> {this.state.cornSeedsCount}</span>
              <br/>
              Price: $
              <span>{this.state.cornSeedPrice.toFixed(2)}</span>
              {
                (this.state.stage > 0) && 
                <>
                  <br/>
                  <button className="buySeedBtn" onClick={() => this.BuyWheatSeed()} disabled = {this.state.money<this.state.wheatSeedPrice}>WheatSeed</button>
                  <span> {this.state.wheatSeedsCount}</span>
                  <br/>
                  Price: $
                  <span>{this.state.wheatSeedPrice.toFixed(2)}</span>
                </>
              }
              {
                (this.state.stage > 1) && 
                <>
                  <br/>
                  <button className="buySeedBtn" onClick={() => this.BuyMelonSeed()} disabled = {this.state.money<this.state.melonSeedPrice}>MelonSeed</button>
                  <span> {this.state.melonSeedsCount}</span>
                  <br/>
                  Price: $
                  <span>{this.state.melonSeedPrice.toFixed(2)}</span>
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
              Sell: $
              <span>{this.state.cornSell.toFixed(2)}</span>
              {
                (this.state.stage > 0) && 
                <>
                  <button className="growBtn" onClick={()=>this.GrowWheat()} disabled = {this.state.wheatSeedsCount<=0}>GrowWheat</button>
                  <span> {this.state.wheatCount}</span>
                  <br/>
                  <button className="growBtn" onClick={() => this.SellWheat()} disabled = {this.state.wheatCount<=0}>SellWheat</button>
                  <span> </span>
                  Sell: $
                  <span>{this.state.wheatSell.toFixed(2)}</span>
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
                  Sell: $
                  <span>{this.state.melonSell.toFixed(2)}</span>
                </>
              }
              
            </div>
          </div>
        </div>
      </>
    );

  }
}
export default App;
