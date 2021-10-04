import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { Discount } from 'src/app/shared/models/discount.model';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {
  adminDiscount: Array<IDiscount> = [];
  itemID?: number = 1;
  itemTitle: string = '';
  itemUrlName: string = '';
  itemDescription: string = '';
  itemImage = 'https://www.lapiec-pizza.com.ua/wp-content/uploads/2020/05/aktsiya-dlya-sajta-21.jpg';
  editStatus!: boolean;

  modalRef?: BsModalRef;


  constructor(private discService: DiscountService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getServerJDiscounts();
  }


  private getServerJDiscounts(): void {
    this.discService.getJSONDiscountsS().subscribe(
      data => {
        this.adminDiscount = data;
      },
      err => console.log(err)
    );
  }


  addItem(): void {
    const NEW_ITEM = new Discount(this.itemTitle, this.itemUrlName,
      this.itemDescription, this.itemImage);
    delete NEW_ITEM.id;
    this.discService.postJSONDiscountsS(NEW_ITEM).subscribe(
      () => {
        this.getServerJDiscounts(); //коли добавляться дані,викликаю this.getServerJDiscounts()
      },
      err => console.log(err)
    );
    this.modalRef?.hide();
    this.resetForm();
  }

  private resetForm(): void {
    this.itemTitle = '';
    this.itemUrlName = '';
    this.itemDescription = '';
    this.itemID = 1;
  }

  editDiscount(item: IDiscount, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.itemID = item.id;
    this.itemTitle = item.title;
    this.itemUrlName = item.urlName;
    this.itemDescription = item.description;
    this.editStatus = true;
  }


  saveItem(): void {
    const UPDATE_ITEM = new Discount(this.itemTitle, this.itemUrlName, this.itemDescription, this.itemImage, this.itemID,);
    this.discService.updateJSONDiscountsS(UPDATE_ITEM).subscribe(
      () => {
        this.getServerJDiscounts();
      },
      err => console.log(err)
    );
    this.editStatus = false;
    this.resetForm();
    this.modalRef?.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteDiscount(discount: IDiscount): void {
    if (confirm('Ви впевнені?')) {
      this.discService.deleteJSONDiscountsS(discount.id).subscribe(
        () => {
          this.getServerJDiscounts();
        },
        err => console.log(err)
      );
    }
  }
}


// методи для модального вікна для delete
      // openModalConfirm(template: TemplateRef<any>) {
      //   this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

      // }
    // confirm(discount: IDiscount): void {
      //   this.discService.deleteJSONDiscountsS(discount.id).subscribe(
        //     () => {
          //       this.getServerJDiscounts();

  //     },
  //     err => console.log(err)
  //   );
  //   this.modalRef?.hide();
  // }

  // decline(): void {
  //   this.modalRef?.hide();
  // }


