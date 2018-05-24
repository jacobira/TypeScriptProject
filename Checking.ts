import {BankAccount} from "../student-work/BankAccount";
import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";

export class Checking extends BankAccount {
    accountHistory = [];
    balance = 1000;

    constructor(Date){
        super();
        this.currentDate = Date;
    }

    checkForInt(rate){
        if (this.currentDate.getDate() === 1){
            let intToAdd: number = this.balance * (rate);
            this.depositMoney(intToAdd, `Interest deposited: $${intToAdd}`);
        }
    }

    advanceDate(numberOfDays: number){

        for (let i = 1; i <= numberOfDays; i++){
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            this.checkForInt(.01/12);
        }
    }
}