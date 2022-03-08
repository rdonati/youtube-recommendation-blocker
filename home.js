var blockerActive = true

const createDisableComponent = (elementToReplace) => {
    // Create container
    const disableComponent = document.createElement('div')
    disableComponent.setAttribute('id', 'disable-hush-container')

    // Create text
    const toggleText = document.createElement('span')
    toggleText.innerHTML = 'Recommendations are turned off'
    toggleText.setAttribute('id', 'disable-hush-text')

    // Create button
    const toggleButton = document.createElement('button')
    toggleButton.innerHTML = 'Turn On'
    toggleButton.setAttribute('id', 'disable-hush-button')

    const handleClick = (e) => {
      e.preventDefault()
      blockerActive = false
      disableComponent.replaceWith(elementToReplace)
    }

    toggleButton.setAttribute('onclick', 'handleClick();')
    toggleButton.onclick = handleClick

    disableComponent.appendChild(toggleText)
    disableComponent.appendChild(toggleButton)
    return disableComponent
}

const createEnableComponent = (el, disableComponent) => {
    // Create enable button and prepend to recommendations
    const enableComponent = document.createElement('button')
    enableComponent.innerHTML = 'Hide Recommendations'
    enableComponent.setAttribute('id', 'enable-hush-button-home')

    const handleClick = (e) => {
      e.preventDefault()
      blockerActive = true
      el.replaceWith(disableComponent)
    }

    enableComponent.setAttribute('onclick', 'handleClick();')
    enableComponent.onclick = handleClick

    return enableComponent
}

var observer = new MutationObserver(mutations => {
  for (mutation of mutations) {
    if (mutation?.addedNodes?.length > 0 && mutation?.addedNodes[0]?.id == 'related') {
      const el = document.querySelector('ytd-rich-grid-renderer > div#contents')
      const disableComponent = createDisableComponent(el)
      const enableComponent = createEnableComponent(el, disableComponent)

      // Prevent component from being appended twice
      if(!el.firstChild || el.firstChild.id != 'enable-hush-button'){
        el.prepend(enableComponent)
      }

      // IF BLOCKER IS ACTIVE
      if (blockerActive) el.replaceWith(disableComponent)
    }
  }
})

observer.observe(document.body, {
  childList: true,
  subtree: true,
})

