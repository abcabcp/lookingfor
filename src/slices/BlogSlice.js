import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { KAKAO_APP_KEY } from 'key';

/** 비동기 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터.
export const getBlogList = createAsyncThunk('BLOG/GET_LIST', async (payload, { rejectWithValue }) => {
    let result = null;
    if (payload.query) {
        try {
            const apiUrl = 'https://dapi.kakao.com//v2/search/blog';
            result = await axios.get(apiUrl, {
                params: {
                    query: payload.query,
                    page: payload.page,
                    size: 20,
                },
                headers: {
                    Authorization: KAKAO_APP_KEY,
                },
            });
        } catch (e) {
            result = rejectWithValue(e.response);
        }
    }
    return result;
});

/** Slice 정의 (Action 함수 + Reducer의 개념) */
export const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        rt: null,
        rtmsg: null,
        item: [],
        loading: false,
    },
    //내부 action 및 동기 action (Ajax 처리시에는 사용하지 않음)
    reducers: {},
    extraReducers: {
        [getBlogList.pending]: (state, { payload }) => {
            return { ...state, loading: true };
        },
        [getBlogList.fulfilled]: (state, { meta, payload }) => {
            if (meta.arg.page > 1) {
                payload.data.documents = state.item.documents.concat(payload.data.documents);
            }
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false,
            };
        },
        [getBlogList.rejected]: (state, { payload }) => {
            return {
                ...state,
                rt: payload?.status ? payload.status : '500',
                rtmsg: payload?.statusText ? payload.statusText : 'Server Error',
                item: payload.data,
                loading: false,
            };
        },
    },
});

export default blogSlice.reducer;
