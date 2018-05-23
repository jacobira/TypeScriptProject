import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";

export class BankAccount implements Account {
    currentDate: Date;
    balance: number;
    accountHistory: Transaction[];
    accountHolderBirthDate?: Date;

    withdrawMoney(amount: number,
                  description: string,
                  transactionOrigin: TransactionOrigin): Transaction {
                    if (amount <= this.balance){
                        let newBal: number = this.balance - amount;
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

                    if (amount > this.balance){
                        let thisTrans: Transaction = {
                            success: false,
                            amount: -amount,
                            resultBalance: this.balance, 
                            transactionDate: this.currentDate,
                            description: description,
                            errorMessage: `Cannot withdraw more than current balance, $${this.balance}`
                        }
                        return thisTrans;
                    }
                    
                  }

    depositMoney(amount: number,
                 description: string): Transaction {

                    let newBal: number = this.balance + amount;
                    let thisTrans: Transaction = {
                        success: true,
                        amount: amount,
                        resultBalance: newBal, 
                        transactionDate: this.currentDate,
                        description: description,
                        errorMessage: ``
                    }
                    this.balance = newBal;
                    this.accountHistory.push(thisTrans);
                    return thisTrans;
                 }

    advanceDate(numberOfDays: number){

        for (let i = 1; i <= numberOfDays; i++){
            this.currentDate.setDate(this.currentDate.getDate() + 1);
        }
    }
}