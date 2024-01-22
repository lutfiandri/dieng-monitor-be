const admin = require('firebase-admin');
const env = require('./env');

const serviceAccount = {
  // type: env.FirebaseType,
  projectId: env.FirebaseProjectId,
  // private_key_id: env.FirebasePrivateKey,
  privateKey: env.FirebasePrivateKey,
  clientEmail: env.FirebaseClientEmail,
  // client_id: env.FirebaseClientId,
  // auth_uri: env.FirebaseAuthUri,
  // token_uri: env.FirebaseTokenUri,
  // auth_provider_x509_cert_url: env.FirebaseAuthProviderX509CertUrl,
  // client_x509_cert_url: env.FirebaseClientX509CertUrl,
  // universe_domain: env.FirebaseUniverseDomain,
};

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(app);

module.exports = { db };
