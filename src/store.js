import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { blogSlice } from "slices/BlogSlice";
import { cafeSlice } from "slices/CafeSlice";
import { imageSlice } from "slices/ImageSlice";
import { webSlice } from "slices/WebSlice";
import { bookSlice } from "slices/BookSlice";

const logger = createLogger();

const store = configureStore({
    reducer: {
        //개발자가 직접 작성한 reducer들이 명시되어야 한다.
        blog: blogSlice.reducer,
        cafe: cafeSlice.reducer,
        image: imageSlice.reducer,
        web: webSlice.reducer,
        book: bookSlice.reducer,
    },
    //미들웨어를 사용하지 않을 경우 이 라인 생략 가능 (redux-thunk 사용시 필수)
    middleware: [...getDefaultMiddleware({ serializableCheck: false }), logger],
    devTools: true,
});

export default store;
