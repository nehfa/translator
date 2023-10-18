import React from 'react';

export const Meaning = ({ massive, textToTranslate }) => {
  return (
    <div className="mean-contant">
      <div className="answer">
        {textToTranslate
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
