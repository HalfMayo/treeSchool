let isFirst = true;
const divOne = document.getElementById("esOne");
const divTwo = document.getElementById("esTwo");
const uList = document.getElementById("list");
const listElements = ["Elemento 1", "Elemento 2", "Elemento 3"];
const buttonTitle = document.getElementById("buttonTitle");
const imInput = document.getElementById("input");

const feedback = document.getElementById("feedback");
const arrElements = document.getElementById("arrElements")
const arrNum = [3, 1, 40, 12, 42, 100, 431, 76, 4, 9];
const sum = document.getElementById("sum");
const max = document.getElementById("max");
const min = document.getElementById("min");
const random = document.getElementById("random");
const sumEven = document.getElementById("sumEven");

populateList();

arrNum.forEach((x) => {
    const li = document.createElement("li");
    li.setAttribute("id", x);
    li.innerText = x;
    arrElements.appendChild(li);
})

divOne.onclick = () => {
    console.log("Quaso, divOne");
}

buttonTitle.onmouseover = () => {
    console.log("Quaso, hovering buttonTitle");
}

divTwo.onmouseenter = () => {
    console.log("Quaso, entering divTwo");
}

divTwo.onmouseleave = () => {
    console.log("Quaso, exiting divTwo");
}

imInput.onfocus = () => {
    console.log("A quaso for your thoughts?");
}

imInput.onblur = () => {
    console.log("More quaso for your thoughts?");
}

const onSelect = function() {
    console.log(document.getElementById("select").value);
}

sum.onclick = function() {
    const sum = arrNum.reduce((total, current) => total + current, 0);
    feedback.innerText = sum;
}

max.onclick = function() {
    //Math.max() e Math.min() prendono una sequenza di numeri come argomenti (Math.max(1,6,9,10,-1,89)).
    //Se questi numeri sono dentro un array, si possono estrarre con l'operatore spread (...array)
    const max = Math.max(...arrNum);
    const li = document.getElementById(max);
    li.style.color = "#0000FF";
}

min.onclick = function() {
    const min = Math.min(...arrNum);
    const li = document.getElementById(min);
    li.style.color = "#FF0000";
}

random.onclick = function() {
        //Math.random() * (max - min) + min ==> ritorna un numero random dato un intervallo
        const randomIndex = Math.random() * ((arrNum.length - 1) - 0) + 0;
        //Math.ceil() ==> arrotonda per eccesso
        const randomNumber = arrNum[Math.ceil(randomIndex)];
        feedback.innerText = randomNumber * 3;
}

sumEven.onclick = function() {
    const filter = arrNum.filter((x) => x % 2 === 0);
    const sumEven = filter.reduce((total, current) => total + current, 0);
    feedback.innerText = sumEven;
}

function titleMod() {
    const title = document.getElementById("title");
    const newTitle = document.createTextNode(isFirst ? "Sono il secondo titolo" : "Sono il primo titolo");
    title.replaceChild(newTitle, title.firstChild);
    isFirst = !isFirst;
}

function modList(method) {
    if(method === "add") {
        listElements.push("Elemento " + (listElements.length + 1));
        updateList();
    } else if(method === "remove") {
        listElements.pop();
        updateList();
    } else {
        console.log("Invalid command");
    }
}

function populateList() {
    
    listElements.forEach((x) => {
        const liTag = document.createElement("li");
        const liContent = document.createTextNode(x);
        liTag.appendChild(liContent);
        uList.appendChild(liTag);
    })
}

function clearList() {
    while (uList.firstChild) {
        uList.removeChild(uList.firstChild);
      }
}

function updateList() {
    clearList();
    populateList();
}

//SE IL TAG SCRIPT È NELL'HEAD, IL FILE JS VIENE LETTO QUANDO IL DOM NON È ANCORA STATO COSTRUITO
//PER QUESTO MOTIVO, SE IL TAG SCRIPT È NELL'HEAD, LE VARIABILI RIFERITE AGLI ELEMENTI HTML NON POSSONO ESSERE DICHIARATE E ASSEGNATE NELLO SCOPE GLOBALE,
//PERCHÉ QUEGLI ELEMENTI HTML NON ESISTONO ANCORA, E PRIMA DI DICHIARARLE BISOGNA ESSERE SICURI CHE IL DOM SIA STATO CARICATO:
// window.addEventListener("DOMContentLoaded", (e) => {
    
