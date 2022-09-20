const firstYear = 2016;
const lastYear = 2003;

export const getYears = () => Array.from({ length: firstYear - lastYear }, (_, i) => i + lastYear);

export default getYears;
