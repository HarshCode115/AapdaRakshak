import firebase from 'firebase/compat/app'
import { getAuth} from 'firebase/auth'

import 'firebase/compat/auth'
import env from "react-dotenv";


const firebaseConfig = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId,
    measurementId: env.measurementId
  };
firebase.initializeApp(firebaseConfig);

export const auth = getAuth();


