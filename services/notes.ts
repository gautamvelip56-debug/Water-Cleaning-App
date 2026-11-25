
import {
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
  cleaningRequestCollection,
  cleaningOrderCollection,
} from "../firebase/db";

// =====================================
// COLLECTION NAMES
// =====================================

const REQUESTS_COLLECTION = "cleaningRequest";
const ORDERS_COLLECTION = "cleaningOrder";

// =====================================
// CLEANING REQUEST TYPE
// =====================================

export interface CleaningRequest {
  id?: string;
  description: string;
  imageUrl: string;
  locationName: string;
  pollutionType: string;
  riverName: string;
  status: string;
  waterbodyType: string;
  createdAt?: any;
}

// =====================================
// CLEANING ORDER TYPE
// =====================================

export interface CleaningOrder {
  id?: string;
  cleaningDate: string;
  contact: string;
  organizerName: string;
  requestId: string;
  status: string;
  volunteerCount: string;
  createdAt?: any;
}

// =====================================
// ADD CLEANING REQUEST
// =====================================

export const addCleaningRequest = async (
  data: CleaningRequest
) => {
  try {
    const docRef = await addDoc(
      cleaningRequestCollection,
      {
        ...data,
        status: data.status || "open",
        createdAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    console.error("Error adding request:", error);
    throw error;
  }
};

// =====================================
// GET ALL CLEANING REQUESTS
// =====================================

export const getCleaningRequests = async () => {
  try {
    const snapshot = await getDocs(cleaningRequestCollection);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as CleaningRequest[];

  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

// =====================================
// REAL-TIME CLEANING REQUESTS
// =====================================

export const listenCleaningRequests = (
  callback: (requests: CleaningRequest[]) => void
) => {
  return onSnapshot(cleaningRequestCollection, (snapshot) => {
    const requests = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as CleaningRequest[];

    callback(requests);
  });
};

// =====================================
// UPDATE CLEANING REQUEST STATUS
// =====================================

export const updateCleaningRequestStatus = async (
  id: string,
  status: string
) => {
  const requestRef = doc(db, REQUESTS_COLLECTION, id);

  await updateDoc(requestRef, {
    status: status,
  });
};

// =====================================
// DELETE CLEANING REQUEST
// =====================================

export const deleteCleaningRequest = async (
  id: string
) => {
  const requestRef = doc(db, REQUESTS_COLLECTION, id);

  await deleteDoc(requestRef);
};

// =====================================
// ADD CLEANING ORDER
// =====================================

export const addCleaningOrder = async (
  data: CleaningOrder
) => {
  try {
    const docRef = await addDoc(
      cleaningOrderCollection,
      {
        ...data,
        status: data.status || "pending",
        createdAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

// =====================================
// GET ALL CLEANING ORDERS
// =====================================

export const getCleaningOrders = async () => {
  try {
    const snapshot = await getDocs(cleaningOrderCollection);

    return snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as CleaningOrder[];

  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// =====================================
// REAL-TIME CLEANING ORDERS
// =====================================

export const listenCleaningOrders = (
  callback: (orders: CleaningOrder[]) => void
) => {
  return onSnapshot(cleaningOrderCollection, (snapshot) => {
    const orders = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as CleaningOrder[];

    callback(orders);
  });
};

// =====================================
// UPDATE CLEANING ORDER STATUS
// =====================================

export const updateCleaningOrderStatus = async (
  id: string,
  status: string
) => {
  const orderRef = doc(db, ORDERS_COLLECTION, id);

  await updateDoc(orderRef, {
    status: status,
  });
};

// =====================================
// DELETE CLEANING ORDER
// =====================================

export const deleteCleaningOrder = async (
  id: string
) => {
  const orderRef = doc(db, ORDERS_COLLECTION, id);

  await deleteDoc(orderRef);
};