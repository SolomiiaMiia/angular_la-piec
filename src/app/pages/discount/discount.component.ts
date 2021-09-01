import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  discount: Array<IDiscount> = [];

  constructor(private discService: DiscountService) { }

  ngOnInit(): void {
    this.getServerJDiscounts();
  }


  private getServerJDiscounts(): void {
    this.discService.getJSONDiscountsS().subscribe(
      data => {
        this.discount = data;
      },
      err => console.log(err)
    );
  }

  // блабла

  // private getStaticDiscounts(): void {
  //   this.discount = this.discService.getDiscountsS();
  //   //присвоюємо adminDiscount об'єкт з discService.discountsS (з сервіса).
  //   //виводимо дані adminDiscount на сторінку
  // }

}
