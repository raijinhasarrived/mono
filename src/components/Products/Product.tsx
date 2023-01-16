import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import { IProduct } from '../../models/Product.model';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { useDeleteProductMutation, useProductQuery } from '../../services/ProductsApi';

export const Product = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [deleteProduct, { isSuccess: success, isLoading: loading, error: err }] =
    useDeleteProductMutation();
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const {
    data: product,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useProductQuery(id as string);

  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const isInCart = items.some((item) => item._id === id);

  const removeProduct = () => {
    dispatch(removeFromCart(product?._id as string));
  };
  const addProduct = () => {
    dispatch(addToCart(product as IProduct));
  };
  const handleDelete = async (id: any) => {
    await deleteProduct(id);
    if (success) {
      navigate('/');
      toast.success('Product deleted');
      console.log(`Product with id:${id} successfully deleted`);
    } else if (loading) {
      toast.info('Deleting in proccess');
    } else if (err) {
      toast.error('Deleting failed');
    }
  };

  React.useEffect(() => {
    const userString = localStorage.getItem('user');
    const storedUser = JSON.parse(userString as string);
    const role: string | null = storedUser.role;
    if (role === 'admin') {
      setIsAdmin(true);
    } else if (!role) {
      setIsAdmin(false);
    }
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">Loading...</div>
      ) : isFetching ? (
        <div className="flex items-center justify-center h-screen">Loading...</div>
      ) : isSuccess ? (
        <div
          className="flex flex-col gap-2 sm:flex-row items-center justify-center h-screen py-3"
          key={product?._id}>
          <div className="flex flex-col items-center gap-3">
            <h2 className="md:text-xl lg:text-lg xl:text-xl font-semibold">{product?.name}</h2>
            <h2 className="text-lg sm:">{product?.price} $</h2>
            <img
              className="w-[150px] object-cover h-[150px] lg:w-80 lg:h-80 xl:w-80 xl:h-80 md:w-60 md:h-60"
              src={product?.image}
              alt="Unicycle image"
            />
          </div>
          <div className="ml-4 flex flex-col">
            <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 gap-3 text-lg">
              <div className="flex flex-col items-center">
                <span className="md:text-xl lg:text-lg xl:text-xl font-semibold">
                  {product?.weight} kg
                </span>
                <h4>Net Weight</h4>
              </div>
              <div className="flex flex-col items-center">
                <span className="md:text-xl lg:text-lg xl:text-xl font-semibold">
                  {product.range} km
                </span>
                <h4>Max Range</h4>
              </div>
              <div className="flex flex-col items-center">
                <span className="md:text-xl lg:text-lg xl:text-xl font-semibold">
                  {product.load} kg
                </span>
                <h4 className="md:text-xl lg:text-lg xl:text-xl">Maximum Load</h4>
              </div>
              <div className="flex flex-col items-center">
                <span className="md:text-xl lg:text-lg xl:text-xl font-semibold">
                  {product.battery} wh
                </span>
                <h4 className="md:text-xl lg:text-lg xl:text-xl">Battery Capacity</h4>
              </div>
              <div className="flex flex-col items-center">
                <span className="md:text-xl lg:text-lg xl:text-xl font-semibold">
                  {product.charge} h
                </span>
                <h4 className="md:text-xl lg:text-lg xl:text-xl">Charging Time</h4>
              </div>
              <button
                onClick={() => (isInCart ? removeProduct() : addProduct())}
                className="border active:bg-cyan-500 active:text-white hover:border-cyan-500 hover:text-cyan-500">
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              {isAdmin ? <button onClick={() => handleDelete(product._id)}>Delete</button> : ''}
            </div>
            <p className="xl:max-w-[450px] hidden xl:visible text-md mt-3">{product.description}</p>
          </div>
        </div>
      ) : isError ? (
        <div>Missing product!</div>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};
