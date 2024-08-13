class RGB{
	c=[255,0,0];i=0;j=1;
	constructor(step=1){
		this.s=this.d=step;
		const u=()=>{
			this.l=requestAnimationFrame(u);
			if(this.d<0?this.c[this.i]>0:this.c[this.j]<255)this.c[this.d<0?this.i:this.j]+=this.d;
			else if(this.s+(this.d=-this.d)){
				this.i=++this.i%3;
				this.j=++this.j%3;
			}
		}
		u();
	}
	stop(){
		cancelAnimationFrame(this.l);
	}
	get(){
		return"#"+this.c.map(e=>e.toString(16).padStart(2,0)).join("");
	}
}
