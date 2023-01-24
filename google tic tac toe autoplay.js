setTimeout(()=>{
    var t=document,time=document.createElement("div"),times=time.style,scr,scr_old,started=Date.now(),total="",nutz="#rso>div:nth-child(1)>div>block-component>div>div.dG2XIf.Wnoohf.OJXvsb>div>div>div>div.ifM9O>div>div>div>div>div.xED3T>table>tbody>tr:nth-child",up_ls,up_ms,up_rs,ls,ms,rs,l_ls,l_ms,l_rs,did_up_l=false,did_up_r=false,did_l_r=false,did_l_l=false,did_up_l1=false,did_up_r1=false,did_l_r1=false,did_l_l1=false,up=[],mid=[],low=[],{log}=console,{round}=Math
    times.position="fixed";times.backgroundColor="rgba(0,0,0,0)";times.color="white";times.top="0px";
    t.querySelector("#rso>div.ULSxyf>div>block-component>div>div.dG2XIf.Wnoohf.OJXvsb>div>div>div>div.ifM9O>div>div>div>div>div.xED3T").appendChild(time)
    function reset(){started=Date.now();document.querySelector("#rso>div:nth-child(1)>div>block-component>div>div.dG2XIf.Wnoohf.OJXvsb>div>div>div>div.ifM9O>div>div>div>div>g-raised-button>div").click();up=[];mid=[];low=[];up_ls=undefined;up_ms=undefined;up_rs=undefined;ls=undefined;ms=undefined;rs=undefined;l_ls=undefined;l_ms=undefined;l_rs=undefined;did_up_l=false;did_up_r=false;did_l_r=false;did_l_l=false;did_up_l1=false;did_up_r1=false;did_l_r1=false;did_l_l1=false};
    function up_l(){document.querySelector(nutz+"(1)>td:nth-child(1)").click()};
    function up_m(){document.querySelector(nutz+"(1)>td:nth-child(2)").click()};
    function up_r(){document.querySelector(nutz+"(1)>td:nth-child(3)").click()};
    function l(){document.querySelector(nutz+"(2)>td:nth-child(1)").click()};
    function m(){document.querySelector(nutz+"(2)>td:nth-child(2)").click()};
    function r(){document.querySelector(nutz+"(2)>td:nth-child(3)").click()};
    function l_l(){document.querySelector(nutz+"(3)>td:nth-child(1)").click()};
    function l_m(){document.querySelector(nutz+"(3)>td:nth-child(2)").click()};
    function l_r(){document.querySelector(nutz+"(3)>td:nth-child(3)").click()};
    function check(){
        if(up_ls==undefined){up_ls="empty"};
        if(up_ms==undefined){up_ms="empty"};
        if(up_rs==undefined){up_rs="empty"};
        if(ls==undefined){ls="empty"};
        if(ms==undefined){ms="empty"};
        if(rs==undefined){rs="empty"};
        if(l_ls==undefined){l_ls="empty"};
        if(l_ms==undefined){l_ms="empty"};
        if(l_rs==undefined){l_rs="empty"};
        if(document.querySelector(nutz+"(1)>td:nth-child(1)>svg:nth-child(1)").style.display!=="none"){up_ls="X";up[0]="x"};
        if(document.querySelector(nutz+"(1)>td:nth-child(1)>svg:nth-child(2)").style.display!=="none"){up_ls="O";up[0]="o"};
        if(document.querySelector(nutz+"(1)>td:nth-child(2)>svg:nth-child(1)").style.display!=="none"){up_ms="X";up[1]="x"};
        if(document.querySelector(nutz+"(1)>td:nth-child(2)>svg:nth-child(2)").style.display!=="none"){up_ms="O";up[1]="o"};
        if(document.querySelector(nutz+"(1)>td:nth-child(3)>svg:nth-child(1)").style.display!=="none"){up_rs="X";up[2]="x"};
        if(document.querySelector(nutz+"(1)>td:nth-child(3)>svg:nth-child(2)").style.display!=="none"){up_rs="X";up[2]="o"};
        if(document.querySelector(nutz+"(2)>td:nth-child(1)>svg:nth-child(1)").style.display!=="none"){ls="X";mid[0]="x"};
        if(document.querySelector(nutz+"(2)>td:nth-child(1)>svg:nth-child(2)").style.display!=="none"){ls="O";mid[0]="o"};
        if(document.querySelector(nutz+"(2)>td:nth-child(2)>svg:nth-child(1)").style.display!=="none"){ms="X";mid[1]="x"};
        if(document.querySelector(nutz+"(2)>td:nth-child(2)>svg:nth-child(2)").style.display!=="none"){ms="O";mid[1]="o"};
        if(document.querySelector(nutz+"(2)>td:nth-child(3)>svg:nth-child(1)").style.display!=="none"){rs="X";mid[2]="x"};
        if(document.querySelector(nutz+"(2)>td:nth-child(3)>svg:nth-child(2)").style.display!=="none"){rs="O";mid[2]="o"};
        if(document.querySelector(nutz+"(3)>td:nth-child(1)>svg:nth-child(1)").style.display!=="none"){l_ls="X";low[0]="x"};
        if(document.querySelector(nutz+"(3)>td:nth-child(1)>svg:nth-child(2)").style.display!=="none"){l_ls="O";low[0]="o"};
        if(document.querySelector(nutz+"(3)>td:nth-child(2)>svg:nth-child(1)").style.display!=="none"){l_ms="X";low[1]="x"};
        if(document.querySelector(nutz+"(3)>td:nth-child(2)>svg:nth-child(2)").style.display!=="none"){l_ms="O";low[1]="o"};
        if(document.querySelector(nutz+"(3)>td:nth-child(3)>svg:nth-child(1)").style.display!=="none"){l_rs="X";low[2]="x"};
        if(document.querySelector(nutz+"(3)>td:nth-child(3)>svg:nth-child(2)").style.display!=="none"){l_rs="O";low[2]="o"};
    };
    function count(tbl,i=0){
        tbl.forEach(function(e){
            if(e!==undefined&&e!==null){
                i++
            }
        })
        return i
    }
    setInterval(()=>{
        check();m();
        if((count(low)+count(mid)+count(up))==2){
            if(ls=="O"){up_l();did_up_l=true}
            if(up_ls=="O"){up_r();did_up_r=true}
            if(up_ms=="O"){up_r();did_up_r=true}
            if(up_rs=="O"){l_r();did_l_r=true}
            if(rs=="O"){l_r();did_l_r=true}
            if(l_rs=="O"){l_l();did_l_l=true}
            if(l_ms=="O"){l_l();did_l_l=true}
            if(l_ls=="O"){up_l();did_up_l=true}
        }
        if((count(low)+count(mid)+count(up))==4){
            if(up_rs=="empty"&&did_up_l){up_r();did_up_r1=true}
            if(l_rs=="empty"&&did_up_r){l_r();did_l_r1=true}
            if(l_ls=="empty"&&did_l_r){l_l();did_l_l1=true}
            if(up_ls=="empty"&&did_l_l){up_l();did_up_l1=true}
        }
        if((count(low)+count(mid)+count(up))==6){
            if(did_up_l&&did_up_r1){up_m();l_l();l_r()}
            if(did_up_r&&did_l_r1){r();l_l();up_l()}
            if(did_l_r&&did_l_l1){l_m();up_l();up_r()}
            if(did_l_l&&did_up_l1){l();l_r();up_r()}
        }
        time.innerText="Elapsed: "+round((Date.now()-started)/10)/100+"s\n"+total
        scr=t.querySelector("#rso>div.ULSxyf>div>block-component>div>div.dG2XIf.Wnoohf.OJXvsb>div>div>div>div.ifM9O>div>div>div>div>div.JE13Kc>table>tbody>tr>td:nth-child(1)>g-raised-button>div>span").innerHTML
        if(scr_old===undefined||scr_old!==scr){
            if((count(low)+count(mid)+count(up))==0||(count(low)+count(mid)+count(up))==7){
                total="Finished: "+round((Date.now()-started)/10)/100+"s"
                reset();
            }
            scr_old=scr;
        }
        t.title="ez "+scr;
    },0);
},2000);
