import { Product } from '../state/basket.state';


export class AddProduct {
  static readonly type = '[Basket] add a product into the basket';
  constructor(public product: Product){}
}

export class RemoveProductFromBasket {
  static readonly type = '[Basket] remove a product from the basket';
  constructor(public index: number){}
}

export class EmptyBasket {
  static readonly type = '[Basket] empty the basket';
}
