import React, { useState } from 'react';
import './App.css';

import { useFetchClassification } from './hooks';
import { getYears } from './utils';
import { Select, Classification } from './components';

function App() {
  const years = getYears();
  const [year, setYear] = useState(years[0]);
  const { classification, isError, isLoading } = useFetchClassification({ year });

  if (isError) {
    return (
      <>Infelizmente ocorreu um erro! Recarregue a página.</>
    );
  }

  return (
    <div>
      <div>
        <span>Campeonato brasileiro de </span>
        <Select onChange={setYear} options={years} />
      </div>

      {isLoading ? <>Carregando...</> : <Classification classification={classification} />}
    </div>
  );
}

export default App;
