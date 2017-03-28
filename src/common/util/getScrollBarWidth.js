function getScrollBarWidth() {
    let scrollDiv = document.createElement('div')
    scrollDiv.style.position = 'absolute'
    scrollDiv.style.top = '-9999px'
    scrollDiv.style.width = '50px'
    scrollDiv.style.height = '50px'
    scrollDiv.style.overflow = 'scroll'
    document.body.appendChild(scrollDiv)
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
}

export default getScrollBarWidth