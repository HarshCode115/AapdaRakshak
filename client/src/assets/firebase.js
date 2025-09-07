import firebase from 'firebase/compat/app'
import { getAuth} from 'firebase/auth'

import 'firebase/compat/auth'
import env from "react-dotenv";


const firebaseConfig = {
    apiKey: "AIzaSyCNVedZBE8xLlknnUsdoNHWvd3HcqaoOyg",
    authDomain: "aapdarakshak-47b49.firebaseapp.com",
    projectId: "aapdarakshak-47b49",
    storageBucket: "aapdarakshak-47b49.firebasestorage.app",
    messagingSenderId: "126840742020",
    appId: "1:126840742020:web:e449b63e32f8479650e2d1",
    measurementId: "G-E00BBTLHBW"
  };
firebase.initializeApp(firebaseConfig);

export const auth = getAuth();


