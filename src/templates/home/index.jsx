import { Children, Component, createContext, useContext } from 'react';
import { cloneElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const s = {
  style: {
    fontSize: '60px',
  },
};

const TurnOnOffContext = createContext();

const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return <TurnOnOffContext.Provider value={{ isOn, onTurn }}>{children}</TurnOnOffContext.Provider>;
};

//Compound components, para poder passar funções no cloneElement do Children.map
const TurnedOn = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? children : null;
};
const TurnedOff = ({ children }) => {
  const { isOn } = useContext(TurnOnOffContext);
  return isOn ? null : children;
};
const TurnButton = ({ ...props }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
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
      <div>
        <TurnedOn>
          <P>Aqui as coisa que vão acontecer quando estiver ON</P>
        </TurnedOn>
        <TurnedOff>
          <P>Aqui vem as coisas do off</P>
        </TurnedOff>
        <p>Oi</p>
        <TurnButton {...s} />
      </div>
    </TurnOnOff>
  );
};
