

export default function saveAll(ts){
    
    localStorage.setItem("money",JSON.stringify(ts.money));
    localStorage.setItem("science",JSON.stringify(ts.science));
    localStorage.setItem("population",JSON.stringify(ts.population));
    localStorage.setItem("unusedPopulation",JSON.stringify(ts.unusedPopulation));

    localStorage.setItem("land",JSON.stringify(ts.land));
    localStorage.setItem("unusedLand",JSON.stringify(ts.unusedLand));
    localStorage.setItem("landPrice",JSON.stringify(ts.landPrice));

    localStorage.setItem("farmLand",JSON.stringify(ts.farmLand));
    localStorage.setItem("unusedFarmLand",JSON.stringify(ts.unusedFarmLand));

    localStorage.setItem("stage",JSON.stringify(ts.stage));
    localStorage.setItem("cornSeedsCount",JSON.stringify(ts.cornSeedsCount));
    localStorage.setItem("cornCount",JSON.stringify(ts.cornCount));
    localStorage.setItem("wheatSeedsCount",JSON.stringify(ts.wheatSeedsCount));
    localStorage.setItem("wheatCount",JSON.stringify(ts.wheatCount));
    localStorage.setItem("melonSeedsCount",JSON.stringify(ts.melonSeedsCount));
    localStorage.setItem("melonCount",JSON.stringify(ts.melonCount));
    localStorage.setItem("cornGrowChance",JSON.stringify(ts.cornGrowChance));
    localStorage.setItem("cornSell",JSON.stringify(ts.cornSell));

    localStorage.setItem("farmerPrice",JSON.stringify(ts.farmerPrice));
    localStorage.setItem("totalFarmers",JSON.stringify(ts.totalFarmers));
    localStorage.setItem("unusedFarmers",JSON.stringify(ts.unusedFarmers));
    localStorage.setItem("cornFarmers",JSON.stringify(ts.cornFarmers));
    localStorage.setItem("wheatFarmers",JSON.stringify(ts.wheatFarmers));
    localStorage.setItem("melonFarmers",JSON.stringify(ts.melonFarmers));

    localStorage.setItem("traderPrice",JSON.stringify(ts.traderPrice));
    localStorage.setItem("totalTraders",JSON.stringify(ts.totalTraders));
    
}