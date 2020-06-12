import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/store/state/basket.state';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.product);
  }

}
