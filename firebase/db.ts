
import { getFirestore, collection } from "firebase/firestore";
import app from "./firebaseConfig";

// Initialize Firestore
export const db = getFirestore(app);

// Collection names (matching Firebase)
export const cleaningRequestCollection = collection(
  db,
  "cleaningRequest"
);

export const cleaningOrderCollection = collection(
  db,
  "cleaningOrder"
);
