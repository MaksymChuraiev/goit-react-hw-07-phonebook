import { createSlice } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// // const { createSlice } = require('@reduxjs/toolkit');
// import storage from 'redux-persist/lib/storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  tagTypes: ['Contact'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6289fb49e5e5a9ad321f9bd3.mockapi.io/api/v1/',
  }),

  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => 'contacts',
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: body => ({
        url: 'contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    updateContact: builder.mutation({
      query: contact => ({
        url: `contacts/${contact.id}`,
        method: 'PUT',
        body: contact,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactApi;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    filter: '',
  },
  reducers: {
    addFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// const persistConfig = {
//   key: 'contacts',
//   storage,
// };

// export const contactsReducer = persistReducer(
//   persistConfig,
//   contactsSlice.reducer
// );

export const { addFilter } = contactsSlice.actions;
export const filterReducer = contactsSlice.reducer;

// export const getContacts = ({ contacts }) => contacts.items;
export const getFilter = state => state.filter.filter;
