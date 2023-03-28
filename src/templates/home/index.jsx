import { lazy, Suspense, useState } from 'react';
// import LazyComponent from './lazy-component';
//colocando a importação numa função, e passando essa função para o React.lazy, vc só importa esse component quando ela for chamada ou o componente for chamado pra tela, ou show == true. Porém vc tem q colocar o component como export default, e também escrever ele dentro de um suspense com um fallback que exibira enquanto ele ainda nao foi importado
const loadComponent = () => import('./lazy-component');
const LazyComponent = lazy(loadComponent);

export const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <p>
        <button onMouseOver={loadComponent} onClick={() => setShow((s) => !s)}>
          Show {show ? 'LC on screen' : 'LC is off screen'}
        </button>
      </p>
      <Suspense fallback={<p>Carregando...</p>}>{show && <LazyComponent />}</Suspense>
    </div>
  );
};
