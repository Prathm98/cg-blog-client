import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
