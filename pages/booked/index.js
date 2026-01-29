const basedApi = 'https://hotelbooking.stepprojects.ge/api'
const params = new URLSearchParams(window.location.search)
const roomId = Number(params.get('roomId'))

flatpickr(".checkin", { dateFormat: "Y-m-d", minDate: "today" })
flatpickr(".checkout", { dateFormat: "Y-m-d", minDate: "today" })

const roomImage = document.getElementById('roomImage')
const roomTitle = document.getElementById('roomTitle')
const nameInput = document.querySelector('.name_input input')
const phoneInput = document.querySelector('.phone_input input')
const bookButton = document.querySelector('.book_button button')
const tableDiv = document.querySelector('.table_detals')

let roomPrice = 0
let roomsMap = {}

// --- Load all rooms first ---
const getAllRooms = () => {
    return fetch(`${basedApi}/Rooms/GetAll`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch rooms')
            return res.json()
        })
        .then(data => {
            data.forEach(r => roomsMap[r.id] = r)
            const room = roomsMap[roomId]
            if (!room) {
                alert('Room not found')
                throw new Error('Room not found')
            }
            roomPrice = parseFloat(room.pricePerNight || 0)
            roomImage.src = room.images?.[0]?.source || ''
            roomTitle.innerHTML = `${room.name} <b>€ ${roomPrice}</b> <span>a night</span>`
            
            // ✅ ეს ხაზი დაემატა - აბრუნებს roomsMap-ს
            return roomsMap
        })
        .catch(err => {
            console.error('Error loading rooms:', err)
            alert('Failed to load room information')
        })
}

bookButton.addEventListener('click', () => {
    const customerName = nameInput.value.trim()
    const customerPhone = phoneInput.value.trim()
    const checkInValue = document.querySelector('.checkin').value
    const checkOutValue = document.querySelector('.checkout').value

    if (!customerName || !customerPhone || !checkInValue || !checkOutValue) {
        return alert('Please fill all fields')
    }

    const checkInDate = new Date(checkInValue)
    const checkOutDate = new Date(checkOutValue)
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    
    if (nights <= 0) {
        return alert('Check-out must be after check-in')
    }

    const bookingData = {
        roomId,
        customerName,
        customerPhone,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        totalPrice: roomPrice * nights,
        isConfirmed: true
    }

    fetch(`${basedApi}/Booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(text || 'Booking failed')
                })
            }
            const contentType = res.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
                return res.json()
            }
            return res.text() 
        })
        .then(data => {
            alert(`Room booked successfully! Total €${roomPrice * nights}`)
            nameInput.value = ''
            phoneInput.value = ''
            document.querySelector('.checkin').value = ''
            document.querySelector('.checkout').value = ''
            getBookedRooms()
        })
        .catch(err => {
            console.error('Booking error:', err)
            alert('Failed to book room: ' + err.message)
        })
})

let BookingArr = []
const getBookedRooms = () => {
    fetch(`${basedApi}/Booking`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch bookings')
            return res.json()
        })
        .then(data => {
            BookingArr = data
            generateBookedRooms()
        })
        .catch(err => {
            console.error('Error loading bookings:', err)
        })
}

const generateBookedRooms = () => {
    if (!BookingArr.length) {
        tableDiv.innerHTML = `
            <table>
                <tbody>
                    <tr><td colspan="8" style="text-align:center">No bookings found</td></tr>
                </tbody>
            </table>`
        return
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Room</th>
                    <th>Guest</th>
                    <th>Status</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `
    
    BookingArr.forEach(b => {
        const room = roomsMap[b.roomId]
        const hotelImg = room?.images?.[0]?.source || ''
        const roomName = room?.name || 'Unknown Room'
        const checkIn = b.checkInDate.split('T')[0]
        const checkOut = b.checkOutDate.split('T')[0]
        const status = b.isConfirmed ? 'Booked' : 'Pending'
        
        const displayName = b.customerName.length > 8 ? b.customerName.substring(0, 8) + '...' : b.customerName
        const displayPhone = b.customerPhone.length > 8 ? b.customerPhone.substring(0, 8) + '...' : b.customerPhone
        
        html += `
        <tr>
            <td><img src="${hotelImg}" width="50" alt="${roomName}"></td>
            <td>${roomName}</td>
            <td>${displayName} / ${displayPhone}</td>
            <td>${status}</td>
            <td>${checkIn}</td>
            <td>${checkOut}</td>
            <td>€${b.totalPrice}</td>
            <td><button class="cancel-btn" data-booking-id="${b.id}">Cancel</button></td>
        </tr>`
    })
    
    html += `
            </tbody>
        </table>
    `
    
    tableDiv.innerHTML = html
}

tableDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('cancel-btn')) {
        const bookingId = Number(e.target.dataset.bookingId)
        
        if (!confirm('Are you sure you want to cancel this booking?')) return
        
        fetch(`${basedApi}/Booking/${bookingId}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to cancel booking')
                alert('Booking cancelled successfully')
                getBookedRooms()
            })
            .catch(err => {
                console.error('Cancel error:', err)
                alert('Failed to cancel booking: ' + err.message)
            })
    }
})

// ✅ ეს ნაწილი შეიცვალა - ელოდება სანამ rooms ჩაიტვირთება
getAllRooms().then(() => {
    getBookedRooms()
})