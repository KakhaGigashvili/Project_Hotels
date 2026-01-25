let links = document.querySelectorAll('ul li a')
let currentPath = window.location.pathname

links.forEach(link => {
    let linkPath = link.getAttribute('href')

    // Home
    if (currentPath === '/' && linkPath === '/') {
        link.classList.add('active_header')
    }


    // Other Page
    if (linkPath !== '/' && currentPath.includes(linkPath)) {
        link.classList.add('active_header')
    }
})