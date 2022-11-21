export type Transaction = {
  id: string;
  block_id: string;
  block_number: string;
  date: number; //  timestamp
  num_events: number;
  status: string;
  events: TransactionDetail[];
};

export type TransactionDetail = {
  amount: number;
  date: number; //  timestamp
  decimals: number;
  denomination: string;
  destination: string;
  id: string;
  source: string;
  transaction_id: string;
  type: string;
};
