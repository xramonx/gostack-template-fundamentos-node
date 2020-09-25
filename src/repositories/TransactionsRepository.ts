import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private calcIncome(): number {
    const income = this.transactions.reduce((total, actualElement) => {
      if (actualElement.type === 'income') {
        return total + actualElement.value;
      }
      return total;
    }, 0);
    return income;
  }

  private calcOutcome(): number {
    const outcome = this.transactions.reduce((total, actualElement) => {
      if (actualElement.type === 'outcome') {
        return total + actualElement.value;
      }
      return total;
    }, 0);
    return outcome;
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.calcIncome();
    const outcome = this.calcOutcome();
    const total = income - outcome;

    const balance: Balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    if (value < 0) throw Error('Value incorrect, please, check it');

    if (type === 'outcome') {
      const income = this.calcIncome();
      const outcome = this.calcOutcome();
      const total = income - outcome;
      if (total - value < 0)
        throw Error('Transaction Refused. Reason: Saldo insuficiente');
    }

    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
