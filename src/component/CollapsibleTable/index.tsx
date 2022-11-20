import React, { useEffect, useState } from "react";
import axios from "axios";

type Transaction = {
  id: string;
  block_id: string;
  block_number: string;
  date: number; //  timestamp
  num_events: number;
  status: string;
  events: TransactionDetail[];
};

type TransactionDetail = {
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

function Row({ transaction }: { transaction: Transaction }) {
  const [open, setOpen] = React.useState(false);
  let duration = Math.floor(
    (new Date().getTime() / 1000 - transaction.date) / 60
  ); //  in minute

  return (
    <React.Fragment>
      <tr onClick={() => setOpen(!open)}>
        <td>{transaction.id}</td>
        <td>{transaction.block_number}</td>
        <td>
          {duration ? duration + " minutes ago" : "less than 1 minute ago"}
        </td>
        <td>
          {transaction.events[0].amount /
            Math.pow(10, transaction.events[0].decimals)}
        </td>
      </tr>
      <tr>
        <td colSpan={3}>
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Action Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transaction.events.map((detail) => (
                <tr key={detail.id}>
                  <td> {detail.source}</td>
                  <td>{detail.destination}</td>
                  <td>{detail.type}</td>
                  <td>{detail.amount / Math.pow(10, detail.decimals)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </React.Fragment>
  );
}

export const CollapsibleTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {}, []);

  const fetch = async () => {
    const response = await axios.get(
      "https://svc.blockdaemon.com/universal/v1/solana/mainnet/account/rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt/txs?page_size=100",
      {
        headers: {
          Authorization:
            "Bearer hkdjxWcQOMECMYN5vU8qY9hm6ynCQMPVp0hdRGYgAAcFZlv7",
        },
      }
    );
    console.log(response);
  };
  return (
    <table>
      <thead>
        <tr>
          <th className="w-1/2">Signature</th>
          <th className="w-1/6">Block</th>
          <th className="w-1/6">Time</th>
          <th className="w-1/6">Fee (SOL)</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <Row key={transaction.id} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};
