import styled from 'styled-components';

const Card = styled.div`
    margin-left: 8px;
    margin-bottom: 8px;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 300px;
    padding: 8px;
    cursor: pointer;
`;

const Img = styled.img`
    width: 100%;
    border-radius: 4px;
`;
// before 646.1ms
// after 279.9ms
const ImageCard = ({ imgData, onClick }) => {
    // const { webformatURL, id } = imgData;
    const { webformatURL, id, previewURL } = imgData;

    return (
        <Card onClick={onClick} key={id}>
            <Img src={previewURL} width={319} height={213}></Img>
        </Card>
    );
};

export default ImageCard;
