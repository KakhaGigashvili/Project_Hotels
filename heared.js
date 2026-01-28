
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

let hidden =`
                    <div class="hidden_menu">
                        <nav>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="./pages/rooms/rooms.html">Rooms</a></li>
                                <li><a href="./pages/hotels/hotels.html">Hotels</a></li>
                                <li><a href="./pages/bookedRooms/bookedRooms.html">Booked Rooms</a></li>
                            </ul>
                        </nav>
                    </div>
                    `

let isOpen = false

const response = document.querySelector('.response')
const burger = document.querySelector('.burger')

burger.addEventListener('click', () => {
    if (!isOpen) {
        response.insertAdjacentHTML('beforeend', hidden)
        isOpen = true
    } else {
        response.querySelector('.hidden_menu').remove()
        isOpen = false
    }
})