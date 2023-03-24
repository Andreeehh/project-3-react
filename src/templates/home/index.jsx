import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

export const Home = () => {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);
  const divRef = useRef();

  useLayoutEffect(() => {
    const now = Date.now();
    while (Date.now() < now + 1600);
    divRef.current.divRef.scrollTop = divRef.current.divRef.scrollHeight;
  });

  const handleClick = () => {
    setCounted((c) => [...c, +c.slice(-1) + 1]);
    divRef.current.handleClick();
  };

  return (
    <>
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <DisplayCounted counted={counted} ref={divRef}></DisplayCounted>
    </>
  );
};

//para passar um useRef como propriedade, vc deve passar o componente como function dentro do forwardRef, passando como segundo parâmetro
export const DisplayCounted = forwardRef(function DisplayCounted({ counted }, ref) {
  const [rand, setRand] = useState('0.24');
  const divRef = useRef();

  const handleClick = () => {
    setRand(Math.random().toFixed(2));
  };

  //passa pra ref recebida por parâmetro de volta pra pai com um objeto com o handleClick do filho e o divRef do filho, que era o divRef do pai, loucura
  useImperativeHandle(ref, () => ({ handleClick, divRef: divRef.current }));

  return (
    <div
      ref={divRef}
      style={{
        height: '100px',
        width: '100px',
        overflow: 'scroll',
      }}
    >
      {counted.map((c) => {
        return (
          <p onClick={handleClick} key={`c-${c}`}>
            {c} +++ {rand}
          </p>
        );
      })}
    </div>
  );
});
