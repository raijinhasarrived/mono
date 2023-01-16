import { ProductsContainer } from '../../components/Products/ProductsContainer';

export const Home = () => {
  return (
    <div className="h-full">
      <div className="flex justify-center  pt-8">
        <ProductsContainer />
      </div>
    </div>
  );
};
