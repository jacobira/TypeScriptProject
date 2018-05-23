import {BankAccount} from "../student-work/BankAccount";
import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";

export class Savings extends BankAccount {
    accountHistory = [];
    balance = 10000;
    webWithdraws: number = 0;
    phoneWithdraws: number = 0;

    constructor(Date){
        super();
        this.currentDate = Date;
    }

    withdrawMoney(amount: number,
        description: string,
        transactionOrigin: TransactionOrigin): Transaction {
        
            if (amount <= this.balance){
                if (((transactionOrigin === 1) && this.webWithdraws < 5)  ||  ((transactionOrigin === 2) && this.phoneWithdraws < 6)  ||  (transactionOrigin === 3)){

                    let newBal: number = (this.balance - amount);

                    if (transactionOrigin === 1){
                        this.webWithdraws++;        
                    }
                    if (transactionOrigin === 2){
                        this.phoneWithdraws++;
                    }

                    let thisTrans: Transaction = {
                        success: true,
                        amount: -amount,
                        resultBalance: newBal, 
                        transactionDate: this.currentDate,
                        description: description,
                        errorMessage: ``
                        
                    }
                    

                    this.accountHistory.push(thisTrans);
                    this.balance = newBal;
                    return thisTrans;
                }

                else {
                    let thisTrans: Transaction = {
                        success: false,
                        amount: -amount,
                        resultBalance: this.balance, 
                        transactionDate: this.currentDate,
                        description: description,
                        errorMessage: `Withdrawals using current method are no longer available this month.`
                    }
                    return thisTrans;
                }
            }
        

        if (amount > this.balance){
            let thisTrans: Transaction = {
                success: false,
                amount: -amount,
                resultBalance: this.balance, 
                transactionDate: this.currentDate,
                description: description,
                errorMessage: `You cannot withraw more than the current balance, $${this.balance}.`
            }
            return thisTrans;
        }
    }

    

    checkForInt(rate){
        if (this.currentDate.getDate() === 1){
            let intToAdd: number = this.balance * (rate);
            this.depositMoney(intToAdd, `Interest deposited: ${intToAdd}`);
            this.webWithdraws = 0;
            this.phoneWithdraws = 0;
        }
    }

    advanceDate(numberOfDays: number){

        for (let i = 1; i <= numberOfDays; i++){
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            this.checkForInt(.02/12);
        }
    }
}