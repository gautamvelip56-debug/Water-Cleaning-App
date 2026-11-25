import { getAuth } from 'firebase/auth';
import app from './firebaseConfig';

// Initialize Firebase Authentication
export const auth = getAuth(app);