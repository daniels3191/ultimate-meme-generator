'use strict'

function onSelectNav(elLink) {
   const elNavArray = document.querySelectorAll(".main-nav li")
   console.log(elNavArray);
   

    elNavArray.forEach(link => {
        link.classList.remove("active")

    });

    elLink.classList.add("active")
}

    function onToggleMenue(elBtnMenue) {
        const elMenue = document.body.classList.toggle('menue-open')
        elBtnMenue.innerText = elMenue ? 'X' : '\u2630'

    }

