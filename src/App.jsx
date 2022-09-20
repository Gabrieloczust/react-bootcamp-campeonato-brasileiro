import React, { useState, useEffect } from 'react';
import './App.css';

import { useFetchClassification } from './hooks';
import { getYears } from './utils';
import { Select, Classification } from './components';

function App() {
  const years = getYears();

  const [year, setYear] = useState(years[0]);
  const [classification, setClassification] = useState([]);

  const { getClassification } = useFetchClassification();

  useEffect(() => {
    (async () => {
      setClassification(await getClassification(year));
    })();
  }, [year]);

  return (
    <div>
      <div>
        <span>Campeonato brasileiro de </span>
        <Select onChange={setYear} options={years} />
      </div>

      <Classification classification={classification} />
    </div>
  );
}

export default App;
