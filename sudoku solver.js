//==UserScript==
// @name sudoku solver
// @version 2.42
// @description
// @match *://sudoku.com/*
// @run-at document-end
//==/UserScript==
javascript:(function(){
	const board=document.querySelector("#game>canvas");
	const ctx=board.getContext("2d");
	function mouseevent(x,y,b,el){
		["mousedown","mouseup"].map(e=>new MouseEvent(e,{clientX:x,clientY:y,button:b})).forEach(e=>el.dispatchEvent(e));
	}
	function placeNum(cx,cy,n){
		const{top,left}=board.getBoundingClientRect();
		const s=parseFloat(getComputedStyle(board).getPropertyValue("width"))/9,w=s/2;
		mouseevent(left+cx*s+w,top+cy*s+w,0,board);
		const el=document.querySelectorAll(".numpad-item")[n-1];
		const{top:t,left:l}=el.getBoundingClientRect();
		mouseevent(l,t,0,el);
		return new Promise(r=>setTimeout(r,25));
	}
	function setStatus(t){
		document.getElementById("STATUS").innerText=t;
	}
	function b2d(b){
		for(var i=0;b;b>>=1,i++);
		return i;
	}
	function getMoves(b,i){
		let[cl,rw]=[i%9,i/9|0],r1=3*(rw/3|0),c1=3*(cl/3|0),m=0;
		for(let r=r1,j=0;r<r1+3;r++)for(let c=c1;c<c1+3;c++,j++)m|=b[r*9+c]|b[rw*9+j]|b[j*9+cl];
		return m^511;
	}
	function unique(n,i,v){
		let[cl,rw]=[i%9,i/9|0],r1=3*(rw/3|0),c1=3*(cl/3|0),ir=9*rw,ic=cl,a=1,b=1,c=1;
		for(let r=r1;r<r1+3;++r)for(let c=c1;c<c1+3;++c,++ir,ic+=9){
			if(a&&ir-i&&n[ir]&v)a=0;
			if(b&&ic-i&&n[ic]&v)b=0;
			if(c&&r*9+c-i&&n[r*9+c]&v)c=0;
			if(a+b+c)return!1;
		}
		return a||uc||c;
	}
	function analyze(b){
		let a=b.map((e,i)=>e?0:getMoves(b,i)),j,l=1e2;
		for(let i=0,n,m,ms;i<81;i++)if(!b[i]){
			for(m=1,ms=a[i],n=0;ms;m<<=1)if(ms&m&&++n)if(unique(a,i,m)&&(n=1)&&(a[i]=m))break;else ms^=m;
			if(n<l&&(j=i)&&!(l=n))break;
		}
		return[j,a[j]];
	}
	function getBoard(){
		const s=board.width/9-2;
		function rgbToHex(r,g,b){
			return((r<<16)|(g<<8)|b).toString(16);
		}
		function getc(cx,cy){
			const z=74,w=37;
			const x=board.width/2+cx*s-w,y=board.height/2+cy*s-w;
			let d1=ctx.getImageData(x,y-z*.3,z,z),d2=ctx.getImageData(x+z*.34,y+z*.2,z,z),c1={},c2={};
			for(let i=0;i<d1.data.length;i+=4)for(let j=1;j<3;j++)eval(`let n=rgbToHex(...d${j}.data.slice(i,i+3));c${j}[n]=(c${j}[n]||0)+1;`);
			const g=(v,n,m)=>n<=v&&v<=m,c=a=>Object.keys(a).reduce((r,k)=>Object.assign(r,{[k]:a[k]}),{})[344861]||0;
			let pa=[[910,1007],[1239,1287],[1421,1481],[1272,1396],[1659,1709],[1769,1896],[1236,1293],[1895,1963],[1949,2045]];
			let pb=[[639,740],[916,1007],[1159,1231],[1000,1170],[1081,1151],[1100,1159],[586,672],[1147,1231],[1233,1294]];
			for(let i=0;i<9;i++)if(g(c(c1),...pa[i])&&g(c(c2),...pb[i]))return++i;
			return 0;
		}
		let nums="";
		for(let y=0;y<9;y++)for(let x=0;x<9;x++)nums+=getc(x-4,y-4);
		return nums;
	}
	function solve(r){
		let b=r.split("").map(e=>2**--e|0),s=_=>{
			let[i,ms]=analyze(b);
			if(i==null)return!0;
			for(let m=1;ms;m<<=1)if(ms&m&&(b[i]=m))if(s())return!0;else ms^=m;
			b[i]=0;
		}
		if(s())return b.map(b2d);
	}
	let ongoing=false;
	async function start(a){
		if(ongoing)return;
		ongoing=true;
		let raw=getBoard();
		document.getElementById("DISPLAY").value=raw.replaceAll("0",".").match(/.{27}/g).map(e=>e.match(/.{9}/g).map(c=>c.match(/.{3}/g).join(" ")).join("\n")).join("\n\n");
		if(raw.length<81)return setStatus("Invalid Board");
		let solved=solve(raw);
		console.log(solved);
		if(!solved)return setStatus("Invalid Board");
		const c=[];
		for(let i=0;i<81;i++)if(raw[i]=="0")c.push(i);
		c.sort((a,b)=>solved[a]-solved[b]);
		for(let i=0;i<c.length;i++){
			let n=c[i],wait=placeNum(n%9,n/9|0,solved[n]);
			if(a)await wait;
		}
		ongoing=false;
	}
	setTimeout(()=>{
		const cont=document.createElement("div");
		cont.style.backgroundColor="#fff";
		board.parentElement.appendChild(cont);
		const input=document.createElement("textarea");
		const width=parseFloat(getComputedStyle(board).getPropertyValue("width"))/3;
		input.style.width=input.style.height=width+"px";
		input.style.letterSpacing=width*40/833+"px";
		input.style.fontFamily="monospace";
		input.style.resize="none";
		input.style.zIndex=1e4;
		input.id="DISPLAY";
		input.readOnly=true;
		cont.appendChild(input);
		const btn1=document.createElement("button");
		btn1.style.zIndex=1e4;
		btn1.innerText="Solve";
		btn1.onclick=function(){start(0)};
		cont.appendChild(btn1);
		const btn2=document.createElement("button");
		btn2.style.zIndex=1e4;
		btn2.innerText="Play";
		btn2.onclick=function(){start(1)};
		cont.appendChild(btn2);
		const status=document.createElement("span");
		status.id="STATUS";
		cont.appendChild(status);
	},500);
})();
