// ==UserScript==
// @name         key speedrun
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://linkvertise.com/*
// ==/UserScript==
const Free_Access_with_Ads=document.querySelector("body > lv-root > div.bg-gradient > mat-sidenav-container > mat-sidenav-content > div.mb-0.content.p-0 > lv-redirect > div.redirect-inner-block > div.container.pl-0.pr-0.ng-star-inserted > div > div.col-xl-12.todo-and-countdown.col-xxl-8 > lv-redirect-first-page > lv-countdown-block > div > mat-card.mat-card.mat-focus-indicator.buttons-card > div.row.ng-star-inserted > div > div.btn-direct-wrapper > div > div > button");
const Select_Ad=document.querySelector("body > lv-root > div.bg-gradient > mat-sidenav-container > mat-sidenav-content > div.mb-0.content.p-0 > lv-redirect > div.redirect-inner-block > div.container.pl-0.pr-0.ng-star-inserted > div > div.col-xl-12.todo-and-countdown.col-xxl-8 > lv-redirect-second-page > lv-todo-block > mat-card.mat-card.mat-focus-indicator.todo-container > div > div > div.todo-wrapper > div.todo-items-wrapper-top-aligned > mat-card");
const Close_Ad=document.querySelector("#top > div.modal-header > div.close-icon > mat-icon");
const Continue_To=document.querySelector("body > lv-root > div.bg-gradient > mat-sidenav-container > mat-sidenav-content > div.mb-0.content.p-0 > lv-redirect > div.redirect-inner-block > div.container.pl-0.pr-0.ng-star-inserted > div > div.col-xl-12.todo-and-countdown.col-xxl-8 > lv-redirect-second-page > lv-todo-block > mat-card.mat-card.mat-focus-indicator.todo-container > div > div > div.todo-wrapper > button");
var click=false;
var start=setTimeout(()=>{
    if(Free_Access_with_Ads.textContent.trim()=="Free Access with Ads"){
        document.title="PHASE 1 mode 1"
        Free_Access_with_Ads.click()
        setTimeout(()=>{
            Select_Ad.click()
            var loop1=setInterval(()=>{
                document.title="PHASE 2 mode 1"
                Close_Ad.click();
                if(!click&&Free_Access_with_Ads.textContent.trim()=='Free Access'){
                    Continue_To.click();
                    clearInterval(start);
                    click=true;
                    clearInterval(loop1);
                    document.title="PHASE FINAL mode 1"
                }
            },1000);
        },5000);
    }else if(Free_Access_with_Ads.textContent.trim()=='Free Access'&&click==false){
        document.title="PHASE 1 mode 2"
        Free_Access_with_Ads.click()
        var loop2=setTimeout(()=>{
            document.title="PHASE 2 mode 2"
            Close_Ad.click();
            if(!click&&Free_Access_with_Ads.textContent.trim()=='Free Access'){
                Continue_To.click();
                clearInterval(loop2);
                clearInterval(start);
                click=true;
                clearInterval(loop2);
                document.title="PHASE FINAL mode 2"
            }
        },5000);
    }else{
        clearInterval(start);
        document.title="mode 3"
    }
},10000);
