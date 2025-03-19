const GUI=function(windowName){
	function createEl(t,p,o={},c=""){
		let e=document.createElement(t);
		Object.keys(o).forEach(k=>e[k]=o[k]);
		e.style.cssText=c;
		p.appendChild(e);
		return e;
	}
	const mainWindow=open("","","width=470,height=175"),doc=mainWindow.document;
	mainWindow.window.onresize=function(){
		mainWindow.resizeTo(470,Math.max(15,mainWindow.window.outerHeight));
	}
	createEl("style",doc.head).appendChild(document.createTextNode(`
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
		transition:opacity .3s cubic-bezier(.45,0,.55,1);
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
		user-select:none;
		overflow-x:scroll;
	}
	.container-rt{
		display:flex;
		justify-content:space-between;
	}
	.page-label{
		background:#333;
		display:flex;
		flex-direction:column;
		align-items:center;
		padding:3px;
	}
	.label-text{
		color:#fffe;
		font-size:85%;
	}
	.label-info{
		color:#fffa;
		font-size:60%;
	}
	.page-button{
		width:100%;
		margin:5px 0 0 0;
		border-radius:10px;
		background:#151515;
	}
	.page-toggle,.page-slider,.page-dropdown,.page-colorpicker{
		padding:5px 0 0 0;
	}
	.toggle-title,.slider-title,.textbox-title,.dropdown-title,.colorpicker-title{
		margin-left:5px;
	}
	.toggle-button,.slider-value,.textbox-value,.dropdown-button{
		width:15%;
		text-align:center;
		border-radius:10px;
		background:#151515;
		margin-right:5px;
	}
	.toggle-ball{
		width:45%;
		height:100%;
		border-radius:50px;
		background:#fff;
		transition:all 75ms cubic-bezier(.45,0,.55,1);
	}
	.slider-range{
		-webkit-appearance:none;
		appearance:none;
		width:99%;
		height:15px;
		border-radius:5px;
		background:#151515;
		opacity:.8;
		-webkit-transition:all .2s;
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
	.textbox-value{
		border:1px solid #fff;
		width:20%;
	}
	.colorpicker-value{
		height:20px;
		margin-right:5px;
		border:none;
		outline:none;
		-webkit-appearance:none;
		appearance:none;
		&::-webkit-color-swatch-wrapper{
			padding:0px;
		}
		&::-webkit-color-swatch{
			border:none;
		}
	}
	.dropdown-button{
		background:none;
		transition:all .1s linear;
		transform:rotate(180deg);
	}
	.dropdown-contents{
		height:0;
		overflow:hidden;
		transition:all .2s linear;
		width:98%;
		margin:0 1% 0 1%;
		border-radius:5px;
	}
	.dropdown-item{
		background:#151515;
		border:1px solid #111;
		text-align:center;
		color:#d0d0d0;
		&:hover{
			background:#070707;
			font-size:105%;
		}
	}
	`));
	doc.title=windowName;
	const dashboard=createEl("div",doc.body,{className:"dashboard"});
	const pageholder=createEl("div",doc.body,{className:"page-holder"});
	const pages=[];
	let pid=0,selectedPage;
	function createMethods(p,o){
		Object.keys(o).forEach(k=>p[k]=o[k]);
		return p;
	}
	function pcall(func,...args){
		try{
			return func(...args);
		}catch(e){};
	}
	return createMethods(mainWindow,{
		addPage(name,visible){
			selectedPage=visible?pid:selectedPage;
			let tabBtn=createEl("button",dashboard,{className:"tab-button",innerText:name}),ts=tabBtn.style;
			let page=createEl("div",pageholder,{className:"page",tabIndex:-1});
			pages.push([tabBtn,page]);
			ts.opacity=visible?1:.5;page.style.display=visible?"block":"none";
			tabBtn.dataset.id=pid++;
			tabBtn.addEventListener("mouseenter",e=>ts.opacity=+tabBtn.dataset.id==selectedPage?1:.75);
			tabBtn.addEventListener("mouseleave",e=>ts.opacity=+tabBtn.dataset.id==selectedPage?1:.5);
			tabBtn.onclick=function(){
				selectedPage=+tabBtn.dataset.id;
				pages.forEach(([b,p])=>{
					let s=b.dataset.id==selectedPage;
					b.style.opacity=s?1:.5;
					p.style.display=s?"":"none";
				});
			}
			return{
				rename(n=""){
					n=n.toString();
					if(n.length)tabBtn.innerText=n;
				},
				addLabel(n="",i=""){
					let holder=createEl("div",page,{className:"page-label"}),txt=createEl("span",holder,{className:"label-text",innerText:n}),inf=createEl("span",holder,{className:"label-info",innerText:i});
					return{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),setInfo:v=>(inf.textContent=v)};
				},
				addButton(n="",f=function(){}){
					let holder=createEl("button",page,{className:"page-button",tabIndex:-1,innerText:n,onclick:wrapper});
					function wrapper(){
						pcall(f);
					}
					return{remove:()=>holder.remove(),setText:v=>(holder.textContent=v),call:wrapper,setCallback:nf=>(f=nf||function(){})};
				},
				addToggle(n="",d=false,f=function(){}){
					let holder=createEl("div",page,{className:"page-toggle container-rt"});
					let txt=createEl("span",holder,{className:"toggle-title",innerText:n});
					let btn=createEl("div",holder,{className:"toggle-button"});
					let ball=createEl("div",btn,{className:"toggle-ball"});
					holder.onclick=function(){
						pcall(f,d=!d);
						ball.style.transform=`translate(${d?125:0}%)`;
					}
					holder.click(d=!d);
					return{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),set:v=>(holder.click(d=!v)),get:()=>d};
				},
				addSlider(n="",opt,f=function(){}){
					let min=opt.minimum||opt.min||opt.mn,max=opt.maximum||opt.max||opt.mx,d=opt.default||opt.def||opt.d||min;
					let holder=createEl("div",page,{className:"page-slider"});
					let container=createEl("div",holder,{className:"container-rt"});
					let txt=createEl("span",container,{className:"slider-title",innerText:n});
					let val=createEl("div",container,{className:"slider-value",tabIndex:-1,contentEditable:true,innerText:min});
					let slider=createEl("input",holder,{className:"slider-range",type:"range",tabIndex:-1,step:opt.step??1,min,max,value:min},"margin-bottom:5px");
					function constraint(v){
						return Math.min(max,Math.max(min,v));
					}
					function upd(){
						pcall(f,val.innerText=slider.value=constraint(constraint(parseFloat("0"+(val.innerText.replaceAll(/[^\d.-]/g,"")||d)))));
					}
					val.onblur=upd;
					setInterval(()=>{
						slider.value=parseFloat(slider.value)+Math.sign(val.innerText-slider.value)/10;
					});
					slider.oninput=function(){
						f(parseFloat(val.innerText=this.value));
					}
					upd();
					return{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),setMin:v=>upd(slider.min=v),setMax:v=>upd(slider.max=v),set:v=>upd(val.innerText=v),get:()=>val.innerText};
				},
				addTextBox(n="",d="",f=function(){}){
					let holder=createEl("div",page,{className:"page-textbox container-rt"});
					let txt=createEl("span",holder,{className:"textbox-title",innerText:n});
					let val=createEl("div",holder,{className:"textbox-value",tabIndex:-1,contentEditable:"plaintext-only",innerText:d});
					val.onblur=function(){
						pcall(f,val.innerText);
					}
					return{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),set:v=>val.onblur(val.innerText=v),get:()=>val.innerText};
				},
				addDropdown(n="",list,close,f=function(){}){
					let holder=createEl("div",page,{className:"page-dropdown"});
					let container=createEl("div",holder,{className:"container-rt"});
					let txt=createEl("span",container,{className:"dropdown-title",innerText:n});
					let btn=createEl("span",container,{className:"dropdown-button",innerText:String.fromCharCode(11167)});
					let cH=createEl("div",holder,{className:"dropdown-contents"}),wrap=createEl("div",cH),status=false,selected;
					// item display types
					function loadList(l){
						wrap.innerHTML="";
						if(Array.isArray(l))l.forEach(e=>createEl("div",wrap,{className:"dropdown-item",innerText:e}).onclick=()=>color(pcall(f,selected=e)));
						else if(typeof l=="object"&&l!==null)Object.keys(l).forEach(k=>createEl("div",wrap,{className:"dropdown-item",innerText:k}).onclick=()=>color(pcall(f,l[selected=k])));
					}
					function color(){
						[...wrap.children].forEach(e=>e.style.color=e.innerText==selected?"#fff":"#d0d0d0");
						close&&btn.onclick(status=true);
					}
					loadList(list);
					btn.onclick=function(){
						btn.style.transform=`rotate(${(status=!status)?0:180}deg)`;
						cH.style.height=cH.clientHeight?0:wrap.clientHeight+"px";
					}
					return{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),setList:v=>loadList(v)};
				},
				addCategory(){
					// mini page
				},
				addColorPicker(n="",d="#000000",f=function(){}){
					let holder=createEl("div",page,{className:"page-colorpicker container-rt"});
					let txt=createEl("span",holder,{className:"colorpicker-title",innerText:n});
					let val=createEl("input",holder,{className:"colorpicker-value",tabIndex:-1,type:"color",value:d});
					val.onchange=e=>{
						pcall(f,val.value);
					}
					return{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),set:v=>val.onchange(val.value=v),get:()=>val.value};
				}
			};
		},
		onParentClose(prevDef=true,f=function(){}){
			window.addEventListener("beforeunload",e=>{
				mainWindow.close();
				pcall(f);
				if(prevDef){
					e.preventDefault();
					e.returnValue=1;
					return!0;
				}
			});
		}
	});
};
return GUI;
