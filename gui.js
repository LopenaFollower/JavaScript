// ==UserScript==
// @name GUI
// @version 0.05
// @description
// ==/UserScript==
const GUI=function(windowName){
	function createEl(t,p){
		let el=document.createElement(t);
		p.appendChild(el);
		return el;
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
	const dashboard=createEl("div",mainWindow.document.body);dashboard.className="dashboard";
	const pageholder=createEl("div",mainWindow.document.body);pageholder.className="page-holder";
	const pages=[];
	let pageid=0,selectedPage;
	mainWindow.addPage=function(name,isMain){
		selectedPage=isMain?pageid:selectedPage;
		let tabBtn=createEl("button",dashboard),ts=tabBtn.style;
		let page=createEl("div",pageholder),ps=page.style;
		let pageMethods={};
		pages.push([tabBtn,page]);
		ts.opacity=isMain?1:.6;
		tabBtn.className="tab-button";
		tabBtn.dataset.id=pageid++;
		tabBtn.innerText=name;
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
		page.className="page";
		ps.display=isMain?"block":"none";
		ps.overflowX="scroll";
		pageMethods.rename=function(n=""){
			let name=n.toString();
			if(name.length)tabBtn.innerText=name;
		}
		pageMethods.addLabel=function(n="",i=""){
			let holder=createEl("div",page);
			let text=createEl("span",holder);
			let info=createEl("span",holder);
			holder.className="page-label";
			text.className="label-text";
			text.innerText=n;
			info.className="label-info";
			info.innerText=i;
		}
		pageMethods.addButton=function(n="",f=function(){}){
			let btn=createEl("button",page);
			btn.className="page-button";
			btn.innerText=n;
			btn.onclick=f;
		}
		pageMethods.addToggle=function(n="",d=false,f=function(){}){
			let holder=createEl("div",page);
			let title=createEl("span",holder);
			let btn=createEl("div",holder);
			let ball=createEl("div",btn);
			let toggled=!d;
			holder.className="page-toggle";
			title.className="toggle-title";
			title.innerText=n;
			btn.className="toggle-button";
			ball.className="toggle-ball";
			holder.onclick=function(){
				f(toggled=!toggled);
				ball.style.transform="translate("+(toggled?"150":"0")+"%,0%)";
			}
			holder.click();
		}
		pageMethods.addSlider=function(n="",mn=0,mx=10,f=function(){}){
			let holder=createEl("div",page);
			let container=createEl("div",holder);
			let title=createEl("span",container);
			let val=createEl("div",container);
			let slider=createEl("input",holder);
			holder.className="page-slider";
			container.style.display="flex";
			container.style.justifyContent="space-between";
			title.className="slider-title";
			title.innerText=n;
			val.className="slider-value";
			val.contentEditable=true;
			function constraint(v){
				return Math.min(10,Math.max(0,v));
			}
			val.onblur=function(){
				val.innerText=constraint(parseFloat("0"+val.innerText.replaceAll(/[^\d.-]/g,"")));
			}
			setInterval(()=>{
				slider.value=parseFloat(slider.value)+Math.sign(val.innerText-slider.value)/10;
			});
			val.innerText=slider.value=mn;
			slider.className="slider-range";
			slider.type="range";slider.step=.1;slider.min=mn;slider.max=mx;
			slider.oninput=function(){
				f(parseInt(val.innerText=this.value));
			}
		}
		return pageMethods;
	}
	return mainWindow;
};

let UI=GUI("Gui V0.04");
let Main=UI.addPage("Main",true);
let Tab2=UI.addPage("Tab 2");
Main.addLabel("Label Name","Label Info");
Main.addButton("Button");
Main.addToggle("Toggle");
Main.addSlider("Slider");
