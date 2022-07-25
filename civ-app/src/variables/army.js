var army = [];

var fighter = {
    id:"fighter",
    price:[1000],
    scienceReq: 0,
    priceIndex:[0],
    range: 0,
    melee:1,
    strength:1,
    iq:1,
    flag:1,
    mobility:3,
    element:null
}
army.push(fighter)

var slinger = {
    id:"slinger",
    scienceReq:0,
    price:[1300],
    priceIndex:[0],
    range: 1,
    melee: 0,
    strength:1,
    iq:1,
    flag:1,
    mobility:3,
    element:null
}
army.push(slinger)

var warrior = {
    id:"warrior",
    price:[2000,10,10],
    scienceReq:3,
    priceIndex:[0,1,2],
    range: 0,
    melee: 3,
    strength:3,
    iq:1,
    flag:0,
    mobility:4,
    element:null
}
army.push(warrior)

var archer = {
    id:"archer",
    price:[3000,10],
    priceIndex:[0,1],
    scienceReq:7,
    range: 5,
    melee: 1,
    strength: 2,
    iq: 3,
    flag:0,
    mobility:2,
    element:null
}
army.push(archer)

export {army};