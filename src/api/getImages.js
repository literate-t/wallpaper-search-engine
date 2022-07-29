import callApi from './callApi';

const HOST_API_URL = 'https://pixabay.com/api';

const defaultParamObj = {
    key: process.env.REACT_APP_PIXABAY,
};

const getImages = async (paramObj) => {
    const mergedObj = { ...defaultParamObj, ...paramObj };
    const params = new URLSearchParams(mergedObj).toString();
    const result = await callApi(`${HOST_API_URL}/?${params}`);
    return result;
};

export default getImages;
