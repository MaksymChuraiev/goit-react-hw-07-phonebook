import { configureStore } from '@reduxjs/toolkit';
import { contactApi, filterReducer } from './contactSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
// import { contactsReducer } from './contactSlice';
// import {
//   persistStore,
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from 'redux-persist';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactApi.middleware,
  ],
  // middleware(getDefaultMiddleware) {
  //   return getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   });
  // },
});

setupListeners(store.dispatch);

// export const persistor = persistStore(store);
