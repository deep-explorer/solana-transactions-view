import React from "react";
import { Transaction } from "./types";

export const Row = ({ transaction }: { transaction: Transaction }) => {
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
};
