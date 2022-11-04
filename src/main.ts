async function copyTargetText(e) {
  try {
    await navigator.clipboard.writeText(e.target.innerText);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

let elements = document.getElementsByClassName("btn");
for (var i = 0; i < elements.length; i++) {
elements[i].addEventListener("click", (e) => {
  copyTargetText(e);
  const et = e.target;
    // select active class
    const active = document.querySelector(".active");
    // check for the button that has   active class and remove it
    if (active) {
      active.classList.remove("active");
    }
    // add active class to the clicked element 
    et.classList.add("active");
    
  });
}



let dialogs = document.querySelectorAll('.dialog');
document.addEventListener('click', function(e) {
  // make sure touch doesn't fire twice, for both click/touch
  e.preventDefault();
  let el = e.target;
  
  if(el.classList.contains('btn')) {
    let id = el.getAttribute('data-dialog');
    let dialog = document.getElementById(id);
    
    // prevent from running while already open
    if(!dialog.classList.contains('dialog--show') && !dialog.classList.contains('dialog--hide')) {
      showDialog(dialog);
    }
  } else if(el.classList.contains('wrapper')) {
    dialogs.forEach(function(dialog) {
      hideDialog(dialog);
    })
  }
})

dialogs.forEach(function (dialog) {
  dialog.addEventListener('animationend', function(e){
    if(e.animationName == 'fade-out-down'){
     dialog.classList.remove('dialog--show', 'dialog--hide');
    }
  })
})

function showDialog(el) {
  el.classList.add('dialog--show');
  
  let timerId = setTimeout(function() {
    hideDialog(el);
  }, "400");
  el.setAttribute('data-timer', timerId);
}

function hideDialog(el) {
  if(el.classList.contains('dialog--show')) {
    el.classList.add('dialog--hide');
    if(el.hasAttribute('data-timer')){
      clearTimeout(el.getAttribute('data-timer'));
    }
  }
}
