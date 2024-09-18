function collatz(n,i=0,h=0){
	if(n%1)return;
	if(n<2)return console.log("Iterations: "+i,"\n","Highest: "+h);
	let c=n%2?3*n+1:n/2;
	collatz(c,i+1,Math.max(h,c));
}
