const get_rooms = document.querySelector('.get_rooms')

const price_range = document.querySelectorAll('.price_range input[type=range]')
const rangeFill = document.querySelector('.range_fill')
const room_type = document.querySelector('.room_type select')
const check_in = document.querySelector('.check_in input[type=text]')
const check_out = document.querySelector('.check_out input[type=text]')
const submitButtons = document.querySelector('.filter_buttons button[type=submit]')
const resetButtons = document.querySelector('.filter_buttons button[type=reset]')

const minPrice = price_range[0]
const maxPrice = price_range[1]

const minValueDisplay = document.querySelector('#min_value')
const maxValueDisplay = document.querySelector('#max_value')

// NEW: room type mapping
const ROOM_TYPE_MAP = {
    'Single Room': 1,
    'Double Room': 2,
    'Deluxe Room': 3
}

// guest
const guest_quantity = document.querySelector('.guest_quantity')
const guest_input = document.querySelector('.guest_input input[type=text]')
const saveBtn = document.querySelector('.saveBtn')

guest_quantity.addEventListener('change', () => {
    guest_input.value = guest_quantity.value.split(' ')[0]
})

saveBtn.addEventListener('click', () => {
    guest_input.value = guest_quantity.value.split(' ')[0]
})

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
    let html = ''

    roomsArr.forEach(room => {
        html += `
        <div class="card">
            <div>
                <img src="${room.images[0]?.source}">
            </div>
            <div class="card_body">
                <p>${room.name}</p>
                <div class="price">
                    <p>${room.pricePerNight}</p>
                    <p>a night</p>
                </div>
            </div>
            <button><a href="/pages/booked/booked.html?roomId=${room.id}">BOOK NOW</a></button>
        </div>
        `
    })

    get_rooms.innerHTML = html
}

// calendars
flatpickr(".checkin", { dateFormat: "Y-m-d", minDate: "today" })
flatpickr(".checkout", { dateFormat: "Y-m-d", minDate: "today" })

// price
const updateRangeFill = () => {
    const minVal = +minPrice.value
    const maxVal = +maxPrice.value
    rangeFill.style.left = (minVal / 1000) * 100 + '%'
    rangeFill.style.width = ((maxVal - minVal) / 1000) * 100 + '%'
}

minPrice.addEventListener('input', () => {
    if (+minPrice.value > +maxPrice.value) minPrice.value = maxPrice.value
    minValueDisplay.value = minPrice.value
    updateRangeFill()
})

maxPrice.addEventListener('input', () => {
    if (+maxPrice.value < +minPrice.value) maxPrice.value = minPrice.value
    maxValueDisplay.value = maxPrice.value
    updateRangeFill()
})

// availability
const isRoomAvailable = (room, checkIn, checkOut) => {
    if (!checkIn || !checkOut) return true

    const start = new Date(checkIn)
    const end = new Date(checkOut)

    return !room.bookedDates.some(b => {
        const d = new Date(b.date)
        return d >= start && d <= end
    })
}

// submit
submitButtons.addEventListener('click', e => {
    e.preventDefault()

    const bodyData = {
        priceFrom: +minPrice.value,
        priceTo: +maxPrice.value,
        maximumGuests: guest_input.value ? +guest_input.value : 0,
        checkIn: check_in.value ? new Date(check_in.value).toISOString() : null,
        checkOut: check_out.value ? new Date(check_out.value).toISOString() : null
    }

    //  NEW: room type only if selected
    if (ROOM_TYPE_MAP[room_type.value]) {
        bodyData.roomTypeId = ROOM_TYPE_MAP[room_type.value]
    }

    fetch(`${basedApi}/Rooms/GetFiltered`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'text/plain'
        },
        body: JSON.stringify(bodyData)
    })
        .then(res => res.text())
        .then(t => t ? JSON.parse(t) : [])
        .then(data => {
            roomsArr = data.filter(room =>
                isRoomAvailable(room, check_in.value, check_out.value)
            )
            generateRooms()
        })
        .catch(console.error)
})

// reset
resetButtons.addEventListener('click', () => {
    minPrice.value = 0
    maxPrice.value = 1000
    minValueDisplay.value = 0
    maxValueDisplay.value = 1000
    room_type.value = 'Select a room'
    check_in.value = ''
    check_out.value = ''
    guest_input.value = '1'
    updateRangeFill()
    getAllRooms()
})

getAllRooms()
