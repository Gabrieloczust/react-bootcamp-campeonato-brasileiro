import { useState, useCallback, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useFetchClassification({ year }) {
  const [classification, setClassification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const setTeam = (team, overallScore) => ({
    ...overallScore,
    name: team,
    total_saldo_de_gols: overallScore.total_gols_marcados - overallScore.total_gols_sofridos,
  });

  const orderClassification = (a, b) => {
    const points = b.total_pontos - a.total_pontos;
    const victories = b.total_vitorias - a.total_vitorias;
    const goalBalance = b.total_saldo_de_gols - a.total_saldo_de_gols;
    const goalsScored = b.total_gols_marcados - a.total_gols_marcados;
    return points || victories || goalBalance || goalsScored;
  };

  const updateClassification = useCallback(async (response) => {
    const lastRound = response.pop().partidas;

    const classificationData = lastRound.reduce((teams, match) => {
      const principal = setTeam(match.mandante, match.pontuacao_geral_mandante);
      const visitor = setTeam(match.visitante, match.pontuacao_geral_visitante);
      return [...teams, principal, visitor];
    }, []).sort(orderClassification);

    setClassification(classificationData);
    setIsLoading(false);
  }, [year]);

  const { error } = useSWR(`http://localhost:3001/${year}`, fetcher, {
    onSuccess: updateClassification,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  useEffect(() => {
    setIsLoading(true);
  }, [year]);

  useEffect(() => {
    if (!error) {
      return;
    }

    try {
      (async () => {
        setIsLoading(true);
        const { default: json } = await import('../../../campeonato-brasileiro.json');
        const response = json[year];
        updateClassification(response);
      })();
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  }, [error]);

  return {
    classification,
    isLoading,
    isError,
  };
}

export default useFetchClassification;
