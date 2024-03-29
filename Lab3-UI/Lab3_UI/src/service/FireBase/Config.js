// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBRvHn9drqA9GVc3rvNqx5bFeqXNgMFg1o',
    authDomain: 'brave-anagram-403311.firebaseapp.com',
    projectId: 'brave-anagram-403311',
    storageBucket: 'brave-anagram-403311.appspot.com',
    messagingSenderId: '549791147244',
    appId: '1:549791147244:web:166585b519aa80916631c9',
    measurementId: 'G-L32PF2WVD9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storageImg = getStorage();

async function uploadImage(file) {
    try {
        const storageRef = ref(storageImg, `images/${v4()}`);
        const uploadTaskSnapshot = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(uploadTaskSnapshot.ref);
        const imageName = file.name;
        const caption = uploadTaskSnapshot.ref.name;
        return { imageUrl, imageName, caption };
    } catch (e) {
        throw new Error(e);
    }
}

export default uploadImage;
