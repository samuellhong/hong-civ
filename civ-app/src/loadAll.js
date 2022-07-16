

export default function loadAll(ts){

    console.log(JSON.parse(localStorage.getItem("money")));

    ts.setState({money:JSON.parse(localStorage.getItem("money"))});
    ts.setState({science:JSON.parse(localStorage.getItem("science"))});
    ts.setState({stage:JSON.parse(localStorage.getItem("stage"))});
    ts.setState({cornSeedsCount:JSON.parse(localStorage.getItem("cornSeedsCount"))});    
    ts.setState({cornCount:JSON.parse(localStorage.getItem("cornCount"))});
    ts.setState({wheatSeedsCount:JSON.parse(localStorage.getItem("wheatSeedsCount"))});    
    ts.setState({wheatCount:JSON.parse(localStorage.getItem("wheatCount"))});
    ts.setState({melonSeedsCount:JSON.parse(localStorage.getItem("melonSeedsCount"))});    
    ts.setState({melonCount:JSON.parse(localStorage.getItem("melonCount"))});
}

