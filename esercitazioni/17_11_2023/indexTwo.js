
/*

    <h1 id="title"></h1>
    <ul id="planets_list">

    </ul>
    <h3 style="display:none;" id="finally">è bello conoscere altri appassionati</h3>
    <p id="error_text"></p> 
*/
// async function printPlanetsFullJS(id){
//     try {
//         const movie = await fetchMovieById(id);
//         // throw new Error("non si passa")

//         // 1. recuperiamo il nostro h1 e riempiamolo con il testo richiesto
//         getOrCreateElementById("title", "h1", function(h1Element){
//             h1Element.id = "title"
//             h1Element.innerText = `Titolo: ${movie.title}, id episodio: ${movie.episode_id}`
//             return h1Element
//         })
        
//         // 2. crea un ul, riempiamo la lista con gli li
//         const ulElement = getOrCreateElementById("planets_list", "ul", function(ulElement){
//             ulElement.id = "planets_list";
//             ulElement.innerHTML = ""
//             return ulElement
//         })

//         movie.planets.forEach(function(planet){
//             const liElement = document.createElement("li")
//             liElement.innerText = planet // url pianeta
//             ulElement.appendChild(liElement)
//         })
    
//     } catch(e){
//         console.log(e)
//         //3. nel caso di errore riempiamo il nostro elemento dedicato 
//         // con un testo
//         getOrCreateElementById("error_text", "p", function(pElement){
//             pElement.id = "error_text"
//             pElement.innerText = "qualcosa è andato storto"
//             return pElement
//         })
    
//     } finally {
//         // 4. mostriamo il nostro elemento dedicato modificando 
//         // la proprietà display nel suo attributo style
//         getOrCreateElementById("finally", "h3", function(h3Element){
//             h3Element.id = "finally"
//             h3Element.innerText = "è bello conoscere altri appassionati"
//             return h3Element
//         })
        
    
//     }
// }

// printPlanetsFullJS(1)

const rootElement = document.getElementById("root");

function changeColor() {
    const title = document.getElementById("title");
    if(!title) {
        return;
    }
    title.classList.remove("better-h1");
    title.classList.add("better-better-h1");
}

function getOrCreateElementById(id, tagName, callback){
    const foundElement = document.getElementById(id)
    if(foundElement){
        callback(foundElement)
        return 
    }
    const newElement = document.createElement(tagName);
    newElement.id = id;
    const manipulatedElement = callback(newElement);
    rootElement.append(manipulatedElement);
    return document.getElementById(id);
}


//*** COMPONENTI JS *****/

function renderTitle(props){
    getOrCreateElementById("title", "h1", function(h1Element){
        h1Element.innerText = `Titolo: ${props.title}, episodio ${props.episodeId}`
        h1Element.classList.add("better-h1")
        return h1Element
    })
}

function renderDirector(props){
    getOrCreateElementById("director", "h2", function(h2Element){
        h2Element.innerText = `Regista: ${props.director}`
        return h2Element
    })
}

function renderProducer(props){
    getOrCreateElementById("producer", "h3", function(h3Element){
        h3Element.innerText = `Produttore: ${props.producer}`
        return h3Element
    })
}

function renderOpening(props){
    getOrCreateElementById("opening", "p", function(pElement){
        pElement.innerText = `${props.opening}`
        return pElement
    })
}

async function renderPlanets(props){
    const ulElement = getOrCreateElementById("planets_list", "ul", function(ulElement){
        ulElement.innerHTML = ""
        return ulElement;
    })

    await props.planets.forEach(function(planet){
        const liElement = document.createElement("li")
        liElement.innerText = planet //url
        ulElement.appendChild(liElement)
    })
}

function renderSpecies(props){
    const ulElement = getOrCreateElementById("species_list", "ul", function(ulElement){
        ulElement.innerHTML = ""
        return ulElement;
    })

    props.species.forEach(function(species){
        const liElement = document.createElement("li")
        liElement.innerText = species // url
        ulElement.appendChild(liElement)
    })
}

function renderGreeting(){
    getOrCreateElementById("finally", "h3", function(h3Element){
        h3Element.innerText = "è bello conoscere altri appassionati"
        return h3Element
    })
}

function renderLoading(){
    getOrCreateElementById("loading_text", "p", function(pElement){
        pElement.innerText = "Momento momento momento"
        return pElement
    })
}

function renderError(){
    getOrCreateElementById("error_text", "p", function(pElement){
        pElement.innerText = "Qualcosa è andato storto"
        return pElement
    })
}

// COMPONENTE APP
function renderApp(props){

    if (props.isLoading){
        renderLoading();
        return;
    }

    if(props.hasError){
        renderError();
        renderGreeting();

        return;
    }

    if(props.info){

        while(rootElement.firstChild) {
            rootElement.removeChild(rootElement.firstChild)
        }

        renderTitle({
            title: props.title,
            episodeId: props.episodeId
        });

        // qui vogliamo renderizzare il movie.director con un h2
        renderDirector({
            director: props.director
        });

        renderProducer({
            producer: props.producer
        });

        renderOpening({
            opening: props.opening
        });


        renderPlanets({
            planets: props.planets
        })

        // qui vogliamo renderizzare la lista movie.species con ul e relativi li
        renderSpecies({
            species: props.species
        });

        renderGreeting();
    }
}

async function App(props){

    async function fetchMovieById(id){
 
        const url = `https://swapi.dev/api/films/${id}/`
        const res = await fetch(url);
        const movie = await res.json();

        return movie;
    }

    try {
        //visualizzazione dell'app prima della ricezione dei dati
        renderApp({
            info: false,
            isLoading: true,
            hasError: false
        })
        
        const movie = await fetchMovieById(props.id);
        console.log(movie);
        //visualizzazione dell'app dopo della ricezione dei dati (SUCCESSO)
        renderApp({
            info: true,
            director: movie.director,
            species: movie.species,
            planets: movie.planets,
            episodeId: movie.episode_id,
            title: movie.title,
            producer: movie.producer,
            opening: movie.opening_crawl,
            isLoading: false,
            hasError: false
        })


    } catch(e){
        console.log(e);
        //visualizzazione dell'app dopo una risposta negativa
        renderApp({
            info: false,
            isLoading: false,
            hasError: true
        })
    }
}

async function MyApplication(props){
    await App({id: props.id})
}

MyApplication({id: 2})




