const table_div = document.querySelector('.table_div table tbody')
let basedApi = `https://hotelbooking.stepprojects.ge/api`
let BookingArr = []

const getBookedRooms = () => {
    fetch(`${basedApi}/Booking`)
        .then(res => res.json())
        .then(data => {
            BookingArr = data
            generatoBookedRooms()
            console.log(data)
        })
        .catch(err => console.log(err))
}


const generatoBookedRooms = () => {
    let emty = ``

    for(let i = 0; i <BookingArr.length; i++){
        emty += `
    <tr>
        <td>
            <div>
                <div class= 'descr'>
                    <img src ='https://images.trvl-media.com/lodging/1000000/920000/916400/916376/3e65a896.jpg?impolicy=resizecrop&rw=1200&ra=fit'>
                    <p><b> Radisson Blu Iveria Hotel Tbilisi </b></p>
                </div>
            </div>
        </td>

        <td>
            <div>
                <div class= 'descr'>
                <img src ='https://images.trvl-media.com/lodging/1000000/920000/916400/916376/8715314f.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium'>
                <p>Superior Room 299€</p>
                </div>
            </div>
        </td>

        <td>
            <p>Name: ${(BookingArr[i].customerName || '').slice(0, 8)}</p>
            <p>Phone: ${(BookingArr[i].customerPhone || '').slice(0, 8)}</p>
        </td>

        <td>
            <span>${BookingArr[i].isConfirmed ? 'Booked' : 'Pending'}</span>
        </td>

        <td>${BookingArr[i].checkInDate.split('T')[0]}</td>
        <td>${BookingArr[i].checkOutDate.split('T')[0]}</td>
        <td>${BookingArr[i].totalPrice}€</td>

        <td>
            <button type="button" onclick="cancelBooking(${BookingArr[i].id})">
                Cancel Booking
            </button>
        </td>
    </tr>
`

    }

    table_div.innerHTML = emty
}

const cancelBooking = (id) => {
    fetch(`${basedApi}/Booking/${id}`, { method: 'DELETE' })
        .then(() => getBookedRooms())
        .catch(err => console.log(err))
}

getBookedRooms()
