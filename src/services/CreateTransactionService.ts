import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    if (type !== `income` && type !== `outcome`) {
      throw Error(`Incompatible type`);
    }
    if (
      this.transactionsRepository.getBalance().total - value < 0 &&
      type === `outcome`
    ) {
      throw Error(`Not enougth balance`);
    }
    const transaction = this.transactionsRepository.create({
      id: ``,
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
