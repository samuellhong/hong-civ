export class Crops{
    constructor(){
        this.cornValue = 0;
    }
    growCorn(){
        this.cornValue += 1;
    }
    sellCorn(){
        this.cornValue -= 1;
    }

}