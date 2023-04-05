import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header';
import BlogContainer from './components/pages/BlogContainer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/blogs" element={<BlogContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
