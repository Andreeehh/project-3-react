import { Children, Component } from 'react';
import { cloneElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const s = {
  style: {
    fontSize: '60px',
  },
};

//Children e cloneElement são utilizados para manipular os elementos do dom recebidos por parâmetro como children, já que seus prop-types são imutáveis, então utilizando o Children.map que recebe o parâmetro, faz com que para cada child, vc possa clonar o elemento e passar propriedades, como style, que é o caso desse spread object, id, key, qualquer uma menos uma função
const Parent = ({ children }) => {
  console.log(children);
  return Children.map(children, (child) => {
    const newChild = cloneElement(child, { ...s });
    return newChild;
  });
};

export const Home = () => {
  return (
    <Parent>
      <p>Oi</p>
      <p>Oi 2</p>
    </Parent>
  );
};
