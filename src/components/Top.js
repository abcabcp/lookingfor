import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from 'assets/scss/top.module.scss';
import searchIcon from 'assets/img/search.png';

const Top = () => {
    const inputQuery = React.useRef();

    //검색어, 상태변수 => 기본값은 빈 문자열
    const [query, setQuery] = React.useState('');

    //페이지 강제 이동 함수 생성
    const navigate = useNavigate();

    //검색 폼에 대한 이벤트 핸들

    const handleSubmit = e => {
        e.preventDefault();

        const value = inputQuery.current.value;
        console.log(value);
        if (!value) {
            inputQuery.current.focus();
            alert('검색어를 입력하세요.');
            return;
        }

        //입력된 검색어를 상태변수에 등록
        setQuery(value);

        //웹 검색 페이지로 강제 이동
        navigate(`/web?query=${encodeURIComponent(value)}`);
    };
    return (
        <div>
            <div className={style.header}>
                <h1 className={style.title}>
                    <Link to="/">Looking for</Link>
                </h1>
                <form onSubmit={handleSubmit} className={style.form}>
                    <input type="search" name="query" ref={inputQuery} className={style.searchInput} />
                    <button type="submit" className={style.searchBtn}>
                        <img src={searchIcon} className={style.searchIcon} alt="검색" />
                    </button>
                </form>
            </div>

            <nav className={style.navContainer}>
                <NavLink to={`/web?query=${encodeURIComponent(query)}`} className={style.menuLink}>WEB</NavLink>
                <NavLink to={`/image?query=${encodeURIComponent(query)}`} className={style.menuLink}>IMAGE</NavLink>
                <NavLink to={`/blog?query=${encodeURIComponent(query)}`}className={style.menuLink}>BLOG</NavLink>
                <NavLink to={`/cafe?query=${encodeURIComponent(query)}`}className={style.menuLink}>CAFE</NavLink>
                <NavLink to={`/book?query=${encodeURIComponent(query)}`}className={style.menuLink}>BOOK</NavLink>
            </nav>
        </div>
    );
};

export default Top;
