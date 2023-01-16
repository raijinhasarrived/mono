import { Link } from 'react-router-dom';
import { useProductsQuery } from '../../services/ProductsApi';
import { ProductItem } from './ProductItem';

import { Skeleton } from '../Skeleton/Skeleton';

export const ProductsContainer = () => {
  const { data, error, isLoading, isSuccess } = useProductsQuery();
  console.log(data);
  return (
    <div className="h-full  flex items-center justify-center">
      {isLoading && <Skeleton />}
      {error && <h2>Something went wrong!</h2>}

      {isSuccess && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
            {data &&
              data.map((product) => (
                <Link to={`products/${product._id}`} key={product._id}>
                  {product.category === 'Unicycle' ? <ProductItem product={product} /> : ''}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
