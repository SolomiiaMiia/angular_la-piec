import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {
  adminDiscount: Array<IDiscount> = []; 

  constructor(private discService: DiscountService) { }

  ngOnInit(): void {
    this.getStaticDiscounts()
  }

  private getStaticDiscounts(): void {
    this.adminDiscount = this.discService.discountsS;
    //присвоюємо adminDiscount об'єкт з discService.discountsS (з сервіса).
    //виводимо дані adminDiscount на сторінку
  }

}
