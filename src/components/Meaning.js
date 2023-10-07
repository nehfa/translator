import React from 'react';

export const Meaning = ({ answer, input, setInput }) => {
  const a = (answer, input) =>
    answer.find((item) => {
      return item.includes(input);
    });
  return (
    <div className="mean-contant">
      <input className="input_slave" onChange={(e) => setInput(e.target.value)} />
      <div className="answer">{input ? a(answer, input) : 'ฅ^•ﻌ•^ฅ'}</div>
    </div>
  );
};

// {arrayOfData ? arrayOfData[0].value : 'ฅ^•ﻌ•^ฅ'}
