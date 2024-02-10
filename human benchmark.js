(function NumberMemory(a,b){
	/*Run Before Start*/
	setInterval(()=>{
		a=document.getElementsByClassName("big-number ");
		if(a.length){
			if(!b){
				navigator.clipboard.writeText(a[0].innerText);
				b=1;
			}
		}else b=0;
	},250);
})();
(function VerbalMemory(a,b,c=[]){
	setInterval(()=>{
		a=document.getElementsByClassName("word")[0].innerText;
		b=c.indexOf(a)<0;
		document.getElementsByClassName("css-de05nr")[b?1:0].click();
		if(b)c.push(a);
		if(c.length==1e4){
			alert("10,000 words");
			let link=document.createElement("a");
			link.href=URL.createObjectURL(new Blob([c.join(", ")],{type:"text/plain"}));
			link.download="words";
			link.click();
			URL.revokeObjectURL(link.href);
		}
	});
})();
(function VisualMemory(a=1,b=0,c,d){
	/*Run Before Start*/
	setInterval(()=>{
		c=document.getElementsByClassName("css-dd6wi1");
		if(c.length){
			c=c[0].children[1].innerText;
			if(c!=b){
				a=0;b=c;
			}
			if(!a){
				document.querySelector(".css-hvbk5q").children.forEach(e=>{
					e.children.forEach(v=>{
						d=v.className=="active css-lxtdud eut2yre1";
						a=a||d;
						v.style.position="fixed";
						v.style.backgroundColor=d?"#000":"#fff";
					});
				});
			}
			document.querySelector(".css-hvbk5q").children.forEach(e=>{
				e.children.forEach(v=>{
					v.style.top=v.style.left=0;
					if(v.style.backgroundColor=="rgb(0, 0, 0)"){
						d=v.className=="active css-lxtdud eut2yre1";
						v.style.opacity=d?.1:.5;
						v.style.top=d?0:"100px";
					}else v.style.left=Math.random()*200+"px";
				});
			});
		}
	},50);
})();