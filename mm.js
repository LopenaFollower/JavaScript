// ==UserScript==
// @name         !  MooMoo.io
// @version      1.21
// @description
// @match        *://*.moomoo.io/*
// @require      https://greasyfork.org/scripts/456235-moomoo-js/code/MooMoojs.js?version=1159501
// @run-at       document-end
// ==/UserScript==
const MooMoo=(function MooMooJS_beta(){})[69]
const{log}=console;
function toRad(angle) {
    return angle * 0.01745329251;
}
var insta=false;
function hit(a){
    MooMoo.myPlayer.hit(a)
}
function hat(id){
    MooMoo.myPlayer.buyHat(id);
    MooMoo.myPlayer.equipHat(id);
}
function acc(id){
    MooMoo.myPlayer.buyAccessory(id);
    MooMoo.myPlayer.equipAccessory(id);
}
let activePlayerManager = MooMoo.ActivePlayerManager;
let enemies = activePlayerManager.getEnemies();
let teammates = activePlayerManager.getTeammates();
let nearestEnemy = activePlayerManager.getClosestEnemy();
let nearestTeammate = activePlayerManager.getClosestTeammate();
let nearestPlayer = activePlayerManager.getClosestPlayer();
let nearestEnemyAngle = MooMoo.ActivePlayerManager.getClosestEnemyAngle();
let nearestEnemyDistance = activePlayerManager.getClosestEnemyDistance();
var mouseX;
var mouseY;
var width;
var automill=false;
var height;
MooMoo.onGameLoad=()=>{
    let cvs = document.getElementById("gameCanvas");
    cvs.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        width = cvs.clientWidth;
        height = cvs.clientHeight;
    });
}

MooMoo.addEventListener("updateHealth",(data)=>{
    if(MooMoo.myPlayer.sid===data[0]){
        if (data[1]<100) {
            let food=MooMoo.myPlayer.inventory.food;
            setTimeout(()=>{
                MooMoo.myPlayer.place(food)
                MooMoo.myPlayer.place(food)
            },110)
        }
        if(data[1]<60){
            hat(6)
        }
    }
})
function booster_hat(){
    if (MooMoo.myPlayer.y<2400){
        hat(15);
    } else if(MooMoo.myPlayer.y>6850&&MooMoo.myPlayer.y<7550){
        hat(31);
    } else {
        hat(12);
    }
}
var primary,secondary,chatbox=false
setInterval(()=>{
    if(automill){
        let mill=MooMoo.myPlayer.inventory.mill;
        MooMoo.myPlayer.place(mill,Math.atan2(mouseY-height/2,mouseX-width/2)+toRad(145));
        MooMoo.myPlayer.place(mill,Math.atan2(mouseY-height/2,mouseX-width/2)+toRad(215));
    }
    primary=MooMoo.myPlayer.inventory.primary;
    secondary=MooMoo.myPlayer.inventory.secondary;
    if(document.activeElement.id.toLowerCase()=='chatbox'){
        chatbox=true
    }else{
        chatbox=false
    }
},100);
document.addEventListener("keydown",e=>{
    if(e.keyCode==90&&!chatbox){
        automill=!automill
    }
    if(e.keyCode==86&&!chatbox){
        let spike=MooMoo.myPlayer.inventory.spike;
        MooMoo.myPlayer.place(spike,Math.atan2(mouseY-height/2,mouseX-width/2));
    }
    if(e.keyCode==70&&!chatbox){
        let trap=MooMoo.myPlayer.inventory.trap;
        MooMoo.myPlayer.place(trap,Math.atan2(mouseY-height/2,mouseX-width/2));
    }
    if(e.keyCode==72&&!chatbox){
        let turret=MooMoo.myPlayer.inventory.turret;
        MooMoo.myPlayer.place(turret,Math.atan2(mouseY-height/2,mouseX-width/2));
    }
    if(e.keyCode==9){
        e.preventDefault();
        acc(11)
        booster_hat()
    }
    if (e.keyCode==82&&!chatbox&&!insta) {
        insta=true
        MooMoo.myPlayer.unequipAccessory()
        MooMoo.myPlayer.unequipHat();
        acc(18)
        hat(7);
        MooMoo.sendPacket("5",primary,true)
        setTimeout(()=>{
            hit(MooMoo.ActivePlayerManager.getClosestEnemyAngle())
        },25);
    }
})
MooMoo.on("gatherAnimation",()=>{
    if(insta){
        MooMoo.sendPacket("5",secondary,true)
        hit(MooMoo.ActivePlayerManager.getClosestEnemyAngle())
        acc(21)
        hat(53);
        let wait=0;
        if(secondary==9){
            wait=400;
        }else if(secondary==12){
            wait=700;
        }else if(secondary==15){
            wait=1500
        }
        setTimeout(()=>{
            booster_hat()
            acc(11)
            setTimeout(()=>{
                MooMoo.sendPacket("5",primary,true)
                insta=false;
            },wait);
        },200);
    }
});
