// ==UserScript==
// @name Krunker.IO Aimbot & ESP
// @version 1.0.7
// @description aimlock to nearest enemy, esp, tracers
// @match *://krunker.io/*
// @exclude *://krunker.io/social*
// @exclude	*://krunker.io/editor*
// @run-at document-start
// @require https://unpkg.com/three@0.150.0/build/three.min.js
// ==/UserScript==

const THREE=window.THREE;
delete window.THREE;
const ap=Array.prototype.push;
const settings={
	aimbot:true,
	useRightMouse:true,
	esp:true,
	tracers:true,
	fov:90
};
const constraints={
	fov:function(v){
		return Math.max(0,Math.min(360,v));
	}
}
const hotkeys={
	KeyB:"aimbot",
	KeyL:"useRightMouse",
	KeyM:"esp",
	KeyN:"tracers"
};
const gui=createGUI();
let scene,rgb=[255,0,0],ci=0,cj=1,d=1,injector=null,mode=1,RMB=false;
console.log("Injecting...");
const spy=function(obj){
	try{
		if(typeof obj=="object"&&typeof obj.parent=="object"&&obj.parent.type=="Scene"&&obj.parent.name=="Main"){
			console.log("Found Scene!");
			scene=obj.parent;
			Array.prototype.push=ap;
		}
	}catch(e){}
	return ap.apply(this,arguments);
}
const tempVector=new THREE.Vector3();
const aimVector=new THREE.Vector3();
const tempObject=new THREE.Object3D();
const aimObject=new THREE.Object3D();
tempObject.rotation.order="YXZ";
aimObject.rotation.order="YXZ";
const geometry=new THREE.EdgesGeometry(new THREE.BoxGeometry(5,15,5).translate(0,7.5,0));
const material=new THREE.RawShaderMaterial({
	uniforms:{color:{value:new THREE.Color(0xff0000)}},
	vertexShader:`
	attribute vec3 position;
	uniform mat4 projectionMatrix;
	uniform mat4 modelViewMatrix;
	void main(){
		gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
		gl_Position.z=1.0;
	}`,
	fragmentShader:`
	#ifdef GL_ES
	precision mediump float;
	#endif
	uniform vec3 color;
	void main(){
		gl_FragColor=vec4(color,1.0);
	}`
});
const line=new THREE.LineSegments(new THREE.BufferGeometry(),material);
line.frustumCulled=false;
const linePos=new THREE.BufferAttribute(new Float32Array(600),3);
line.geometry.setAttribute("position",linePos);
function norm(r){
	r=Math.abs(r)%(2*Math.PI);
	return r;
}
function animate(){
	requestAnimationFrame(animate);
	if(d<0?rgb[ci]>0:rgb[cj]<255)rgb[d<0?ci:cj]+=d;
	else if(1+(d=-d)){
		ci=++ci%3;
		cj=++cj%3;
	}
	if(!scene&&!injector){
		let el=document.querySelector("#loadingBg");
		if(el&&el.style.display=="none"){
			console.log("Injection started!");
			injector=setTimeout(()=>{
				console.log("Injected!");
				Array.prototype.push=spy;
			},2e3);
		}
	}
	if(scene===undefined||!scene.children)return;
	const plrs=[];
	let plr;
	for(let i=0;i<scene.children.length;i++){
		let c=scene.children[i];
		if(c.type=="Object3D"){
			try{
				if(c.children[0].children[0].type=="PerspectiveCamera"){
					plr=c;
				}else{
					plrs.push(c);
				}
			}catch(e){}
		}
	}
	if(!plr){
		console.log("Player not found, finding new scene.");
		Array.prototype.push=spy;
		return;
	}
	let c=0,target,maxA=0;
	tempObject.matrix.copy(plr.matrix).invert();
	for(let i=0;i<plrs.length;i++){
		const cplr=plrs[i];
		if(!cplr.box){
			let b=new THREE.LineSegments(geometry,material);
			b.frustumCulled=false;
			cplr.add(b);
			cplr.box=b;
		}else cplr.box.material.uniforms.color.value.set((rgb[0]<<16)+(rgb[1]<<8)+rgb[2]);
		if(cplr.position.x==plr.position.x&&cplr.position.z==plr.position.z){
			cplr.box.visible=false;
			if(line.parent!=cplr)cplr.add(line);
			continue;
		}
		linePos.setXYZ(c++,0,11,-5);
		tempVector.copy(cplr.position);
		tempVector.y+=9;
		tempVector.applyMatrix4(tempObject.matrix);
		linePos.setXYZ(c++,tempVector.x,tempVector.y,tempVector.z);
		cplr.visible=settings.esp||cplr.visible;
		cplr.box.visible=settings.esp;
		aimVector.setScalar(0);
		cplr.children[0].children[0].localToWorld(aimVector);
		aimObject.position.copy(plr.position);
		aimObject.lookAt(aimVector);
		let angle=Math.abs(norm(plr.rotation.y-aimObject.rotation.y-Math.PI)-Math.PI)*180/Math.PI;
		if(angle>maxA&&angle>180-settings.fov/2&&cplr.visible){
			target=cplr;
			maxA=angle;
		}
	}
	linePos.needsUpdate=true;
	line.geometry.setDrawRange(0,c);
	line.visible=settings.tracers;
	if(settings.aimbot==false||(settings.useRightMouse&&!RMB)||target==undefined)return;
	tempVector.setScalar(0);
	target.children[0].children[0].localToWorld(tempVector);
	tempObject.position.copy(plr.position);
	tempObject.lookAt(tempVector);
	plr.children[0].rotation.x=-tempObject.rotation.x;
	plr.rotation.y=tempObject.rotation.y+Math.PI;
}
const holder=document.createElement("div");
holder.innerHTML=`<style>
.dialog{position:absolute;left:50%;top:50%;padding:20px;background:#000c;border:6px solid #0003;color:#fff;transform:translate(-50%,-50%);text-align:center;z-index:99999}
.dialog*{color:#fff}
.close{position:absolute;right:5px;top:5px;width:20px;height:20px;opacity:.5;cursor:pointer}
.close:before,.close:after{content:" ";position:absolute;left:50%;top:50%;width:100%;height:20%;transform:translate(-50%,-50%)rotate(-45deg);background:#fff}
.close:after{transform:translate(-50%,-50%)rotate(45deg)}
.close:hover{opacity:1}
.gui{position:fixed;right:10px;top:-1px;z-index:999;display:flex;flex-direction:column;font-family:monospace;font-size:14px;color:#fff;width:250px;user-select:none}
.gui-item{padding:5px 8px;display:flex;justify-content:space-between;align-items:center;background:#222;cursor:pointer}
.gui-item span{color:#fff;font-family:monospace;font-size:14px}
.gui-item.text{justify-content:center;cursor:unset;text-align:center;background:#333}
.gui-item:hover{background:#333}
.gui-status{transition-timing-function:linear;transition-duration:.1s;transform:rotate(180deg);font-size:.8em}
.gui-header{background:#000;z-index:998}
.gui-header span{font-size:16px}
.gui-header:hover{background:#000}
.gui-item-value{font-size:.8em}
.gui-item-value.number{border:1px solid #111;padding: 0px 5px}
.gui-content{transition-timing-function:linear;transition-duration:.1s;position:relative;z-index:997;top:0px}
.gui-content .gui-item-value{font-weight:900}
</style>
<div class=dialog><div class=close onclick="this.parentNode.style.display='none'"></div>
	<big>== Aimbot & ESP ==</big><br><br>
	[B] to toggle aimbot<br>
	[V] to toggle ESP<br>
	[N] to toggle ESP Lines<br>
	[L] to toggle aimbot on <br>right mouse hold<br>
	[H] to show/hide help
</div>`;
window.addEventListener("DOMContentLoaded",function(){
	while(holder.children.length>0)document.body.appendChild(holder.children[0]);
	document.body.appendChild(gui);
});
function handleMouse(e){
	if(e.button==2)RMB=e.type=="pointerdown"?true:false;
}
window.addEventListener("pointerdown",handleMouse);
window.addEventListener("pointerup",handleMouse);
window.addEventListener("keyup",e=>{
	if(document.activeElement&&document.activeElement.value!==undefined)return;
	let k=hotkeys[e.code],el;
	if(k)settings[k]=!settings[k];
	switch(e.code){
		case"Slash":
			document.querySelector(".gui-header").click();
			break;
		case"KeyH":
			el=holder.querySelector(".dialog");
			el.style.display=el.style.display==""?"none":"";
			break;
	}
});
animate();
function createGUI(){
	const gui=fromHtml(`<div class=gui>
		<div class="gui-item gui-header">
			<span>[/] Controls</span>
			<span class=gui-status>&#11167;</span>
		</div>
		<div class=gui-content></div>
	</div>`);
	let cont=gui.querySelector(".gui-content");
	gui.querySelector(".gui-header").onclick=function(){
		let hide=cont.style.top=="-200px";
		gui.querySelector(".gui-status").style.transform=`rotate(${hide?180:0}deg)`;
		cont.style.top=hide?"0px":"-200px";
	}
	const s2k={};
	for(let k in hotkeys)s2k[hotkeys[k]]=k;
	function fromCamel(t){
		let r=t.replace(/([A-Z])/g,"$1");
		return r[0].toUpperCase()+r.slice(1);
	}
	function fromHtml(h){
		let d=document.createElement("div");d.innerHTML=h;
		return d.children[0];
	}
	for(let prop in settings){
		let name=fromCamel(prop),shortKey=s2k[prop];
		if(shortKey){
			if(shortKey.startsWith("Key"))shortKey=shortKey.slice(3);
			name=`[${shortKey}] ${name}`;
		}
		let type=typeof settings[prop],item;
		switch(type){
			case"boolean":
				item=fromHtml(`<div class=gui-item><span>${name}</span><span class=gui-item-value></span></div>`);
				item.onclick=function(){
					settings[prop]=!settings[prop];
					updateVal();
				}
				break;
			case"number":
				item=fromHtml(`<div class=gui-item><span>${name}</span><span class="gui-item-value number"contenteditable></span></div>`);
				item.oninput=function(){
					settings[prop]=constraints[prop](Number(val.innerText)|0);
					updateVal();
				}
				break;
		}
		let val=item.querySelector(".gui-item-value");
		function updateVal(){
			let v=settings[prop];
			switch(typeof v){
				case"boolean":
					val.innerText=v?"ON":"OFF";
					val.style.color=v?"#0f0":"red";
					break;
				case"number":
					if(v!=Number(val.innerText))val.innerText=v.toFixed();
					val.style.color="#ae81ff";
					break
			}
		}
		updateVal();
		cont.appendChild(item);
	}
	return gui;
}
function addItem(i,t,p){
	let d=document.createElement("div");
	d.className="gui-item";
	d.id=i;
	p.appendChild(d);
	let s=document.createElement("span");
	s.innerText=t;
	d.appendChild(s);
}