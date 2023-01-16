import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/authApi';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../features/authSlice';
import { Button } from '../../components/Button/Button';

const initialState = {
  email: '',
  password: '',
};

export const Auth = () => {
  const [formValue, setFormValue] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const { email, password } = formValue;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    loginUser,
    { data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError },
  ] = useLoginUserMutation();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error('Please fill all inputs');
    }
  };

  React.useEffect(() => {
    if (isLoginSuccess) {
      toast.success(`Hello ${email.replace('@gmail.com', '')}!`);
      dispatch(
        setUser({
          email: loginData.user.email,
          token: loginData.access_token,
          role: loginData.user.role,
        }),
      );
      navigate('/');
    }
    if (isLoginError) {
      toast.error('User not found');
    }
  }, [isLoginSuccess, isLoginError]);

  return (
    <div className="bgmod h-screen flex items-center justify-center">
      <div className="bg-black  rounded-md flex flex-col gap-4 items-center px-10 py-2">
        <h2 className="font-Lalezar text-2xl pt-2">Sign in to continue</h2>
        <div className="relative group">
          <input
            className={`bg-black active:bg-black border-2 rounded-md outline-none px-3 py-1 text-slate-200 duration-300 group-focus-within:border-cyan-500 caret-cyan-500 `}
            name="email"
            autoComplete="off"
            value={email}
            onChange={handleChange}
          />
          <label
            className={`absolute capitalize py-1 left-4 transition duration-300 group-focus-within:text-cyan-500 pointer-events-none
        } ${email === '' ? '' : 'translate-y-[-55%] py-0  text-sm bg-black '}`}>
            Email
          </label>
        </div>
        <div className="relative group mt-2">
          <input
            className={`bg-black  py-1 border-2 rounded-md outline-none px-3 text-slate-200 duration-300 group-focus-within:border-cyan-500 caret-cyan-500`}
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
          />
          <label
            className={`absolute capitalize py-1 left-4 transition duration-150 group-focus-within:text-cyan-500 pointer-events-none
        } ${password === '' ? '' : 'translate-y-[-55%] py-0 text-sm bg-black'}`}>
            Password
          </label>
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1 group-focus-within:text-cyan-500 cursor-pointer">
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </div>
        </div>
        <Button onClick={handleLogin}>Login</Button>
        <div className="flex gap-2">
          <p>Don't have an account?</p>
          <Link to="/register" className="font-Lalezar text-xl hover:text-cyan-500 duration-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
