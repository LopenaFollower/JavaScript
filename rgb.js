function col(el,type){el.style[type]="red"}
var settings={
  step=2.5,
  speed=100
}
var r=255,g=0,b=0,r_g=false,g_g=true,b_g=false,r_l=false,g_l=false,b_l=false,m=255,f=![],t=!![];setInterval(()=>{if(r>m){r_g=false;r=m};if(g>m){g_g=f;g=m};if(b>m){b_g=f;b=m};if(r<0){r_l=f;r=0};if(g<0){g_l=f;g=0};if(b<0){b_l=f;b=0};if(r_g){r+=settings.step};if(g_g){g+=settings.step};if(b_g){b+=settings.step};if(r_l){r-=settings.step};if(g_l){g-=settings.step};if(b_l){b-=settings.step};},settings.speed);setInterval(()=>{if(r==m&&g==0&&b==0){g_g=t};if(r==m&&g==m&&b==0){r_l=t};if(r==0&&g==m&&b==0){b_g=t};if(r==0&&g==m&&b==m){g_l=t};if(r==0&&g==0&&b==m){r_g=t};if(r==m&&g==0&&b==m){b_l=t};function col(el,type){el.style[type]="rgb("+r+","+g+","+b+")"}},1);
