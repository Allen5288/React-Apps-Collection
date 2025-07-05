import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transaction from './Transaction';

const TransactionList = () => {

  const {transactions} = useContext(GlobalContext);

  if (transactions.length === 0) {
    return (
      <div>
        <h3>Transaction List History</h3>
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Transaction List History</h3>
      <ul id='list' className="list">
        {transactions.map(transaction => (
          <li key={transaction.id}>
            <Transaction key={transaction.id} transaction={transaction} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList