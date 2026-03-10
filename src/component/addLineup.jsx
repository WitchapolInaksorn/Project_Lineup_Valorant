import { useState, useEffect } from "react";
import { createLineup } from "../service/lineupService";
import { getMyClubs } from "../service/clubService"; // Import ฟังก์ชันดึงคลับ
import Swal from "sweetalert2";

function AddLineupForm({ mapName, agentName, reload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [type, setType] = useState("other");

  // States สำหรับระบบ Club
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(""); // ค่าว่าง = Personal (Private)

  // ดึงรายการคลับที่ User อยู่ตอนโหลดหน้า
  useEffect(() => {
    async function loadClubs() {
      try {
        const myClubs = await getMyClubs();
        setClubs(myClubs);
      } catch (error) {
        console.error("Error loading clubs:", error);
      }
    }
    loadClubs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      map: mapName.toLowerCase(),
      agent: agentName.toLowerCase(),
      links: links.split("\n").filter((l) => l.trim() !== ""),
      type,
      // ถ้าเลือกคลับ จะส่ง clubId ไปด้วย ถ้าไม่เลือกจะเป็น null
      clubId: selectedClub || null,
    };

    try {
      await createLineup(data);

      Swal.fire({
        icon: "success",
        title: "Lineup Created!",
        text: selectedClub
          ? "Shared with your club successfully."
          : "Added to your personal list.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
        timer: 1500,
      });

      // Clear Form
      setTitle("");
      setDescription("");
      setLinks("");
      setType("other");
      setSelectedClub("");

      reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: error.message || "Please try again.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  }

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">New Tactical Lineup</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* TITLE */}
        <div>
          <label className="text-sm tracking-wider text-gray-400 font-semibold">
            Lineup Title *
          </label>
          <input
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none"
            placeholder="e.g. A-Site Default Snake Bite"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm tracking-wider text-gray-400 font-semibold">
            Execution Steps
          </label>
          <textarea
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 resize-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none"
            rows="3"
            placeholder="Stand in the corner, aim at the cloud..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* LINKS */}
        <div>
          <label className="text-sm tracking-wider text-gray-400 font-semibold">
            Video/Image Links (One per line)
          </label>
          <textarea
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 resize-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none text-blue-400"
            rows="2"
            placeholder="https://youtube.com/..."
            value={links}
            onChange={(e) => setLinks(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TYPE SELECTOR */}
          <div>
            <label className="text-sm tracking-wider text-gray-400 font-semibold">
              Utility Type
            </label>
            <select
              className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 transition focus:border-red-500 outline-none cursor-pointer"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="smoke" className="bg-[#111]">
                Smoke
              </option>
              <option value="molly" className="bg-[#111]">
                Molly / Grenade
              </option>
              <option value="flash" className="bg-[#111]">
                Flash
              </option>
              <option value="wall" className="bg-[#111]">
                Wall / Barrier
              </option>
              <option value="other" className="bg-[#111]">
                Other
              </option>
            </select>
          </div>

          {/* CLUB SELECTOR (The New Part!) */}
          <div>
            <label className="text-sm tracking-wider text-gray-400 font-semibold">
              Share Visibility
            </label>
            <select
              className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 transition focus:border-red-500 outline-none cursor-pointer"
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
            >
              <option value="" className="bg-[#111]">
                🔒 Personal (Only Me)
              </option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id} className="bg-[#111]">
                  👥 {club.name}
                </option>
              ))}
            </select>
            <p className="text-[13px] text-gray-500 mt-2 italic">
              {selectedClub
                ? "Everyone in this club will see your lineup."
                : "Only you can see this lineup."}
            </p>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-red-700/70 hover:bg-red-600/70 px-10 py-4 rounded-xl font-bold tracking-widest transition shadow-lg shadow-red-500/20 text-sm"
          >
            Save Lineup
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLineupForm;
