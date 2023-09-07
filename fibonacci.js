let f=[1n,1n];
let i=2;
while(i<1e3){
	f[i]=f[--i]+f[--i];
	i+=3
}
const{sqrt}=Math;
function fib(n){
	let a=((1+sqrt(5))/2)**n;
	let b=((1-sqrt(5))/2)**n;
	console.log(a,b)
	return(a-b)/sqrt(5)
}