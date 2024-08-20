// ==UserScript==
// @name Tic Tac Toe
// @version 2.51
// @description .
// @match https://papergames.io/*
// @icon https://media.giphy.com/media/CxYGmxv0Oyz4I/giphy.gif
// ==/UserScript==
function RGB(s=1){
	let c=[255,0,0],i=0,j=1,d=s,l;
	this.stop=function(){
		cancelAnimationFrame(l);
	}
	this.get=function(){
		return"#"+c.map(e=>e.toString(16).padStart(2,0)).join("");
	}
	const u=()=>{
		l=requestAnimationFrame(u);
		if(d<0?c[i]>-d:c[j]<255-d)c[d<0?i:j]+=d;
		else s+(d=-d)&&(i=++i%3,j=++j%3);
	}
	u();
}
const rgb=new RGB(5);
const PLAYER_NAME="0x3b5";
const toCheck=["012","345","678","036","147","258","048","246"];
const undef=undefined;
const r=Math.random;
let retrieved=false,syms=["X","O"];
function highlight(b,c=rgb.get()){
	[...document.querySelectorAll(".cross-light")].forEach(e=>e.style.stroke=b?c:"#18BC9C");
	[...document.querySelectorAll("circle.circle-dark-stroked")].forEach(e=>e.style.stroke=b?"#e67":c);
}
function getInfo(){
	let s,t,n=document.querySelectorAll(".text-truncate.cursor-pointer"),e=[...document.querySelectorAll(".ng-star-inserted")];
	for(let i=0;i<2;i++)if(n[i].innerText==PLAYER_NAME){
		s=e.filter(v=>v.tagName=="APP-PLAYER-SYMBOL")[i].querySelector("circle")?1:0;
		t=e.filter(v=>v.tagName=="APP-USER-AVATAR")[i].querySelector("circle")?0:1;
	}
	return[s,t];
}
let mySym,reSym,enSym,turn,grid,count,timeout,pa_t,debounce=true,pa_d=true,lastboard,tick=0;
let currboard=Array(9).fill("");
let lastMoves={X:"",O:""};
function getGrid(){
	grid=document.querySelectorAll(".grid-item.ng-star-inserted");
	return[...grid].map(e=>e.classList.contains("hoverable")?"":(e.children[0].children[0].tagName=="circle"?syms[1]:syms[0]));
}
function getSym(i){
	return currboard[i];
}
function p(i){
	grid[i].click();
}
function winningMove(sym){
	let s=undef;
	toCheck.forEach(e=>{
		e=e.split("").map(Number);
		let cn=0,m;
		e.forEach(v=>{
			let c=getSym(v);
			if(c==sym)cn++;
			if(!c)m=v+.1;
		});
		if(cn==2&&m)s=m;
	});
	return s+.1;
}
function createThreat(s){
	let sl=undef,c=[];
	toCheck.filter(e=>e.indexOf(4)<0).forEach(e=>{
		e=e.split("").map(Number);
		e.forEach(v=>{
			let p=e.indexOf(v)<1?2:0;
			[0,2,6,8].includes(v)&&getSym(e[(p+2)%4])==s&&!getSym(e[1])&&!getSym(e[p])&&c.push(e[p]);
		});
	});
	if(c.length)sl=c[r()*c.length|0]+.1;
	return sl+.1;
}
function beside(i){
	if(typeof i!="number")return undef;
	let m=["13","02","15","06","1357","28","37","68","57"][i].split("").map(Number).filter(e=>!getSym(e));
	let a=m.filter(e=>!getSym(-e+8));
	return a.length?a[r()*a.length|0]+.1:m.length?m[r()*m.length|0]+.1:undef;
}
function randomMove(){
	let a=[0,1,2,3,4,5,6,7,8].filter(e=>!getSym(e));
	return a[r()*a.length|0]+.1;
}
function botMove(){
	p(4);
	if(turn&&count<2)p([0,2,6,8][r()*4|0]);
	if(!turn&&count<3)p(beside(lastMoves[enSym])|0);
	let nx=winningMove(mySym)||winningMove(enSym)||createThreat(mySym)||beside(lastMoves[enSym])||randomMove();
	nx>0&&p(nx|0);
}
function updLM(s){
	let nv;
	for(let i=0;i<9;i++)if(lastboard[i]!=getSym(i)&&getSym(i)==s)nv=i+.1;
	if(nv&&!isNaN(nv))lastMoves[s]=nv|0;
}
let toggle=document.createElement("input");toggle.type="checkbox";toggle.style.position="fixed";toggle.style.zIndex=2**30;toggle.id="ZKD";
function update(){
	tick++;
	requestAnimationFrame(update);
	let t=document.querySelector("input#ZKD");
	if(!t)document.body.appendChild(toggle);
	else if(t.checked){
		count=getGrid().filter(e=>e.length).length;
		highlight(reSym=="X");
		if(count%2==turn&&retrieved&&debounce){
			debounce=false;
			timeout=setTimeout(()=>{
				botMove();
				debounce=true;
				clearTimeout(timeout);
				timeout=null;
			},5e2);
		}
		if(getGrid().length){
			clearTimeout(pa_t);
			if(count<1&&!retrieved){
				let[s,t]=getInfo();
				if(retrieved=!isNaN(s)&&!isNaN(t)){
					syms=!s&&t||s&&!t?["O","X"]:["X","O"];
					reSym=syms[turn=t];
					mySym=syms[s];
					enSym=syms[++s%2];
				}
			}
			if(currboard.toString()!=getGrid().toString()){
				lastboard=[...currboard];
				currboard=getGrid();
				updLM("X");
				updLM("O");
			}
		}else if(retrieved){
			retrieved=false;
			debounce=pa_d=true;
			lastboard=null;
			currboard=Array(9).fill("");
			lastMoves={X:"",O:""};
			clearTimeout(timeout);
		}else{
			if(tick%90<1){
				try{
					let pa=document.querySelector("app-re-match>div>button"),lg=document.querySelector("#toast-container"),ng=document.querySelector("div.game-actions>div>button");
					if(lg&&lg.children.length)document.querySelector("app-room-bottom-toolbar").querySelector("button").click();
					else if(pa){
						pa.click();
						if(pa_d)pa_d=false,pa_t=setTimeout(()=>document.querySelector("app-room-bottom-toolbar").querySelector("button").click(),1e4);
					}else ng&&ng.click();
				}catch(e){}
			}
		}
	}
}
update();