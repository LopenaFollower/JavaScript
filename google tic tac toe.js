javascript:(function(){
	let A=document.querySelectorAll(".roCb6d");
	function t(e){
		e=e.children;
		return e[0].style.display!="none"?1:e[1].style.display!="none"?-1:0;
	}
	setInterval(()=>{
		A[4].click();
		switch([...A].filter(e=>e.children[0].style.display!="none").length){
			case 1:["12","30","58","76"].forEach(([i,j])=>t(A[i])<0&&A[j].click());break;
			case 2:["20","82","68","06"].forEach(([i,j])=>!t(A[i])&&t(A[j])>0&&A[i].click());break;
			case 3:["02168","60382","28560","86702"].forEach(([a,b,c,d,e])=>t(A[a])>0&&t(A[b])>0&&(A[c].click(),A[d].click(),A[e].click()));break;
		}
	});
	new MutationObserver(e=>document.querySelectorAll(".lv7K9c")[2].click()).observe(document.querySelectorAll(".lv7K9c")[0],{subtree:!0,attributes:!1,childList:!0,characterData:!0});
})();
