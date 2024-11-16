const GUI=function(windowname){
	function createEl(t,p){
		let el=document.createElement(t);
		p.appendChild(el);
		return el;
	}
	const mainWindow=open("","","width=450,height=290");
	mainWindow.document.head.innerHTML+=`
	<link href="https://fonts.googleapis.com/css2?family=Sono:wght@200..800&display=swap"rel="stylesheet">
	<style>
		*{
			font-family:"Sono",monospace;
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
			background-color:#222;
		}
		.tab-button{
			color:#fff;
			border:none;
			width:100%;
			text-align:center;
			padding:5px 0;
			background-color:#0f0f0f;
		}
		.page{
			width:100%;
			height:100%;
		}
		.page-label{
			background-color:#333;
			display:flex;
			flex-direction:column;
			align-items:center;
			padding:3px;
		}
		.page-label-text{
			color:#fff;
			font-size:100%;
		}
		.page-label-info{
			color:#fffd;
			font-size:70%;
		}
		.page-button{
			width:100%;
			color:#fffe;
			margin:5px 0 0 0;
			border-radius:12px;
			background-color:#151515;
		}
		.page-toggle{
			padding:5px 0 0 0;
			background-color:#0000;
			display:flex;
			justify-content:space-between;
			width:100%;
		}
		.toggle-title{
			color:#fff;
		}
		.toggle-button{
			float:left;
			width:15%;
			border-radius:10px;
			background-color:#151515;
		}
		.toggle-ball{
			width:45%;
			height:100%;
			border-radius:100%;
			background-color:#fff;
		}
	</style>`;
	mainWindow.eval("document.title=\""+windowname+"\"");
	const dashboard=createEl("div",mainWindow.document.body),ds=dashboard.style;ds.float="left";ds.height="100%";ds.width="25%";ds.backgroundColor="#111";
	const pageholder=createEl("div",mainWindow.document.body),phs=pageholder.style;phs.float="right";phs.height="100%";phs.width="75%";phs.backgroundColor="#222";
	const pages=[];
	let pageid=0,selectedPage;
	mainWindow.addPage=function(name,isMain){
		selectedPage=isMain?pageid:selectedPage;
		let tabBtn=createEl("button",dashboard),ts=tabBtn.style;
		let page=createEl("div",pageholder),ps=page.style;
		let pageMethods={};
		ts.opacity=isMain?1:.6;
		tabBtn.className="tab-button";
		tabBtn.dataset.id=pageid++;
		tabBtn.innerText=name;
		tabBtn.addEventListener("mouseenter",e=>{
			ts.opacity=.8;
		});
		tabBtn.addEventListener("mouseleave",e=>{
			ts.opacity=+tabBtn.dataset.id!==selectedPage?.6:1;
		});
		tabBtn.onclick=function(){
			selectedPage=+tabBtn.dataset.id;
			pages.forEach(e=>{
				let[tb,p]=e;
				if(tb.dataset.id==selectedPage){
					tb.style.opacity=1;
					p.style.display="block";
				}else{
					tb.style.opacity=.6;
					p.style.display="none";
				}
			});
		}
		page.className="page";
		ps.display=isMain?"block":"none";
		ps.overflow="scroll";
		pages.push([tabBtn,page]);
		pageMethods.rename=function(n=""){
			let name=n.toString();
			if(name.length)tabBtn.innerText=name;
		}
		pageMethods.addLabel=function(n="",i=""){
			let holder=createEl("div",page);
			holder.className="page-label";
			let text=createEl("span",holder);
			let info=createEl("span",holder);
			text.className="page-label-text";
			text.innerText=n;
			info.className="page-label-info";
			info.innerText=i;
		}
		pageMethods.addButton=function(n="",f=function(){}){
			let btn=createEl("button",page);
			btn.className="page-button";
			btn.innerText=n;
			btn.onclick=f;
		}
		pageMethods.addToggle=function(n,d,f){
			let holder=createEl("div",page);
			let title=createEl("span",holder);
			let btn=createEl("div",holder);
			let toggled=d;
			holder.className="page-toggle";
			title.className="toggle-title";
			title.innerText=n;
			btn.className="toggle-button";
			btn.innerText=" ";
			let ball=createEl("div",btn);
			ball.className="toggle-ball";
			ball.style.float=toggled?"right":"left";
			ball.innerText=" ";
			btn.onclick=function(){
				toggled=!toggled;
				f(toggled);
				ball.style.float=toggled?"right":"left";
			}
			f(toggled);
		}
		return pageMethods;
	}
	return mainWindow;
};
