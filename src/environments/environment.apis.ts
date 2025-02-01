import { apiUrl } from './environment';

export const API = {
  Auth: {
    login: `${apiUrl}ApiAutenticacion_Autorizacion/FN`,
    logout: `${apiUrl}/ApiLogout`,
    getToken: `${apiUrl}/ApiGetToken`,
    checkToken: `${apiUrl}/ApiCheckToken`,
  },
};

export default API;
