// ==UserScript==
// @name google
// @version -
// @description
// @match *://www.google.com/*
// ==/UserScript==

// https://www.google.com/fbx?fbx=minesweeper
let param=new URLSearchParams(location.href.split("?")[1]);
if(param.get("fbx")=="minesweeper"){
	document.body.style.background="#000";
	let run_id=0;
	const btn=document.createElement("button");
	btn.style.zIndex=1e4;
	btn.innerText="Start";
	btn.onclick=function(){
		run(++run_id);
	}
	document.body.appendChild(btn);
	const colors={
		1:"1976d2 1f78d0 247acf 247ace 237acf 2179cf 257ace 267bcf".split(" "),
		2:"3e903f 479245 398e3c 3a8f3d 3e9040 388e3c 398e3d 3c8f3e 3f9040".split(" "),
		3:"d32f2f d3302f d33231 d43332 d43836 d64a43 d53c39".split(" "),
		4:"7b1fa2 7d22a1 7c20a2 7e23a2 7c21a2 9648a1 7e24a1 7d23a2 7e24a2 9e599f".split(" "),
		5:"ff8f00 ff8f02 fb9311 f29b31 f7971f f99619 fc910b".split(" "),
		6:"3aa0a2 1a9ba5 139aa5 1499a5 44a1a3 97a7 2c9ea4 159aa5 3ba0a3 199aa5 1f9ba5 3ea3a4 1b9ca6 149ba6 169aa6 49a5a4 109aa6 269ea5 2fa0a5".split(" "),
		7:"424242 434342 534f4b 494746 4f4c49".split(" "),
		8:"".split(" "),
		9:"f13607 e63307 f23607 f13507 f13707".split(" ")
	}
	const cvs=document.querySelector("canvas.ecwpfc");
	const ctx=cvs.getContext("2d",{willReadFrequently:true});
	function getDifficulty(){
		let d=document.querySelector("#ow16>div.CcNe6e>g-dropdown-menu-button-caption>span").innerText[0];
		return{E:0,M:1,H:2}[d];
	}
	function rgbToHex(r,g,b){
		if(r>255||g>255||b>255)throw"Invalid color component";
		return((r<<16)|(g<<8)|b).toString(16);
	}
	function run(id){
		let size=cvs.width/18,w,h,flagged=[],rx,ry;
		for(const i in colors){
			const v=colors[i];
			console.log(v.map(e=>"%c"+e).join(" "),...v.map(e=>"color:#"+e));
		}
		function mouse(button,cx,cy){
			const{top,left}=cvs.getBoundingClientRect();
			const s=size/2,x=left+(cx*size+s)*rx,y=top+(cy*size+s)*rx;
			["mousedown","mouseup"].map(e=>new MouseEvent(e,{clientX:x,clientY:y,button})).forEach(e=>document.elementFromPoint(x,y).dispatchEvent(e));
		}
		function getCell(cx,cy,gfd){
			if(cx<0||cx>w-1||cy<0||cy>h-1)return;
			const s=size/2,x=cx*size+s/2,y=cy*size+s/2;
			let cs=[],c=0;
			let data=ctx.getImageData(x,y,s,s),l=data.data.length;
			for(let i=0;i<l;i+=12,c++)cs.push(rgbToHex(data.data[i],data.data[i+1],data.data[i+2]));
			cs=Array.from(new Set(cs));
			if(gfd)return cs;
			function test(a,b){
				let has=false;
				for(let i=0;i<b.length&&!has;i++)has|=a.indexOf(b[i])>=0;
				return has;
			}
			if(cs.length<3){
				if(test(cs,["a2d149","aad751"]))return[-1,[cx,cy]];
				if(test(cs,["d7b899","e5c29f"]))return[0,[cx,cy]];
			}else for(const i in colors)if(test(cs,colors[i]))return[Number(i),[cx,cy]];
			return[undefined,[-1,-1]];
		}
		function reveal(x,y){
			let c=getCell(x,y)[0];
			if(c+1&&c<9)return;
			mouse(0,x,y);
		}
		function flag(x,y){
			if(flagged.indexOf(x+","+y)+1)return;
			if(getCell(x,y)[0]<0)mouse(2,x,y);
			flagged.push(x+","+y);
		}
		function getBoard(){
			let c=[];
			for(let y=0;y<h;y++)for(let x=0;x<w;x++)c.push(getCell(x,y));
			return c;
		}
		scan=function(x,y){
			let cs=getCell(x,y,true);
			console.log(cs.map(e=>"%c"+e).join(" "),...cs.map(e=>"color:#"+e));
		}
		scanAll=function(){
			let mat={};
			for(let y=0;y<h;y++){
				for(let x=0;x<w;x++){
					let v=getCell(x,y)[0]||1;
					let cs=getCell(x,y,true);
					mat[v.toString()]??=[new Set(),{}];
					cs.forEach(e=>{
						mat[v.toString()][0].add(e);
						mat[v.toString()][1][e]??=0;
						mat[v.toString()][1][e]++;
					});
				}
			}
			for(let i in mat){
				mat[i][1]=Object.entries(mat[i][1]).sort(([,a],[,b])=>b-a);
				let cs=mat[i][1].map(e=>e[0]);
				console.log(i+" "+cs.map(e=>"%c"+e).join(" "),...cs.map(e=>"color:#"+e));
			}
			return mat;
		}
		printBoard=function(){
			let r=[];
			for(let y=0;y<h;y++){
				let c=[];
				for(let x=0;x<w;x++){
					let v=getCell(x,y)[0];
					c.push(v<0?"?":v>8?"f":v);
				}
				r.push(c);
			}
			console.table(r);
		}
		let ticks=0;
		const lb=[[10,8],[18,14],[24,20]];
		function solve(cw){
			if(id!=run_id||cw-cvs.width)return;
			[w,h]=lb[getDifficulty()];
			size=cw/w;
			ctx.imageSmoothingEnabled=false;
			rx=parseFloat(getComputedStyle(cvs).getPropertyValue("width"))/cvs.width;ry=parseFloat(getComputedStyle(cvs).getPropertyValue("height"))/cvs.height;
			solveAttempt();
			if(ticks++%15<1){
				document.querySelector(".Qwh28e").style.visibility=="hidden"&&middleClick();
				if(!getBoard().filter(e=>e).map(e=>e[0]).some(t=>t+1)){
					flagged=[];
					reveal(w>>1,h>>1);
				}
			}
			setTimeout(()=>{
				solve(cw);
			},1000/30);
		}
		function middleClick(){
			for(let y=0;y<h;y++)for(let x=0;x<w;x++)mouse(1,x,y);
		}
		function solveAttempt(){
			const{mines,safe}=findActionableKeys();
			[...mines].forEach(k=>flag(...k.split(",").map(Number)));
			[...safe].forEach(k=>reveal(...k.split(",").map(Number)));
		}
		function key([x,y]){
			return x+","+y;
		}
		function findActionableKeys(){
			const withSurrounding=findSurrounding(),mines=new Set(),safe=new Set();
			withSurrounding.forEach(item=>{
				const possibleMines=item.surrounding.filter(c=>c[0]<0||c[0]>8);
				if(item.cell[0]==possibleMines.length)possibleMines.forEach(c=>mines.add(key(c[1])));
				else{
					const flagged=possibleMines.filter(c=>c[0]>8),unknown=possibleMines.filter(c=>c[0]<0);
					if(item.cell[0]==flagged.length)unknown.forEach(c=>safe.add(key(c[1])));
				}
			});
			const subset=findSubsetActions(withSurrounding);
			subset.mines.forEach(k=>mines.add(k));
			subset.safe.forEach(k=>safe.add(k));
			return{mines,safe};
		}
		function findSubsetActions(surroundings){
			const info=surroundings.map(item=>{
				const flagged=item.surrounding.filter(c=>c[0]>8),unknown=item.surrounding.filter(c=>c[0]<0);
				return{unknown,unknownKeys:new Set(unknown.map(c=>key(c[1]))),remaining:item.cell[0]-flagged.length};
			});
			const mines=new Set(),safe=new Set();
			for(let i=0;i<info.length;i++)
				for(let j=0;j<info.length;j++){
					if(i==j)continue;
					const A=info[i],B=info[j];
					if(!A.unknown.length||A.unknown.length>=B.unknown.length)continue;
					let subset=true;
					for(const k of A.unknownKeys)if(!B.unknownKeys.has(k)){
						subset=false;
						break;
					}
					if(!subset)continue;
					const extras=B.unknown.filter(c=>!A.unknownKeys.has(key(c[1]))),diff=B.remaining-A.remaining;
					if(!diff)extras.forEach(c=>safe.add(key(c[1])));
					else if(diff==extras.length)extras.forEach(c=>mines.add(key(c[1])));
				}
			return{mines,safe};
		}
		function findSurrounding(){
			const relativePos=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
			const withSurrounding=getBoard().filter(e=>e&&e[0]>0&&e[0]<9).map(cell=>{
				const surrounding=relativePos.map(([x,y])=>getCell(cell[1][0]+x,cell[1][1]+y)).filter(e=>e);
				return{cell,surrounding};
			}).filter(({surrounding})=>!surrounding.some(c=>c[0]==undefined));
			return withSurrounding;
		}
		solve(cvs.width);
	}
}
