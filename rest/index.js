
export default app => {
  const userRouter = require('./controllers/userRouter');

  app.use('/api/auth', userRouter);

  app.get('/', (req, res) => {
    res.json({ message: "Server is up and running" })
  })
};