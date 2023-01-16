import React from 'react';

import { useCreateProductMutation } from '../../services/ProductsApi';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
  name: string;
  description: string;
  price: number;
  weight: number;
  load: number;
  range: number;
  charge: number;
  battery: number;
  image: string;
  category: string;
}

export const CreateProduct: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const [createProduct, { isSuccess, error }] = useCreateProductMutation();

  const handleCreateProduct: SubmitHandler<FieldValues> = async (formValues) => {
    const { name, description, price, weight, load, range, charge, battery, image, category } =
      formValues;
    await createProduct({
      name,
      description,
      price,
      weight,
      load,
      range,
      charge,
      battery,
      image,
      category,
    });
    if (isSuccess) {
      console.log('succes');
    } else if (error) {
      console.log('error');
    }
  };

  return (
    <div className="h-screen py-4">
      <form
        onSubmit={handleSubmit(handleCreateProduct)}
        className="flex flex-col items-center justify-between gap-3 text-black">
        <div className="flex gap-2">
          <label className="text-white" htmlFor="name">
            Name:
          </label>
          <input {...register('name')} type="text" placeholder="product name" />
        </div>
        <div className="flex gap-2">
          <label className="text-white" htmlFor="description">
            Description:
          </label>
          <input {...register('description')} type="text" placeholder="product description" />
        </div>

        <div className="flex gap-2">
          <label className="text-white" htmlFor="price">
            Price:
          </label>
          <input {...register('price')} type="text" placeholder="product Price" />
        </div>

        <div className="flex gap-2">
          <label className="text-white" htmlFor="weight">
            Weight:
          </label>
          <input {...register('weight')} type="text" placeholder="product weight" />
        </div>
        <div className="flex gap-2">
          <label className="text-white" htmlFor="load">
            Load:
          </label>
          <input {...register('load')} type="text" placeholder="product load" />
        </div>

        <div className="flex gap-2">
          <label className="text-white" htmlFor="range">
            Range:
          </label>
          <input {...register('range')} type="text" placeholder="product range" />
        </div>
        <div className="flex gap-2">
          <label className="text-white" htmlFor="charge">
            Charge:
          </label>
          <input {...register('charge')} type="text" placeholder="product charge" />
        </div>
        <div className="flex gap-2">
          <label className="text-white" htmlFor="battery">
            Battery:
          </label>
          <input {...register('battery')} type="text" placeholder="product battery" />
        </div>
        <div className="flex gap-2">
          <label className="text-white" htmlFor="image">
            Image:
          </label>
          <input {...register('image')} type="text" placeholder="product image" />
        </div>

        <div className="flex gap-2">
          <label className="text-white" htmlFor="category">
            Category:
          </label>
          <input {...register('category')} type="text" placeholder="product category" />
        </div>
        <button className="text-white" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};
