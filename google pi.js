javascript:(function(){let btns=document.querySelector("table.ElumCf").children[0];let num={};num["."]=btns.children[4].children[1].children[0].children[0];num[0]=btns.children[4].children[0].children[0].children[0];num[1]=btns.children[3].children[0].children[0].children[0];num[2]=btns.children[3].children[1].children[0].children[0];num[3]=btns.children[3].children[2].children[0].children[0];num[4]=btns.children[2].children[0].children[0].children[0];num[5]=btns.children[2].children[1].children[0].children[0];num[6]=btns.children[2].children[2].children[0].children[0];num[7]=btns.children[1].children[0].children[0].children[0];num[8]=btns.children[1].children[1].children[0].children[0];num[9]=btns.children[1].children[2].children[0].children[0];let pi="3.";function calc_pi(){let q=60n,r=13440n,t=10080n,i=3n;for(let nd=0;nd<200;nd++){u=3n*i;u=6n+3n*u**2n+u*9n;d=(27n*q*i+5n*r-12n*q)/(t*5n);r=10n*u*(r+(5n*i-2n)*q-d*t);t*=u;q*=i*10n*(2n*i++-1n);pi+=d}};calc_pi();let n=4;function play(){for(let i=0;i<n;i++)num[pi[i]].click();n++};play();let cur=document.querySelector("span.V8AKPe"),st=false;setInterval(()=>{let[a,b]=cur.innerText.split(" / ").map(e=>Number(e));if(st&&a==b){play();st=false}if(a==1)st=true})})()