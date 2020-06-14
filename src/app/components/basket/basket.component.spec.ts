import { BasketState } from './../../store/state/basket.state';
import { EmptyBasket } from './../../store/actions/basket.actions';
import { mockProducts } from './../../../test-utils/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { appState } from 'src/app/store/state';
import { NgxsModule, Store } from '@ngxs/store';
import { Basket } from 'src/app/store/state/basket.state';


describe('BasketComponent', () => {
  let component: BasketComponent;
  let element;
  let fixture: ComponentFixture<BasketComponent>;
  let spyOnAddProductToTheBasket;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(appState)],
      declarations: [ BasketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    spyOnAddProductToTheBasket = spyOn(component, 'addProductToTheBasket').and.callThrough();
    element = fixture.debugElement.nativeElement.querySelector('.basket > div');
    store = TestBed.inject(Store);
    fixture.detectChanges();
    store.dispatch(new EmptyBasket());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`Clicking once or several times on the same or same product should update the amount`, () => {

    it(`on ${mockProducts[0].name} with the price of £${mockProducts[0].price}, the amount should be ${mockProducts[0].price}`, () => {
      component.product = mockProducts[0];
      element.click();
      expect(component.addProductToTheBasket).toHaveBeenCalled();
      expect(store.selectSnapshot((state) => state.basket.amount)).toEqual(mockProducts[0].price);
    });

    it(`twice on ${mockProducts[0].name} with the price of £${mockProducts[0].price},
        the amount shold be ${mockProducts[0].price * 2}`, () => {
      component.product = mockProducts[0];
      element.click();
      element.click();
      expect(component.addProductToTheBasket).toHaveBeenCalled();
      expect(store.selectSnapshot((state) => state.basket.amount)).toEqual(mockProducts[0].price * 2);
    });

    it(`once on ${mockProducts[0].name} with the price of £${mockProducts[0].price},
        twice on ${mockProducts[1].name} with the price of £${mockProducts[1].price},
        once on ${mockProducts[2].name} with the price of £${mockProducts[2].price},
        once on ${mockProducts[3].name} with the price of £${mockProducts[3].price},
        once on ${mockProducts[4].name} with the price of £${mockProducts[4].price},
        the amount shold be ${mockProducts[0].price + 2 * mockProducts[1].price + mockProducts[2].price
        + mockProducts[3].price + mockProducts[4].price}`, () => {

      component.product = mockProducts[0];
      element.click();
      let amount = component.product.price;

      component.product = mockProducts[1];
      element.click();
      element.click();
      amount += component.product.price * 2;

      component.product = mockProducts[2];
      element.click();
      amount += component.product.price;

      component.product = mockProducts[3];
      element.click();
      amount += component.product.price;

      component.product = mockProducts[4];
      element.click();
      amount += component.product.price;

      expect(component.addProductToTheBasket).toHaveBeenCalled();
      expect(store.selectSnapshot((state) => state.basket.amount)).toEqual(amount);
    });

  });


});
