import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProduct, RemoveProduct } from '../actions/basket.actions';

export interface Product {
  name: string;
  description: string;
  price: number;
}

export interface BasketState {
  total: number;
  products: Array<Product>;
}

@State<BasketState>({
  name: 'basket',
  defaults: {
    total: 0,
    products: []
  }
})

@Injectable()
export class Basket {

  @Action(AddProduct)
  addProduct({ patchState, getState, setState }: StateContext<BasketState>) {
    console.log();
  }

  @Action(RemoveProduct)
  removeProduct({ patchState, getState, setState }: StateContext<BasketState>) {
    console.log();
  }

}
