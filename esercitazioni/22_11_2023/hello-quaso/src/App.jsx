import './App.css'
import products from './assets/mock.json'

function App() {


console.log(products.productsList);
console.log(products.productsList[2]);
console.log(products.productsList.filter((x) => x.price < 200));
console.log(...products.productsList.filter((x) => x.id === 8));
products.productsList.map((x) => console.log(x.name));

  return (
    <>
    </>
  )
}

export default App
