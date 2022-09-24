import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Employees from './components/Employees';
import Upload from './components/FileUpload';
import Login from './components/Login';
import PrivateRouter from './Router/PrivateRouter';
import { logout, selectAuth } from './store/slices/Main';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector(selectAuth);
  return (
    <>
      <div className='navbar navbar-dark bg-dark'>

        <div className='container-fluid' >
          <div className='row justify-content-center'>
            <div className='col-md-2'>
              <div className='col-md-8'>
                <div className='col-md-2'>
                  <div className='nav nav-pills'>

                    {user && (
                      <header className='navbar-brand'>
                        <button className='navbar-toggler'>
                          <Link style={{ textDecoration: "none" }} className={`${pathname === '/' ? 'active' : ''}`} to="/">
                            Home
                          </Link>
                        </button>

                        <button className='navbar-toggler'>
                          <Link
                            style={{ textDecoration: "none" }}
                            className={`${pathname.includes('employees') ? 'active' : ''}`}
                            to="employees"
                          >
                            Employees
                          </Link>
                        </button>

                        <button className='navbar-toggler'>
                          <Link
                            style={{ textDecoration: "none" }}
                            className={`${pathname.includes('upload') ? 'active' : ''}`}
                            to="upload"
                          >
                            Upload
                          </Link>
                        </button>

                        <button style={{ color: "white" }} className='navbar-toggler'>
                          {user != null && (
                            <span onClick={() => dispatch(logout())}>Logout</span>
                          )}
                        </button>
                      </header>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="employees"
          element={
            <PrivateRouter>
              <Employees />
            </PrivateRouter>
          }
        />
        <Route
          path="upload"
          element={
            <PrivateRouter>
              <Upload
                title="Image Upload"
                maxFileSize={500000}
                multiple
                accept="image/png, image/jpeg, image/jpg"
              />
            </PrivateRouter>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRouter>
              <Navigate to="employees" />
            </PrivateRouter>
          }
        />
      </Routes>

    </>
  );
}

export default App;
