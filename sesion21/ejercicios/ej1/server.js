var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

const CRUD = async () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();
    const usuariosCollection = db.collection('usuarios');
    console.log(db);

    try {
        const doc = usuariosCollection.doc('2');
        const response = await doc.create({ name: 'rafa' });
        const docRef = db.collection('users').doc('alovelace2');

        await docRef.set({
          first: 'Ada',
          last: 'Lovelace',
          born: 1815
        });

        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

CRUD();
