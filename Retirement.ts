import {BankAccount} from "../student-work/BankAccount";
import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";

export class Retirement extends BankAccount {
    accountHistory = [];
    balance = 100000;
    webWithdraws: number = 0;
    phoneWithdraws: number = 0;
    accountHolderBirthDate: Date;

    constructor(Date, birthday){
        super();
        this.currentDate = Date;
        this.accountHolderBirthDate = birthday;
    }

    withdrawMoney(amount: number,
        description: string,
        transactionOrigin: TransactionOrigin): Transaction {
        
            if (amount <= this.balance){
                if (((transactionOrigin === 1) && this.webWithdraws < 5)  ||  ((transactionOrigin === 2) && this.phoneWithdraws < 6)  ||  (transactionOrigin === 3)){

                    let newBal: number = (this.balance - (amount + amount/10));

                    if (transactionOrigin === 1){
                        this.webWithdraws++;        
                    }
                    if (transactionOrigin === 2){
                        this.phoneWithdraws++;
                    }

                    let thisTrans: Transaction = {
                        success: true,
                        amount: -(amount + amount/10),
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
            let intToAdd: number = (this.balance * (rate));
            this.depositMoney(intToAdd, `Interest deposited: ${intToAdd}`);
            this.webWithdraws = 0;
            this.phoneWithdraws = 0;
        }
    }

    advanceDate(numberOfDays: number){

        for (let i = 1; i <= numberOfDays; i++){
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            this.checkForInt(.03/12);
        }
    }
}