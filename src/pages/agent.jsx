import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import brimstone from "../images/brimstone.avif";
import viper from "../images/viper.avif";
import omen from "../images/omen.avif";
import astra from "../images/astra.avif";
import harbor from "../images/harbor.webp";

import killjoy from "../images/killjoy.avif";
import cypher from "../images/cypher.avif";
import sage from "../images/sage.png";
import chamber from "../images/chamber.avif";
import deadlock from "../images/deadlock.avif";

import sova from "../images/sova.webp";
import breach from "../images/breach.avif";
import skye from "../images/skye.avif";
import kayo from "../images/kayo.png";
import fade from "../images/fade.png";
import gekko from "../images/gekko.avif";

import phoenix from "../images/phoenix.png";
import jett from "../images/jett.png";
import reyna from "../images/reyna.avif";
import raze from "../images/raze.png";
import yoru from "../images/yoru.avif";
import neon from "../images/neon.avif";
import iso from "../images/iso.png";

const agents = [
  { name: "Brimstone", role: "Controller", image: brimstone },
  { name: "Viper", role: "Controller", image: viper },
  { name: "Omen", role: "Controller", image: omen },
  { name: "Astra", role: "Controller", image: astra },
  { name: "Harbor", role: "Controller", image: harbor },

  { name: "Killjoy", role: "Sentinel", image: killjoy },
  { name: "Cypher", role: "Sentinel", image: cypher },
  { name: "Sage", role: "Sentinel", image: sage },
  { name: "Chamber", role: "Sentinel", image: chamber },
  { name: "Deadlock", role: "Sentinel", image: deadlock },

  { name: "Sova", role: "Initiator", image: sova },
  { name: "Breach", role: "Initiator", image: breach },
  { name: "Skye", role: "Initiator", image: skye },
  { name: "Kayo", role: "Initiator", image: kayo },
  { name: "Fade", role: "Initiator", image: fade },
  { name: "Gekko", role: "Initiator", image: gekko },

  { name: "Phoenix", role: "Duelist", image: phoenix },
  { name: "Jett", role: "Duelist", image: jett },
  { name: "Reyna", role: "Duelist", image: reyna },
  { name: "Raze", role: "Duelist", image: raze },
  { name: "Yoru", role: "Duelist", image: yoru },
  { name: "Neon", role: "Duelist", image: neon },
  { name: "Iso", role: "Duelist", image: iso },
];

function Agents() {
  const { mapName } = useParams();
  const [search, setSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);

  const navigate = useNavigate();

  const roles = ["Controller", "Sentinel", "Initiator", "Duelist"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#111827] to-black text-white relative overflow-hidden">
      {/* glow background */}
      <div className="absolute w-[500px] h-[500px] bg-primary opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-2">
          SELECT <span className="text-red-500">AGENT</span>
        </h1>

        <p className="text-gray-400 mb-6">
          Choose an agent to view lineups on {mapName?.toUpperCase()}
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search agent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[400px] mb-10 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-red-500 transition"
        />

        {roles.map((role) => {
          const filteredAgents = agents.filter(
            (agent) =>
              agent.role === role &&
              agent.name.toLowerCase().includes(search.toLowerCase()),
          );

          if (filteredAgents.length === 0) return null;

          return (
            <div key={role} className="mb-14">
              {/* Role Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <h2 className="px-6 py-2 rounded-full text-sm font-semibold tracking-widest bg-white/5 border border-white/10 backdrop-blur-md text-white shadow-lg">
                  {role.toUpperCase()}
                </h2>

                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* Agent Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent.name}
                    onClick={() => setSelectedAgent(agent)}
                    className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300
                    bg-gradient-to-b from-white/5 to-black/40
                    border border-white/10
                    hover:border-red-500
                    hover:shadow-[0_0_30px_rgba(255,60,60,0.25)]
                    backdrop-blur-xl"
                  >
                    {/* Agent Image */}
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="absolute inset-0 w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />

                    {/* Agent Name */}
                    <p
                      className="absolute bottom-4 w-full text-center text-white
              font-bold tracking-widest text-lg
              drop-shadow-lg"
                    >
                      {agent.name}
                    </p>

                    {/* subtle hover light */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-t from-red-500/10 to-transparent"></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* AGENT POPUP */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className="
            w-[320px]
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            rounded-2xl
            p-6
            shadow-2xl
            text-center
            relative
          "
          >
            {/* close */}
            <button
              onClick={() => setSelectedAgent(null)}
              className="absolute top-3 right-4 text-gray-300 hover:text-white"
            >
              ✕
            </button>

            {/* agent image */}
            <img
              src={selectedAgent.image}
              alt={selectedAgent.name}
              className="w-24 h-24 object-cover rounded-xl mx-auto mb-4"
            />

            <h2 className="text-xl font-bold mb-6">{selectedAgent.name}</h2>

            <div className="flex flex-col gap-3 mt-2">
              {/* 1. CREATE LINEUP - Primary Action */}
              <button
                onClick={() =>
                  navigate(
                    `/lineup/create/${mapName}/${selectedAgent.name.toLowerCase()}`,
                  )
                }
                className="group relative overflow-hidden bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.3)] active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-lg">+</span> Create Lineup
                </span>
                {/* Subtle sweep animation on hover */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>

              {/* 2. VIEW LINEUPS - Secondary Action */}
              <button
                onClick={() =>
                  navigate(
                    `/lineup/${mapName}/${selectedAgent.name.toLowerCase()}`,
                  )
                }
                className="bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 py-3 rounded-xl font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95"
              >
                View Lineups
              </button>

              {/* 3. JOIN CLUB - Tertiary Action */}
              <button
                onClick={() =>
                  navigate(`/club`, { state: { fromMap: mapName } })
                }
                className="bg-transparent hover:bg-white/5 text-gray-400 hover:text-white py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 opacity-70 hover:opacity-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Community Clubs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Agents;
