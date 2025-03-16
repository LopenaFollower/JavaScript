const GUI=function(windowName){
	function createEl(t,p,o={},c=""){
		let e=document.createElement(t);
		Object.keys(o).forEach(k=>e[k]=o[k]);
		e.style.cssText=c;
		p.appendChild(e);
		return e;
	}
	const mainWindow=open("","","width=465,height=175"),doc=mainWindow.document;
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
	.container-left{
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
	.page-toggle,.page-slider,.page-colorpicker{
		padding:5px 0 0 0;
	}
	.toggle-title,.slider-title,.textbox-title,.colorpicker-title{
		margin-left:5px;
	}
	.toggle-button,.slider-value,.textbox-value{
		width:15%;
		text-align:center;
		border-radius:10px;
		background:#151515;
		margin-right:5px;
	}
	.toggle-ball{
		width:40%;
		height:100%;
		border-radius:100%;
		background:#fff;
		transition:all .1s cubic-bezier(.4,0,1,1)
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
	.textbox-value{
		border:1px solid #fff;
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
	return createMethods(mainWindow,{addPage:function(name,visible){
		selectedPage=visible?pid:selectedPage;
		let tabBtn=createEl("button",dashboard,{className:"tab-button",innerText:name}),ts=tabBtn.style;
		let page=createEl("div",pageholder,{className:"page"});
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
		return createMethods({},{
			rename:function(n=""){
				n=n.toString();
				if(n.length)tabBtn.innerText=n;
			},
			addLabel:function(n="",i=""){
				let holder=createEl("div",page,{className:"page-label"}),txt=createEl("span",holder,{className:"label-text",innerText:n}),inf=createEl("span",holder,{className:"label-info",innerText:i});
				return createMethods({},{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),setInfo:v=>(inf.textContent=v)});
			},
			addButton:function(n="",f=function(){}){
				let holder=createEl("button",page,{className:"page-button",innerText:n,onclick:f});
				return createMethods({},{remove:()=>holder.remove(),setText:v=>(holder.textContent=v),call:f,setCallback:nf=>(f=nf)});
			},
			addToggle:function(n="",d=false,f=function(){}){
				let holder=createEl("div",page,{className:"page-toggle container-left"});
				let txt=createEl("span",holder,{className:"toggle-title",innerText:n});
				let btn=createEl("div",holder,{className:"toggle-button"});
				let ball=createEl("div",btn,{className:"toggle-ball"});
				holder.onclick=function(){
					f(d=!d);
					ball.style.transform="translate("+(d?"15":"")+"0%)";
				}
				holder.click(d=!d);
				return createMethods({},{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),set:v=>(holder.click(d=!v)),get:()=>d});
			},
			addSlider:function(n="",opt,f=function(){}){
				let min=opt.minimum||opt.min||opt.mn,max=opt.maximum||opt.max||opt.mx,d=opt.default||opt.def||opt.d||min;
				let holder=createEl("div",page,{className:"page-slider"});
				let container=createEl("div",holder,{className:"container-left"});
				let txt=createEl("span",container,{className:"slider-title",innerText:n});
				let val=createEl("div",container,{className:"slider-value",contentEditable:true,innerText:min});
				let slider=createEl("input",holder,{className:"slider-range",type:"range",step:.1,min,max,value:min});
				function constraint(v){
					return Math.min(max,Math.max(min,v));
				}
				function upd(){
					f(val.innerText=slider.value=constraint(constraint(parseFloat("0"+(val.innerText.replaceAll(/[^\d.-]/g,"")||d)))));
				}
				val.onblur=upd;
				setInterval(()=>{
					slider.value=parseFloat(slider.value)+Math.sign(val.innerText-slider.value)/10;
				});
				slider.oninput=function(){
					f(parseFloat(val.innerText=this.value));
				}
				upd();
				return createMethods({},{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),setMin:v=>upd(slider.min=v),setMax:v=>upd(slider.max=v),set:v=>upd(val.innerText=v),get:()=>val.innerText});
			},
			addTextBox:function(n="",d="",f=function(){}){
				let holder=createEl("div",page,{className:"page-textbox container-left"});
				let txt=createEl("span",holder,{className:"textbox-title",innerText:n});
				let val=createEl("div",holder,{className:"textbox-value",contentEditable:true,innerText:d});
				val.onblur=function(){
					f(val.innerText);
				}
				return createMethods({},{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),set:v=>val.onblur(val.innerText=v),get:()=>val.innerText});
			},
			addDropdown:function(n="",opt,f=function(){}){
				let t=opt.type||opt.t;
				switch(t){
					case"regular":case"reg":case"dropdown":case"dd":

						break;
					case"category":case"folder":

						break;
				}
			},
			addColorPicker(n="",d="#000000",f=function(){}){
				let holder=createEl("div",page,{className:"page-colorpicker container-left"});
				let txt=createEl("span",holder,{className:"colorpicker-title",innerText:n});
				let val=createEl("input",holder,{className:"colorpicker-value",type:"color",value:d});
				val.onchange=function(){
					f(val.value);
				}
				return createMethods({},{remove:()=>holder.remove(),setText:v=>(txt.textContent=v),set:v=>val.onchange(val.value=v),get:()=>val.value});
			}
		});
	},onParentClose:function(prevDef=true,f=function(){}){
		window.addEventListener("beforeunload",e=>{
			mainWindow.close();
			try{f()}catch(e){};
			if(prevDef){
				e.preventDefault();
				e.returnValue=1;
				return!0;
			}
		});
	}});
};
return GUI;
