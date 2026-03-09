import { useState } from "react";
import { createLineup } from "../service/lineupService";
import Swal from "sweetalert2";

function AddLineupForm({ mapName, agentName, reload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [type, setType] = useState("other");

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      map: mapName.toLowerCase(),
      agent: agentName.toLowerCase(),
      links: links.split("\n").filter((l) => l.trim() !== ""),
      type,
    };

    try {
      await createLineup(data);

      Swal.fire({
        icon: "success",
        title: "Lineup Created!",
        text: "Your lineup has been added.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });

      setTitle("");
      setDescription("");
      setLinks("");
      setType("other");

      reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Create failed",
        text: "Please try again.",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    }
  }

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
      <h2 className="text-xl font-semibold mb-6">New Lineup</h2>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* TITLE */}
        <div>
          <label className="text-xs tracking-wider text-gray-400">
            Title *
          </label>

          <input
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none"
            placeholder="e.g. B site default molly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-xs tracking-wider text-gray-400">
            Description
          </label>

          <textarea
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 resize-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none"
            rows="4"
            placeholder="Step-by-step explanation..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* LINKS */}
        <div>
          <label className="text-xs tracking-wider text-gray-400">
            Links (one per line)
          </label>

          <textarea
            className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 resize-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none"
            rows="3"
            placeholder="https://youtube.com/..."
            value={links}
            onChange={(e) => setLinks(e.target.value)}
          />
        </div>

        {/* TYPE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TYPE */}
          <div>
            <label className="text-xs tracking-wider text-gray-400">Type</label>

            <select
              className="w-full mt-2 bg-black/40 border border-white/10 rounded-lg p-3 transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="post-plant">smoke</option>
              <option value="default">molly</option>
              <option value="retake">flash</option>
              <option value="defense">wall</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-7 py-3 rounded-lg font-semibold tracking-wide transition shadow-lg shadow-red-500/20"
          >
            Save Lineup
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLineupForm;
