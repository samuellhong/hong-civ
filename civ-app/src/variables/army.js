var army = [];

var fighter = {
    id:"fighter",
    price:[2000],
    priceIndex:[0],
    range: 0,
    melee:1,
    force:1,
    iq:1,
    mobility:5

}
army.push(fighter)

var slinger = {
    id:"slinger",
    price:[2000],
    priceIndex:[0],
    range: 1,
    melee: 0,
    force:1,
    iq:1,
    mobility:5

}
army.push(slinger)

var warrior = {
    id:"warrior",
    price:[2000,10,10],
    priceIndex:[0,1,2],
    range: 0,
    melee: 3,
    force:3,
    iq:1,
    mobility:4

}
army.push(warrior)

var archer = {
    id:"archer",
    price:[3000,10],
    priceIndex:[0,1],
    range: 5,
    melee: 1,
    force: 2,
    iq: 3,
    mobility:3

}
army.push(archer)