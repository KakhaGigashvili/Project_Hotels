const basedApi = 'https://hotelbooking.stepprojects.ge/api'

const params = new URLSearchParams(window.location.search)
const roomId = Number(params.get('roomId'))

if (!roomId) {
    alert('Room not found')
}
const getRoomById = () => {
    fetch(`${basedApi}/Rooms/GetAll`)
        .then(res => res.json())
        .then(data => {
            const room = data.find(thatRoom => thatRoom.id === roomId)

            if (!room) {
                alert('Room not found')
                return
            }

            fillRoomData(room)
        })
        .catch(console.error)
}

const fillRoomData = (room) => {
    document.getElementById('roomImage').src =
        room.images?.[0]?.source || ''

    document.getElementById('roomTitle').innerHTML = `
        ${room.name} <b>€ ${room.pricePerNight}</b> <span>a night</span>
    `
}

getRoomById()
