// @ts-nocheck

// Cache DOM elements
let elements
let dialogs

function cacheDomElements() {
  elements = document.querySelectorAll('.btn')
  dialogs = document.querySelectorAll('.dialog')
}

// Add event listeners to elements
function addEventListeners() {
  elements.forEach((element) => {
    element.addEventListener('click', handleClick)
  })
}

// Handle click event
function handleClick(event) {
  copyTargetText(event)
  toggleActive(event.target)
}

// Copy target text to clipboard
async function copyTargetText(e) {
  try {
    await navigator.clipboard.writeText(e.target.innerText)
  } catch (err) {
    console.error('Clipboard API not supported: ', err)
  }
}

// toggle active class
function toggleActive(el) {
  const active = document.querySelector('.active')
  if (active) {
    active.classList.remove('active')
  }
  el.classList.add('active')
}

// Add click event listener to document
document.addEventListener('click', handleDocumentClick)

// Handle click event on document
function handleDocumentClick(e) {
  e.preventDefault()
  const el = e.target

  if (el.classList.contains('btn')) {
    openDialog(el)
  } else if (el.classList.contains('dialog')) {
    closeDialogs()
  }
}

// Open dialog
function openDialog(el) {
  const id = el.getAttribute('data-dialog')
  const dialog = document.getElementById(id)

  if (!dialog.classList.contains('dialog--show')) {
    dialog.classList.add('dialog--show')
    setTimeout(() => hideDialog(dialog), 400)
  }
}

// Close dialogs
function closeDialogs() {
  dialogs.forEach((dialog) => {
    if (dialog.classList.contains('dialog--show')) {
      hideDialog(dialog)
    }
  })
}

// Hide dialog
function hideDialog(el) {
  el.classList.remove('dialog--show')
  el.classList.add('dialog--hide')
}

// Add animationend event listener to dialogs
function addAnimationEventListeners() {
  dialogs.forEach((dialog) => {
    dialog.addEventListener('animationend', handleAnimationEnd)
  })
}

// Handle animationend event
function handleAnimationEnd(e) {
  if (e.animationName === 'fade-out-down') {
    e.target.classList.remove('dialog--hide')
  }
}

//Initialize function
function initialize() {
  cacheDomElements()
  addEventListeners()
  addAnimationEventListeners()
}

initialize()
