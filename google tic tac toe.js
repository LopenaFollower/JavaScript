javascript:(function(){
	let A=document.querySelectorAll(".roCb6d");
	function t(e){
		e=e.children;
		return e[0].style.display!="none"?1:e[1].style.display!="none"?-1:0;
	}
	setInterval(()=>{
		A[4].click();
		switch([...A].filter(e=>e.children[0].style.display!="none").length){
			case 1:[[0,2],[1,2],[2,8],[3,0],[5,8],[6,6],[7,6],[8,0]].forEach(([i,j])=>t(A[i])<0&&A[j].click());break;
			case 2:[[2,0],[8,2],[6,8],[0,6]].forEach(([i,j])=>!t(A[i])&&t(A[j])>0&&A[i].click());break;
			case 3:[[0,2,1,6,8],[6,0,3,8,2],[2,8,5,6,0],[8,6,7,0,2]].forEach(([a,b,c,d,e])=>t(A[a])>0&&t(A[b])>0&&(A[c].click(),A[d].click(),A[e].click()));break;
		}
	});
	new MutationObserver(e=>document.querySelectorAll(".lv7K9c")[2].click()).observe(document.querySelectorAll(".lv7K9c")[0],{subtree:!0,attributes:!1,childList:!0,characterData:!0});
})();
