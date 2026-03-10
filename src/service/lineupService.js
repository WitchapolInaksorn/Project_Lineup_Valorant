import { db, auth } from "./firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

export async function createLineup(data) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("คุณต้องเข้าสู่ระบบก่อนเพิ่มข้อมูล");

    const docRef = await addDoc(collection(db, "lineups"), {
      ...data,
      ownerId: user.uid,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating lineup:", error);
    throw error;
  }
}

export async function getUserLineups() {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(
      collection(db, "lineups"),
      where("ownerId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting user lineups:", error);
    return [];
  }
}

export async function getLineupsByMapAgent(mapName, agentName) {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const safeMap = mapName?.toLowerCase() || "";
    const safeAgent = agentName?.toLowerCase() || "";

    const q = query(
      collection(db, "lineups"),
      where("ownerId", "==", user.uid),
      where("map", "==", safeMap),
      where("agent", "==", safeAgent),
      orderBy("createdAt", "desc"),
    );

    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting lineups:", error);
    return [];
  }
}
export async function getLineupById(id) {
  try {
    if (!id) return null;
    const ref = doc(db, "lineups", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    };
  } catch (error) {
    console.error("Error getting lineup by ID:", error);
    return null;
  }
}

export async function updateLineup(id, data) {
  try {
    const ref = doc(db, "lineups", id);
    await updateDoc(ref, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating lineup:", error);
    throw error;
  }
}

export async function deleteLineup(id) {
  try {
    const ref = doc(db, "lineups", id);
    await deleteDoc(ref);
  } catch (error) {
    console.error("Error deleting lineup:", error);
    throw error;
  }
}
