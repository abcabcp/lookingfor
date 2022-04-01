import React from 'react';
import dayjs from 'dayjs';
import style from 'assets/scss/style.module.scss';
import noimg from 'assets/img/noimg.png';

/**
 * 검색 결과와 썸네일 표시 여부를 전달받아 화면에 목록을 출력하는 컴포넌트
 * @param documents - 검색결과 배열
 * @param thumb - 썸네일 이미지 표시 여부
 * @return
 */

const ListView = ({ documents, thumb, inview }) => {
    return (
        <ul className={style.mediaList}>
            {/** 검색 결과에 대한 반복문 수행 */}
            {documents?.length > 0 ? (
                documents.map((item, index) => (
                    <li className={style.mediaItem} key={index} {...(documents.length - 1 === index ? { ref: inview } : {})}>
                        <a href={item.url} target="_blank" rel="noreferrer" className={thumb && style.thumbnail}>
                            {thumb && (
                                <img
                                    src={item.thumbnail ? item.thumbnail : noimg}
                                    onError={e => (e.currentTarget.src = noimg)}
                                    alt={item.title}
                                />
                            )}
                            <h2 className={style.mediaHeading} dangerouslySetInnerHTML={{ __html: item.title }} />
                            <p
                                className={style.desc}
                                dangerouslySetInnerHTML={{
                                    __html: item.contents,
                                }}
                            />

                            {item.price && (
                                <p className={style.price}>
                                    정가: <span>{item.price}원 </span>
                                    판매가: <span>{item.sale_price}원</span>
                                </p>
                            )}

                            <p className={style.date}>
                                {item.authors && (
                                    <span>
                                        <strong>{item.authors.join(',')}</strong>
                                    </span>
                                )}
                                {item.publishers && (
                                    <span>
                                        <strong>{item.publishers}</strong>
                                    </span>
                                )}
                                {item.cafename && (
                                    <span>
                                        <strong>{item.cafename}</strong>
                                    </span>
                                )}
                                {item.blogname && (
                                    <span>
                                        <strong>{item.blogname}</strong>
                                    </span>
                                )}
                                {item.datetime && (
                                    <span>
                                        <strong>{dayjs(item.datetime).format('YYYY-MM-DD hh:mm')}</strong>
                                    </span>
                                )}
                            </p>
                        </a>
                    </li>
                ))
            ) : (
                <div>검색 결과가 없습니다.</div>
            )}
        </ul>
    );
};

export default ListView;
