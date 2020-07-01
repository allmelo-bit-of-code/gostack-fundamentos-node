import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  private calculateBalanceFor(type: string): number {
    const allTransactions = this.transactions;

    if (allTransactions.length === 0) {
      return 0;
    }

    const transactionsOfThisType = this.transactions.filter(
      transaction => transaction.type === type,
    );

    if (transactionsOfThisType.length === 0) {
      return 0;
    }

    const valuesOfThisType = transactionsOfThisType.map(
      transaction => transaction.value,
    );
    const sum = valuesOfThisType.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );
    return sum;
  }

  public getBalance(): Balance {
    const totalIncome = this.calculateBalanceFor('income');
    const totalOutcome = this.calculateBalanceFor('outcome');

    //    !Number.isInteger(totalIncome) ? totalIncome = 0 : totalIncome;
    //    !Number.isInteger(totalOutcome) ? totalOutcome = 0 : totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }

  public create(order: Request): Transaction {
    const newTransaction = new Transaction(order);
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
