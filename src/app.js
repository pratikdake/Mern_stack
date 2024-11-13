import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [month, search]);

  const fetchTransactions = async () => {
    const response = await axios.get('http://localhost:5000/api/transactions', {
      params: { month, search }
    });
    setTransactions(response.data);
  };

  return (
    <div>
      <h2>Transactions</h2>
      <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <table>
        <thead>
          <tr><th>Title</th><th>Description</th><th>Price</th></tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={index}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
