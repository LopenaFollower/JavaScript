javascript:((d,m,r,i,a)=>{
	let s=d.getBoundingClientRect(),[X,Y,e]=[s.width/2+s.x,s.height/2+s.y,(t,c)=>d.dispatchEvent(new MouseEvent(t,c))];
	e("mousedown",{clientX:X+r,clientY:Y});
	for(;i<361;a=(i+=90)*m.PI/180)e("mousemove",{clientX:X+r*m.cos(a),clientY:Y+r*m.sin(a)});
	d.click();
})(document.querySelector("main div"),Math,2e3,0,0);
