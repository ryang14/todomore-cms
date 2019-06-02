import Datastore from "nedb";
import path from 'path';

let db = new Datastore({ filename: path.join(__dirname, 'data', 'users.db'), autoload: true });

export default db;