import db from "./_db.js";

export function get(req, res) {
  const { slug } = req.params;

  db.findOne({ _id: slug }, (err, docs) => {
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(docs));
    }
  });
}
