

export default function loadAll(ts){

    ts.setState({money:JSON.parse(localStorage.getItem("money"))});
    ts.setState({science:JSON.parse(localStorage.getItem("science"))});
    ts.setState({population:JSON.parse(localStorage.getItem("population"))});
    ts.setState({stage:JSON.parse(localStorage.getItem("stage"))});
    ts.setState({cornSeedsCount:JSON.parse(localStorage.getItem("cornSeedsCount"))});    
    ts.setState({cornCount:JSON.parse(localStorage.getItem("cornCount"))});
    ts.setState({wheatSeedsCount:JSON.parse(localStorage.getItem("wheatSeedsCount"))});    
    ts.setState({wheatCount:JSON.parse(localStorage.getItem("wheatCount"))});
    ts.setState({melonSeedsCount:JSON.parse(localStorage.getItem("melonSeedsCount"))});    
    ts.setState({melonCount:JSON.parse(localStorage.getItem("melonCount"))});

    ts.setState({farmerPrice:JSON.parse(localStorage.getItem("farmerPrice"))});
    ts.setState({totalFarmers:JSON.parse(localStorage.getItem("totalFarmers"))});
    ts.setState({unusedFarmers:JSON.parse(localStorage.getItem("unusedFarmers"))});
    ts.setState({cornFarmers:JSON.parse(localStorage.getItem("cornFarmers"))});
    ts.setState({wheatFarmers:JSON.parse(localStorage.getItem("wheatFarmers"))});
    ts.setState({melonFarmers:JSON.parse(localStorage.getItem("melonFarmers"))});

    ts.setState({traderPrice:JSON.parse(localStorage.getItem("traderPrice"))});
    ts.setState({totalTraders:JSON.parse(localStorage.getItem("totalTraders"))});
}

