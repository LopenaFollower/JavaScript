// ==UserScript==
// @name         MooMoo.io simple autoheal
// @version      1.21
// @description  MooMoo.js autoheal
// @author       Nuro
// @match        *://*.moomoo.io/*
// @require      https://greasyfork.org/scripts/456235-moomoo-js/code/MooMoojs.js?version=1159501
// @run-at       document-end
// ==/UserScript==
const MooMoo=(function MooMooJS_beta() {})[69]
const{log}=console;
function dist(a, b){
    return Math.sqrt( Math.pow((b.y-a[2]), 2) + Math.pow((b.x-a[1]), 2) );
}
function toRad(angle) {
    return angle * 0.01745329251;
}
var ws;
var msgpack=MooMoo.msgpack;
var autoaim=false;
function doNewSend(sender){
    MooMoo.sendPacket(sender)
}
function hit(){
    doNewSend(["c",[1]]);
    doNewSend(["c",[0]]);
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
let nearestEnemyAngle = activePlayerManager.getClosestEnemyAngle();
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

MooMoo.addEventListener("updatehealth",(data)=>{
    if (MooMoo.myPlayer.sid===data[0]&&data[1]<100) {
        let food=MooMoo.myPlayer.inventory.food;
        console.log(MooMoo.myPlayer)
        setTimeout(()=>{
            MooMoo.myPlayer.place(food)
        },100)
    }
})
setInterval(()=>{
    if(automill){
        let mill=MooMoo.myPlayer.inventory.mill;
        MooMoo.myPlayer.place(mill,Math.atan2(mouseY-height/2,mouseX-width/2)+toRad(180));
    }
},80);
document.addEventListener("keydown",e => {
    if(e.keyCode==90){
        automill=!automill
    }
    if(e.keyCode==9){
        e.preventDefault();
        hat(12)
        acc(11)
    }
    if (e.keyCode == 82 && document.activeElement.id.toLowerCase() !== 'chatbox') {
        hit()
        acc(18)
        doNewSend(["2",MooMoo.ActivePlayerManager.getClosestEnemyAngle()]);
        hat(7);
        doNewSend(["5", [MooMoo.myPlayer.inventory.primary, true]]);
        setTimeout( () => {
            doNewSend(["5",MooMoo.myPlayer.inventory.secondary, true]);
            doNewSend(["2",MooMoo.ActivePlayerManager.getClosestEnemyAngle()]);
            hat(53);
            hit()
            setTimeout(()=>{
                doNewSend(["5",MooMoo.myPlayer.inventory.primary, true]);
                hat(6);
                acc(21);
            },2000);
        }, 68);
    }
})
