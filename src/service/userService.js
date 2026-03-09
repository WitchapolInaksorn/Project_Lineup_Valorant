import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function saveUser(user) {
  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      name: user.displayName,
    },
    { merge: true },
  );
}
