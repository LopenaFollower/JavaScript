javascript:(function(){
	let a=document.getElementsByClassName("roCb6d"),scr,scr0;
	function count(i=0){
		Array.from(a).forEach(e=>{
			Array.from(e.children).forEach(r=>{
				r.style.display!="none"&&(i++)
			})
		});
		return i
	}
	function type(e){
		let svg=e.children;
		return svg[0].style.display!="none"?"X":svg[1].style.display!="none"?"O":""
	}
	setInterval(()=>{
		a[4].click();
		if(count()==2){
			type(a[0])=="O"&&a[2].click();
			type(a[1])=="O"&&a[2].click();
			type(a[2])=="O"&&a[8].click();
			type(a[3])=="O"&&a[0].click();
			type(a[5])=="O"&&a[8].click();
			type(a[6])=="O"&&a[6].click();
			type(a[7])=="O"&&a[6].click();
			type(a[8])=="O"&&a[0].click();
		}
		if(count()==4){
			type(a[2])==""&&type(a[0])=="X"&&a[2].click();
			type(a[8])==""&&type(a[2])=="X"&&a[8].click();
			type(a[6])==""&&type(a[8])=="X"&&a[6].click();
			type(a[0])==""&&type(a[6])=="X"&&a[0].click();
		}
		if(count()==6){
			type(a[0])=="X"&&type(a[2])=="X"&&(a[1].click(),a[6].click(),a[8].click());
			type(a[6])=="X"&&type(a[0])=="X"&&(a[3].click(),a[8].click(),a[2].click());
			type(a[2])=="X"&&type(a[8])=="X"&&(a[5].click(),a[6].click(),a[0].click());
			type(a[8])=="X"&&type(a[6])=="X"&&(a[7].click(),a[0].click(),a[2].click());
		}
		scr=document.querySelector("div.fSXkBc>span").innerText;
		if(!isNaN(scr)&&scr0!=scr){
			document.querySelector("div.qLf5y>g-raised-button>div").click();
			scr0=scr
		}
	},75)
})()