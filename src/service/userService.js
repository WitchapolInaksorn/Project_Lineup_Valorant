import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function saveUser(user) {
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email || "",
      name: user.displayName || "",
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}
