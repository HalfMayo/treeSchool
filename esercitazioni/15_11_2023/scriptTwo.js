class Car {
    constructor(brand, model, year, fuelLevel) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.fuelLevel = fuelLevel;
    }

    horn(){
        return "Medium car"
    }

    refuel(fuelAmount){
        if (fuelAmount === 100){
            return "No need to fill me up!"
        }
        if(( this.fuelLevel + fuelAmount ) > 100){
            return "You are overfueling me! Stop!"
        }
        this.fuelLevel+= fuelAmount
        return this.fuelLevel
    }
}

class Suv extends Car {
    horn() {
        console.log("Bigga than ya")
    }
}

class CarPark {
    constructor(cars, customers) {
        this.cars = cars;
        this.customers = customers;
    }

    displayCars() {
        console.log(this.cars)
    }

    // sellCar(customer, carBrand, carModel) {
    //     if(this.customers.includes(customer)) {
    //         console.log(this.cars.filter((x) => x.brand === carBrand).filter((x) => x.model === carModel));
    //     } else {
    //         const carFound = this.cars.filter((x) => x.model === carModel);
    //         if (carFound[0] instanceof Suv) {
    //             console.log("Non puoi comprare questa macchina! Registrati!")
    //         } else {
    //             console.log(this.cars.filter((x) => x.brand === carBrand).filter((x) => x.model === carModel));
    //         }
    //     }
    // }

     sellCar(customer, carBrand, carModel) {
        if(!this.customers.includes(customer)) {
            const carFound = this.cars.filter((x) => x.model === carModel);

            if (carFound[0] instanceof Suv) {
                console.log("Non puoi comprare questa macchina! Registrati!");
                return;
            }
        }

        console.log(this.cars.filter((x) => x.brand === carBrand).filter((x) => x.model === carModel));
    }

    registerCustomer(name) {
        this.customers.push(name);
    }
}

const cars = [
    new Car("Fiat", "Punto", 1998, 24),
    new Car("Volvo","XC40", 2019, 10),
    new Suv("Fiat", "Panda", 1978, 12),
    new Suv("BMW", "X5", 2005, 0)
];

const customers = ["Frodo Baggins", "Samwise Gamgee", "Meriadoc Brandibuc", "Peregrin Tuc"];

const amazingCarPark = new CarPark(cars, customers);

amazingCarPark.displayCars();
amazingCarPark.sellCar("Frodo Baggins", "BMW", "X5");
amazingCarPark.sellCar("Samwise Gamgee", "Volvo", "XC40");
amazingCarPark.sellCar("Peregrin Tuc", "BMW", "X5");
amazingCarPark.sellCar("Aragorn", "Fiat", "Panda");
amazingCarPark.sellCar("Aragorn", "Fiat", "Punto");
amazingCarPark.sellCar("Boromir", "BMW", "X5");

amazingCarPark.registerCustomer("Aragorn");
console.log(amazingCarPark.customers);

const paragraph = document.getElementById("list")
const paragraphTwo = document.getElementById("listTwo")

async function fetchCall() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        const names = [];
        data.forEach((x) => names.push(" " + x.name))
        paragraph.innerText = names;
    } catch(error) {
        throw new Error(error);
    } finally {
        console.log("Yey, done!")
    }
}

function ajaxCall() {
 
    // Creating Our XMLHttpRequest object 
    let xhr = new XMLHttpRequest();
 
    // Making our connection  
    let url = "https://jsonplaceholder.typicode.com/users";
    xhr.open("GET", url);
    xhr.responseType = "json";
    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.response)
            const names = [];
            this.response.forEach((x) => names.push(" " + x.name))
            paragraphTwo.innerText = names;
        }
    }
    // Sending our request 
    xhr.send();
}

// Crea una pagina con un modulo di login che raccoglie username e password.
// Quando l'utente invia il modulo, effettua una chiamata POST a un endpoint di
// un server (simulato con un servizio come MockAPI) con i dati del modulo

const login = document.getElementById("login");
const loginTwo = document.getElementById("loginTwo");

login.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const data = { username: username, password: password };
    fetchPostCall(data);
})

loginTwo.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("usernameTwo").value;
    const password = document.getElementById("passwordTwo").value;
    const data = { username: username, password: password };
    ajaxPostCall(data);
})

async function fetchPostCall(data) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
    const result = await response.json();
      console.log("Success:", result);

    } catch (error) {
      console.error("Error:", error);
    }
  }

  function ajaxPostCall(data) {

    const post = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
 
    // Making our connection  
    let url = "https://jsonplaceholder.typicode.com/posts";
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/json');
    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            console.log("Success:", JSON.parse(this.response))
        }
    }
    // Sending our request 
    xhr.send(post);
}

//

const displayPlanets = document.getElementById("planetsList");

async function swapiCall(x) {
    const response = await fetch(`https://swapi.dev/api/species/${x}/`);
    const data = await response.json();
    console.log(data)
}

async function chubeCheck() {
    try {
        const x = Number(document.getElementById("movieNum").value);
        const chube = "https://swapi.info/api/people/13";

        if(x > 6 || x < 1) {
            console.log("Questo film non esiste");
            return;
        };

        const res = await fetch(`https://swapi.info/api/films/${x}`)
        const data = await res.json();
        const isChube = data.characters.filter((x) => x === chube).length > 0;
        console.log(isChube);
    } catch(error) {
        throw new Error(console.log(error));
    }
}

async function planetList() {
    try {
        const x = Number(document.getElementById("movieNumTwo").value);

        if(x > 6 || x < 1) {
            console.log("Questo film non esiste");
            return;
        };

        const res = await fetch(`https://swapi.info/api/films/${x}`)
        const data = await res.json();

        const title = document.createElement("h1");
        title.innerText = data.title;
        displayPlanets.appendChild(title);

        const episode = document.createElement("p");
        episode.innerText = data.episode_id;
        displayPlanets.appendChild(episode);

        const list = document.createElement("ul");

        data.planets.forEach((planet) => {
            const listItem = document.createElement("li");
            listItem.innerText = planet;
            list.appendChild(listItem);
        })
        
        displayPlanets.appendChild(list);

        console.log(data.title, data.episode_id, data.planets);

    } catch(error) {
        throw new Error(alert(error.message));

    } finally {
        const comment = document.createElement("h3");
        comment.innerText = "Bello!";
        displayPlanets.appendChild(comment);
    }
}
  