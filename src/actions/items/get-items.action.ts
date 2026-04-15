import axios from 'axios';
import type { Item } from './item.interface';
import type { ItemResponse } from './item.response';

export const getItems = async (query: string): Promise<Item[]> => {
    const response = await axios.get<ItemResponse>('http://localhost:8080/items', {
        params: {
            q: query,
            limit: 15,
        }
    });

    return response.data.items.map(({ _id, ...rest }) => ({
        itemId: _id,
        ...rest,
    }));
}