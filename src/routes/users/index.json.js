import db from "./_db.js";

export function get(req, res) {
  db.find({}, { username: 1, _id: 1 }, (err, docs) => {
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(docs));
    }
  });
}

export function post(req, res) {
  if (req.body._id) {
    db.update({_id: req.body._id }, req.body);
  }

  get(req, res);
}

export function put(req, res) {
  console.log(req.body)
  if (req.body.username && req.body.password) {
    db.insert(req.body);
  }

  get(req, res);
}

export function del(req, res) {
  if (req.body._id) {
    db.remove(req.body);
  }

  get(req, res);
}
