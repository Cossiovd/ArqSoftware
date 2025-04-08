let token = "";
// back 

function login() {
    const username = document.getElementById("username").value;
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    })
    .then(res => res.json())
    .then(data => {
        token = data.token;
        document.getElementById("tokenMessage").innerText = "Login exitoso. Token guardado.";
    });
}


function getFlights() {
    fetch("http://localhost:3000/flights", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("flightsList");
        list.innerHTML = "";
        data.forEach(f => {
            let li = document.createElement("li");
            li.innerText = `ID: ${f.id} - Destino: ${f.destination} - Precio: $${f.price}`;
            list.appendChild(li);
        });
    });
}

function reserveFlight() {
    const flightId = document.getElementById("flightId").value;
    fetch("http://localhost:3000/reserve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ flightId: Number(flightId) })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("reservationMessage").innerText = data.message;
    });
}

function getReservations() {
    fetch("http://localhost:3000/reservations", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("reservationsList");
        list.innerHTML = "";
        data.forEach(r => {
            let li = document.createElement("li");
            li.innerText = `Vuelo a ${r.flight.destination}`;
            list.appendChild(li);
        });
    });
}

function getRecommendations() {
    showLoader()
    fetch("http://localhost:3000/recommendations", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("recommendationsList");
        list.innerHTML = "";
        data.forEach(r => {
            let li = document.createElement("li");
            li.innerText = `Destino: ${r.destination} - Precio: $${r.price}`;
            list.appendChild(li);
        });
        
    });
}
    //Loaders 
    //flights

    function showLoader() {
        document.getElementById("loader").style.display = "flex";
        }
        
        function hideLoader() {
        document.getElementById("loader").style.display = "none";
        }
function getFlights() {
    showLoader();
    fetch("http://localhost:3000/flights", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("flightsList");
        list.innerHTML = "";
        data.forEach(f => {
            let li = document.createElement("li");
            li.innerText = `ID: ${f.id} - Destino: ${f.destination} - Precio: $${f.price}`;
            list.appendChild(li);
        });
    })
    .finally(() => {
        hideLoader();
    });
}

//
 


