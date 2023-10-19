const axios = require('axios');

axios.get('http://localhost:3000/helados')
  .then((response) => {
    console.log('Lista de helados:', response.data.helados);
  })
  .catch((error) => {
    console.error('Error al obtener la lista de helados:', error);
  });
