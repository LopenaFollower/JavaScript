//==UserScript==
// @name sudoku solver
// @version 2.42
// @description
// @match *://sudoku.com/*
// @run-at document-end
//==/UserScript==
javascript:(function(){
	const board=document.querySelector("#game>canvas"),ctx=board.getContext("2d");
	function mouseevent(x,y,b,el){
		["mousedown","mouseup"].forEach(e=>el.dispatchEvent(new MouseEvent(e,{clientX:x,clientY:y,button:b})));
	}
	const z=parseFloat(getComputedStyle(board).getPropertyValue("width"))/9,W=z/2;
	function placeNum(cx,cy,n){
		const{top,left}=board.getBoundingClientRect();
		mouseevent(left+cx*z+W,top+cy*z+W,0,board);
		const el=document.querySelectorAll(".numpad-item")[n-1];
		const{top:t,left:l}=el.getBoundingClientRect();
		mouseevent(l,t,0,el);
		return new Promise(r=>setTimeout(r,25));
	}
	function setStatus(t){
		document.getElementById("STATUS").innerText=t;
	}
	function b2d(a){
		for(var b=0;a;a>>=1,b++);
		return b;
	}
	function getMoves(a,b){
		let[c,d]=[b%9,b/9|0],e=3*(d/3|0),f=3*(c/3|0),g=0;
		for(let h=e,i=0;h<e+3;h++)for(let j=f;j<f+3;j++,i++)g|=a[h*9+j]|a[d*9+i]|a[i*9+c];
		return g^511;
	}
	function unique(a,b,c){
		let[d,e]=[b%9,b/9|0],f=9*e,g=d,h=1,i=1,j=1,k,l;
		for(k=3*(e/3|0);k<f+3;++k)for(l=3*(d/3|0);l+3;++l,++f,g+=9)if(h&&f-d&&a[f]&c&&(h=0)||i&&g-d&&a[g]&c&&(i=0)||j&&k*9+l-d&&a[k*9+l]&c&&(j=0)||h+i+j)return!1;
		return h+i+j;
	}
	function analyze(a){
		let b=a.map((e,i)=>e?0:getMoves(a,i)),c,d=1e2,e,f,g,h;
		for(e=0;e<81;e++)if(!a[e]){
			for(g=1,h=b[e],f=0;h;g<<=1)if(h&g&&++f)if(unique(b,e,g)&&(f=1)&&(b[e]=g))break;else h^=g;
			if(f<d&&(c=e)&&!(d=f))break;
		}
		return[c,b[c]];
	}
	function getBoard(){
		const s=board.width/9-2;
		function c(a,r=[]){
			for(let i=0,l=a.length;i<l;i+=4)r.push(a.slice(i,i+4));
			return r;
		}
		const z=74,w=37,g=(v,n,m)=>n<=v&&v<=m,pa=[[910,1007],[1239,1287],[1421,1481],[1272,1396],[1659,1709],[1769,1896],[1236,1293],[1895,1963],[1949,2045]],pb=[[639,740],[916,1007],[1159,1231],[1000,1170],[1081,1151],[1100,1159],[586,672],[1147,1231],[1233,1294]];
		function getc(cx,cy){
			const x=board.width/2+cx*s-w,y=board.height/2+cy*s-w,t=([r,g,b])=>((r<<16)|(g<<8)|b)==3426401,c1=c(ctx.getImageData(x,y-z*.3,z,z).data).filter(t).length,c2=c(ctx.getImageData(x+z*.34,y+z*.2,z,z).data).filter(t).length;
			for(let i=0;i<9;i++)if(g(c1,...pa[i])&&g(c2,...pb[i]))return++i;
			return 0;
		}
		let n="";
		for(let i=0;i<81;i++)n+=getc(i%9-4,(i/9|0)-4);
		return n;
	}
	function solve(a){
		let b=a.split("").map(e=>2**--e|0),c=_=>{
			let[d,e]=analyze(b),f;
			if(d==null)return!0;
			for(f=1;e;f<<=1)if(e&f&&(b[d]=f))if(c())return!0;else e^=f;
			b[d]=0;
		}
		if(c())return b.map(b2d);
	}
	let ongoing=false;
	async function start(a){
		if(ongoing)return;
		ongoing=true;
		let raw=getBoard();
		document.getElementById("DISPLAY").value=raw.replaceAll("0",".").match(/.{27}/g).map(e=>e.match(/.{9}/g).map(c=>c.match(/.{3}/g).join(" ")).join("\n")).join("\n\n");
		if(raw.length<81)return setStatus("Invalid Board");
		let solved=solve(raw);
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
