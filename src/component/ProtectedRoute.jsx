import { auth, db } from "../service/firebase";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await signOut(auth);
          setUser(null);
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        await signOut(auth);
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1923] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-red-500/50 rounded-full animate-spin-slow"></div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <p className="text-red-500 font-black tracking-[0.2em] animate-pulse">
            Loading...
          </p>
          <div className="w-32 h-[2px] bg-white/10 mt-2 overflow-hidden">
            <div className="w-full h-full bg-red-500 origin-left animate-loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
