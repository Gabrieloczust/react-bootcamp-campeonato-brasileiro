function useFetchClassification() {
  const setTeam = (team, overallScore) => ({
    name: team,
    ...overallScore,
    total_saldo_de_gols: overallScore.total_gols_marcados - overallScore.total_gols_sofridos,
  });

  const orderClassification = (a, b) => {
    const points = b.total_pontos - a.total_pontos;
    const victories = b.total_vitorias - a.total_vitorias;
    const goalBalance = b.total_saldo_de_gols - a.total_saldo_de_gols;
    const goalsScored = b.total_gols_marcados - a.total_gols_marcados;
    return points || victories || goalBalance || goalsScored;
  };

  const getClassification = async (year) => {
    const response = await fetch(`http://localhost:3001/${year}`);
    const rounds = await response.json();
    const lastRound = rounds.pop().partidas;

    return lastRound.reduce((campeonato, partida) => {
      const mandante = setTeam(partida.mandante, partida.pontuacao_geral_mandante);
      const visitante = setTeam(partida.visitante, partida.pontuacao_geral_visitante);
      return [...campeonato, mandante, visitante];
    }, []).sort(orderClassification);
  };

  return { getClassification };
}

export default useFetchClassification;
