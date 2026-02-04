const basedApi = 'https://hotelbooking.stepprojects.ge/api';
const table_div = document.querySelector('.table_div table tbody');

let BookingArr = [];

const getBookedRooms = () => {
    fetch(`${basedApi}/Booking`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch bookings');
            return res.json();
        })
        .then(data => {
            BookingArr = data;
            generateBookedRooms();
        })
        .catch(err => {
            console.error(err);
        });
};

const generateBookedRooms = () => {
    if (!BookingArr.length) {
        return;
    }

    let html = '';

    BookingArr.forEach(booked => {
        html += `
        <tr>
            <td>
                <div class="descr">
                    <img src="https://images.trvl-media.com/lodging/1000000/920000/916400/916376/3e65a896.jpg" alt="Hotel">
                    <p><b>Hotel</b></p>
                </div>
            </td>
            <td>
                <div class="descr">
                    <img src="https://images.trvl-media.com/lodging/1000000/920000/916400/916376/8715314f.jpg" alt="Room">
                    <p>Room</p>
                </div>
            </td>
            <td>
                <p>Name: ${(booked.customerName || '').slice(0, 8)}</p>
            <p>Phone: ${(booked.customerPhone || '').slice(0, 8)}</p>
            </td>
            <td><span>${booked.isConfirmed ? 'Booked' : 'Pending'}</span></td>
            <td>${booked.checkInDate.split('T')[0]}</td>
            <td>${booked.checkOutDate.split('T')[0]}</td>
            <td>${booked.totalPrice ? booked.totalPrice + '€' : '-'}</td>
            <td>
                <button onclick="cancelBooking(${booked.id})">Cancel Booking</button>
            </td>
        </tr>`;
    });

    table_div.innerHTML = html;
};

// delete
const cancelBooking = (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    fetch(`${basedApi}/Booking/${id}`, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Failed to delete booking');
            getBookedRooms(); 
        })
        .catch(err => console.error(err));
};

getBookedRooms();
