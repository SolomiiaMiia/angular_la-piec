import { Injectable } from '@angular/core';
import { IDiscount } from '../interfaces/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  discountsS: Array<IDiscount> = [
    {
      id: 1,
      title: 'Наша фірмова акція "2+1" ',
      urlName: 'nasha-firmova-aktsiya-2-1',
      description: ` Акція <<2+1>> діє в понеділок, вівторок, середу
      та четвер. Замовляйте дві піци то отримуйте ще одну
      безкоштовно!
      * Безкоштовною вважається піца з найменшою вартістю.
      ** Ця акція не поєднується з іншими акціями.
      `,
      image: 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg'
    }
  ];

  constructor() { }
}
