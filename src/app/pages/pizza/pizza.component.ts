import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  productsPizza: Array<IProducts> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProductPizza();
  }

  //отримуємо тільки піццу
  // + на сервісі роблю метод отримання конкретної категорії (піца)
  private getProductPizza(): void {
    this.apiService.getJSONCategoryProducts('pizza').subscribe( //якщо прийшла data тоді=>
      data => {
        this.productsPizza = data;
        console.log(this.productsPizza); //має приходити тільки піца
      },
      err => console.log(err)
    );
  }

  productCount(product: IProducts, status: boolean): void {
    if (status) {
      product.count++;
    } else {
      if (product.count > 1)  //щоб в мінус не заходило
        product.count--;
    }
  }

  //корзина

  addBasket(product: IProducts): void {   // localStorage
    let localBasket: Array<IProducts> = []; // ств. пустий масив
    if (localStorage.getItem('basket')) { // 1 умова чи є в localStorage basket
      localBasket = JSON.parse(localStorage.getItem('basket')); //якщо є, ми дістаємо все що там є,парсим і додаєм в змінну але
      if (localBasket.some(prod => prod.id === product.id)) { //провіряємо (по id) чи є такий самий продукт вже в локалі який ми дістали, і якщо є то просто додаємо його,а не пушимо
        const index = localBasket.findIndex(prod => prod.id === product.id)
        localBasket[index].count += product.count;
      }
      else {
        localBasket.push(product); // якщо немає такого самого по id то пушимо як новий товар
      }
    }
    else {
      localBasket.push(product); // це спрацьовує коли в localStorage нічого немає
    }
    localStorage.setItem('basket', JSON.stringify(localBasket)); // оновлюємо localStorage
    product.count = 1; // оновлюємо на 1
  }
}


