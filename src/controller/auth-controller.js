const handleRegister = async (req, res) => {
  const result = await authService.register(req.body);
  res.status(200).send(result);
};
