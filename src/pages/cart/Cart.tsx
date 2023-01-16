import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { selectAuth } from '../../features/authSlice';
import { removeFromCart } from '../../features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const Cart: FC = () => {
  const { email } = useAppSelector(selectAuth);

  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const totalPrice = items.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="h-screen flex items-center justify-center">
      {email ? (
        <div className="flex flex-col gap-2 h-screen items-center justify-center">
          <div className="flex flex-col gap-3 items-end">
            {items.length ? (
              items.map((product) => (
                <div
                  className="flex justify-between border-b hover:border-cyan-500 w-80 px-2"
                  key={product._id}>
                  <div>
                    <div className="text-lg">{product.name}</div>
                    <div className="text-lg">{product.price} $</div>
                  </div>
                  <button
                    className="hover:animate-pulse text-red-600"
                    onClick={() => dispatch(removeFromCart(product._id))}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center text-2xl">
                <div>Cart is Empty</div>
                <Link className="animate-pulse" to={'/'}>
                  to Products
                </Link>
              </div>
            )}
          </div>
          <p className="uppercase text-lg">total: {totalPrice} $</p>
        </div>
      ) : (
        <>
          <Link className="text-2xl animate-pulse" to="/auth">
            Login to continue
          </Link>
        </>
      )}
    </div>
  );
};
