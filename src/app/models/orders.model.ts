import { Product } from "./product.model";


export interface Orders {
  id: number;
  date: Date;
  product: Product;
  quantity: number;
  total: number;
}
