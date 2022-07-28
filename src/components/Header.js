import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="Content">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
            <p className='text-red-500'>
                This text changed to Red using Tailwind! whooo hoo.
            </p>
        </header>
      </div>
    
  );
}

export default App;
