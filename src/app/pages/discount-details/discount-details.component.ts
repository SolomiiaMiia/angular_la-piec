import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {

  discount: IDiscount;

  constructor(private discService: DiscountService,
    private activatedRoute: ActivatedRoute,
    public location: Location) { }

  ngOnInit(): void {
    this.getDetailsProduct();
  }


  private getDetailsProduct(): void {
    const ID = +this.activatedRoute.snapshot.paramMap.get('id');
    this.discService.getJSONOneDetailsDiscountsS(ID).subscribe(
      data => {
        this.discount = data
      },
      err => console.log(err)
    )
  }
}