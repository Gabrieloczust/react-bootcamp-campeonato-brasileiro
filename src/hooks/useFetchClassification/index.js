import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useFetchClassification({ year }) {
  const [classification, setClassification] = useState([]);

  function setTeam(team, overallScore) {
    return {
      ...overallScore,
      name: team,
      total_saldo_de_gols: overallScore.total_gols_marcados - overallScore.total_gols_sofridos,
    };
  }

  function orderClassification(a, b) {
    const points = b.total_pontos - a.total_pontos;
    const victories = b.total_vitorias - a.total_vitorias;
    const goalBalance = b.total_saldo_de_gols - a.total_saldo_de_gols;
    const goalsScored = b.total_gols_marcados - a.total_gols_marcados;
    return points || victories || goalBalance || goalsScored;
  }

  async function prepareResponse(response) {
    const lastRound = response.pop().partidas;

    return lastRound.reduce((teams, match) => {
      const principal = setTeam(match.mandante, match.pontuacao_geral_mandante);
      const visitor = setTeam(match.visitante, match.pontuacao_geral_visitante);
      return [...teams, principal, visitor];
    }, []).sort(orderClassification);
  }

  const { error } = useSWR(`http://localhost:3001/${year}`, fetcher, {
    onSuccess: async (response) => {
      setClassification(await prepareResponse(response));
    },
  });

  return {
    classification,
    isLoading: !error && !classification.length,
    isError: error,
  };
}

export default useFetchClassification;
