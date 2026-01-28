let card_div = document.querySelector('.card_div')
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

    const sixRooms = roomsArr.slice(0, 6)
    for(let i = 0; i < sixRooms.length; i++){

        emty +=
        `
            <div class="card">
                    <div>
                        <img src="${sixRooms[i].images[0].source}">
                    </div>
                    
                    <div class="card_body">
                        <p>${sixRooms[i].name}</p>
                        
                        <div class="price">
                            <p>${sixRooms[i].pricePerNight}</p>
                            <p>a night</p>
                        </div>
                    </div>
                    <button><a href="/pages/booked/booked.html">BOOK NOW</a></button>
                    <div class="hover_div"></div>
                </div>
        `
    }


     card_div.innerHTML = emty

}

getAllRooms()
