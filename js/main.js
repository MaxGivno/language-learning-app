const lngBtn = document.querySelector('.lng-select')
const menu = document.querySelector('.lng-menu')
const lngMenuItems = document.querySelectorAll('.lng-menu-item')
const contentItems = document.querySelectorAll('.content-grid')
const contentItemCard = document.getElementById('clickable')
const closeBtn = document.querySelector('.close-btn')
let lastSelected = 'usa'

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

function switchContent(e) {
    hideContent()
    toggleMenu()
    clearSelected()
    lngBtn.classList.add(this.id)
    this.classList.add('selected')
    const contentId = `#${this.id}-content`
    const content = document.querySelector(contentId)
    content && content.classList.add('show')
    lastSelected = this.id
}

function expandCard(e) {
    console.log(this.id)
    this.classList.add('expanded')
    contentItemCard.removeEventListener('click', expandCard)
}

async function closeCard(e) {
    console.log(this.id)
    contentItemCard.classList.remove('expanded')
}

lngBtn.addEventListener('click', toggleMenu);
lngMenuItems.forEach(item => item.addEventListener('click', switchContent))
contentItemCard.addEventListener('click', expandCard)
closeBtn.addEventListener('click', closeCard)