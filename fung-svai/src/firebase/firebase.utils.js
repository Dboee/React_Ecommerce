import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyByPo6S3f6KSnM99ajeR6RK2WVITsEtkS4",
    authDomain: "fung-svai.firebaseapp.com",
    databaseURL: "https://fung-svai.firebaseio.com",
    projectId: "fung-svai",
    storageBucket: "fung-svai.appspot.com",
    messagingSenderId: "129376177298",
    appId: "1:129376177298:web:8959ebc6bac81ba0ed2a4b",
    measurementId: "G-QB8F84E375"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;

};




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;