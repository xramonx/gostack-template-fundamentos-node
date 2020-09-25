import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // createTransaction.execute({ title, value, type });
  public execute({ title, value, type }: RequestDTO): Transaction {
    // TODO
    // const transaction = new Transaction();
    // return transaction;
    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return newTransaction;
  }
}

export default CreateTransactionService;
