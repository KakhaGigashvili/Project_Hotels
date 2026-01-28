let hotels = document.querySelector('.hotels')
let basedApi = `https://hotelbooking.stepprojects.ge/api`
let hotelsArr = []


const getAllProducts = () =>{
    fetch(`${basedApi}/Hotels/GetAll`, {
        method:"GET",
    }).then((response) =>{
        return response.json()
    }).then((resBody) =>{
        hotelsArr = resBody
        generateHotels()   
        console.log(resBody);
             
    }).catch((err) =>{
        console.log(err);
    })
}
getAllProducts()


const generateHotels = () =>{
    let emty = ``

    for(let i = 0; i < hotelsArr.length; i++){
        emty +=
        `
        <div class="card">
            <div>
            <img src="${hotelsArr[i].featuredImage}">
        </div>
                    
        <div class="card_body">
            <h5>${hotelsArr[i].name}</h5>
            </div>
               <button class="changePage" data-id="${hotelsArr[i].id}">VIEW ROOMS</button>
                <div class="hover_div"></div>
            </div>
        `
    }

    
    hotels.innerHTML = emty
}

hotels.addEventListener('click', (e) => {
    if (e.target.classList.contains('changePage')) {
        const hotelId = e.target.dataset.id

        window.location.href = `../rooms/rooms.html?id=${hotelId}`
    }
})


getAllProducts()
