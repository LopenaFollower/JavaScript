//==UserScript==
// @name sudoku solver
// @version 0.1
// @description
// @match *://sudoku.com/*
// @run-at document-end
//==/UserScript==

(function(){
	var board=document.querySelector("#game>canvas");
	var attempts=0,k=0;
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
	function solved(b){
		for(let i=0;i<9;i++)for(let j=0;j<9;j++)if(b[i][j]<1)return!1;
		return!0;
	}
	function findEmptySquare(b){
		for(let i=0;i<9;i++)for(let j=0;j<9;j++)if(b[i][j]<1)return[i,j];
	}
	function nextBoards(b){
		let res=[];
		const f=findEmptySquare(b);
		if(f){
			const[y,x]=f;
			for(let i=1;i<10;i++){
				let nb=[...b],r=[...nb[y]];
				r[x]=i;
				nb[y]=r;
				res.push(nb);
			}
		}
		return res;
	}
	function validate(arr){
		let s1=new Set();
		for(let i=0;i<arr.length;i++){
			if(arr[i]<1)continue;
			if(s1.has(arr[i]))return!1;
			s1.add(arr[i]);
		}
		return!0;
	}
	function validBoard(b){
		for(let i=0;i<9;i++)if(!validate(b[i]))return!1;
		for(let i=0;i<9;i++){
			let arr=[];
			for(let j=0;j<9;j++)arr.push(b[j][i]);
			if(!validate(arr))return!1;
		}
		for(let i of[[0,1,2],[3,4,5],[6,7,8]]){
			for(let j of[[0,1,2],[3,4,5],[6,7,8]]){
				let arr=[];
				for(let y of i)for(let x of j)arr.push(b[y][x]);
				if(!validate(arr))return!1;
			}
		}
		return!0;
	}
	async function searchForSolution(b){
		if(!b.length)return !1;
		else{
			let f=b.shift();
			if(++k>Math.random()*2e3+500){
				k=0;
				await new Promise(r=>setTimeout(r,0));
			}
			const tp=await solveSudoku(f);
			return tp!=!1?tp:await searchForSolution(b);
		}
	}
	async function solveSudoku(b){
		setStatus(`Checking Solutions. (${(attempts++).toLocaleString()})`);
		if(solved(b))return b;
		else return await searchForSolution(nextBoards(b).filter(validBoard));
	}
	function getBoard(){
		const ctx=board.getContext("2d");
		const s=board.width/9-2;
		function rgbToHex(r,g,b){
			if(r>255||g>255||b>255)throw"Invalid color component";
			return((r<<16)|(g<<8)|b).toString(16);
		}
		function getc(cx,cy){
			const w=74;
			const w2=37;
			const x=board.width/2+cx*s-w2;
			const y=board.height/2+cy*s-w2;
			let d1=ctx.getImageData(x,y-w*.3,w,w),d2=ctx.getImageData(x+w*.34,y+w*.2,w,w);
			let l=d1.data.length;
			let c1={},c2={};
			for(let i=0;i<l;i+=4){
				let e1=rgbToHex(d1.data[i],d1.data[i+1],d1.data[i+2]);
				let e2=rgbToHex(d2.data[i],d2.data[i+1],d2.data[i+2]);
				c1[e1]=(c1[e1]||0)+1;
				c2[e2]=(c2[e2]||0)+1;
			}
			function g(v,n,m){
				return n<=v&&v<=m;
			}
			let px1=Object.keys(c1).reduce((r,k)=>Object.assign(r,{[k]:c1[k]}),{})["344861"]||0;
			let p1_1=g(px1,910,1007),p1_2=g(px1,1239,1287),p1_3=g(px1,1421,1481),p1_4=g(px1,1272,1396),p1_5=g(px1,1659,1709),p1_6=g(px1,1769,1896),p1_7=g(px1,1236,1293),p1_8=g(px1,1895,1963),p1_9=g(px1,1949,2045);
			let px2=Object.keys(c2).reduce((r,k)=>Object.assign(r,{[k]:c2[k]}),{})["344861"]||0;
			let p2_1=g(px2,639,740),p2_2=g(px2,916,1007),p2_3=g(px2,1159,1231),p2_4=g(px2,1000,1170),p2_5=g(px2,1081,1151),p2_6=g(px2,1100,1159),p2_7=g(px2,586,672),p2_8=g(px2,1147,1231),p2_9=g(px2,1233,1294);
			if(p1_1&&p2_1)return 1;
			else if(p1_2&&p2_2)return 2;
			else if(p1_3&&p2_3)return 3;
			else if(p1_4&&p2_4)return 4;
			else if(p1_5&&p2_5)return 5;
			else if(p1_6&&p2_6)return 6;
			else if(p1_7&&p2_7)return 7;
			else if(p1_8&&p2_8)return 8;
			else if(p1_9&&p2_9)return 9;
			if(px1+px2>0)alert(px1+", "+px2);
			return 0;
		}
		let nums="";
		for(let y=0;y<9;y++)for(let x=0;x<9;x++)nums+=getc(x-4,y-4);
		return nums;
	}
	let ongoing=false;
	async function start(){
		if(ongoing)return;
		ongoing=true;
		attempts=0;
		let raw=getBoard();
		document.getElementById("DISPLAY").value=raw.replaceAll("0",".").match(/.{27}/g).map(e=>e.match(/.{9}/g).map(c=>c.match(/.{3}/g).join(" ")).join("\n")).join("\n\n");
		const data=(raw.match(/.{9}/g)||[]).map(e=>e.split("").map(n=>parseInt(n)));
		if(raw.length<81)return setStatus("Invalid Board");
		let solved=await solveSudoku(data);
		if(!solved)return setStatus("Invalid Board");
		setStatus("Solution Found!");
		const c=[];
		for(let y=0;y<9;y++)for(let x=0;x<9;x++)if(raw[x+y*9]=="0")c.push([x,y]);
		c.sort(([b,a],[d,c])=>solved[a][b]-solved[c][d]);
		for(let i=0;i<c.length;i++){
			let[x,y]=c[i];
			await placeNum(x,y,solved[y][x]);
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