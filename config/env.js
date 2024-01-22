const dotenv = require('dotenv');

dotenv.config();

const env = {
  AppPort: process.env.APP_PORT,

  FirebaseType: process.env.FIREBASE_TYPE,
  FirebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  FirebasePrivateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  FirebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
  FirebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  FirebaseClientId: process.env.FIREBASE_CLIENT_ID,
  FirebaseAuthUri: process.env.FIREBASE_AUTH_URI,
  FirebaseTokenUri: process.env.FIREBASE_TOKEN_URI,
  FirebaseAuthProviderX509CertUrl:
    process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FirebaseClientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  FirebaseUniverseDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

module.exports = env;
