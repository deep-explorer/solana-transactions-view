import React, { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

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
      <TableRow
        onClick={() => setOpen(!open)}
        sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{transaction.id}</TableCell>
        <TableCell>{transaction.block_number}</TableCell>
        <TableCell>
          {duration ? duration + " minutes ago" : "less than 1 minute ago"}
        </TableCell>
        <TableCell>
          {transaction.events[0].amount /
            Math.pow(10, transaction.events[0].decimals)}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>Action Type</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction.events.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell component="th" scope="row">
                        {detail.source}
                      </TableCell>
                      <TableCell>{detail.destination}</TableCell>
                      <TableCell>{detail.type}</TableCell>
                      <TableCell align="right">
                        {detail.amount / Math.pow(10, detail.decimals)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const CollapsibleTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://svc.blockdaemon.com/universal/v1/solana/mainnet/account/rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt/txs?page_size=100",
        {
          headers: {
            Authorization:
              "Bearer hkdjxWcQOMECMYN5vU8qY9hm6ynCQMPVp0hdRGYgAAcFZlv7",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data.data);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className="w-1/2">Signature</TableCell>
            <TableCell className="w-1/6">Block</TableCell>
            <TableCell className="w-1/6">Time</TableCell>
            <TableCell className="w-1/6">Fee(SOL)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <Row key={transaction.id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
