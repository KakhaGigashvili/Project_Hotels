    document.addEventListener('DOMContentLoaded', function() {
    let links = document.querySelectorAll('nav ul li a');
    let currentPath = window.location.pathname;
    
    links.forEach(link => {
        link.classList.remove('active_header');
        
        let href = link.getAttribute('href');
        
        if (href === '/' || href.includes('index.html')) {
            if (currentPath === '/' || currentPath.endsWith('index.html')) {
                link.classList.add('active_header');
            }
        }

        else if (href.includes('rooms.html')) {
            if (currentPath.includes('rooms.html')) {
                link.classList.add('active_header');
            }
        }
        
        else if (href.includes('hotels.html')) {
            if (currentPath.includes('hotels.html')) {
                link.classList.add('active_header');
            }
        }
    });
});