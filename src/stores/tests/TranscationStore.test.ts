import TransactionStore, { Transaction } from "../TransactionStore";

let transactions = new TransactionStore();

describe("TransactionStore MobX", () => {
    beforeEach(() => {
        transactions = new TransactionStore();
    });

    test("Default Initializtion should be empty", () => {
        expect(transactions.list.length).toBe(0);
    });

    test("Add transaction to transactionList", () => {

        const transaction: Transaction = {
            title: "Test",
            amount: 123
        }

        transactions.add(transaction);

        expect(transactions.list.length).toBe(1);
    });

    test("Replace transaction in transactionList", () => {

        const transaction1: Transaction = {
            title: "Test",
            amount: 123
        }

        const transaction2: Transaction = {
            title: "Test",
            amount: 1234
        }

        transactions.add(transaction1);
        transactions.replace(transaction2);

        expect(transactions.list[0].amount).toBe(transaction2.amount);
    });

    test("Get transaction from transactionList", () => {

        const transaction: Transaction = {
            title: "Test",
            amount: 123
        }

        transactions.add(transaction);
        const getTransaction = transactions.get(transaction.title);

        expect(transaction).toEqual(getTransaction);
    });

    test("Remove transaction from transactionList", () => {

        const transaction: Transaction = {
            title: "Test",
            amount: 123
        }

        transactions.add(transaction);
        transactions.remove(transaction);

        expect(transactions.list.length).toBe(0);
    });
    
});