import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getImageList } from 'slices/ImageSlice';
import ImageView from 'components/ImageView';
import { Hearts } from 'react-loader-spinner';
import { useInView } from 'react-intersection-observer';

const BookPage = ({ query }) => {
    const [page, setPage] = useState(1);

    //무한 스크롤 관련
    const [ref, inView] = useInView();
    //리덕스 스토어에 저장되어 있는 상태값 받기
    const { rt, rtmsg, item, loading } = useSelector(state => state.image);

    //액션함수를 호출하기 위한 디스패치 함수 생성
    const dispatch = useDispatch();

    useEffect(() => {
        setPage(1);
    }, [query]);

    useEffect(() => {
        dispatch(getImageList({ query: query, page: page }));
    }, [query]);

    useEffect(() => {
        if (!loading) {
            dispatch(getImageList({ query: query, page: page }));
        }
    }, [dispatch, page]);

    useEffect(() => {
        if (inView && !loading) {
            setPage(page + 1);
        }
    }, [inView]);

    return (
        <div>
            {loading && (
                <Hearts
                    color="#f76b8a"
                    height={100}
                    width={100}
                    wrapperStyle={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-50px',
                        marginTop: '-50px',
                    }}
                />
            )}

            {rt !== 200 && loading === false && (
                <>
                    <div>{rt}</div>
                    <div>{rtmsg}</div>
                </>
            )}

            {/**결과값이 실패한 경우 에러메시지 표시, 성공인 경우 목록 컴포넌트 호출 */}
            {rt === 200 && <ImageView documents={item.documents} thumb={true} inview={ref} rt={rt} rtmsg={rtmsg} />}
        </div>
    );
};

export default BookPage;
