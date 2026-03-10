import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
  getDoc,
  arrayRemove,
} from "firebase/firestore";

// สร้าง Club ใหม่
export async function createClub(clubName) {
  const user = auth.currentUser;
  if (!user) throw new Error("Please login first");

  const docRef = await addDoc(collection(db, "clubs"), {
    name: clubName,
    ownerId: user.uid,
    members: [user.uid],
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// ดึงรายการ Club ที่เราเป็นสมาชิกอยู่
export async function getMyClubs() {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "clubs"),
    where("members", "array-contains", user.uid),
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// เข้าร่วม Club ผ่าน ID
export async function joinClub(clubId) {
  const user = auth.currentUser;
  if (!user) throw new Error("Please login first");

  // 1. สร้าง Reference ไปยังคลับที่ต้องการ Join
  const clubRef = doc(db, "clubs", clubId);

  try {
    // 2. ยิง updateDoc ไปตรงๆ โดยใช้ arrayUnion เพื่อเพิ่มชื่อตัวเองเข้า members
    await updateDoc(clubRef, {
      members: arrayUnion(user.uid),
    });

    // ถ้าสำเร็จแปลว่ามีคลับจริงและ Rule อนุญาตให้เรา Join
  } catch (error) {
    // 3. ถ้าเกิด Error (เช่น ID ผิด หรือโดนเตะแล้วพยายาม Join ใหม่)
    // Firestore จะส่ง Error กลับมา ให้เราจัดการแจ้งเตือนผู้ใช้ที่นี่
    if (error.code === "not-found") {
      throw new Error("Club not found");
    } else if (error.code === "permission-denied") {
      throw new Error("You are not allowed to join this club or ID is invalid");
    }
    throw error;
  }
}

// 1. ดึงข้อมูลคลับรายอัน (เพื่อเอาชื่อคลับและเช็ค Owner)
export async function getClubById(clubId) {
  const docRef = doc(db, "clubs", clubId);
  const snap = await getDoc(docRef);
  if (snap.exists()) return { id: snap.id, ...snap.data() };
  return null;
}

// 2. ดึงโปรไฟล์สมาชิก (เพื่อให้เห็น Email หรือชื่อ แทนที่จะเห็นแค่ UID)
export async function getMembersProfile(uids) {
  const profiles = [];
  for (const uid of uids) {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      profiles.push({ uid, ...userDoc.data() });
    } else {
      profiles.push({ uid, email: "Unknown User" });
    }
  }
  return profiles;
}

// 3. ฟังก์ชันเตะสมาชิก (สำหรับ Owner)
export async function kickMember(clubId, memberUid) {
  const clubRef = doc(db, "clubs", clubId);
  await updateDoc(clubRef, {
    members: arrayRemove(memberUid),
  });
}
