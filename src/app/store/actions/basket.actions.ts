import { Product } from '../state/basket.state';


export class AddProduct {
  static readonly type = '[Basket] add a product into the basket';
  constructor(public product: Product){}
}

export class RemoveProduct {
  static readonly type = '[Basket] remove a product into the basket';
  constructor(public product: Product){}
}
