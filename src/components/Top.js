import React from 'react';
import styled from "styled-components";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from 'assets/scss/top.module.scss';
import searchIcon from 'assets/img/search.png';

const MenuLink = styled(NavLink)`
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    color: #222;
    line-height: 34px;

    &:hover {
        color: #f76b8a;
    }

    &:after {
        content: "|";
        display: inline-block;
        padding: 0 7px;
        color: #ccc;
    }

    &:last-child {
        &:after {
            color: #fff;
        }
    }

    &.active {
        color: #f76b8a;
        &:after {
            border-bottom: 4px solid #fff !important;
        }
    }
`;

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
                <MenuLink to={`/web?query=${encodeURIComponent(query)}`} className={style.menuLink}>WEB</MenuLink>
                <MenuLink to={`/image?query=${encodeURIComponent(query)}`} className={style.menuLink}>IMAGE</MenuLink>
                <MenuLink to={`/blog?query=${encodeURIComponent(query)}`}className={style.menuLink}>BLOG</MenuLink>
                <MenuLink to={`/cafe?query=${encodeURIComponent(query)}`}className={style.menuLink}>CAFE</MenuLink>
                <MenuLink to={`/book?query=${encodeURIComponent(query)}`}className={style.menuLink}>BOOK</MenuLink>
            </nav>
        </div>
    );
};

export default Top;
