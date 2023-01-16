import React from 'react';
import { FC } from 'react';
import { IProduct } from '../../models/Product.model';
import { useDeleteProductMutation } from '../../services/ProductsApi';

interface ProductProps {
  product: IProduct;
}

export const ProductItem: FC<ProductProps> = ({ product }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const userString = localStorage.getItem('user');
    const storedUser = JSON.parse(userString as string);
    const role = storedUser.role;
    if (role === 'admin') {
      setIsAdmin(true);
    }
  }, []);
  return (
    <React.Fragment key={product._id}>
      <div className="bg-zinc-900 w-[300px] flex flex-col rounded-md mb-5 px-2 shadow-sm text-white items-center cursor-pointer hover:shadow-cyan-500">
        <h2 className="flex font-bold text-lg">{product.name}</h2>
        <span className="text-lg">{product.price} $</span>

        <img
          className="w-[150px] mt-2 h-[120px] sm:w-[500px] sm:h-[280px] rounded-lg"
          src={product.image}
          alt="product image"
        />
        <div className="flex mt-2 px-2 gap-3 justify-center hover:animate-pulse">
          <div className="flex flex-col items-center   ">
            <span className="text-lg">{product.weight} kg</span>
            <p className="font-Lalezar">Net Weight</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg">{product.range} km</span>
            <p className="font-Lalezar">Max range</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg">{product.charge} h</span>
            <p className="font-Lalezar">Charging time</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
