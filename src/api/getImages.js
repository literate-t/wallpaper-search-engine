import callApi from './callApi';

const HOST_API_URL = 'https://pixabay.com/api';

const getImages = async () => {
    const result = await callApi(
        `${HOST_API_URL}/?key=${process.env.REACT_APP_PIXABAY}`
    );
    return result;
};

export default getImages;
