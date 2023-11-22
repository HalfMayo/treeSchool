import gandalf from './assets/images/Gandalf-Transparent-PNG.png'
import './App.css';
import HelloWorld from './components/HelloWorld';
import CitiesList from './components/CitiesList';
import Login from './components/Login';
import Section from './components/Section';
import Counter from './components/Counter';
import StateMng from './components/StateMng';

const rohanRoyals = ["Eowyn", "Eomer", "Theoden", "Theodred"]

function App() {

  function randomRoyal() {
    return rohanRoyals[Math.floor(Math.random() * 4)]
  }

  return (
    <div className="app">
      <header>
        <img src={gandalf} className="logo" alt="gandalf" />
      </header>
      <main>
        <HelloWorld/>
        <CitiesList/>
        <Login user={randomRoyal()}/>
        <Section additionalText="Exactly! And counting!">
          <Counter/>
        </Section>
        <StateMng/>
      </main>
    </div>
  );
}

export default App;


