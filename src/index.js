import app from './app.js';

const main = () => {
  app.listen(4000, () => {
    console.log(`Servidor escuchando en el puerto 4000`);
  });
};

main();
