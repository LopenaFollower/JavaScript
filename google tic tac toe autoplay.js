setTimeout(()=>{
    var tab_status=true;var t=document
    var up_ls,up_ms,up_rs;var ls,ms,rs;var l_ls,l_ms,l_rs,cd=1035;
    var did_up_l=false;var did_up_r=false;var did_l_r=false;var did_l_l=false;
    var did_up_l1=false;var did_up_r1=false;var did_l_r1=false;var did_l_l1=false;
    var {log}=console
    function reset(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > g-raised-button > div").click();up_ls=undefined;up_ms=undefined;up_rs=undefined;ls=undefined;ms=undefined;rs=undefined;l_ls=undefined;l_ms=undefined;l_rs=undefined;did_up_l=false;did_up_r=false;did_l_r=false;did_l_l=false;did_up_l1=false;did_up_r1=false;did_l_r1=false;did_l_l1=false;};
    //move functions
    function up_l(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(1)").click()};
    function up_m(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(2)").click()};
    function up_r(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(3)").click()};
    function l(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(1)").click()};
    function m(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(2)").click()};
    function r(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(3)").click()};
    function l_l(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(1)").click()};
    function l_m(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(2)").click()};
    function l_r(){document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(3)").click()};
    //checker
    function check(){
        if(up_ls==undefined){up_ls="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(1) > svg:nth-child(1)").style.display!=="none"){up_ls="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(1) > svg:nth-child(2)").style.display!=="none"){up_ls="O";};
        if(up_ms==undefined){up_ms="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(2) > svg:nth-child(1)").style.display!=="none"){up_ms="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(2) > svg:nth-child(2)").style.display!=="none"){up_ms="O";};
        if(up_rs==undefined){up_rs="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(3) > svg:nth-child(1)").style.display!=="none"){up_rs="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(1) > td:nth-child(3) > svg:nth-child(2)").style.display!=="none"){up_rs="O";};
        if(ls==undefined){ls="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(1) > svg:nth-child(1)").style.display!=="none"){ls="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(1) > svg:nth-child(2)").style.display!=="none"){ls="O";};
        if(ms==undefined){ms="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(2) > svg:nth-child(1)").style.display!=="none"){ms="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(2) > svg:nth-child(2)").style.display!=="none"){ms="O";};
        if(rs==undefined){rs="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(3) > svg:nth-child(1)").style.display!=="none"){rs="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(2) > td:nth-child(3) > svg:nth-child(2)").style.display!=="none"){rs="O";};
        if(l_ls==undefined){l_ls="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(1) > svg:nth-child(1)").style.display!=="none"){l_ls="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(1) > svg:nth-child(2)").style.display!=="none"){l_ls="O";};
        if(l_ms==undefined){l_ms="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(2) > svg:nth-child(1)").style.display!=="none"){l_ms="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(2) > svg:nth-child(2)").style.display!=="none"){l_ms="O";};
        if(l_rs==undefined){l_rs="empty"};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(3) > svg:nth-child(1)").style.display!=="none"){l_rs="X";};
        if(document.querySelector("#rso > div:nth-child(1) > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.xED3T > table > tbody > tr:nth-child(3) > td:nth-child(3) > svg:nth-child(2)").style.display!=="none"){l_rs="O";};
    };
    //restarts on tab out
    window.onfocus=function(){
        tab_status=true
        t.title="in tab: "+tab_status
        play()
    }
    window.onblur=function(){
        tab_status=false
        t.title="in tab: "+tab_status
    }
    //the smart part
    function play(){
        if(tab_status){reset();}
        setTimeout(()=>{
            if(tab_status){m();}
            setTimeout(()=>{
                if(tab_status){
                    if(ls=="O"||ls=="X"){up_l();did_up_l=true;};
                    if(up_ls=="O"){up_r();did_up_r=true;};
                    if(up_ms=="O"){up_r();did_up_r=true;};
                    if(up_rs=="O"){l_r();did_l_r=true;};
                    if(rs=="O"){l_r();did_l_r=true;};
                    if(l_rs=="O"){l_l();did_l_l=true;};
                    if(l_ms=="O"){l_l();did_l_l=true;};
                    if(l_ls=="O"){up_l();did_up_l=true;};
                }
                setTimeout(()=>{
                    if(tab_status){
                        if(up_rs=="empty"&&did_up_l){up_r();did_up_r1=true;};
                        if(l_rs=="empty"&&did_up_r){l_r();did_l_r1=true;};
                        if(l_ls=="empty"&&did_l_r){l_l();did_l_l1=true;};
                        if(up_ls=="empty"&&did_l_l){up_l();did_up_l1=true;};
                    }
                    setTimeout(()=>{
                        if(tab_status){
                            if(did_up_l&&did_up_r1){
                                up_m();l_l();l_r();
                            }
                            if(did_up_r&&did_l_r1){
                                r();l_l();up_l
                            }
                            if(did_l_r&&did_l_l1){
                                l_m();up_l();up_r();
                            }
                            if(did_l_l&&did_up_l1){
                                l();l_r();up_r();
                            }
                        }
                    },cd);
                },cd);
            },cd);
        },395);
    }
    //loop check
    var scr;
    var scr_old;
    setInterval(()=>{
        check();
        scr=document.querySelector("#rso > div.ULSxyf > div > block-component > div > div.dG2XIf.Wnoohf.OJXvsb > div > div > div > div.ifM9O > div > div > div > div > div.JE13Kc > table > tbody > tr > td:nth-child(1) > g-raised-button > div > span").innerHTML
    },-1);
    if(scr_old===undefined||scr_old!==scr){
        play();
        scr_old=scr;
    }
    setInterval(()=>{
        if(scr_old===undefined||scr_old!==scr){
            play();
            scr_old=scr;
        }
    },-1);
},2000);
