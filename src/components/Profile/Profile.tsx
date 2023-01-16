import React from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout, selectAuth } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const paths = [
  {
    name: 'Cart',
    route: '/cart',
    icon: (
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
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
    ),
  },
  {
    name: 'Products',
    route: '/',
    icon: (
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
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },

  {
    name: 'Overview',
    route: '/overview',
    icon: (
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
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
];

export const Profile: FC = () => {
  const [open, setOpen] = React.useState(false);
  const { email } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    toast.success(`${email?.replace('@gmail.com', '')} hope to see you soon`);
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div className="fixed uppercase tracking-widest">
      <div
        className={`absolute bg-transparent pr-2 transition  ease-out duration-700 flex flex-col text-slate-200 
       ${open ? 'bgnav' : '-translate-y-[190px]'}`}>
        {email ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h2 className="text-xl text-cyan-500">{email?.replace('@gmail.com', '')}</h2>
            </div>
            <div className="flex gap-2 items-center hover:text-rose-500">
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              <button onClick={() => handleLogout()} className="text-xl uppercase tracking-wide">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            className="text-xl flex gap-2 items-center mt-[35px] hover:text-cyan-500"
            to="/auth">
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
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Login
          </Link>
        )}

        <div className="flex flex-col gap-3 text-xl py-2 border-b-2 border-cyan-500">
          {paths.map((path) => {
            return (
              <Link
                className="flex gap-2  items-center hover:text-cyan-500"
                key={path.name}
                to={path.route}>
                {path.icon}
                {path.name}
              </Link>
            );
          })}
        </div>
        <button className="mt-2" onClick={() => setOpen((prev) => !prev)}>
          <div className="text-white group flex flex-col gap-1 items-center w-[25px] h-[25px]  cursor-pointer">
            <span
              className={`w-6 h-[3px] group-hover:bg-cyan-500 bg-white transition-transform duration-300 ${
                open ? 'rotate-45 translate-y-[7px] bg-red-700 group-hover:bg-rose-500' : ''
              }`}></span>
            <span
              className={`w-6 h-[3px] group-hover:bg-cyan-500 bg-white transition-transform duration-300 ${
                open ? '-rotate-45 bg-red-700 group-hover:bg-rose-500' : ''
              }`}></span>
          </div>
        </button>
      </div>
    </div>
  );
};
