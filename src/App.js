import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header';
import BlogContainer from './components/pages/BlogContainer';
import setAuthToken from './utils/setAuthToken';
import BlogCreate from './components/pages/BlogCreate';
import LoginComponent from './components/pages/LoginComponent';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/userActions';
import RegisterComponent from './components/pages/RegisterComponent';
import BlogView from './components/pages/BlogView';
import HomePage from './components/pages/HomePage';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const dispatch = useDispatch();
  dispatch(loadUser())

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogContainer />} />
          <Route path="/blogs/:blog_id/view" element={<BlogView />} />
          <Route path="/blogs/post" element={<BlogCreate />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
