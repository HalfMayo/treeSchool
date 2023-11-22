// Crea una pagina HTML con una lista di numeri.
// Aggiungi due pulsanti: uno per ordinare i numeri in ordine crescente e un altro per ordinarli in ordine decrescente.
// Implementa la logica JavaScript per ordinare dinamicamente i numeri quando i pulsanti vengono cliccati.

const counter = document.getElementById("counter");
let x = 0;
const arr = [78, 56, 23, 89, 12, 45, 8]

function mouseOver(el, color) {
    el.style.backgroundColor = color;
}

function mouseLeave(el) {
    el.style.backgroundColor = "transparent";
}

function useCounter(op) {
    op === "+" ? x++ : x--;
    counter.innerText = x;
}

function populateList() {
    const ul = document.getElementById("numbers");
    //oppure ul.innerHTML = ""
    clearList();
    arr.forEach((arrElement) => {
        const li = document.createElement("li");
        li.innerText = arrElement;
        ul.appendChild(li);
    })
}

function clearList() {
    const ul = document.getElementById("numbers");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
}

function sort() {
    arr.sort((a,b) => a - b);
    populateList();
}

function reverse() {
    arr.sort((a,b) => b - a);
    populateList();
}

populateList();
