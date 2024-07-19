//==UserScript==
// @name sudoku solver
// @version 0.1
// @description
// @match *://sudoku.com/*
// @run-at document-end
//==/UserScript==
(function(){
	const board=document.querySelector("#game>canvas");
	const ctx=board.getContext("2d");
	function mouseevent(x,y,b,el){
		["mousedown","mouseup"].map(e=>new MouseEvent(e,{clientX:x,clientY:y,button:b})).forEach(e=>el.dispatchEvent(e));
	}
	function selectNum(n){
		const el=document.querySelectorAll(".numpad-item")[n-1];
		const{top,left}=el.getBoundingClientRect();
		mouseevent(left,top,0,el);
	}
	function placeNum(cx,cy,n){
		const{top,left}=board.getBoundingClientRect();
		const s=parseFloat(getComputedStyle(board).getPropertyValue("width"))/9,w=s/2;
		mouseevent(left+cx*s+w,top+cy*s+w,0,board);
		selectNum(n);
		return new Promise(r=>setTimeout(r,25));
	}
	function setStatus(t){
		document.getElementById("STATUS").innerText=t;
	}
	function i2rc(i){
		return[i%9,i/9|0];
	}
	function b2d(b){
		let i=0;
		for(;b;b>>=1,i++);
		return i;
	}
	function getMoves(b,i){
		let[cl,rw]=i2rc(i);
		let r1=3*(rw/3|0),c1=3*(cl/3|0);
		let m=0;
		for(let r=r1,j=0;r<r1+3;r++)for(let c=c1;c<c1+3;c++,j++)m|=b[r*9+c]|b[rw*9+j]|b[j*9+cl];
		return m^511;
	}
	function unique(a,i,v){
		let[cl,rw]=i2rc(i);
		let r1=3*(rw/3|0),c1=3*(cl/3|0);
		let ir=9*rw,ic=cl;
		let ur=true,uc=true,u3=true;
		for(let r=r1;r<r1+3;++r)for(let c=c1;c<c1+3;++c,++ir,ic+=9){
			let j=r*9+c;
			if(u3&&j-i&&a[j]&v)u3=false;
			if(ur&&ir-i&&a[ir]&v)ur=false;
			if(uc&&ic-i&&a[ic]&v)uc=false;
			if(!(u3||ur||uc))return false;
		}
		return ur||uc||u3;
	}
	function analyze(b){
		let a=b.map((e,i)=>e?0:getMoves(b,i));
		let j,l=100;
		for(let i=0;i<81;i++)if(!b[i]){
			let ms=a[i],ln=0;
			for(let m=1;ms;m<<=1)if(ms&m){
				ln++;
				if(unique(a,i,m)){
					a[i]=m;
					ln=1;
					break;
				}
				ms^=m;
			}
			if(ln<l){
				j=i;
				if(!(l=ln))break;
			}
		}
		return[j,a[j]];
	}
	function getBoard(){
		const s=board.width/9-2;
		function rgbToHex(r,g,b){
			if(r>255||g>255||b>255)throw"Invalid";
			return((r<<16)|(g<<8)|b).toString(16);
		}
		function getc(cx,cy){
			const w=74,w2=37;
			const x=board.width/2+cx*s-w2,y=board.height/2+cy*s-w2;
			let d1=ctx.getImageData(x,y-w*.3,w,w),d2=ctx.getImageData(x+w*.34,y+w*.2,w,w);
			let l=d1.data.length;
			let c1={},c2={};
			for(let i=0;i<l;i+=4){
				let e1=rgbToHex(d1.data[i],d1.data[i+1],d1.data[i+2]);
				let e2=rgbToHex(d2.data[i],d2.data[i+1],d2.data[i+2]);
				c1[e1]=(c1[e1]||0)+1;
				c2[e2]=(c2[e2]||0)+1;
			}
			const g=(v,n,m)=>n<=v&&v<=m;
			let px1=Object.keys(c1).reduce((r,k)=>Object.assign(r,{[k]:c1[k]}),{})["344861"]||0;
			let pa1=g(px1,910,1007),pa2=g(px1,1239,1287),pa3=g(px1,1421,1481),pa4=g(px1,1272,1396),pa5=g(px1,1659,1709),pa6=g(px1,1769,1896),pa7=g(px1,1236,1293),pa8=g(px1,1895,1963),pa9=g(px1,1949,2045);
			let px2=Object.keys(c2).reduce((r,k)=>Object.assign(r,{[k]:c2[k]}),{})["344861"]||0;
			let pb1=g(px2,639,740),pb2=g(px2,916,1007),pb3=g(px2,1159,1231),pb4=g(px2,1000,1170),pb5=g(px2,1081,1151),pb6=g(px2,1100,1159),pb7=g(px2,586,672),pb8=g(px2,1147,1231),pb9=g(px2,1233,1294);
			if(pa1&&pb1)return 1;
			if(pa2&&pb2)return 2;
			if(pa3&&pb3)return 3;
			if(pa4&&pb4)return 4;
			if(pa5&&pb5)return 5;
			if(pa6&&pb6)return 6;
			if(pa7&&pb7)return 7;
			if(pa8&&pb8)return 8;
			if(pa9&&pb9)return 9;
			if(px1+px2>0)alert(px1+", "+px2);
			return 0;
		}
		let nums="";
		for(let y=0;y<9;y++)for(let x=0;x<9;x++)nums+=getc(x-4,y-4);
		return nums;
	}
	function solve(r){
		let b=r.split("").map(e=>e!=="0"?1<<(parseInt(e)-1):0);
		if(s())return b.map(b2d);
		function s(){
			let[i,ms]=analyze(b);
			if(i==null)return true;
			for(let m=1;ms;m<<=1)if(ms&m){
				b[i]=m;
				if(s())return true;
				ms^=m;
			}
			b[i]=0;
			return false;
		}
	}
	let ongoing=false;
	async function start(){
		if(ongoing)return;
		ongoing=true;
		let raw=getBoard();
		document.getElementById("DISPLAY").value=raw.replaceAll("0",".").match(/.{27}/g).map(e=>e.match(/.{9}/g).map(c=>c.match(/.{3}/g).join(" ")).join("\n")).join("\n\n");
		if(raw.length<81)return setStatus("Invalid Board");
		let solved=solve(raw);
		if(!solved)return setStatus("Invalid Board");
		setStatus("Solution Found!");
		const c=[];
		for(let i=0;i<81;i++)if(raw[i]=="0")c.push(i);
		c.sort((a,b)=>solved[a]-solved[b]);
		for(let i=0;i<c.length;i++)await placeNum(...i2rc(c[i]),solved[c[i]]);
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
		const btn=document.createElement("button");
		btn.style.zIndex=1e4;
		btn.innerText="Start";
		btn.onclick=start;
		cont.appendChild(btn);
		const status=document.createElement("span");
		status.id="STATUS";
		cont.appendChild(status);
	},500);
})();
