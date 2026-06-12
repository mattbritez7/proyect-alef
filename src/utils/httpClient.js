import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data, config } = error.response;
      const endpoint = config?.url || "desconocido";
      const method = config?.method?.toUpperCase() || "?";
      console.error(
        `[${method} ${endpoint}] Error ${status}:`,
        data
      );
      error.detailedMessage =
        data?.msg || data?.message ||
        `Error ${status} en ${method} ${endpoint}`;
    } else if (error.request) {
      console.error("Error de red: no se recibió respuesta del servidor", error.message);
      error.detailedMessage = "Error de conexión: no se pudo conectar con el servidor. Verifica tu conexión a internet.";
    } else {
      console.error("Error al configurar la solicitud:", error.message);
      error.detailedMessage = `Error interno: ${error.message}`;
    }
    return Promise.reject(error);
  }
);

export default httpClient;