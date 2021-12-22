import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWWOkdJPHnC5VDALEPtf-Tt17KUuJgqII",
  authDomain: "fir-react-upload-images-e234f.firebaseapp.com",
  projectId: "fir-react-upload-images-e234f",
  storageBucket: "fir-react-upload-images-e234f.appspot.com",
  messagingSenderId: "629323882661",
  appId: "1:629323882661:web:8d581203a6402a9d652d4c",
  measurementId: "G-MJ8FY6QQZ9",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
