import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-red-500'>
          This text changed to Red using Tailwind! whooo hoo.
        </p>
        <a
          className="App-link text-3xl font-bold"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ya'll should Learn React, ya hear!
        </a>
      </header>
    </div>
  );
}

export default App;
