import { IParamObj } from '../types';
import callApi from './callApi';

const HOST_API_URL = 'https://pixabay.com/api';

const defaultParam = {
    key: process.env.REACT_APP_PIXABAY!,
    //key: process.env.REACT_APP_PIXABA || '',
};

const getImages = async (paramObj: IParamObj) => {
    const mergedObj = { ...defaultParam, ...paramObj };
    const params = new URLSearchParams(mergedObj).toString();
    const result = await callApi(`${HOST_API_URL}/?${params}`);
    return result;
};

export default getImages;
