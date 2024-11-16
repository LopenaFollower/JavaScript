// ==UserScript==
// @name GUI
// @version 0.05
// @description
// ==/UserScript==
const GUI=function(windowName){
	function createEl(t,p,o={}){
		let e=document.createElement(t);
		Object.keys(o).forEach(k=>{e[k]=o[k]});
		p.appendChild(e);
		return e;
	}
	const mainWindow=open("","","width=450,height=290");
	createEl("style",mainWindow.document.head).appendChild(document.createTextNode(`
		*{
			font-family:"Segoe UI",Tahoma,monospace;
			color:#fff;
		}
		body{
			margin:0;
			padding:0;
		}
		::-webkit-scrollbar{
			height:5px;
			width:5px;
		}
		::-webkit-scrollbar-thumb{
			border-radius:10px;
			background:#777;
		}
		::-webkit-scrollbar-corner{
			background:#222;
		}
		.dashboard{
			float:left;
			height:100%;
			width:25%;
			background:#111;
		}
		.tab-button{
			border:none;
			width:100%;
			padding:5px 0;
			background:#0f0f0f;
		}
		.page-holder{
			float:right;
			height:100%;
			width:75%;
			background:#222;
		}
		.page{
			width:100%;
			height:100%;
			overflow-x:scroll;
		}
		.page-label{
			background:#333;
			display:flex;
			flex-direction:column;
			align-items:center;
			padding:3px;
		}
		.label-info{
			color:#fffb;
			font-size:70%;
		}
		.page-button{
			width:100%;
			margin:5px 0 0 0;
			border-radius:10px;
			background:#151515;
		}
		.page-toggle{
			padding:5px 0 0 0;
			display:flex;
			justify-content:space-between;
		}
		.toggle-title,.slider-title{
			margin-left:5px;
		}
		.toggle-button,.slider-value{
			width:15%;
			text-align:center;
			border-radius:10px;
			background:#151515;
		}
		.toggle-ball{
			width:40%;
			height:100%;
			border-radius:100%;
			background:#fff;
			transition:all .1s cubic-bezier(.4,0,1,1)
		}
		.page-slider{
			padding:5px 0 0 0;
		}
		.slider-range{
			-webkit-appearance:none;
			appearance:none;
			width:99%;
			height:15px;
			border-radius:5px;
			background:#151515;
			opacity:.9;
			-webkit-transition:.2s;
			transition:all .2s;
		}
		.slider-range:hover{
			opacity:1;
		}
		.slider-range::-webkit-slider-thumb{
			-webkit-appearance:none;
			appearance:none;
			width:20px;
			height:20px;
			border-radius:100%;
			background:#fff;
			user-select:none;
		}
	`));
	mainWindow.document.title=windowName;
	const dashboard=createEl("div",mainWindow.document.body,{className:"dashboard"});
	const pageholder=createEl("div",mainWindow.document.body,{className:"page-holder"});
	const pages=[];
	let pageid=0,selectedPage;
	mainWindow.addPage=function(name,isMain){
		selectedPage=isMain?pageid:selectedPage;
		let tabBtn=createEl("button",dashboard,{className:"tab-button",innerText:name}),ts=tabBtn.style;
		let page=createEl("div",pageholder,{className:"page"});
		let pageMethods={};
		pages.push([tabBtn,page]);
		ts.opacity=isMain?1:.6;
		page.style.display=isMain?"block":"none";
		tabBtn.dataset.id=pageid++;
		tabBtn.addEventListener("mouseenter",e=>{
			ts.opacity=+tabBtn.dataset.id==selectedPage?1:.8;
		});
		tabBtn.addEventListener("mouseleave",e=>{
			ts.opacity=+tabBtn.dataset.id==selectedPage?1:.6;
		});
		tabBtn.onclick=function(){
			selectedPage=+tabBtn.dataset.id;
			pages.forEach(([b,p])=>{
				if(b.dataset.id==selectedPage){
					b.style.opacity=1;
					p.style.display="block";
				}else{
					b.style.opacity=.6;
					p.style.display="none";
				}
			});
		}
		pageMethods.rename=function(n=""){
			n=n.toString();
			if(n.length)tabBtn.innerText=n;
		}
		pageMethods.addLabel=function(n="",i=""){
			let holder=createEl("div",page,{className:"page-label"});
			createEl("span",holder,{className:"label-text",innerText:n});
			createEl("span",holder,{className:"label-info",innerText:i});
		}
		pageMethods.addButton=function(n="",f=function(){}){
			createEl("button",page,{className:"page-button",innerText:n,onclick:f});
		}
		pageMethods.addToggle=function(n="",d=false,f=function(){}){
			let holder=createEl("div",page,{className:"page-toggle"});
			createEl("span",holder,{className:"toggle-title",innerText:n});
			let btn=createEl("div",holder,{className:"toggle-button"});
			let ball=createEl("div",btn,{className:"toggle-ball"});
			let toggled=!d;
			holder.onclick=function(){
				f(toggled=!toggled);
				ball.style.transform="translate("+(toggled?"15":"")+"0%,0%)";
			}
			holder.click();
		}
		pageMethods.addSlider=function(n="",min=0,max=10,f=function(){}){
			let holder=createEl("div",page,{className:"page-slider"});
			let container=createEl("div",holder);
			createEl("span",container,{className:"slider-title",innerText:n});
			let val=createEl("div",container,{className:"slider-value",contentEditable:true,innerText:min});
			let slider=createEl("input",holder,{className:"slider-range",type:"range",step:.1,min,max,value:min});
			container.style.display="flex";
			container.style.justifyContent="space-between";
			function constraint(v){
				return Math.min(max,Math.max(min,v));
			}
			val.onblur=function(){
				val.innerText=constraint(parseFloat("0"+val.innerText.replaceAll(/[^\d.-]/g,"")));
			}
			setInterval(()=>{
				slider.value=parseFloat(slider.value)+Math.sign(val.innerText-slider.value)/10;
			});
			slider.oninput=function(){
				f(parseInt(val.innerText=this.value));
			}
		}
		return pageMethods;
	}
	return mainWindow;
};

let UI=GUI("Gui V0.05");
let Main=UI.addPage("Main",true);
let Tab2=UI.addPage("Tab 2");
Main.addLabel("Label Name","Label Info");
Main.addButton("Button");
Main.addToggle("Toggle");
Main.addSlider("Slider");
