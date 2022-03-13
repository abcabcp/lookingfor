import React from "react";
import dayjs from "dayjs";

import style from "assets/scss/style.module.scss";
import noimg from "assets/img/noimg.png";

const ImageView = ({ documents, inview }) => {
    return (
        <div className={style.imageList}>
            {documents.map((item, index) => (
                <div
                    className={style.imageItem}
                    key={index}
                    {...(documents.length - 1 === index ? { ref: inview } : {})}
                >
                    <a href={item.doc_url}>
                        <div className={style.imgArea}>
                            <img
                                src={
                                    item.thumbnail_url
                                        ? item.thumbnail_url
                                        : noimg
                                }
                                alt={item.title}
                                onError={(e) => (e.currentTarget.src = noimg)}
                            />
                        </div>
                        <div className={style.textArea}>
                            <h4>{item.display_sitename}</h4>
                            <ul>
                                <li>{item.collection}</li>
                                <li>
                                    {item.width}x{item.height}
                                </li>
                                <li>
                                    {dayjs(item.datetime).format(
                                        "YYYY-MM-DD hh:mm"
                                    )}
                                </li>
                            </ul>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

//검색결과가 없을 경우를 대비해 화면 출력에 사용되는 json-key에 대한 기본값을 정의해 둔다.
ImageView.defaultProps = {
    documents: [],
};

export default ImageView;
