module.exports = {
  enterAnime(req, res) {
    res.render('anime', {id: req.params.id})
  },

  myList(req, res) {
    const list = req.params.list;

    res.render('my-list', {list: list})
  }
}