import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditCardService } from '../service/credit-card.service';

@Component({
  selector: 'transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styles: [],
})
export class TransactionDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private creditCardService: CreditCardService
  ) {}
  private headerData;
  transactionId;
  phoneNo;
  transactionType;
  name;
  operator;
  pfid;
  saleCns;
  rental;
  postedOn;
  discountPct;
  discountSubtotal: number;
  refundManagerName;
  refundTicketNumber;
  cardDetails: any;
  creditCardHeading = [];

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.headerData = JSON.parse(params['transactionData']);
      this.setValues(this.headerData);
    });
  }

  setValues(details) {
    this.transactionId = details.customerDetails['transactionId'];
    this.phoneNo = details.customerDetails['phoneNo'];
    this.transactionType = details.customerDetails['transactionType'];
    this.operator = details.customerDetails['operator'];
    this.name = details.customerDetails['name'];
    this.pfid = details.customerDetails['pfid'];
    this.saleCns = details.customerDetails['saleCns'];
    this.rental = details.customerDetails['rentalNo'];
    this.postedOn = details.customerDetails['date'];
  }
  showCreditCardDetails() {
    this.creditCardService.get(this.transactionId).subscribe((res: any) => {
      this.cardDetails = res['cardDetails'];
      this.creditCardHeading = Object.keys(res['cardDetails'][0]);
    });
  }
}
