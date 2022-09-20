import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

import { getTeamImage } from '../../utils';

function Classification({ classification }) {
  return (
    <Table bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Pts</th>
          <th>PJ</th>
          <th>VIT</th>
          <th>E</th>
          <th>DER</th>
          <th>GM</th>
          <th>GC</th>
          <th>SG</th>
        </tr>
      </thead>

      <tbody>
        {classification.map((team, key) => (
          <tr key={team.name}>
            <td>{key + 1}</td>
            <td style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            >
              <img src={getTeamImage(team.name)} alt={team.name} width={20} />
              <span>{team.name}</span>
            </td>
            <td>{team.total_pontos}</td>
            <td>{team.total_jogos}</td>
            <td>{team.total_vitorias}</td>
            <td>{team.total_empates}</td>
            <td>{team.total_derrotas}</td>
            <td>{team.total_gols_marcados}</td>
            <td>{team.total_gols_sofridos}</td>
            <td>{team.total_saldo_de_gols}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

Classification.propTypes = {
  classification: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    total_pontos: PropTypes.number.isRequired,
    total_jogos: PropTypes.number.isRequired,
    total_vitorias: PropTypes.number.isRequired,
    total_empates: PropTypes.number.isRequired,
    total_derrotas: PropTypes.number.isRequired,
    total_gols_marcados: PropTypes.number.isRequired,
    total_saldo_de_gols: PropTypes.number.isRequired,
  })),
};

Classification.defaultProps = {
  classification: [],
};

export default Classification;
