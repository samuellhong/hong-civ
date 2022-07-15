export class Buyer{
    constructor(){
        this.value = [];
        this.generateCornValue();
    }
    generateCornValue(){
        this.value.push(Math.floor(Math.random()*5));
    }
    getCornValue(){
        return this.value[0]
    }
}