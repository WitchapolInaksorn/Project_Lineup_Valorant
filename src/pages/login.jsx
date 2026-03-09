import { auth } from "../service/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../service/userService";

function Login() {
  const navigate = useNavigate();

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await saveUser(result.user);

    navigate("/maps", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#111827] to-black flex items-center justify-center relative overflow-hidden">
      {/* glow background */}
      <div className="absolute w-[500px] h-[500px] bg-primary opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* card */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 w-[420px] shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Valorant Lineup
        </h1>

        <p className="text-gray-400 text-center mb-5">
          save and manage your lineups
        </p>

        <button
          onClick={loginGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5"
          />
          Continue with Google
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Let's create lineup that amazing together! 🚀
        </p>
      </div>
    </div>
  );
}

export default Login;
