import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// после заполнения базы данных, запускать (снять комментарий) 
// только 1 раз, чтобы не получить дубли данных
// import { seedDatabase } from '../seed'

const config = {
  apiKey: "AIzaSyBCn9XfUUuN-9SfhWLrN9HwcrrpVRKqQu4",
  authDomain: "netflix-abe80.firebaseapp.com",
  databaseURL: "https://netflix-abe80.firebaseio.com",
  projectId: "netflix-abe80",
  storageBucket: "netflix-abe80.appspot.com",
  messagingSenderId: "1056223994566",
  appId: "1:1056223994566:web:6f3f2756e4df2f1b172dc7"
};

const firebase = Firebase.initializeApp(config)

// после заполнения базы данных, запускать (снять комментарий)
//  только 1 раз, чтобы не получить дубли данных
// seedDatabase(firebase)

export { firebase }