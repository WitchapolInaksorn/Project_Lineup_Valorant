import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getLineupById,
  updateLineup,
  deleteLineup,
} from "../service/lineupService";
import Swal from "sweetalert2";

function LineupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lineup, setLineup] = useState(null);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    loadLineup();
  }, [id]);

  async function loadLineup() {
    try {
      const data = await getLineupById(id);
      if (!data) {
        setLineup(null);
      } else {
        setLineup(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setLinks(data.links ? data.links.join("\n") : "");
        setType(data.type || "other");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  function unlock() {
    if (password === "w") {
      setUnlocked(true);
      Swal.fire({
        icon: "success",
        title: "Admin Access Granted",
        text: "You can now edit or delete this lineup.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
        timer: 1300,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong Password",
        text: "The password you entered is incorrect.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  }

  async function saveEdit() {
    if (!unlocked)
      Swal.fire({
        icon: "warning",
        title: "Access Locked",
        text: "Please unlock the admin panel before editing.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });

    const updatedData = {
      title,
      description,
      links: links.split("\n").filter((l) => l.trim() !== ""),
      type,
    };

    try {
      await updateLineup(id, updatedData);
      Swal.fire({
        icon: "success",
        title: "Lineup Updated",
        text: "Your changes have been saved successfully.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
        timer: 1300,
      });

      setUnlocked(false);
      setPassword("");

      loadLineup();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the lineup.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  }

  async function remove() {
    if (!unlocked)
      Swal.fire({
        icon: "warning",
        title: "Access Locked",
        text: "Please unlock the admin panel before editing.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Lineup?",
      text: `You are about to delete "${lineup?.title}". This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#0f172a",
      color: "#fff",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        await deleteLineup(id);
        await Swal.fire({
          icon: "success",
          title: "Lineup Deleted",
          text: "The lineup has been permanently removed.",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
          timer: 1300,
        });
        navigate(-1);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Unable to delete this lineup. Please try again.",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  }

  function handleCancel() {
    setTitle(lineup?.title || "");
    setDescription(lineup?.description || "");
    setLinks(lineup?.links ? lineup?.links.join("\n") : "");
    setType(lineup?.type || "other");
    setUnlocked(false);
    setPassword("");
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-red-500 font-bold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#111827] to-black text-white relative overflow-hidden">
      <div className="fixed w-[500px] h-[500px] bg-red-500 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px] pointer-events-none" />
      <div className="fixed w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-10 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <div className="flex gap-3 mb-2">
              <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[10px] font-bold uppercase border border-red-500/30 rounded">
                Lineup
              </span>
              <span className="text-gray-500 text-xs uppercase tracking-widest">
                {lineup?.map} // {lineup?.agent}
              </span>
            </div>
            <h1 className="text-4xl font-black italic uppercase italic">
              {lineup?.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* VIEW CONTENT (LEFT) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-red-500 mb-4 tracking-widest">
                Description
              </h3>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {lineup?.description || "No description."}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xs font-bold text-red-500 mb-4 tracking-widest">
                Reference Links
              </h3>
              <div className="space-y-2">
                {lineup?.links &&
                lineup.links.length > 0 &&
                lineup.links[0] !== "" ? (
                  lineup.links.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-blue-400 hover:text-red-400 text-sm truncate underline"
                    >
                      {link}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-600 italic text-sm">
                    No links attached.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className={`p-6 rounded-2xl border transition-all ${unlocked ? "bg-green-500/5 border-green-500/20" : "bg-white/5 border-white/10"}`}
            >
              <h3 className="text-xs font-bold uppercase mb-4 tracking-widest text-center">
                {unlocked ? "🔓 EDITOR UNLOCKED" : "🔒 ADMIN ACCESS"}
              </h3>

              {!unlocked ? (
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-black/40 border border-white/10 p-3 rounded-xl focus:border-red-500 outline-none text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    onClick={unlock}
                    className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold text-xs transition uppercase"
                  >
                    Unlock
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-gray-500 font-bold">Title</label>
                    <input
                      className="w-full mt-1 bg-black/60 border border-white/10 rounded-lg p-2"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-gray-500 font-bold">
                      Description
                    </label>
                    <textarea
                      className="w-full mt-1 bg-black/60 border border-white/10 rounded-lg p-2 h-24"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-gray-500 font-bold">
                      Links (One per line)
                    </label>
                    <textarea
                      className="w-full mt-1 bg-black/60 border border-white/10 rounded-lg p-2 h-20"
                      value={links}
                      onChange={(e) => setLinks(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                    <div>
                      <label className="text-gray-500 font-bold">Type</label>
                      <select
                        className="w-full mt-1 bg-black/60 border border-white/10 rounded-lg p-2"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="smoke">smoke</option>
                        <option value="molly">molly</option>
                        <option value="flash">flash</option>
                        <option value="wall">wall</option>
                        <option value="other">other</option>
                      </select>
                    </div>
                  </div>

                  {/* ส่วนท้ายของ Editor Panel */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-normal transition text-[15px]"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 bg-white/10 hover:bg-white/20 py-3 rounded-lg font-normal transition text-[15px]"
                    >
                      Cancel
                    </button>
                  </div>

                  <button
                    onClick={remove}
                    className="px-4 bg-red-500/70 hover:bg-red-500/90 py-3 rounded-lg font-normal transition text-xs w-full text-center text-[15px]"
                  >
                    Delete Lineup
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineupDetail;
