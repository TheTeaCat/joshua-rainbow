
window.addEventListener("load", function () {
    var buttons = document.getElementsByClassName("collapsible-button");
    var containers = document.getElementsByClassName("collapsible-container");

    function toggleCollapsible(i) {
        if (containers[i].getAttribute("expanded") == "true") {
            buttons[i].innerHTML = buttons[i].innerHTML.replace("-","+");
            containers[i].setAttribute("expanded","false");
            localStorage.setItem("Collapsible #"+i, false);        
        } else {
            buttons[i].innerHTML = buttons[i].innerHTML.replace("+","-");
            containers[i].setAttribute("expanded","true");
            localStorage.setItem("Collapsible #"+i, true);        
        }
    }
        
    function getCollapsibleListener(i) {
        return function () {
            toggleCollapsible(i);
        }
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", getCollapsibleListener(i));
        if (localStorage.getItem("Collapsible #"+i) == "true") {
            toggleCollapsible(i);
        }
    }
})