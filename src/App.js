import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header';
import BlogContainer from './components/pages/BlogContainer';
import setAuthToken from './utils/setAuthToken';
import BlogCreate from './components/pages/BlogCreate';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/blogs" element={<BlogContainer />} />
          <Route path="/blogs/post" element={<BlogCreate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
