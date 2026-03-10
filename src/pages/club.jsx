import { useEffect, useState } from "react";
import { createClub, getMyClubs, joinClub } from "../service/clubService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Club() {
  const [clubs, setClubs] = useState([]);
  const [newClubName, setNewClubName] = useState("");
  const [joinId, setJoinId] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadClubs();
  }, []);

  async function loadClubs() {
    const data = await getMyClubs();
    setClubs(data);
    setLoading(false);
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newClubName.trim()) return;
    try {
      await createClub(newClubName);
      setNewClubName("");
      loadClubs();
      Swal.fire({
        title: "Club Created!",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
      });
    } catch (error) {
      Swal.fire({ title: "Error", text: error.message, icon: "error" });
    }
  }

  async function handleJoin(e) {
    e.preventDefault();
    try {
      await joinClub(joinId);
      setJoinId("");
      loadClubs();
      Swal.fire({
        title: "Joined Club!",
        icon: "success",
        background: "#0f172a",
        color: "#fff",
      });
    } catch (error) {
      Swal.fire({
        title: "Club not found",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
      });
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#111827] to-black text-white relative overflow-hidden p-6">
      {/* Background Glow */}
      <div className="fixed w-[500px] h-[500px] bg-red-500 opacity-10 blur-[120px] rounded-full top-[-100px] left-[-100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto py-10">
        <h1 className="text-4xl font-black italic uppercase mb-10 border-b border-white/10 pb-4">
          Tactical <span className="text-red-500">Clubs</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Management */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-xs font-bold text-red-500 mb-4 tracking-widest text-[16px]">
                Create New Club
              </h3>
              <form onSubmit={handleCreate} className="space-y-3">
                <input
                  className="w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:border-red-500 outline-none text-sm"
                  placeholder="Club Name..."
                  value={newClubName}
                  onChange={(e) => setNewClubName(e.target.value)}
                />
                <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl text-xs transition text-[16px]">
                  Create
                </button>
              </form>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-widest text-[16px]">
                Join with ID
              </h3>
              <form onSubmit={handleJoin} className="space-y-3">
                <input
                  className="w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:border-blue-500 outline-none text-sm"
                  placeholder="Paste Club ID here..."
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                />
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs transition text-[16px]">
                  Join Club
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Club List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-2">
              My Memberships ({clubs.length})
            </h3>
            {clubs.length === 0 ? (
              <div className="text-gray-500 italic p-10 text-center bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                You haven't joined any clubs yet.
              </div>
            ) : (
              clubs.map((club) => (
                <div
                  key={club.id}
                  onClick={() => navigate(`/club/${club.id}`)}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-bold group-hover:text-red-500 transition-colors">
                      {club.name}
                    </h2>
                    <p className="text-[14px] text-gray-500 mt-1 font-mono uppercase tracking-tighter">
                      ID: {club.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300">
                      {club.members?.length || 0} Members
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(club.id);
                        Swal.fire({
                          title: "ID Copied!",
                          toast: true,
                          position: "top-end",
                          timer: 2000,
                          showConfirmButton: false,
                          icon: "success",
                        });
                      }}
                      className="block mt-2 text-[12px] text-red-400 hover:underline"
                    >
                      Copy ID to invite
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Club;
