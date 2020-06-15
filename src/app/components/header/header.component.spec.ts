import { EmptyBasket } from './../../store/actions/basket.actions';
import { mockProducts } from './../../../test-utils/mock';
import { ProductCardComponent } from './../product-card/product-card.component';
import { ProductsService } from './../../services/products.service';
import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { appState } from 'src/app/store/state';
import { NgxsModule, Store } from '@ngxs/store';
import { mockProductsService } from 'src/test-utils/mock';
import { Component } from '@angular/core';
import { BasketComponent } from '../basket/basket.component';

@Component({
  selector: 'app-wrapper',
  template: `
    <app-header></app-header>
    <app-product-card [product]=products[0]></app-product-card>
    <app-product-card [product]=products[1]></app-product-card>
  `,
})
class WrapperComponent {
  public products = mockProducts;
}

fdescribe('HeaderComponent', () => {
  let fixtureWrapper: ComponentFixture<WrapperComponent>;
  let fixtureHeader: ComponentFixture<HeaderComponent>;
  let fixtureCard: ComponentFixture<ProductCardComponent>;
  let fixtureBasket: ComponentFixture<BasketComponent>;
  let wrapper: WrapperComponent;
  let header: HeaderComponent;
  let card: ProductCardComponent;
  let basket: BasketComponent;

  let wrapperEl;
  let store: Store;

  let headerEl;
  let cardEl;
  let basket1El;
  let basket2El;
  let p1;
  let p2;
  let amount;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(appState)],
      providers:[
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      declarations: [
        WrapperComponent,
        HeaderComponent,
        ProductCardComponent,
        BasketComponent
      ]
    })
    .compileComponents();
  }));

  const beforeach = () => {
    fixtureWrapper = TestBed.createComponent(WrapperComponent);
    wrapper = fixtureWrapper.componentInstance;
    fixtureHeader = TestBed.createComponent(HeaderComponent);
    header = fixtureHeader.componentInstance;
    fixtureCard = TestBed.createComponent(ProductCardComponent);
    card = fixtureCard.componentInstance;
    fixtureBasket = TestBed.createComponent(BasketComponent);
    basket = fixtureBasket.componentInstance;
    store = TestBed.inject(Store);
    store.dispatch(new EmptyBasket());
    wrapperEl = fixtureWrapper.debugElement.nativeElement;
  };

  beforeEach(() => {
    beforeach();
  });

  it('should create', () => {
    expect(wrapper).toBeTruthy();
    expect(header).toBeTruthy();
    expect(card).toBeTruthy();
  });

  describe('After added 2 product1 and 1 product1, I will removing one product1 and than all, from the basket', () => {
    beforeEach(() => {
      beforeach();
    });

    const setProducts = () => {
      headerEl = wrapperEl.querySelector('.header');
      cardEl = wrapperEl.querySelectorAll('app-product-card');
      basket1El = cardEl[0].querySelector('.basket > div');
      basket2El = cardEl[1].querySelector('.basket > div');
      p1 = wrapper.products[0];
      p2 = wrapper.products[1];
      amount = 0;

      basket1El.click();
      basket1El.click();
      amount += p1.price * 2;

      basket2El.click();
      amount += p2.price;
      return amount;
    };

    it(`the total amount in the basket should be 2.55`, () => {
      setProducts();
      expect(store.selectSnapshot((state) => state.basket.amount)).toEqual(amount);
    });

    it(`the total amount in the basket should be 1.8`, () => {
      setProducts();
      headerEl.querySelectorAll('.header__act__remove')[1].click();
      headerEl.querySelectorAll('.header__boughts__list li')[0].click();
      console.log(store.selectSnapshot((state) => state.basket.amount));
      expect(store.selectSnapshot((state) => state.basket.amount)).toEqual(amount - p1.price);
    });

    it(`the total amount in the basket should be 0`, () => {
      setProducts();
      headerEl.querySelectorAll('.header__act__remove')[0].click()
      expect(store.selectSnapshot((state) => state.basket.amount)).toEqual(0);
    });

  });
});
