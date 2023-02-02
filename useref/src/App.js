/* eslint-disable jsx-a11y/accessible-emoji */

  //выполнение функции при scroll на javascript
  // const ulElement = document.querySelector('ul');
  // ulElement.addEventListener('scroll', handleScroll);
  //ошибка на null, т.к. функция с запросом ul вызывается до рендера. Используем useEffct и говорим, чтоб фукция вызывалась при componentDidMount.
  // Для скрола в css свойство (App.css) нужно добавить ul { height: 150px; overflow: auto;}


/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import './App.css';

function App() {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5]);
  const ulRef = React.useRef();
  const numbersRef = React.useRef();

    /* Ещё можно было бы сделать так */
    React.useEffect(() => {
      numbers.current = numbers;
    }, [numbers]);

  const addNumber = () => {
    setNumbers((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  const handleScroll = React.useCallback(() => {  /* Есть зависимости, useCallback будет следить, нужно ли пересоздавать функцию или не нужно. [] - 
                                                  наша функция при первом рендере создается и всё. Больше не пересоздается, независимо от изменения state, удаления ....
                                                  Всё, что хранится внутри useCallback, запоминается. Чтобы это обойти - нужно добавить в зависимости. 
                                                  Для получения актуального состояния без потери ссылок */
    console.log('Был скролл!', numbersRef.current);
  });

  const start = () => {
    ulRef.current.addEventListener('scroll', handleScroll);
  };

  const stop = () => {
    ulRef.current.removeEventListener('scroll', handleScroll);
  };

  return (
    <div>
      <ul ref={ulRef}>
        {numbers.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      <button onClick={addNumber}>✅ Добавить число</button>
      <button onClick={start}>▶️ Старт</button>
      <button onClick={stop}>⏹ Стоп</button>
    </div>
  );
}

export default App;
