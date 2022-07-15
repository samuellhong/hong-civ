export class Player{
    constructor(){
        this.seeds = [10];
    }
    getNumberCornSeeds(){
        return this.seeds[0]
    }
    plantCornSeed(){
        this.seeds[0] -= 1;
    }

}