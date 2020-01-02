export default app => {
  app.get('/', (req, res) => {
    res.json({ message: "Server is up and running" })
  })

};