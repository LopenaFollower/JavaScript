const{log}=console;
function collatzConjecture(num,prev,peak,b){
    if(!isNaN(num)){
        let step=prev||0,
            current=parseInt(num),
            highest=peak||parseInt(num),
            base=b||parseInt(num);
        if(current!=1){
            if(current%2===1&&current>1){
                current=(current*3)+1;
                step++;
                log("× "+current.toLocaleString())
                setTimeout(()=>{
                    if(highest<num){
                        highest=num;
                    }
                    collatzConjecture(current,step,highest,base)
                },50)
            }else if(current%2===0&&current>1){
                current=current/2;
                step++;
                log("÷ "+current.toLocaleString())
                setTimeout(()=>{
                    if(highest<=num){
                        highest=num;
                    }
                    collatzConjecture(current,step,highest,base)
                },50)
            }
        }else{log("Iterations: "+step.toLocaleString()+"\nHighest: "+peak.toLocaleString()+"\nbase: "+base.toLocaleString())}
    }else{log("must be a number")}
}
