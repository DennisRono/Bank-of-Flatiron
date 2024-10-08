import React, { useEffect, useState } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import AddTransactionForm from './AddTransactionForm'

function AccountContainer() {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const fetchTransactions = async () => {
    try {
      const res = await fetch('http://localhost:8001/transactions')
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      setTransactions(data)
      setFilteredTransactions(data)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    const filtered = transactions
      .filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a.category.toLowerCase() < b.category.toLowerCase()) {
          return -1
        }
        if (a.category.toLowerCase() > b.category.toLowerCase()) {
          return 1
        }
        if (a.description.toLowerCase() < b.description.toLowerCase()) {
          return -1
        }
        if (a.description.toLowerCase() > b.description.toLowerCase()) {
          return 1
        }
        return 0
      })

    setFilteredTransactions(filtered)
  }, [searchTerm, transactions])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (
        !formData.amount ||
        formData.category ||
        formData.date ||
        formData.description
      ) {
        throw new Error('Please fill out the form!')
      }
      const res = await fetch('http://localhost:8001/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseInt(formData.amount),
        }),
      })
      if (!res.ok) {
        throw new Error('Error Posting the transaction')
      }
      setFormData({ date: '', description: '', category: '', amount: '' })
      fetchTransactions()
    } catch (error) {
      console.log('Failed to Fetch', error)
    }
  }

  const deleteTransaction = async (id) => {
    const res = await fetch(`http://localhost:8001/transactions/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      fetchTransactions()
    } else {
      console.error(`Failed to delete transaction with id ${id}`)
    }
  }

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddTransactionForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      <TransactionsList
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  )
}

export default AccountContainer
