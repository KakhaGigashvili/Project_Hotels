const get_rooms = document.querySelector('.get_rooms')
let basedApi = `https://hotelbooking.stepprojects.ge/api`
let roomsArr = []

const getAllRooms = () =>{
    fetch(`${basedApi}/Rooms/GetAll`, {
        method:"GET",
    }).then((response) =>{
        return response.json()
    }).then((resBody) =>{
        roomsArr = resBody
        console.log(resBody);
        generateRooms()  
    }).catch((err) =>{
        console.log(err);
    })
}
getAllRooms()

const generateRooms = () =>{
    let emty = ``
    for(let i = 0; i < roomsArr.length; i++){

        emty +=
        `
            <div class="card">
                    <div>
                        <img src="${roomsArr[i].images[0].source}">
                    </div>
                    
                    <div class="card_body">
                        <p>${roomsArr[i].name}</p>
                        
                        <div class="price">
                            <p>${roomsArr[i].pricePerNight}</p>
                            <p>a night</p>
                        </div>
                    </div>
                    <button><a href='/pages/booked/booked.html'>BOOK NOW </a></button>
                    <div class="hover_div"></div>
                </div>
        `
    }


     get_rooms.innerHTML = emty

}

getAllRooms()