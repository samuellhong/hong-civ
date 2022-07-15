import './App.css';
import React from 'react';
import {Crops} from './contents/Crops.js'
import { Buyer } from './contents/Buyer';

class App extends React.Component{
  
  crops = new Crops();
  buyer1 = new Buyer();
  buyer2 = new Buyer();
  money = 0;
  render(){
    return (
      <>
      
        <h2>APP</h2>
        <div>Money: ${this.money}</div>
        <div>Corn: {this.crops.cornValue}</div>
        <button onClick = {this.GrowCorn}>Grow Corn</button>
        <br />
        <br />
        <span>Buyer 1:</span>
        <button onClick = {event => this.SellCorn(event, this.buyer1)} disabled = {this.crops.cornValue<=0}>Sell Corn</button>
        <div>Price: ${this.buyer1.value}</div>
        <br />
        <br />
        <span>Buyer 2:</span>
        <button onClick = {event => this.SellCorn(event, this.buyer2)} disabled = {this.crops.cornValue<=0}>Sell Corn</button>
        <div>Price: ${this.buyer2.value}</div>
      </>
    )
  }

  GrowCorn = () => {
    
    this.crops.growCorn();
    this.forceUpdate();
  }

  SellCorn = (event, buyer) => {
    if (this.crops.cornValue <= 0){
      document.getElementById("Button").disabled = true;
    }
    this.crops.sellCorn();
    this.money += buyer.value;
    this.forceUpdate();
  }
}



export default App;
