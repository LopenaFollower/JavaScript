class RGB{
	n=0;l=1;
	constructor(step=1){
		const u=()=>{
			this.l&&requestAnimationFrame(u);
			this.n=(this.n+=step)%360;
		}
		u();
	}
	stop(){
		this.l=0;
	}
	get(){
		let f=(n,k=(n+this.n/30)%12)=>(1-Math.max(Math.min(k-3,9-k,1),-1))/2;
		return"#"+[f(0),f(8),f(4)].map(e=>Math.round(e*255).toString(16).padStart(2,0)).join("");
	}
}
