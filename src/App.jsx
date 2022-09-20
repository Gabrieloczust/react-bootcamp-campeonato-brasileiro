import React, { useState } from 'react';
import './App.css';

import { useFetchClassification } from './hooks';
import { getYears } from './utils';
import { Select, Classification } from './components';

function App() {
  const years = getYears();
  const [year, setYear] = useState(years[0]);
  const { classification, isError } = useFetchClassification({ year });

  const handleChangeYear = (newYear) => {
    document.title = `Campeonato Brasileiro de ${newYear}`;
    setYear(newYear);
  };

  if (isError) {
    return (
      <span>Infelizmente ocorreu um erro! Recarregue a página.</span>
    );
  }

  return (
    <div>
      <div>
        <span>Campeonato brasileiro de </span>
        <Select onChange={handleChangeYear} options={years} />
      </div>

      {!classification.length
        ? (
          <span>Carregando...</span>
        )
        : <Classification classification={classification} />}
    </div>
  );
}

export default App;
