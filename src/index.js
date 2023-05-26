import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './components/login';
import RegiterPage from './components/mainPage';
import SignupPage from './components/signUp';
import VerificationPage from './components/verificationPage';
import MainPage from './components/mainPage';
import AdminLoginPage from './components/Admin/login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    // element: <MainPage />
    // element: <SignupPage />,
    // element: <VerificationPage />,


  },
  {
    path: "/mainPage",
    element: <RegiterPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/verification",
    element: <VerificationPage />,
  },
  {
    path: "/adminLogin",
    element: <AdminLoginPage />,
    // element: <MainPage />
    // element: <SignupPage />,
    // element: <VerificationPage />,


  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />

  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
