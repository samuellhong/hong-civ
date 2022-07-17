

export default function saveAll(ts){
    
    localStorage.setItem("money",JSON.stringify(ts.state.money));
    localStorage.setItem("science",JSON.stringify(ts.state.science));
    localStorage.setItem("population",JSON.stringify(ts.state.population));
    localStorage.setItem("stage",JSON.stringify(ts.state.stage));
    localStorage.setItem("cornSeedsCount",JSON.stringify(ts.state.cornSeedsCount));
    localStorage.setItem("cornCount",JSON.stringify(ts.state.cornCount));
    localStorage.setItem("wheatSeedsCount",JSON.stringify(ts.state.wheatSeedsCount));
    localStorage.setItem("wheatCount",JSON.stringify(ts.state.wheatCount));
    localStorage.setItem("melonSeedsCount",JSON.stringify(ts.state.melonSeedsCount));
    localStorage.setItem("melonCount",JSON.stringify(ts.state.melonCount));
    localStorage.setItem("cornGrowChance",JSON.stringify(ts.state.cornGrowChance));
    localStorage.setItem("cornSell",JSON.stringify(ts.state.cornSell));

    localStorage.setItem("farmerPrice",JSON.stringify(ts.state.farmerPrice));
    localStorage.setItem("totalFarmers",JSON.stringify(ts.state.totalFarmers));
    localStorage.setItem("unusedFarmers",JSON.stringify(ts.state.unusedFarmers));
    localStorage.setItem("cornFarmers",JSON.stringify(ts.state.cornFarmers));
    localStorage.setItem("wheatFarmers",JSON.stringify(ts.state.wheatFarmers));
    localStorage.setItem("melonFarmers",JSON.stringify(ts.state.melonFarmers));

    localStorage.setItem("traderPrice",JSON.stringify(ts.state.traderPrice));
    localStorage.setItem("totalTraders",JSON.stringify(ts.state.totalTraders));
}