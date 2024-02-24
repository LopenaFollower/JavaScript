javascript:(function(){
	let d=document.querySelector("main div"),s=d.getBoundingClientRect(),X=s.width/2+s.x,Y=s.height/2+s.y,r=2e3,m=Math,e=(t,c)=>d.dispatchEvent(new MouseEvent(t,c)),i,a;
	e("mousedown",{clientX:X+r,clientY:Y});
	for(i=a=0;i<361;i+=90,a=i*m.PI/180)e("mousemove",{clientX:X+r*m.cos(a),clientY:Y+r*m.sin(a)});
	e("click");
})();