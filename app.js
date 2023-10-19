const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // Habilita el middleware para analizar JSON en las solicitudes POST

const saboresDeHelado = [
  { id: 1, nombre: 'Chocolate' },
  { id: 2, nombre: 'Vainilla' },
  { id: 3, nombre: 'Fresa' },
  // Agrega más sabores según tus necesidades
];

app.get('/helados', (req, res) => {
  // Devuelve la lista de sabores de helado en formato JSON
  res.json({ sabores: saboresDeHelado });
});

app.get('/helados/:id', (req, res) => {
  const idSabor = parseInt(req.params.id);
  const sabor = saboresDeHelado.find((s) => s.id === idSabor);

  if (!sabor) {
    res.status(404).json({ mensaje: 'Sabor de helado no encontrado' });
  } else {
    res.json({ sabor });
  }
});

app.post('/helados', (req, res) => {
  // Agregar un nuevo sabor de helado
  const nuevoSabor = req.body;
  saboresDeHelado.push(nuevoSabor);
  res.status(201).json({ mensaje: 'Sabor de helado agregado con éxito', sabor: nuevoSabor });
});

app.listen(port, () => {
  console.log(`API de helados en ejecución en http://localhost:${port}`);
});

