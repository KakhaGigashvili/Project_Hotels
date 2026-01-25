const minValue = document.querySelector('#min_value')
const maxValue = document.querySelector('#max_value')

const rangeFill = document.querySelector('.range_fill')
const rangeInputs = document.querySelectorAll('input[type="range"]')

const minRange = rangeInputs[0]
const maxRange = rangeInputs[1]

const maxRangeValue = parseInt(minRange.max)

let get_rooms = document.querySelector('.get_rooms')
let basedApi = `https://hotelbooking.stepprojects.ge/api`

let roomsArr = []

const filterRoomsByPrice = (min, max) => {
    const filteredRooms = roomsArr.filter(room =>
        room.pricePerNight >= min && room.pricePerNight <= max
    )

    generateRooms(filteredRooms)
}

const validateRange = () => {
    let minPrice = parseInt(minRange.value)
    let maxPrice = parseInt(maxRange.value)

    if (minPrice > maxPrice) {
        [minPrice, maxPrice] = [maxPrice, minPrice]
    }

    minValue.value = minPrice
    maxValue.value = maxPrice

    const leftPercent = (minPrice / maxRangeValue) * 100
    const widthPercent = ((maxPrice - minPrice) / maxRangeValue) * 100

    rangeFill.style.left = leftPercent + '%'
    rangeFill.style.width = widthPercent + '%'

    filterRoomsByPrice(minPrice, maxPrice)
}

rangeInputs.forEach(input => {
    input.addEventListener('input', validateRange)
})

minValue.addEventListener('input', () => {
    minRange.value = minValue.value
    validateRange()
})

maxValue.addEventListener('input', () => {
    maxRange.value = maxValue.value
    validateRange()
})

// Get Rooms

const getAllRooms = () =>{
    fetch(`${basedApi}/Rooms/GetAll`, {
        method:"GET",
    }).then((response) =>{
        return response.json()
    }).then((resBody) =>{
        roomsArr = resBody
        generateRooms()  
        validateRange()
    }).catch((err) =>{
        console.err(err);
    })
}

const generateRooms = (resBody = roomsArr) =>{
    let emty = ``

    for(let i = 0; i < resBody.length; i++){

        emty +=
        `
            <div class="card">
                    <div>
                        <img src="${resBody[i].images[0].source}">
                    </div>
                    
                    <div class="card_body">
                        <p>${resBody[i].name}</p>
                        
                        <div class="price">
                            <p>${resBody[i].pricePerNight}</p>
                            <p>a night</p>
                        </div>
                    </div>
                    <button>BOOK NOW</button>
                    <div class="hover_div"></div>
                </div>
        `
    }


     get_rooms.innerHTML = emty

}

getAllRooms()