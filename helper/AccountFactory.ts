import {Account} from "../common/interfaces/Account";
import {Checking} from "../student-work/Checking";
import {Savings} from "../student-work/Savings";
import {Retirement} from "../student-work/Retirement";

export class AccountFactory {

    static getCheckingAccountObject(currentDate: Date): Account {
        return new Checking(currentDate);
    }

    static getSavingsAccountObject(currentDate: Date): Account {
       return new Savings(currentDate);
    }

    static getRetirementAccountObject(currentDate: Date, accountHolderBirthDate: Date): Account {
        return new Retirement(currentDate, accountHolderBirthDate);
    }

}