var{random}=Math,blacklist=[];
function*randomVariable(){
	for(;;){
		let r=""
		if(blacklist.length<125000){
			let verify=(n)=>{
				let code=String.fromCharCode(n|0)
				if(blacklist.indexOf(code)==-1&&(()=>{try{eval(`var ${code}`);return true}catch(e){return ![]}})()){
					blacklist[blacklist.length]=code;
					r=code
				}else{
					verify(random()*2**17-2**16)
				}
			}
			verify(random()*2**17-2**16)
		}else break;
		yield r
	}
}
const seq=randomVariable()