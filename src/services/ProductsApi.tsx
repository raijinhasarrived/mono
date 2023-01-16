import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IProduct, IProductData } from '../models/Product.model';
import { useAppSelector } from '../redux/hooks';

const userString = localStorage.getItem('user');
const storedUser = JSON.parse(userString as string);
const token = storedUser?.token;

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://mbx-raijinhasarrived.vercel.app/api/' }),
  endpoints: (builder) => ({
    products: builder.query<IProduct[], void>({
      query: () => '/products',
    }),
    product: builder.query<IProduct, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    createProduct: builder.mutation<IProductData, IProduct>({
      query: (body) => ({
        url: `/products`,
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApi;
