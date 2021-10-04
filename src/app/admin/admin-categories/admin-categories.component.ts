import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/models/category.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  adminCategories: Array<ICategory> = [];
  categoryName: string;
  categoryUrlName: string;
  editStatus!: boolean;

  modalRef?: BsModalRef;

  constructor(private apiService: ApiService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.apiService.getJSONCategories().subscribe( //якщо прийшла data тоді=>
      data => {
        this.adminCategories = data;
      },
      err => console.log(err)
    );
  }

  addCategory(): void {
    const newCateg = new Category(this.categoryName, this.categoryUrlName);
    this.apiService.postJSONCategory(newCateg).subscribe(   //відправляємо
      () => {
        this.getCategories();
      },
      err => console.log(err)
    );
    this.modalRef?.hide();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }


}
