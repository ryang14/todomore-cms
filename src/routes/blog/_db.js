import Datastore from "nedb";
import path from 'path';

let db = new Datastore({ filename: path.join(__dirname, 'data', 'posts.db'), autoload: true });

export default db;