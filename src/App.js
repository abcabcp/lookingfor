import React from 'react';
import GlobalStyles from 'GlobalStyles';
import { Routes, Route, useLocation } from 'react-router-dom';
import qs from 'qs';

import Meta from 'components/Meta';
import Top from 'components/Top';

import Main from 'page/Main';
import BlogPage from 'page/BlogPage';
import CafePage from 'page/CafePage';
import BookPage from 'page/BookPage';
import ImagePage from 'page/ImagePage';
import WebPage from 'page/WebPage';

import style from 'assets/scss/style.module.scss';

const App = () => {
    //top.js에서 클릭된 링크에 의해 전달되는 QueryString을 추출
    const { search } = useLocation();

    //추출괸 querystring을 json 객체로 파싱하고 key가 query인 값만 추출
    const { query } = qs.parse(search, { ignoreQueryPrefix: true });

    return (
        <div className={style.container}>
            <Meta />
            <GlobalStyles />
            <Top />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/blog" element={<BlogPage query={query} />} />
                <Route path="/cafe" element={<CafePage query={query} />} />
                <Route path="/book" element={<BookPage query={query} />} />
                <Route path="/image" element={<ImagePage query={query} />} />
                <Route path="/web" element={<WebPage query={query} />} />
            </Routes>
        </div>
    );
};

export default App;
