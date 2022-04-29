export interface Transaction {
  title: string;
  amount: number;
}

export interface Action {
  type: string;
  transaction: Transaction;
}

export interface InitializeAction {
  type: string;
  transactions: Transaction[];
}
