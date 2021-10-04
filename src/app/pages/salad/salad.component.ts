import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-salad',
  templateUrl: './salad.component.html',
  styleUrls: ['./salad.component.scss']
})
export class SaladComponent implements OnInit {
  productSalad: Array<IProducts> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProductSalad()
  }

  private getProductSalad(): void {
    this.apiService.getJSONCategoryProducts('salad').subscribe( //якщо прийшла data тоді=>
      data => {
        this.productSalad = data;
        console.log(this.productSalad); //має приходити тільки піца
      },
      err => console.log(err)
    );
  }

}
