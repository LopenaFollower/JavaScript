javascript:(function(){
	let d=document.querySelector("main div"),
		inp=document.createElement("input"),
		style=inp.style,
		i=null;
	style.position="fixed";
	style.top="5px";
	style.left=window.innerWidth/3+"px";
	inp.oninput=function(){
		if(inp.value<=93)return;
		clearInterval(i)
		let s=d.getBoundingClientRect(),
			cx=s.width/2+s.x,
			cy=s.height/2+s.y,
			r=inp.value,
			e=-1
		i=setInterval(()=>{
			if(++e<360){
				let a=(Math.PI/180)*e,
					x=Math.round(cx+r*Math.cos(a)),
					y=Math.round(cy+r*Math.sin(a));
				d.dispatchEvent(new MouseEvent("mousedown",{clientX:x,clientY:y})),
				d.dispatchEvent(new MouseEvent("mousemove",{clientX:x,clientY:y}))
			}else{
				clearInterval(i)
				d.dispatchEvent(new MouseEvent("mouseup"))
			}
		})
	}
	document.body.appendChild(inp)
})()