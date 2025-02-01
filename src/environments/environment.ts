// Define el tipo de los ambientes posibles
type Ambient = 'Dev' | 'QA' | 'Prod';

// Define el ambiente actual (modifica según el entorno que necesites)
const ambient: Ambient = 'Dev'; // Cambia a 'QA' o 'Prod' según el entorno deseado

// Configura las rutas base para cada entorno
const environments = {
  Dev: {
    api_url: 'https://portal.instacredit.com/centralizado/',
  },
  QA: {
    api_url: 'http://rutaUat',
  },
  Prod: {
    api_url: 'https://rutaProd',
  },
};

// Selecciona las configuraciones de acuerdo al ambiente actual
const config = environments[ambient];

// Exporta solo la URL de la API según el ambiente seleccionado
export const apiUrl = config.api_url;
