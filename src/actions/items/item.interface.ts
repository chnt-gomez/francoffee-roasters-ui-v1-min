// The Item should remove the removed, __v, createdAt, updatedAt attributes. We should mask the _id atribute to itemId

export interface Item {
  itemId: string;
  name: string;
  description: string;
  img_src: string;
  price: number;
  stock: number;
  available: boolean;
  onSale: boolean;
  type: string;
  presentation: string;
}
