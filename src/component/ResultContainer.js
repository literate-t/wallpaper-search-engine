import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';
import getImages from '../api/getImages';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({
    data,
    numberOfPages,
    onIncreaePage,
    onDecreaePage,
    page,
}) => {
    const [clickedImage, setClickedImage] = useState(null);

    const setImageInvalid = () => {
        setClickedImage(null);
    };

    return (
        <Container>
            {clickedImage && (
                <ImageModal
                    clickedImage={clickedImage}
                    setImageInvalid={setImageInvalid}
                />
            )}
            {data.hits?.length > 0 && (
                <Pagination
                    numberOfPages={numberOfPages}
                    onIncreaePage={onIncreaePage}
                    onDecreaePage={onDecreaePage}
                    page={page}
                />
            )}
            <ResultsWrapper>
                {data.hits?.map((imgData) => (
                    <ImageCard
                        key={imgData.id}
                        imgData={imgData}
                        onClick={() => {
                            setClickedImage(imgData);
                        }}
                    />
                ))}
                {data.hits?.length === 0 && <EmptyResult />}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