//     const button = document.getElementById("buttonTitle");
//     const title = document.getElementById("title");
//     const newTitleFirst = document.createTextNode("Sono il primo titolo");
//     const newTitleSecond = document.createTextNode("Sono il secondo titolo");

//     if(button) {
//         button.addEventListener("click", (e) => {
//             title.replaceChild(isFirst ? newTitleSecond : newTitleFirst, title.firstChild);
//             isFirst = !isFirst;
//         })
//     }
// })

function book(name, author, isRead, pubDate, chapters, id) {
    this.name = name;
    this.author = author;
    this.isRead = isRead;
    this.pubDate = pubDate;
    this.chapters = chapters;
    this.id = id;
}

const personalLibrary = [
    new book("Il Signore degli Anelli", "J.R.R. Tolkien", true, "1954-07-29", [[50, 40], [30, 25]], 23467),
    new book("Harry Potter", "J.K. Rowling", false, "1997-06-26", [[20, 30], [35, 40]], 345789),
    new book("1984", "George Orwell", true, "1949-06-08", [[30, 25], [40, 35]], 128),
    new book("Cronche di Narnia", "C.S. Lewis", false, "1950-10-16", [[25, 30], [20, 25]], 78234),
    new book("Lo Hobbit", "J.R.R. Tolkien", true, "1950-06-21", "234", 2378),
]

const printCover = (book) => console.log(book.name + ", " + book.author + ", " + book.pubDate);

const printChapPages = (book) => {
    let sum = 0;
    book.chapters.forEach((x) => sum += x[1]);
    return sum;
}
const printPubDate = (book) => console.log(book.pubDate);

const totalPages = (library) => {
    let sum = 0;
    library.forEach((x) => x.chapters.forEach((x) => sum += x[1]));
    return sum;
}

const readBooks = (library) => {
    const booksRead = library.filter((x) => x.isRead);
    return booksRead;
}

const totPagesReadBooks = (library) => {
    const booksRead = readBooks(library);
    const totPagesReadBooks = totalPages(booksRead);
    //oppure const totPagesReadBooks = totalPages(readBooks(library));
    return totPagesReadBooks;
}

const searchForm = document.getElementById("searchForm");
const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");

function populateTable() {
    personalLibrary.forEach((x) => {

    const row = document.createElement("tr");
    row.setAttribute("id", x.id)

    const cellName = document.createElement("td");
    cellName.innerText = x.name;
    row.appendChild(cellName);
    const cellAuthor = document.createElement("td");
    cellAuthor.innerText = x.author;
    row.appendChild(cellAuthor);
    const cellPubDate = document.createElement("td");
    cellPubDate.innerText = x.pubDate;
    row.appendChild(cellPubDate);
    const cellPages = document.createElement("td");
    cellPages.innerText = typeof(x.chapters) === "string" ? x.chapters : printChapPages(x);
    row.appendChild(cellPages);

    tbody.appendChild(row);
})}

function clearTable() {
    const tbody = document.getElementById("tbody");
    const head = document.getElementById("head")
    while (tbody.lastChild !== head) {
            tbody.removeChild(tbody.lastChild);
      }
}

function populateSelect(info) {
    const select = document.getElementById("deleteAuthor");
    const otherSelect = document.getElementById("deleteBook");

    personalLibrary.forEach((x) => {
        const option = document.createElement("option")
        option.innerText = x[info];
        if(info === "author") {
            select.appendChild(option)
        }
        else if(info === "name") {
            otherSelect.appendChild(option)
        } else {
            console.log("invalid operation")
        }
    })
}

function clearSelect() {
    const select = document.getElementById("deleteAuthor");
    const defaultAuthor = document.getElementById("defaultAuthor");
    const otherSelect = document.getElementById("deleteBook");
    const defaultBook = document.getElementById("defaultBook");


    while (select.lastChild !== defaultAuthor) {
        select.removeChild(select.lastChild);
    }

    while (otherSelect.lastChild !== defaultBook) {
        otherSelect.removeChild(otherSelect.lastChild);
    }
}

function searchAuthor(e) {
    e.preventDefault();
    const searchParam = document.getElementById("author").value.toLowerCase();
    personalLibrary.forEach((x) => {
        const row = document.getElementById(x.id);
        if(x.author.toLowerCase().includes(searchParam)) {
            row.style.backgroundColor = "#ADFF2F";
            return;   
        }
        row.style.backgroundColor = "transparent"
    })

}

