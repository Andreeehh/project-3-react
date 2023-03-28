import { Children, Component } from 'react';
import { cloneElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const s = {
  style: {
    fontSize: '60px',
  },
};

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return Children.map(children, (child) => {
    //retorna o próprio child caso o elemento não seja um compound components, no caso é o <p>Oi</p>
    if (typeof child.type === 'string') {
      return child;
    }

    const newChild = cloneElement(child, {
      isOn,
      onTurn,
    });
    return newChild;
  });
};

//Compound components, para poder passar funções no cloneElement do Children.map
const TurnedOn = ({ isOn, children }) => (isOn ? children : null);
const TurnedOff = ({ isOn, children }) => (isOn ? null : children);
const TurnButton = ({ isOn, onTurn, ...props }) => {
  return (
    <button {...props} onClick={onTurn}>
      Turn {isOn ? 'OFF' : 'ON'}
    </button>
  );
};

const P = ({ children }) => <p {...s}>{children}</p>;

export const Home = () => {
  return (
    <TurnOnOff>
      <TurnedOn>
        <P>Aqui as coisa que vão acontecer quando estiver ON</P>
      </TurnedOn>
      <TurnedOff>
        <P>Aqui vem as coisas do off</P>
      </TurnedOff>
      <p>Oi</p>
      <TurnButton {...s} />
    </TurnOnOff>
  );
};
