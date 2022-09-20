export const getTeamImage = (time) => `./logos/${time.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '_')}.png`;

export default getTeamImage;