function addBook(e) {
    e.preventDefault();
    const addBook = document.getElementById("addBook").value;
    const addAuthor = document.getElementById("addAuthor").value;
    const addPubDate = document.getElementById("addPubDate").value;
    const addChapters = document.getElementById("addChapters").value;
    personalLibrary.push(new book(addBook, addAuthor, false, addPubDate, addChapters, (Math.random()*5)));
    clearTable();
    clearSelect();
    populateSelect("name");
    populateSelect("author");
    populateTable();
}

function deleteBook(e) {
    e.preventDefault();
    const deleteBook = document.getElementById("deleteBook").value;
    const deleteAuthor = document.getElementById("deleteAuthor").value;

    if(deleteBook === "Choose a book" || deleteAuthor === "Choose an author") return;

    const elToDelete = personalLibrary.filter((x) => deleteAuthor === x.author).filter((x) => deleteBook === x.name).pop();
    
    if(!elToDelete) return;

    const index = personalLibrary.indexOf(elToDelete);
    personalLibrary.splice(index, 1);
    clearTable();
    clearSelect();
    populateSelect("name");
    populateSelect("author");
    populateTable();

}

searchForm.addEventListener("submit", searchAuthor);
addForm.addEventListener("submit", addBook);
deleteForm.addEventListener("submit", deleteBook);
populateTable();
populateSelect("name");
populateSelect("author");

// Supponiamo di voler gestire un social per utenti. 
// Questo social tiene molto alla privacy dei propri utenti, pertanto ha deciso che nella lista di utenti il loro nome deve essere sostituito
// utilizzando il cifrario di cesare con chiave = 3. Questo significa ad esempio che il nome alfio sarebbe DOINR, 
// perché spostando di 3 lettere A ottengo D; ATTENZIONE, per questo metodo deve essere utilizzata la FUNZIONE MAP.

// Per ogni utente possiamo vedere: 1) tutti i suoi post; 2) i commenti relativi ad un determinato post; 3) tutti gli album pubblicati;
//4) per ogni album tutte le foto; 5) la lista di cose da fare. Solo le cose già fatte devono essere colorate di verde.
//6) inoltre ogni utente può inserire un nuovo post.
// La lista di API per effettuare l'esercizio è la seguente:
//     - https://jsonplaceholder.typicode.com/users (GET) : lista di tutti gli utenti
//     - https://jsonplaceholder.typicode.com/posts?userId=1 (GET) : Lista di tutti i post di un utente con id = 1
//     - https://jsonplaceholder.typicode.com/comments?postId=1 (GET): lista dei commenti di un post con id = 1
//     - https://jsonplaceholder.typicode.com/albums?userId=1 (GET): Lista di tutti gli album di un utente con id= 1
//     - https://jsonplaceholder.typicode.com/photos?albumId=1 (GET): Lista di foto di un album con id=1
//     - https://jsonplaceholder.typicode.com/posts (POST): inserimento di un nuovo post. L'oggetto da passare in alla post è il seguente:
//         JSON.stringify({
//             title: 'foo',
//             body: 'bar',
//             userId: 1,
//         });
//     - https://jsonplaceholder.typicode.com/todos?userId=1 lista di cose da fare per l'utente con id = 1

function caesar(string) {
    const arr = string.split("").map((x) => {
        return String.fromCharCode(x.charCodeAt(0) + 3)
    }).join("");
    return arr;
}

async function exampleFetch(url) {
    const response = await fetch(url);
    const json = await response.json();
    return await json;
}

async function exampleWholeCall() {
    try {
        const data = await exampleFetch("https://jsonplaceholder.typicode.com/users");
        console.log(data)
        data.forEach((x) => console.log(caesar(x.name)))
    } catch(error) {
        throw new Error(error);
    } finally {
        console.log("Yey, done!")
    }
}

exampleWholeCall();

//Prove con ChatGPT (codici generati da ChatGPT su richiesta)

//fetch()
// URL of the API endpoint you want to call
const apiUrl = 'https://jsonplaceholder.typicode.com/users';

// Using the fetch function to make a GET request
fetch(apiUrl)
  .then(response => {
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse the JSON data in the response
    return response.json();
  })
  .then(data => {
    // Handle the data from the API
    console.log('API Response:', data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });

  //fetch() + async/await
  async function fetchData() {
    // URL of the API endpoint you want to call
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  
    try {
      // Using the fetch function to make a GET request
      const response = await fetch(apiUrl);
  
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON data in the response
      const data = await response.json();
  
      // Handle the data from the API
      console.log('API Response:', data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  }
  
  // Call the fetchData function
  fetchData();
  

