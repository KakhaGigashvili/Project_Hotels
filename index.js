let card_div = document.querySelector('.card_div')
let basedApi = `https://hotelbooking.stepprojects.ge/api`
let roomsArr = []


const getAllRooms = () => {
    fetch(`${basedApi}/Rooms/GetAll`)
        .then(res => res.json())
        .then(data => {
            const params = new URLSearchParams(window.location.search)
            const roomIdFromUrl = Number(params.get('id'))

            if (roomIdFromUrl) {
                roomsArr = data.filter(room => room.hotelId === roomIdFromUrl)
            } else {
                roomsArr = data
            }

            generateRooms()
        })
        .catch(console.error)
}

const generateRooms = () => {
    let emty = ``

    const sixRooms = roomsArr.slice(0, 6)

    for (let i = 0; i < sixRooms.length; i++) {
        emty += `
            <div class="card">
                <div>
                    <img src="${sixRooms[i].images?.[0]?.source || ''}">
                </div>

                <div class="card_body">
                    <p>${sixRooms[i].name}</p>

                    <div class="price">
                        <p>${sixRooms[i].pricePerNight}</p>
                        <p>a night</p>
                    </div>
                </div>

                <button>
                    <a href="/pages/booked/booked.html?roomId=${sixRooms[i].id}">
                        BOOK NOW
                    </a>
                </button>

                <div class="hover_div"></div>
            </div>
        `
    }

    card_div.innerHTML = emty
}

getAllRooms()
