function $$(array){
    array=Array.from(array);
    function notNeeded(val){
            return val===undefined||val===""||val!==val;
    }
    function slice(arr,from,to,step){
        if(notNeeded(step))step=1;
        if(notNeeded(from))from=step<0?-1:0;
        if(notNeeded(to))to=step<0?-arr.length-1:arr.length;    
        var final=[];
        if(from<0)from=arr.length+from;
        if(to<0)to=arr.length+to;    
        for(var i=from;step<0?i>=to:i<to;i+=step) 
            if(arr[i]!==undefined)final.push(arr[i]);
        return (final);
    }
    var handler={
        get:function(x,y){
            if(typeof y==="string"&&y.toString().match(/\:/)){
                var indices=y.toString().split(":").map(x=>parseInt(x));
        
                return slice(x,...indices);
            }else{
                if(y.toString().match(/^\u{2d}{0,1}[0-9]+$/u))return y<0?x[+y+x.length]:x[+y];
                else return x[y];
            }
        
        },
        set:function(x,y,z){
            if(y.toString().match(/\:/)){
                var tmp=[];
                var toAssign=Array.from(z);
                for(let i=0;i<array.length;i++){
                    tmp.push(i);
                }
                var sliced=slice(tmp,...y.toString().split(":").map(x=>parseInt(x))); 
                
                if(toAssign.length===sliced.length){
                    sliced.forEach((i,j)=>{
                        x[i]=toAssign[j];
                        
                    });
                    
                }else{
                   throw new TypeError(`Trying to assign Object of length ${toAssign.length} to Array of length ${sliced.length}.`);
                } 
            }else{
            if(y.toString().match(/^\u{2d}{0,1}[0-9]+$/u)){
                x[y<0?+y+x.length:+y]=z;
                }
            else{
                x[y]=z;
            }
            }
        }
    }
    return new Proxy(array,handler);
}
