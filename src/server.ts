import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => {
  return console.log(`🚀 Server is runing at port ${PORT} 🦦`);
});
