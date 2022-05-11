import { makeObservable, observable, action } from 'mobx';

export interface Transaction {
    title: string;
    amount: number;
}

class TransactionStore {

    list: Transaction[] = [];

    constructor(transactions: Transaction[] = []) {
        this.list = transactions;
        makeObservable(this, {
            list: observable,
            add: action,
            remove: action,
            get: action
        })
    }

    get(title: string) {
        return this.list.find(t => t.title === title);
    }

    add(transaction: Transaction) {

        const alreadyExist = this.get(transaction.title);

        if(alreadyExist) {
            return false;
        } else {
            this.list = [...this.list, transaction];
            return true;
        }

    }

    replace(transaction: Transaction) { 

        const indexReplace = this.list.findIndex(
          (t) => t.title === transaction.title
        );

        this.list[indexReplace].amount = transaction.amount;
    }

    remove(transaction: Transaction) {
        this.list = [...this.list.filter(t => t.title !== transaction.title)];
    }

}

export default TransactionStore;