import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../services/authApi';
import { productsApi } from '../services/ProductsApi';
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
