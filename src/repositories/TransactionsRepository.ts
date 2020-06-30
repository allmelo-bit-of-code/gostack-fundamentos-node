import Transaction from '../models/Transaction';

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

  public all(): Transaction[] {
    return this.transactions;
  }

  private calculateBalanceFor(type: string): number {
    const transactionsOfThisType = this.transactions.filter(
      transaction => transaction.type === type,
    );

    const valuesOfThisType = transactionsOfThisType.map(
      transaction => transaction.value,
    );

    return valuesOfThisType.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );
  }

  public getBalance(): Balance {
    const totalIncome = this.calculateBalanceFor('income');
    const totalOutcome = this.calculateBalanceFor('outcome');

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }

  public create(title, value, type): Transaction {
    // TODO
  }
}

export default TransactionsRepository;
