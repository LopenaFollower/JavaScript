// ==UserScript==
// @name dino
// @icon data:image/png;base64,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
// @description
// @version -
// ==/UserScript==
const backupGui=(function(){const GUI=function(windowName){function createEl(t,p,o={}){let e=document.createElement(t);Object.keys(o).forEach(k=>{if(k=="style")Object.entries(o[k]).forEach(([s,v])=>{e.style[s]=v});else e[k]=o[k]});p.appendChild(e);return e}const mainWindow=open("","","width=465,height=175");createEl("style",mainWindow.document.head).appendChild(document.createTextNode(`*{font-family:"Segoe UI",Tahoma,monospace;color:#fff;}body{margin:0;padding:0;}::-webkit-scrollbar{height:5px;width:5px;}::-webkit-scrollbar-thumb{border-radius:10px;background:#777;}::-webkit-scrollbar-corner{background:#222;}.dashboard{float:left;height:100%;width:25%;background:#111;}.tab-button{border:none;width:100%;padding:5px 0;background:#0f0f0f;user-select:none;}.page-holder{float:right;height:100%;width:75%;background:#222;}.page{width:100%;height:100%;user-select:none;overflow-x:scroll;}.page-label{background:#333;display:flex;flex-direction:column;align-items:center;padding:3px;}.label-info{color:#fffb;font-size:70%;}.page-button{width:100%;margin:5px 0 0 0;border-radius:10px;background:#151515;}.page-toggle{padding:5px 0 0 0;display:flex;justify-content:space-between;}.toggle-title,.slider-title{margin-left:5px;}.toggle-button,.slider-value{width:15%;text-align:center;border-radius:10px;background:#151515;}.toggle-ball{width:40%;height:100%;border-radius:50%;background:#fff;transition:all .1s cubic-bezier(.4,0,1,1)}.page-slider{padding:5px 0 0 0;}.slider-range{-webkit-appearance:none;appearance:none;width:99%;height:15px;border-radius:5px;background:#151515;opacity:.9;-webkit-transition:.2s;transition:all .2s;}.slider-range:hover{opacity:1;}.slider-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:100%;background:#fff;user-select:none;}`));mainWindow.document.title=windowName;const dashboard=createEl("div",mainWindow.document.body,{className:"dashboard"});const pageholder=createEl("div",mainWindow.document.body,{className:"page-holder"});const pages=[];let pageid=0,selectedPage;mainWindow.addPage=function(name,visible){selectedPage=visible?pageid:selectedPage;let tabBtn=createEl("button",dashboard,{className:"tab-button",innerText:name}),ts=tabBtn.style;let page=createEl("div",pageholder,{className:"page"});let pageMethods={};pages.push([tabBtn,page]);ts.opacity=visible?1:.6;page.style.display=visible?"block":"none";tabBtn.dataset.id=pageid++;tabBtn.addEventListener("mouseenter",e=>{ts.opacity=+tabBtn.dataset.id==selectedPage?1:.8});tabBtn.addEventListener("mouseleave",e=>{ts.opacity=+tabBtn.dataset.id==selectedPage?1:.6});tabBtn.onclick=function(){selectedPage=+tabBtn.dataset.id;pages.forEach(([b,p])=>{if(b.dataset.id==selectedPage){b.style.opacity=1;p.style.display="block"}else{b.style.opacity=.6;p.style.display="none"}})};pageMethods.rename=function(n=""){n=n.toString();if(n.length)tabBtn.innerText=n};pageMethods.addLabel=function(n="",i=""){let holder=createEl("div",page,{className:"page-label"});createEl("span",holder,{className:"label-text",innerText:n});createEl("span",holder,{className:"label-info",innerText:i})};pageMethods.addButton=function(n="",f=function(){}){createEl("button",page,{className:"page-button",innerText:n,onclick:f})};pageMethods.addToggle=function(n="",d=false,f=function(){}){let holder=createEl("div",page,{className:"page-toggle"});createEl("span",holder,{className:"toggle-title",innerText:n});let btn=createEl("div",holder,{className:"toggle-button"});let ball=createEl("div",btn,{className:"toggle-ball"});let toggled=!d;holder.onclick=function(){f(toggled=!toggled);ball.style.transform="translate("+(toggled?"15":"")+"0%,0%)"};holder.click()};pageMethods.addSlider=function(n="",min=0,max=10,f=function(){}){let holder=createEl("div",page,{className:"page-slider"});let container=createEl("div",holder,{style:{display:"flex",justifyContent:"space-between"}});createEl("span",container,{className:"slider-title",innerText:n});let val=createEl("div",container,{className:"slider-value",contentEditable:true,innerText:min});let slider=createEl("input",holder,{className:"slider-range",type:"range",step:.1,min,max,value:min});function constraint(v){return Math.min(max,Math.max(min,v))}val.onblur=function(){val.innerText=constraint(parseFloat("0"+val.innerText.replaceAll(/[^\\d.-]/g,"")))};setInterval(()=>{slider.value=parseFloat(slider.value)+Math.sign(val.innerText-slider.value)/10});slider.oninput=function(){f(parseFloat(val.innerText=this.value))}};pageMethods.addTextBox=function(n="",d="",f=function(){}){let holder=createEl("div",page,{className:"page-slider",style:{display:"flex",justifyContent:"space-between",userSelect:"none"}});createEl("span",holder,{className:"slider-title",innerText:n});let val=createEl("div",holder,{className:"slider-value",contentEditable:true,innerText:d,style:{userSelect:"none"}});val.onblur=function(){f(val.innerText)}};return pageMethods};return mainWindow};return GUI})();
!async function(){
	/* GUI */
	let useBackup=true;
	const GUI=!useBackup?new Function(await(await fetch("https://raw.githubusercontent.com/LopenaFollower/JavaScript/main/gui%20lib.js")).text())():backupGui;
	/* USER SETTINGS */
	const espColor="#0F0";
	const dinoColor="#F00";
	const tracerColor="#0F0";

	GUI.noScoreFlash=false;
	GUI.tracer=false;
	GUI.espObstacle=false;
	GUI.espDino=false;
	GUI.autoPlay=false;
	GUI.autoRestart=false;
	GUI.noScoreFlash=false;
	GUI.scoreUpdate=false;
	GUI.immortal=false;
	GUI.destroyObstacles=false;

	const game=window.Runner.instance_,{tRex,horizon,distanceMeter}=game;
	const gCvs=game.canvas,cvs=document.createElement("canvas"),ctx=cvs.getContext("2d");
	const reopen=document.createElement("button");
	reopen.innerText="Show Gui";
	reopen.style.cssText="position:fixed;top:0px;left:0px;";
	cvs.width=gCvs.width;cvs.height=gCvs.height;
	let ws=["width","height","position"],st=getComputedStyle(gCvs),rAF,ui;
	cvs.style.cssText=ws.reduce((c,n)=>`${c}${n}:${st.getPropertyValue(n)};`);
	cvs.style.zIndex=11;
	gCvs.parentNode.appendChild(cvs);document.body.appendChild(reopen);
	const wnf={};

	/*og funcs*/
	const gameOver_=game.gameOver;
	//game.stop=e=>0;

	function stroke(c){
		ctx.strokeStyle=c;
	}
	function fill(c){
		ctx.fillStyle=c;
	}
	function espObstacles(){
		let pad=2;
		stroke(espColor);
		horizon.obstacles.forEach(e=>e.collisionBoxes.forEach(c=>ctx.strokeRect(e.xPos+c.x-pad,e.yPos+c.y-pad,c.width+2*pad,c.height+2*pad)));
	}
	function espDino(){
		let t=tRex,dc=tRex.ducking,c=tRex.config,h=dc?c.HEIGHT_DUCK:c.HEIGHT;
		stroke(dinoColor);
		ctx.strokeRect(t.xPos+1,t.yPos+1+(dc?.76*h:0),(dc?c.WIDTH_DUCK:c.WIDTH)-2,h-2);
	}
	function tracer(){
		let{xPos:dx,yPos:dy,ducking:dc}=tRex,t=tRex.config,w=dc?t.WIDTH_DUCK:t.WIDTH,h=dc?2*t.HEIGHT_DUCK:t.HEIGHT;
		stroke(tracerColor);
		horizon.obstacles.forEach(e=>{
			ctx.beginPath();
			ctx.moveTo(dx+w/2,dy+h/2);
			let xs=0,ys=0,cn=e.collisionBoxes.length;
			e.collisionBoxes.forEach(cl=>{
				xs+=(e.xPos+cl.x+cl.width/2)/cn;
				ys+=(e.yPos+cl.y+cl.height/2)/cn;
			});
			ctx.lineTo(xs,ys);
			ctx.stroke();
			let dist=Math.sqrt((dx+w/2-xs)**2+(dy+h/2-ys)**2).toFixed(3);
			ctx.fillStyle=game.inverted?"#000":"#fff";
			let m=ctx.measureText(dist);
			ctx.fillText(dist,(dx+w/2+xs-m.width)/2,(dy+h/2+ys+m.actualBoundingBoxAscent+m.actualBoundingBoxDescent)/2);
		});
	}
	function nearest(){
		if(!horizon.obstacles.length)return[1/0,1/0];
		let o=horizon.obstacles[0],xs=0,ys=0,cn=o.collisionBoxes.length;
		o.collisionBoxes.forEach(c=>{
			xs+=o.xPos+c.x+c.width/2;
			ys+=o.yPos+c.y+c.height/2;
		});
		return[xs/cn,ys/cn];
	}
	function legalJump(){
		if(!tRex.jumping&&!tRex.ducking)tRex.startJump(game.currentSpeed);
	}
	function duck(d){
		if(tRex.ducking!=d&&!tRex.jumping)tRex.setDuck(d);
	}
	function permanentDarkmode(){
		if(game.inverted)game.invert(game.invertTrigger=0);
	}
	function noScoreFlash(){
		distanceMeter.config.FLASH_DURATION=0;
	}
	function autoRestart(){
		if(game.crashed)game.restart();
	}
	function resetHighScore(){
		game.saveHighScore(0,true);
	}
	function maxScore(){
		game.saveHighScore(999999950,true);
	}
	function updateHighScore(){
		if(game.distanceRan>game.highestScore)game.saveHighScore(game.distanceRan);
	}
	function update(){
		rAF=requestAnimationFrame(update);
		ctx.clearRect(0,0,cvs.width,cvs.height);
		distanceMeter.maxScoreUnits=6;
		if(GUI.noScoreFlash)noScoreFlash();
		if(GUI.scoreUpdate)updateHighScore();
		if(GUI.darkMode)permanentDarkmode();
		if(GUI.autoRestart)autoRestart();
		if(!game.crashed&&game.isRunning()){
			if(GUI.espObstacle)espObstacles();
			if(GUI.espDino)espDino();
			if(GUI.tracer)tracer();
			if(GUI.autoPlay){
				let[x,y]=nearest();
				let d=GUI.destroyObstacles;
				if(x/game.currentSpeed<15&&d)(y>90||tRex.jumping)&&horizon.obstacles.shift();
				else if(x/game.currentSpeed<23&&!d)if(y>99){
					duck(0);
					legalJump();
				}else if(y>90)duck(1);
			}
		}
		//document.querySelector("#main-message>h1>span").innerText=nearest()[1];
	}
	horizon.spawn=function(id){
		const o=Obstacle.types[id];
		this.obstacles.push(new Obstacle(this.canvasCtx,o,this.spritePos[o.type],this.dimensions,this.gapCoefficient,game.currentSpeed,o.width,this.altGameModeActive));
		this.obstacleHistory.unshift(o.type);
	}
	function init(){
		cancelAnimationFrame(rAF);
		reopen.style.display="none";
		let checker,UI=new GUI("Dino Gui V1.3.0");
		let Main=UI.addPage("Main",true);
		let Obst=UI.addPage("Obstacles");
		let Dino=UI.addPage("Dino");ui=UI;
		Main.addButton("Max Score",maxScore);
		Main.addButton("Reset Score",resetHighScore);
		Main.addToggle("Permanent Darkmode",GUI.darkMode,v=>GUI.darkMode=v);
		Main.addToggle("No Score Flash",GUI.noScoreFlash,v=>GUI.noScoreFlash=v);
		Main.addToggle("Update High Score",GUI.scoreUpdate,v=>GUI.scoreUpdate=v);

		Obst.addToggle("Esp Obstacles",GUI.espObstacle,v=>GUI.espObstacle=v);
		Obst.addToggle("Tracer",GUI.tracer,v=>GUI.tracer=v);
		Obst.addToggle("Destroy Obstacles",GUI.destroyObstacles,v=>GUI.destroyObstacles=v);

		Dino.addToggle("God Mode",GUI.immortal,v=>game.gameOver=(GUI.immortal=v)?_=>_:gameOver_);
		Dino.addToggle("Auto Play",GUI.autoPlay,v=>GUI.autoPlay=v);
		Dino.addToggle("Auto Restart",GUI.autoRestart,v=>GUI.autoRestart=v);
		Dino.addToggle("Dino Esp",GUI.espDino,v=>GUI.espDino=v);
		Dino.addSlider("Set Speed",0,500,v=>game.setSpeed(v));
		checker=setInterval(()=>{
			if(UI.closed){
				clearInterval(checker);
				reopen.style.display="block";
			}
		},250);
		update();
	}
	reopen.onclick=init;
	init();
	window.addEventListener("beforeunload",e=>ui.close());
}();
