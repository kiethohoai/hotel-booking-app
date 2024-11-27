import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <Layout>
              <h1>Home Page</h1>
            </Layout>
          }
        />

        {/* Search Page */}
        <Route
          path="/search"
          element={
            <Layout>
              <h1>Search Page</h1>
            </Layout>
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        {/* Login Page */}
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {/* All Unknow Routes Navigate to Homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
