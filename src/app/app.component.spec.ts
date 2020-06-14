import { mockProductsService } from './../test-utils/mock';
import { ProductsService } from './services/products.service';
import { BasketComponent } from './components/basket/basket.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderComponent } from './components/header/header.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { appState } from './store/state';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductComponent } from './components/product/product.component';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fixturePl: ComponentFixture<ProductListComponent>;
  let pl: ProductListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(appState),
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        ProductListComponent,
        ProductCardComponent,
        BasketComponent
      ],
      providers:[
        { provide: ProductsService, useValue: mockProductsService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

});
