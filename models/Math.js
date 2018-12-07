module.exports={

    divide(x,y){
        if(y===0)
        throw new Error("Divide by zero");
     return x/y;
    }
}