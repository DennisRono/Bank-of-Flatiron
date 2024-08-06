import React from 'react'

function AddTransactionForm({ formData, setFormData, handleSubmit }) {
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  )
}

export default AddTransactionForm
