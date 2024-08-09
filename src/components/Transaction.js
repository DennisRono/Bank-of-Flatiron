import React from 'react'

function Transaction({ transaction, deleteTransaction }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => deleteTransaction(transaction.id)}
      >
        Delete
      </td>
    </tr>
  )
}

export default Transaction
