import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { KAKAO_APP_KEY } from 'key';

/** 비동기 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터.
export const getWebList = createAsyncThunk('WEB/GET_LIST', async (payload, { rejectWithValue }) => {
    let result = null;
    if (payload.query) {
        try {
            const apiUrl = 'https://dapi.kakao.com//v2/search/web';
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
export const webSlice = createSlice({
    name: 'web',
    initialState: {
        rt: null,
        rtmsg: null,
        item: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getWebList.pending]: (state, { payload }) => {
            return { ...state, loading: true };
        },
        [getWebList.fulfilled]: (state, { meta, payload }) => {
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
        [getWebList.rejected]: (state, { payload }) => {
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

//리듀서 객체 내보내기
export default webSlice.reducer;
