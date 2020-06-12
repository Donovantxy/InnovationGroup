import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProduct, RemoveProduct } from '../actions/basket.actions';

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

  @Action(AddProduct)
  addProduct({ patchState, getState, setState }: StateContext<BasketState>, { product }: AddProduct) {
    const state = getState();
    setState({
      amount: state.amount + product.price,
      products: [...state.products, product]
    });
  }

  @Action(RemoveProduct)
  removeProduct({ patchState, getState, setState }: StateContext<BasketState>) {
    console.log(getState());
  }

}
