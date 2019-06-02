import Datastore from "nedb";
import path from "path";

let db = new Datastore({
  filename: path.join(__dirname, "data", "lists.db"),
  autoload: true
});

export function get(req, res) {
  db.find({}, (err, docs) => {
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(docs));
    }
  });
}

export function put(req, res) {
  if (req.body.title) {
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
