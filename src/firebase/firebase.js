import admin from 'firebase-admin';

async function initializeFirebaseAdmin() {
  const serviceAccount = await import('../config/config.json', {
    assert: { type: 'json' }
  });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
    databaseURL: 'https://fullstackapp-e3122-default-rtdb.firebaseio.com',
    storageBucket: 'fullstackapp-e3122.appspot.com', // Add this line for storage bucket

  });

  return admin;
}
const firebaseAdmin = await initializeFirebaseAdmin();
const bucket = firebaseAdmin.storage().bucket();

export default firebaseAdmin;
