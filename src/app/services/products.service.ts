import { Product } from 'src/app/store/state/basket.state';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface ResponseResource {
  product: Product;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getProducts(): Observable<any> {
    return this.http.get(environment.api.products)
    .pipe(map((prod: Product[]) => {
      prod.map(p => p.img = `id-${p.id}.jpg`);
      return prod;
    }));
  }

  getProduct(id: number|string): Observable<any> {
    return this.http.get(`${environment.api.products}/${id}`)
    .pipe(
      map((resp: ResponseResource) => {
        if (resp.success) {
          return {...resp.product, img: `id-${resp.product.id}.jpg`};
        }
        console.log(resp);
      }),
      catchError(err => {
        this.router.navigate(['/']);
        return err;
      })
    );
  }

}
