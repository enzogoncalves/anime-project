module.exports = {
  enterAnime(req, res) {
    res.render('anime', {id: req.params.id})
  }
}