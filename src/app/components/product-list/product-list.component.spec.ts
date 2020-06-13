import { Router } from '@angular/router';
import { HeaderComponent } from './../header/header.component';
import { BasketComponent } from './../basket/basket.component';
import { mockProductsService } from './../../../test-utils/mock';
import { ProductsService } from './../../services/products.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { Component, ViewChild } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { appState } from 'src/app/store/state';
import { NgxsModule } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-wrapper',
  template: `
    <app-header></app-header>
    <app-product-list></app-product-list>
  `
})
class WrapperStubComponent {
  @ViewChild(HeaderComponent) header;
  @ViewChild(ProductListComponent) plist;
}

describe('ProductListComponent', () => {
  let plist: ProductListComponent;
  let fixturePl: ComponentFixture<ProductListComponent>;
  let basket: BasketComponent;
  let fixtureB: ComponentFixture<BasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(appState),
        RouterTestingModule
      ],
      declarations: [
        WrapperStubComponent,
        HeaderComponent,
        ProductListComponent,
        ProductCardComponent,
        BasketComponent
      ],
      providers:[
        { provide: ProductsService, useValue: mockProductsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixturePl = TestBed.createComponent(ProductListComponent);
    plist = fixturePl.componentInstance;
    fixturePl.detectChanges();
  });

  it('should create', () => {
    expect(plist).toBeTruthy();
  });

  it('should get 5 products', () => {
    expect(plist.productsList.length).toEqual(5);
  });

});
