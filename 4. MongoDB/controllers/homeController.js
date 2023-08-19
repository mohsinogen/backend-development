const home = (req, res) => {
  res.status(200);
  res.json({
    code:200,
    remark: 'success'
  })
};

export { home }