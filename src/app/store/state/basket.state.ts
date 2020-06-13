import { EmptyBasket } from './../actions/basket.actions';
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
  products: Array<Product>;
}

@State<BasketState>({
  name: 'basket',
  defaults: {
    amount: 0,
    products: []
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
      products: [...state.products, product]
    });
  }

  @Action(EmptyBasket)
  removeProduct({ setState }: StateContext<EmptyBasket>) {
    setState({
      amount: 0,
      products: []
    });
  }

}
