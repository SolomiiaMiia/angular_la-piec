import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProducts } from 'src/app/shared/interfaces/products.interface';
import { Product } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  productName: string;
  productUrlName: string;
  productDescription: string;
  productPrice: number;
  productWeigth: string;
  productImage: string = 'https://la.ua/wp-content/uploads/2021/08/carbonara.jpg';
  currentCategory: ICategory; //було any

  upload: any;
  uploadProgress: Observable<number>;
  uploadStatus: boolean;

  //по категорії добавляємо
  adminCategories: Array<ICategory> = [];  //щоб прийняти категорії з admin-categories
  adminProducts: Array<IProducts> = [];
  constructor(private angularFireStorage: AngularFireStorage,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }


  private getCategories(): void {
    this.apiService.getJSONCategories().subscribe( //якщо прийшла data тоді=>
      data => {
        this.adminCategories = data;
      },
      err => console.log(err)
    );
  }


  private getProducts(): void {
    this.apiService.getJSONProducts().subscribe( //якщо прийшла data тоді=>
      data => {
        this.adminProducts = data;
      },
      err => console.log(err)
    );
  }


  addProduct(): void {
    // console.log(this.currentCategory); щоб провірити що приходить в currentCategory
    const PRODUCT = new Product(
      this.productName,
      this.productUrlName,
      this.currentCategory,
      this.productDescription,
      this.productPrice,
      this.productWeigth,
      this.productImage,
    );
    console.log(PRODUCT); //подивитись чи приходить продукт
    //дальше потрібно додати продукт на api сервіс і відправити на сервіс
    this.apiService.postJSONProduct(PRODUCT).subscribe(
      () => {
        this.getProducts()
      },
      err => console.log(err)
    );
  }

  deleteProduct(product: IProducts): void {
    if (confirm('Ви впевнені?')) {
      this.apiService.deleteJSONProduct(product.id).subscribe(
        () => { this.getProducts() }
      )
    }
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    this.upload = this.angularFireStorage.upload(filePath, file);
    this.uploadProgress = this.upload.percentageChanges();
    this.upload.then(image => {
      this.angularFireStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(
        url => {
          this.productImage = url;
          this.uploadStatus = true;
          //event.target.files = null; //зачищу але не зачищується
          event.target.value = null; //зробила через.value і працює )
        });
    });
  }

  deleteImage(): void {
    this.angularFireStorage.storage.refFromURL(this.productImage).delete().then(
      () => {
        this.uploadStatus = false;
      })
      .catch(err => console.log(err))
  }
}
