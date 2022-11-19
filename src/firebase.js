import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAU3BLwljCzCvYVxzfv5j2BFIV5A7DXRjk",
    authDomain: "task-e2e98.firebaseapp.com",
    databaseURL: "https://task-e2e98-default-rtdb.firebaseio.com",
    projectId: "task-e2e98",
    storageBucket: "task-e2e98.appspot.com",
    messagingSenderId: "343989498018",
    appId: "1:343989498018:web:50f92bfb5aee19b79f27fb"
};


const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)