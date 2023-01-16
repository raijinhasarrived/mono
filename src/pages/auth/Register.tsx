import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button/Button';
import { useRegisterUserMutation } from '../../services/authApi';

const initialState = {
  email: '',
  password: '',
};

export const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const navigate = useNavigate();
  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (email && password) {
      await registerUser({ email, password, role: 'customer' });
    } else {
      toast.error('Please fill all inputs');
    }
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success('Account created, Login now');
      navigate('/auth');
      console.log(registerData);
    }
    if (isRegisterError) {
      toast.error(`User with ${registerError?.data?.message}`);
    }
  }, [isRegisterSuccess, isRegisterError]);

  return (
    <div className="bgmod h-screen flex items-center justify-center">
      <div className="bg-black  rounded-md flex flex-col gap-4 items-center px-10 py-2">
        <h2 className="font-Lalezar text-2xl pt-2">Sign up to continue</h2>
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
            type="password"
            value={password}
            onChange={handleChange}
          />
          <label
            className={`absolute capitalize py-1 left-4 transition duration-150 group-focus-within:text-cyan-500 pointer-events-none
        } ${password === '' ? '' : 'translate-y-[-55%] py-0 text-sm bg-black'}`}>
            Password
          </label>
        </div>
        <input className="hidden" type="text" value="customer" onChange={handleChange} />
        <Button onClick={handleRegister}>Sign up</Button>
        <div className="flex gap-2">
          <p>Already have an account?</p>
          <Link to="/auth" className="font-Lalezar text-xl hover:text-cyan-500 duration-300">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
