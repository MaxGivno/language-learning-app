const lngBtn = document.querySelector('.lng-select')
const menu = document.querySelector('.lng-menu')
const lngMenuItems = document.querySelectorAll('.lng-menu-item')
const contentItems = document.querySelectorAll('.content-grid')
const contentItemCard = document.getElementById('clickable')
const closeBtn = document.querySelector('.close-btn')
const main = document.querySelector('#content')
let lastSelected = 'usa'
let currentLang = 'usa'

function toggleMenu(e) {
    if (menu.classList.contains('show')) {
        menu.classList.remove('show')
    } else {
        menu.classList.add('show')
    }
}

function clearSelected() {
    lngBtn.classList.remove(lastSelected)
    lngMenuItems.forEach(item => item.classList.remove('selected'))
}

function hideContent() {
    contentItems.forEach(item => item.classList.remove('show'))
}

function upMain() {
    main.classList.add('expanded');
    const content = document.querySelector(`#${currentLang}-content`)
    content && content.classList.add('expanded')
}

function downMain() {
    main.classList.remove('expanded');
    const content = document.querySelector(`#${currentLang}-content`)
    content && content.classList.remove('expanded')
}

function switchContent(e) {
    hideContent()
    toggleMenu()
    clearSelected()
    lngBtn.classList.add(this.id)
    this.classList.add('selected')
    currentLang = this.id
    const contentId = `#${currentLang}-content`
    const content = document.querySelector(contentId)
    content && content.classList.add('show')
    lastSelected = this.id
}

function expandCard(e) {
    console.log('Card clicked')
    e.stopImmediatePropagation()
    upMain()
    this.classList.add('expanded')
    this.removeEventListener('click', expandCard)
    closeBtn.addEventListener('click', closeCard)
}

function closeCard(e) {
    console.log('Close clicked')
    e.stopImmediatePropagation()
    downMain()
    contentItemCard.classList.remove('expanded')
    this.removeEventListener('click', closeCard)
    if (contentItemCard.classList.contains('expanded') === false) {
        contentItemCard.addEventListener('click', expandCard)
    }
}

lngBtn.addEventListener('click', toggleMenu);
lngMenuItems.forEach(item => item.addEventListener('click', switchContent))
contentItemCard.addEventListener('click', expandCard)