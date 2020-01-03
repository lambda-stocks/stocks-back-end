
export default app => {
  const userRouter = require('./controllers/userRouter');
  const watchlistRouter = require('./controllers/wishlistRouter');

  app.use('/api/auth', userRouter);
  app.use('/api/auth', watchlistRouter);

  app.get('/', (req, res) => {
    res.json({ message: "Server is up and running" })
  })
};