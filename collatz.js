function collatz(n,i=0,h=0){
	if(n<2){
		console.log("Iterations: "+i,"\nHighest: "+h);
		return
	}
	let c=n%2?3*n+1:n/2;
	h=Math.max(h,c);
	collatz(c,i+1,h);
}
