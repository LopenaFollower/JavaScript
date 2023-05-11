(()=>{
	const[a,b]=[Runner.instance_.gameOver,document.createElement("div")];
	let[c,d]=[b.style,![]];
	b.onclick=_=>d=!d;
	c.position="fixed";
	c.top="0px";
	c.left="0px";
	c.font="bold 20px monospace";
	c.userSelect="none";
	setInterval(()=>{
		Runner.instance_.gameOver=d?_=>d:a;
		b.innerText="Immortal: "+d;
	})
	document.body.appendChild(b);
})()