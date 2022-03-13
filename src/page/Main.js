import React from 'react';
import style from 'assets/scss/style.module.scss';
import sea from 'assets/img/sea.gif';

const Main = () => {
    return (
        <div className={style.main}>
            <img src={sea} alt="을왕리바다" className={style.sea} />
        </div>
    );
};

export default Main;
