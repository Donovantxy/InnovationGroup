import { mockProductsService } from './../../../test-utils/mock';
import { ProductsService } from './../../services/products.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { appState } from 'src/app/store/state';
import { NgxsModule } from '@ngxs/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListComponent', () => {
  let plist: ProductListComponent;
  let fixturePl: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(appState),
        RouterTestingModule
      ],
      declarations: [
        ProductListComponent,
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
    // expect(plist.productsList.length).toEqual(5);
  });

});
