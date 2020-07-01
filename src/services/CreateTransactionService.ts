import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const order = { title, value, type };

    if (type === 'outcome') {
      const checkBalance = this.transactionsRepository.getBalance();
      if (checkBalance.total > 0) {
        this.transactionsRepository.create(order);
      } else {
        throw Error('You need to add more funds in your wallet');
      }
    }

    if (type === 'income') {
      return this.transactionsRepository.create(order);
    }

    throw Error('Type of transaction not recognizable');
  }
}

export default CreateTransactionService;
