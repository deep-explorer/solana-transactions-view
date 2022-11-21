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
  const duration = Math.floor(
    (new Date().getTime() / 1000 - transaction.date) / 60
  ); //  in minute

  return (
    <React.Fragment>
      <tr
        onClick={() => setOpen(!open)}
        className={
          `bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer` +
          (open ? " bg-gray-100" : "")
        }>
        <td className="py-4 px-6">{transaction.id.slice(0, 22) + "..."}</td>
        <td className="py-4 px-6">{transaction.block_number}</td>
        <td className="py-4 px-6">
          {transaction.events[0].amount /
            Math.pow(10, transaction.events[0].decimals)}
        </td>
        <td className="py-4 px-6">
          {
            <a href={`https://solscan.io/tx/${transaction.id}`} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          }
        </td>
      </tr>
      {open && (
        <tr className="transition-all duration-1000 delay-1000 ease-out">
          <td colSpan={5}>
            <h3 className="text-2xl text-gray-700 font-serif m-5 h-[30px] ">
              Detail
            </h3>
            <div className="m-5 mb-5">
              <table className="w-full text-base text-left text-gray-500 border-2 ">
                <thead className="text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th className="w-[35%] py-1 px-6">From</th>
                    <th className="w-[35%] py-1 px-6">To</th>
                    <th className="w-[35%] py-1 px-6">Time</th>
                    <th className="w-[15%] py-1 px-6">Action Type</th>
                    <th className="w-[15%] py-1 px-6">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transaction.events.map((detail) => (
                    <tr
                      key={detail.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-2 px-6">
                        {detail.source && detail.source.slice(0, 22) + "..."}
                      </td>
                      <td className="py-2 px-6">
                        {detail.destination &&
                          detail.destination.slice(0, 22) + "..."}
                      </td>
                      <td className="py-2 px-4">
                        {duration
                          ? duration + " minutes ago"
                          : "less than 1 minute ago"}
                      </td>
                      <td className="py-2 px-6">{detail.type}</td>
                      <td className="py-2 px-6">
                        {detail.amount / Math.pow(10, detail.decimals)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

export const CollapsibleTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchWord, setSearchWord] = useState("");
  const accountAddress = "rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt";
  const key = "hkdjxWcQOMECMYN5vU8qY9hm6ynCQMPVp0hdRGYgAAcFZlv7";

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const response = await axios.get(
      `https://svc.blockdaemon.com/universal/v1/solana/mainnet/account/${accountAddress}/txs?page_size=50`,
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );
    setTransactions(response.data.data);
  };

  return (
    <div className="m-5">
      <div className="float-right">
        <p>
          Search trasactions which source address or destination address is
          equal to your input{" "}
        </p>
        <input
          placeholder="Address"
          className="border-2 m-3 mt-0 float-right p-2 w-1/2"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <table className="w-full text-lg text-left text-gray-500 border-2">
        <thead className="text-gray-700 uppercase bg-gray-300">
          <tr>
            <th className="w-[32%] py-3 px-6">Signature</th>
            <th className="w-[10%] py-3 px-6">Block</th>
            <th className="w-[15%] py-3 px-6">Fee(SOL)</th>
            <th className="w-[5%] py-3 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .filter((transaction) => {
              for (let detail of transaction.events) {
                if (
                  detail.source.includes(searchWord) ||
                  (detail.destination &&
                    detail.destination.includes(searchWord))
                ) {
                  return true;
                }
              }
              return false;
            })
            .map((transaction) => (
              <Row key={transaction.id} transaction={transaction} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
