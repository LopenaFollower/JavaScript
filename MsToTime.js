function MsToTime(ms){
    var year=0,day=0,hr=0,min=0,sec=0,milsec=0,given=ms,res,pad=(n,z=2)=>('00000'+n||"").slice(-z);
    while(given>=1000){
        sec++
        given-=1000
    }
    while(sec>=60){
        min++
        sec-=60
    }
    while(min>=60){
        hr++
        min-=60
    }
    while(hr>=24){
        day++
        hr-=24
    }
    while(day>=365){
        year++
        day-=365
    }
    res = pad(year,4)+":"+pad(day,3)+":"+pad(hr)+":"+pad(min)+":"+pad(sec)+":"+pad(milsec,3)
    return res
}
