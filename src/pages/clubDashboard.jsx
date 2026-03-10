import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getClubById,
  getMembersProfile,
  kickMember,
} from "../service/clubService";
import { auth } from "../service/firebase";
import Swal from "sweetalert2";

function ClubDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = auth.currentUser;

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      const clubData = await getClubById(id);

      if (!clubData) {
        Swal.fire({
          title: "Access Denied",
          text: "You are no longer a member of this club.",
          icon: "error",
        });
        return navigate("/club");
      }

      setClub(clubData);
      const memberProfiles = await getMembersProfile(clubData.members);
      setMembers(memberProfiles);
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        title: "Permission Denied",
        text: "คุณไม่มีสิทธิ์เข้าถึงคลับนี้ หรือถูกเชิญออกแล้ว",
        icon: "error",
        background: "#0f172a",
        color: "#fff",
      });
      navigate("/club");
    } finally {
      setLoading(false);
    }
  }

  async function handleKick(member) {
    const result = await Swal.fire({
      title: "Kick Member?",
      text: `Are you sure you want to remove ${member.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: "#0f172a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await kickMember(id, member.uid);
        Swal.fire({
          title: "Kicked!",
          icon: "success",
          background: "#0f172a",
          color: "#fff",
        });
        loadData(); // Reload list
      } catch (e) {
        Swal.fire({ title: "Error", text: "Permission denied", icon: "error" });
      }
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

  const isOwner = club?.ownerId === currentUser?.uid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#111827] to-black text-white p-6 relative">
      <div className="relative max-w-4xl mx-auto py-10">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">
          <div>
            <button
              onClick={() => navigate("/club")}
              className="text-gray-500 hover:text-white text-base mb-4 flex items-center gap-2 transition"
            >
              ← Back to Clubs
            </button>
            <h1 className="text-4xl font-black italic uppercase italic">
              {club?.name}{" "}
              <span className="text-red-500 text-sm not-italic ml-2 opacity-50">
                Dashboard
              </span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">
              Club ID
            </p>
            <p className="font-mono text-xs text-red-400">{club?.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stats Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit backdrop-blur-xl">
            <h3 className="text-xs font-bold text-red-500 mb-6 tracking-widest uppercase text-center">
              Club Info
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500 text-xs">Total Members</span>
                <span className="text-sm font-bold">{members.length}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500 text-xs">Role</span>
                <span
                  className={`text-[10px] font-bold px-2 rounded ${isOwner ? "bg-red-500 text-white" : "bg-blue-500/20 text-blue-400"}`}
                >
                  {isOwner ? "OWNER" : "MEMBER"}
                </span>
              </div>
            </div>
          </div>

          {/* Member List */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase ml-2">
              Member List
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {members.map((m) => (
                <div
                  key={m.uid}
                  className="flex justify-between items-center p-4 border-b border-white/5 hover:bg-white/[0.02] transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${m.uid === club.ownerId ? "bg-red-500" : "bg-gray-700"}`}
                    >
                      {m.email?.[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {m.email}{" "}
                        {m.uid === currentUser.uid && (
                          <span className="text-gray-500 text-[10px] ml-1">
                            (You)
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase">
                        {m.uid === club.ownerId ? "Club Leader" : "Member"}
                      </p>
                    </div>
                  </div>

                  {/* Show Kick button only for Owner AND don't let owner kick themselves */}
                  {isOwner && m.uid !== club.ownerId && (
                    <button
                      onClick={() => handleKick(m)}
                      className="text-[10px] font-bold text-gray-500 hover:text-red-500 border border-white/10 hover:border-red-500/50 px-3 py-1 rounded-lg transition"
                    >
                      KICK
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDashboard;
