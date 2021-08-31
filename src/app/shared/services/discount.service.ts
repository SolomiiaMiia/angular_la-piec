import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscount } from '../interfaces/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discountsS: Array<IDiscount> = [    //приватний, тому роблю метод який буде повертати discountsS
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

  private urlJson: string;
  a: any;

  constructor(private http: HttpClient) {
    this.urlJson = 'http://localhost:3000/discounts';
  }

  getDiscountsS() {
    return this.discountsS;   //метод який повертає масив =  private discountsS.
  }

  setDiscountsS(discount: IDiscount): void {
    this.discountsS.push(discount); // добавляє значення в масив discountsS
  }

  deleteDiscountsS(id: number): void {
    const INDEX = this.discountsS.findIndex(item => item.id === id);
    this.discountsS.splice(INDEX, 1);

    // є масив об'єктів, знаходжу серед них індех того об'єкта з конкретною id
    // метод findIndex в кол бек ф-ції приймає три параметра: val, index, arr
    // перебираю масив, кожен item, якщо в об'єкті його id буде рівна id яка прийнялась в параметрі. 
  }

  updateDiscountsS(index: IDiscount): void {
    const INDEX = this.discountsS.findIndex(item => item.id === index.id);
    this.discountsS.splice(INDEX, 1, index);
  }

  getJSONDiscountsS(): Observable<Array<IDiscount>> {
    return this.http.get<Array<IDiscount>>(this.urlJson);
  }

  postJSONDiscountsS(discount: IDiscount): Observable<IDiscount> {
    return this.http.post<IDiscount>(this.urlJson, discount);
  }
}
