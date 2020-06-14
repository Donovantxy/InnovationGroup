import { EmptyBasket, RemoveProductFromBasket } from './../actions/basket.actions';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProduct, } from '../actions/basket.actions';

export interface Product {
  id: string|number;
  name: string;
  description: string;
  price: number;
  img?: string;
}

export interface BasketState {
  amount: number;
  boughts: Array<Product>;
}

@State<BasketState>({
  name: 'basket',
  defaults: {
    amount: 0,
    boughts: []
  }
})

@Injectable()
export class Basket {

  constructor(private store: Store) {}

  @Action(AddProduct)
  addProduct({ getState, setState }: StateContext<BasketState>, { product }: AddProduct) {
    const state = getState();
    setState({
      amount: state.amount + product.price,
      boughts: [...state.boughts, product]
    });
  }

  @Action(RemoveProductFromBasket)
  removeProductFromBasket({ setState, getState }: StateContext<BasketState>, { id }: RemoveProductFromBasket) {
    const { boughts: [...boughts], amount } = getState();
    const indexProd = boughts.findIndex(p => p.id === +id);
    const price = boughts[indexProd].price;
    boughts.splice(indexProd, 1);
    setState({
      amount: amount - price,
      boughts
    });
  }

  @Action(EmptyBasket)
  removeProduct({ setState }: StateContext<BasketState>) {
    setState({
      amount: 0,
      boughts: []
    });
  }

}
