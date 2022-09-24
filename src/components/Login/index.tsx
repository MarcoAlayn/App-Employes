import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  selectAuth,
  selectLoading,
  setCredentials,
  toggleLoading,
} from '../../store/slices/Main';
import Loader from '../Common/Loader';
import CustomButton from '../Common/SubmitButton';
import '../../styles/Theme.css'


const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [psw, setPsw] = useState<string>('');
  const [error, setError] = useState('');
  // const dispatch = useDispatch();
  const dispatch = useDispatch<any>();
  const user = useSelector(selectAuth);
  const loading = useSelector(selectLoading);
  const preventCopyPaste = (e: any) => {
    e.preventDefault();
  };
  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(toggleLoading('login'));
    setTimeout(() => {
      if (username === 'testing_user' && psw === '123456')
        dispatch(setCredentials(username));
      else setError('Incorrect credentials');
      dispatch(toggleLoading('login'));
    }, 2000);
  };
  if (user) return <Navigate to="employees" />;
  return (
    <div style={{ paddingTop: "100px" }} className="container-fluid ">
      <div className="row justify-content-center">
        <div className='col-md-3'>
          <div style={{ background: "#120b6f", color: "#efc861", padding: "30px", borderRadius: "20px", boxShadow: "#000 5px 5px 5px" }}>
            <div className='col-md-6 '>
              <h4>Login</h4>
              <form onSubmit={handleLogin}>


                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="email@hotmail.com"
                    name="username"
                    value={username}
                    onCopy={preventCopyPaste}
                    onPaste={preventCopyPaste}
                    onChange={(e) => setUsername(e.target.value)}
                  // className="form-control form-control-sm" aria-label=".form-control-lg example"
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onCopy={preventCopyPaste}
                    onPaste={preventCopyPaste}
                    value={psw}
                    onChange={(e) => setPsw(e.target.value)}
                  // className="form-control"
                  />
                  {error !== '' && <span>{error}</span>}
                  {loading.includes('login') ? (
                    <Loader size="small" />
                  ) : (
                    <div style={{ paddingTop: "10px" }}>
                      <CustomButton
                        disabled={
                          username === '' ||
                          username.length < 10 ||
                          psw === '' ||
                          psw.length < 6
                        }
                        type="submit"
                        className="btn btn-dark mb-3 "
                      >
                        Log in
                      </CustomButton >
                    </div>
                  )}
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};

export default Login;
