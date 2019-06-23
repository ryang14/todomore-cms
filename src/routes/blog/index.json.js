import db from "./_db.js";

export function get(req, res) {
  db.find({}, { title: 1, _id: 1 }, (err, docs) => {
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
    if(req.body.html == undefined) req.body.html = "";
    db.update({_id: req.body._id }, req.body);
  }

  get(req, res);
}

export function put(req, res) {
  if (req.body.title) {
    if(req.body.html == undefined) req.body.html = "";
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
