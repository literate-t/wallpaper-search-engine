export interface IGetImagesResponse {
    total: number;
    totalHits: number;
    hits: IImage[];
}

export interface IImage {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    collections: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
}

export type OrientationType = 'all' | 'horizontal' | 'vertical';
export type OrderType = 'popular' | 'latest';

export type DataRequestType = {
    orientation: OrientationType;
    order: OrderType;
    page: number;
    per_page: number;
};

export interface IParamObj {
    q: string;
    orientation: OrientationType;
    order: OrderType;
    per_page: string;
    page: string;
}
