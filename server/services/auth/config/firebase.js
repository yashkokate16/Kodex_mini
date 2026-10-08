import {cert, initializeApp} from "firebase-admin/app";
import serviceAccount from "../ServiceAccountKey.json" with {type: "json"};

export let app = initializeApp({
  credential: cert(serviceAccount)
});
