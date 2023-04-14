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
import PrivateRoute from './components/routes/PrivateRoute';
import UserProfile from './components/pages/UserProfile';
import ErrorBoundary from './components/pages/helper/ErrorBoundary';
import MessageComponent from './components/pages/helper/MessageComponent';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const errorMsg = { 
    message : "An unexpected error encountered! Please try again in sometime",
    type : "not-found"
  }
  const dispatch = useDispatch();
  dispatch(loadUser())

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <ErrorBoundary fallback={<MessageComponent {...errorMsg} />}>
              <HomePage />
            </ErrorBoundary>} />
          <Route path="/blogs" element={
            <ErrorBoundary fallback={<MessageComponent {...errorMsg} />}>
                <BlogContainer />
            </ErrorBoundary>} />
          <Route path="/blogs/:blog_id/view" element={
            <ErrorBoundary fallback={<MessageComponent {...errorMsg} />}>
              <BlogView />
            </ErrorBoundary>} />
          <Route path="/user/:username" element={
            <ErrorBoundary fallback={<MessageComponent {...errorMsg} />}>
              <UserProfile />
            </ErrorBoundary>} />
          <Route path="/blogs/post" element={<PrivateRoute>
            <ErrorBoundary fallback={<MessageComponent {...errorMsg} />}>
              <BlogCreate />
            </ErrorBoundary>
          </PrivateRoute>} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
