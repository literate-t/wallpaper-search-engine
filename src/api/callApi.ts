import { IGetImagesResponse } from '../types';
const callApi = async (url: string) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data: IGetImagesResponse = await response.json();
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

export default callApi;
