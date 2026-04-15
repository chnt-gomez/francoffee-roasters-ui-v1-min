export interface ItemResponse {
    items: RawItem[];
}

interface RawItem {
    _id: string;
    name: string;
    description: string;
    img_src: string;
    price: number;
    stock: number;
    available: boolean;
    onSale: boolean;
    removed: boolean;
    type: string;
    presentation: string;
    __v: number;
    createdAt: string;
    updatedAt: string;
}
