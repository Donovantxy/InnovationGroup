import { Product } from 'src/app/store/state/basket.state';
import { map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { fruis } from '../store/data';

interface ResponseResource {
  product: Product;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  sortedProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private products: Product[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getProducts(): Observable<any> {
    // return this.http.get(environment.api.products)
    if (!this.products) {
      return of(fruis)
      .pipe(map((prods: Product[]) => {
        this.products = prods;
        prods.map(p => p.img = `id-${p.id}.jpg`);
        this.sortProducts('name');
        return prods;
      }));
    }
    return of(this.products);
  }

  getProduct(id: number|string): Observable<any> {
    // return this.http.get(`${environment.api.products}/${id}`)
    return of({
      product: fruis.find(fr => fr.id === +id),
      success: true,
    })
    .pipe(
      tap(console.log),
      map((resp: ResponseResource) => {
        if (resp.success) {
          return {...resp.product, img: `id-${resp.product.id}.jpg`};
        }
      }),
      catchError(err => {
        this.router.navigate(['/']);
        return err;
      })
    );
  }

  sortProducts(attr: string) {
    this.products.sort((a, b) => a[attr] > b[attr] ? 1 : -1 );
    this.sortedProducts$.next(this.products);
  }



}
