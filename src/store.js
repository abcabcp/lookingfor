import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { blogSlice } from 'slices/BlogSlice';
import { cafeSlice } from 'slices/CafeSlice';
import { imageSlice } from 'slices/ImageSlice';
import { webSlice } from 'slices/WebSlice';
import { bookSlice } from 'slices/BookSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        blog: blogSlice.reducer,
        cafe: cafeSlice.reducer,
        image: imageSlice.reducer,
        web: webSlice.reducer,
        book: bookSlice.reducer,
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), logger],
    devTools: true,
});

export default store;
