setInterval(()=>{
    for(let i=0;i<100;i++){
        document.querySelector("#history-app").shadowRoot.querySelector("#history").shadowRoot.querySelector("#frb"+i).shadowRoot.querySelector("#checkbox").shadowRoot.querySelector("#checkbox").click()
        document.querySelector("#history-app").shadowRoot.querySelector("#toolbar").shadowRoot.querySelector("cr-toolbar-selection-overlay").shadowRoot.querySelector("#delete").click()
        document.querySelector("#history-app").shadowRoot.querySelector("#history").shadowRoot.querySelector("cr-dialog > div:nth-child(3) > cr-button.action-button").click()
        document.querySelector("#history-app").shadowRoot.querySelector("#history").shadowRoot.querySelector("cr-dialog").shadowRoot.querySelector("#dialog").remove();
    }
},250);
