import styled from 'styled-components';
import React, { useState, Suspense } from 'react';
import ImageCard from './ImageCard';
import { IGetImagesResponse, IImage } from '../../types';
const ImageModal = React.lazy(() => import('./ImageModal'));

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

interface IDataPropsType {
    data: IGetImagesResponse;
}

const ImageContainer = ({ data }: IDataPropsType) => {
    const [clickedImage, setClickedImage] = useState<IImage | null>(null);

    const setImageInvalid = () => {
        setClickedImage(null);
    };

    return (
        <Container>
            {clickedImage && (
                <Suspense fallback={<h1>로딩 중</h1>}>
                    <ImageModal
                        clickedImage={clickedImage}
                        setImageInvalid={setImageInvalid}
                    />
                </Suspense>
            )}
            <ResultsWrapper>
                {data.hits?.map((imgData, index) => (
                    <ImageCard
                        key={imgData.id + `${index}`}
                        imgData={imgData}
                        onClick={() => {
                            setClickedImage(imgData);
                        }}
                    />
                ))}
            </ResultsWrapper>
        </Container>
    );
};

export default ImageContainer;
