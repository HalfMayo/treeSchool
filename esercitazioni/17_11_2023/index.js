
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
//             h1Element.innerText = `Titolo: ${movie.title}, id episodio: ${movie.episode_id}`
//             return h1Element
//         })
        
//         // 2. crea un ul, riempiamo la lista con gli li
//         const ulElement = getOrCreateElementById("planets_list", "ul", function(ulElement){
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
//             pElement.innerText = "qualcosa è andato storto"
//             return pElement
//         })
    
//     } finally {
//         // 4. mostriamo il nostro elemento dedicato modificando 
//         // la proprietà display nel suo attributo style
//         getOrCreateElementById("finally", "h3", function(h3Element){
//             h3Element.innerText = "è bello conoscere altri appassionati"
//             return h3Element
//         })
        
    
//     }
// }
// printPlanetsFullJS(1)

function changeColor() {
    const title = document.getElementById("title");
    if(!title) {
        return;
    }
    title.classList.remove("better-h1");
    title.classList.add("better-better-h1");
}

function getOrCreateElementById(id, tagName, callback){
    const rootElement = document.getElementById("root")
    const foundElement = document.getElementById(id)
    if(foundElement){
        callback(foundElement)
        return 
    }

    const newElement = document.createElement(tagName)
    newElement.id = id;
    const manipulatedElement = callback(newElement)
    rootElement.append(manipulatedElement)
    return document.getElementById(id)
}

//*** COMPONENTI JS *****/

function renderTitle(props){
    getOrCreateElementById("title", "h1", function(h1Element){
        h1Element.innerText = `Titolo: ${props.movieTitle}, id episodio: ${props.movieEpisodeId}`
        h1Element.classList.add("better-h1")
        return h1Element
    })
}

function renderDirector(props){
    getOrCreateElementById("director", "h2", function(h2Element){
        h2Element.innerText = `Regista: ${props.movieDirector}`
        return h2Element
    })
}

function renderProducer(props){
    getOrCreateElementById("producer", "h3", function(h3Element){
        h3Element.innerText = `Produttore: ${props.movieProducer}`
        return h3Element
    })
}

function renderOpening(props){
    getOrCreateElementById("opening", "p", function(pElement){
        pElement.innerText = `${props.movieOpeningCrawl}`
        return pElement
    })
}

function renderPlanets(props){
    const ulElement = getOrCreateElementById("planets_list", "ul", function(ulElement){
        ulElement.innerHTML = ""
        return ulElement
    })

    props.planets.forEach(function(planet){
        const liElement = document.createElement("li")
        liElement.innerText = planet // url pianeta
        ulElement.appendChild(liElement)
    })
}

function renderSpecies(props){
    const ulEl = getOrCreateElementById("species_list", "ul", function(ulElement){
        ulElement.innerHTML = "";
        return ulElement
    })

    props.species.forEach(function(specie){
        const liElement = document.createElement("li");
        liElement.innerText = specie // url specie
        ulEl.appendChild(liElement)
    })
}

function renderGreeting(props){
    getOrCreateElementById("finally", "h3", function(h3Element){
       
        h3Element.innerText = "è bello conoscere altri appassionati"
        return h3Element
    })
}
function renderError(props){
    getOrCreateElementById("error_text", "p", function(pElement){
       
        pElement.innerText = "qualcosa è andato storto"
        return pElement
    })
}

// COMPONENTE APP
function renderApp(props){

    if (props.isLoading === true ){
        return
    }
    if(props.hasError){
        renderError()

        renderGreeting()
        return 
    }

    if(props.planets !== undefined){

        renderTitle({
            movieTitle: props.movieTitle,
            movieEpisodeId: props.movieEpisodeId
        })

        renderDirector({
            movieDirector: props.movieDirector
        })

        renderProducer({
            movieProducer: props.movieProducer
        });

        renderOpening({
            movieOpeningCrawl: props.movieOpeningCrawl
        });

        renderPlanets({
            planets: props.planets
        })

        renderSpecies({
            species: props.movieSpecies
        })
        


        renderGreeting()
    }
}

/*
  Lo scopo del nostro componente:
  - fetchare un film per Id
  - gestire un'interfaccia che mostri il dato e i vari momenti 
    di caricamento/errore relativi alla chiamata api
*/
async function App(props){

    async function fetchMovieById(id){
 
        const url = `https://swapi.dev/api/films/${id}/`
        // effettuare la nostra richiesta e vedere
        // che cosa intercetta il ritorno fetch
        // la response
        const res = await fetch(url);
        // ora che abbiamo la response vogliamo
        // ottenere un qualcosa che sia in un formato che
        // conosciamo e possiamo manipolare in JS
        // per questo utilizziamo il metodo json
        const movie = await res.json();
        return movie
    }
    // stato APPLICATIVO

    // 1. la mia app inizia il suo ciclo di vita, invochiamo il componente che lo 
    // gestisce passandogli tramite le props la situazione attuale
    renderApp({
        planets: undefined,
        isLoading: false,
        hasError: false
    })

    try {
        // 2. stiamo per fare la chiamata api
        // invochiamo nuovamente il nostro componente che gestisce il DOM
        // e gli passiamo tramite props la descrizione della nuova situazione
        renderApp({
            planets: undefined,
            isLoading: true,
            hasError: false
        })
        const movie = await fetchMovieById(props.id);
        console.log(movie)
        // 3 - success
        // la chiamata api è andata bene
        // invochiamo il componente che gestisce il DOM
        // e gli passiamo tramite props la descrizione della nuova situazione
        renderApp({
            planets: movie.planets,
            movieEpisodeId: movie.episode_id,
            movieTitle: movie.title,
            movieDirector: movie.director,
            movieSpecies: movie.species,
            movieOpeningCrawl: movie.opening_crawl,
            movieProducer: movie.producer,
            isLoading: false,
            hasError: false
        })
    } catch(e){
        console.log(e)
        // 3 - failure
        // la chiamata api è andata male
        // invochiamo il componente che gestisce il DOM
        // e gli passiamo tramite props la descrizione della nuova situazione
        renderApp({
            planets: undefined,
            isLoading: false,
            hasError: true
        })
    }
}

// componente è una funzione
// -> ha in ingresso le props che sono rigorosamente un'oggetto ( props -> properties)
// -> può eseguire altri componenti o codice js arbitrario
// -> i dati ad altri componenti si passano sempre tramite formato oggetto
async function MyApplication(props){
    await App({id: props.id})
}

MyApplication({id: 1})



