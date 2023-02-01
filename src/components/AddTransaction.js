import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { toast } from "react-toastify";

export const AddTransaction = ({notify}) => {
  const { addTransaction } = useContext(GlobalContext)

  const [text, setText] = useState("")
  const [amount, setAmount] = useState(0)

  const onSubmit = e => {

    e.preventDefault()

    if (text !== "" && amount !== 0) {
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: Number(amount)
      }

      addTransaction(newTransaction)
      setText("")
      setAmount(0)
    } else {
      toast.warn('Wrong input detected! Try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }


  }

  return (
    <>
    <h3>Add new transaction</h3>
      <form id="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Category</label>
          <input type="text" value={text} onChange={({target}) => setText(target.value)} placeholder="Enter category..." list='transaction-names' />
          <datalist id="transaction-names" >
            {['Car', 'Clothes', 'Entertainment', 'Extra income', 'Gifts', 'House bills', 'Investment', 'Salary', 'Savings', 'Shopping', 'Travel'].map(
              (item, i) => <option key={i} value={item}>{item}</option>
            )}
        
          </datalist>

        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount <br />(negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={({target}) => setAmount(target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}
