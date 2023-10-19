const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

const saboresDeHelado = [
  { id: 1, nombre: 'Chocolate' },
  { id: 2, nombre: 'Vainilla' },
  { id: 3, nombre: 'Fresa' },
];

// Configuración inicial de la aplicación, incluyendo el uso de JSON en las solicitudes.

app.get('/helados', (req, res) => {
  // Maneja solicitudes GET a la ruta "/helados" y devuelve la lista de sabores de helado en formato JSON.
  res.json({ sabores: saboresDeHelado });
});

// Ruta para obtener todos los sabores de helado.

app.get('/helados/:id', (req, res) => {
  // Maneja solicitudes GET a la ruta "/helados/:id" y busca un sabor de helado por su ID.
  const idSabor = parseInt(req.params.id);
  const sabor = saboresDeHelado.find((s) => s.id === idSabor);

  if (!sabor) {
    // Si el sabor no se encuentra, responde con un estado 404 y un mensaje de error.
    res.status(404).json({ mensaje: 'Sabor de helado no encontrado' });
  } else {
    // Si se encuentra el sabor, responde con los datos del sabor en formato JSON.
    res.json({ sabor });
  }
});

// Ruta para obtener un sabor de helado por su ID.

app.post('/helados', (req, res) => {
  // Maneja solicitudes POST a la ruta "/helados" y agrega un nuevo sabor de helado a la lista.
  const nuevoSabor = req.body;
  saboresDeHelado.push(nuevoSabor);
  res.status(201).json({ mensaje: 'Sabor de helado agregado con éxito', sabor: nuevoSabor });
});

// Ruta para agregar un nuevo sabor de helado.

app.put('/helados/:id', (req, res) => {
  // Maneja solicitudes PUT a la ruta "/helados/:id" y actualiza un sabor de helado existente por su ID.
  const idSabor = parseInt(req.params.id);
  const saborActualizado = req.body;

  const sabor = saboresDeHelado.find((s) => s.id === idSabor);

  if (!sabor) {
    // Si el sabor no se encuentra, responde con un estado 404 y un mensaje de error.
    return res.status(404).json({ mensaje: 'Sabor de helado no encontrado' });
  }

  // Actualiza el nombre del sabor con los nuevos datos proporcionados.
  sabor.nombre = saborActualizado.nombre;

  // Responde con un mensaje de éxito y los datos del sabor actualizado.
  res.json({ mensaje: 'Sabor de helado actualizado con éxito', sabor });
});

// Ruta para actualizar un sabor de helado existente por su ID.

app.delete('/helados/:id', (req, res) => {
  // Maneja solicitudes DELETE a la ruta "/helados/:id" y elimina un sabor de helado por su ID.
  const idSabor = parseInt(req.params.id);
  const indice = saboresDeHelado.findIndex((s) => s.id === idSabor);

  if (indice === -1) {
    // Si el sabor no se encuentra, responde con un estado 404 y un mensaje de error.
    return res.status(404).json({ mensaje: 'Sabor de helado no encontrado' });
  }

  // Elimina el sabor de helado de la lista.
  const saborEliminado = saboresDeHelado.splice(indice, 1)[0];

  // Responde con un mensaje de éxito y los datos del sabor eliminado.
  res.json({ mensaje: 'Sabor de helado eliminado con éxito', sabor: saborEliminado });
});

// Ruta para eliminar un sabor de helado por su ID.

app.listen(port, () => {
  console.log(`API de helados en ejecución en http://localhost:${port}`);
});


