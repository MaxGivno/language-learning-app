// Setting variables
const get = selector => document.querySelector(selector)
const getAll = selector => document.querySelectorAll(selector)

const lngBtn = get('.lng-select')
const menu = get('.lng-menu')
const lngMenuItems = getAll('.lng-menu-item')
const contentItems = getAll('.content-grid')
const contentItemCard = get('#clickable')
const closeBtn = get('.close-btn')
const main = get('#content')

let lastSelected = 'usa'
let currentLang = 'usa'


// Show/hide lang select menu
function toggleMenu(e) {
    if (menu.classList.contains('show')) {
        menu.classList.remove('show')
    } else {
        menu.classList.add('show')
    }
}

// Clear selection from menu item
function clearSelected() {
    // Reset flag image on lang select button
    lngBtn.classList.remove(lastSelected)
    // Reset select state on menu item
    lngMenuItems.forEach(item => item.classList.remove('selected'))
}

// Hide previous section
function hideContent() {
    contentItems.forEach(item => item.classList.remove('show'))
}


// Pull up main content container in z-index and set content to expanded
function upMain() {
    main.classList.add('expanded');
    const content = get(`#${currentLang}-content`)
    content && content.classList.add('expanded')
}

// Push down main content container in z-index and set content to collapsed
function downMain() {
    main.classList.remove('expanded');
    const content = get(`#${currentLang}-content`)
    content && content.classList.remove('expanded')
}

// Switch displayed area to lang menu selection
function switchContent(e) {
    hideContent()
    toggleMenu()
    clearSelected()

    // Get selected language
    currentLang = this.id

    // Set flag image to currently selected
    lngBtn.classList.add(currentLang)

    // Set selected state on menu item
    this.classList.add('selected')

    // Set area to display
    const content = get(`#${currentLang}-content`)
    content && content.classList.add('show')

    // Remember language selection
    lastSelected = currentLang
}

// Set card state to expanded
function expandCard(e) {

    // Prevent event listener to fire immediately
    e.stopImmediatePropagation()

    // Pull up main content
    upMain()

    // Expand card
    this.classList.add('expanded')

    // Stop listenting for card click 
    this.removeEventListener('click', expandCard)

    // Start listening for exit button click
    closeBtn.addEventListener('click', closeCard)
}

// Set card state to collapsed
function closeCard(e) {

    // Prevent event listener to fire immediately
    e.stopImmediatePropagation()

    // Push down main content
    downMain()

    // Collapse card
    contentItemCard.classList.remove('expanded')

    // Stop listening for exit button click
    this.removeEventListener('click', closeCard)

    // If card is collapsed, start listen for card click
    if (contentItemCard.classList.contains('expanded') === false) {
        contentItemCard.addEventListener('click', expandCard)
    }
}

// Event listeners
lngBtn.addEventListener('click', toggleMenu);
lngMenuItems.forEach(item => item.addEventListener('click', switchContent))
contentItemCard.addEventListener('click', expandCard)