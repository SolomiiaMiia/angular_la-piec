import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { Discount } from 'src/app/shared/models/discount.model';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {
  adminDiscount: Array<IDiscount> = [];
  itemID: number = 1;
  itemTitle: string = '';
  itemUrlName: string = '';
  itemDescription: string = '';
  itemImage = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';

  constructor(private discService: DiscountService) { }

  ngOnInit(): void {
    this.getStaticDiscounts()
  }

  private getStaticDiscounts(): void {
    this.adminDiscount = this.discService.getDiscountsS();
    //присвоюємо adminDiscount об'єкт з discService.discountsS (з сервіса).
    //виводимо дані adminDiscount на сторінку
  }

  addItem(): void {
    const NEW_ITEM = new Discount(this.itemID, this.itemTitle, this.itemUrlName, this.itemDescription, this.itemImage);
    if (this.adminDiscount.length > 0) {
      NEW_ITEM.id = this.adminDiscount.slice(-1)[0].id + 1;
      // slice повертає масив з останнім елементом [0],
      // доступаюсь до останнього елемента, до id i + 1;
      this.discService.setDiscountsS(NEW_ITEM);
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.itemID = 1;
    this.itemTitle = '';
    this.itemUrlName = '';
    this.itemDescription = '';
  }
  editDiscount() { }

  deleteDiscount() { }


}
