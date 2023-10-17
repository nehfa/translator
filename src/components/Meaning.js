import React from 'react';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export const Meaning = ({ answer, input, setInput, massive, setMassive }) => {
  const focus = useRef(null);

  const findAnswer = useCallback(
    debounce((answer, input, massive, setMassive) => {
      setMassive(
        answer.filter((item) => {
          return item.includes(input);
        }),
      );
    }, 1000),
    [input],
  );

  const changeInput = useCallback(
    debounce((e, setInput) => {
      setInput(e);
      console.log(input);
    }, 500),
  );

  const changeInput2 = useCallback(
    debounce((e, setInput) => {
      setInput(e);
      console.log(input);
    }, 600),
  );

  useEffect(() => {
    if (input) {
      findAnswer(answer, input, massive, setMassive);
    } else {
      console.log('Empty!');
    }
  }, [input]);

  return (
    <div className="mean-contant">
      <input
        className="input_slave"
        ref={focus}
        onChange={(e) => changeInput(e.target.value, setInput)}
      />{' '}
      <div className="answer">
        {input
          ? massive.map((item, index) => (
              <div className="small" key={index}>
                {index + 1 + '. '}
                {item}
              </div>
            ))
          : 'ฅ^•ﻌ•^ฅ'}
      </div>
    </div>
  );
};

// {arrayOfData ? arrayOfData[0].value : 'ฅ^•ﻌ•^ฅ'}
