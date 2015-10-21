exports.index = function(req, res, next) {
  res.render('polls/index', { title: 'Polls' });
};

exports.create = function(req, res, next) {
  res.render('polls/create', { title: 'Create a new poll' });
};

exports.show = function(req, res, next) {
  res.render('polls/show', { poll: req.params.polls, title: 'Poll ' });
};

exports.store = function(req, res, next) {
  //
};

exports.edit = function(req, res, next) {
  res.render('polls/edit', { poll: req.params.polls, title: 'Poll ' });
};

exports.update = function(req, res, next) {
  //
};
