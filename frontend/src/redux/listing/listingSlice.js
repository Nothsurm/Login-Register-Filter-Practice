import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        allProducts: builder.query({
            query: () => '/api/listing/get'
        })
    }),
});

export const {
    useAllProductsQuery
} = apiSlice