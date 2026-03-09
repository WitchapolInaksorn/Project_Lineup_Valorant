import { useEffect, useState } from "react";
import { getLineupsByMapAgent } from "../service/lineupService";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AddLineupForm from "../component/addLineup";

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

import ascent from "../images/ascent.webp";
import bind from "../images/bind.webp";
import breeze from "../images/breeze.webp";
import fracture from "../images/fracture.webp";
import haven from "../images/haven.webp";
import icebox from "../images/icebox.webp";
import lotus from "../images/lotus.webp";
import pearl from "../images/pearl.webp";
import split from "../images/split.webp";
import sunset from "../images/sunset.webp";
import abyss from "../images/abyss.webp";
import corrode from "../images/corrode.webp";

function Lineup() {
  const navigate = useNavigate();

  const { mapName, agentName } = useParams();
  const [lineups, setLineups] = useState([]);

  const location = useLocation();
  const isCreatePage = location.pathname.includes("/create/");

  const mapImages = {
    ascent,
    bind,
    breeze,
    fracture,
    haven,
    icebox,
    lotus,
    pearl,
    split,
    sunset,
    abyss,
    corrode,
  };

  const agentImages = {
    brimstone,
    viper,
    omen,
    astra,
    harbor,

    killjoy,
    cypher,
    sage,
    chamber,
    deadlock,

    sova,
    breach,
    skye,
    kayo,
    fade,
    gekko,

    phoenix,
    jett,
    reyna,
    raze,
    yoru,
    neon,
    iso,
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    loadLineups();
  }, [mapName, agentName]);

  async function loadLineups() {
    const data = await getLineupsByMapAgent(mapName, agentName);
    setLineups(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#111827] to-black text-white relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-red-500 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative max-w-4xl mx-auto px-6 py-10">
        <div className="relative mb-5">
          <div className="w-full h-[220px] md:h-[260px] rounded-2xl overflow-hidden">
            <img
              src={mapImages[mapName?.toLowerCase()]}
              alt={mapName}
              className="w-full h-full object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>

          {/* content */}
          <div className="absolute inset-0 flex items-center px-4 md:px-10 gap-4 md:gap-6">
            {/* agent icon - แก้ไขตรงนี้ */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur">
              <img
                src={agentImages[agentName?.toLowerCase()]}
                alt={agentName?.toLowerCase()}
                className="w-full h-full object-cover"
              />
            </div>

            {/* text */}
            <div className="min-w-0">
              {" "}
              <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-wide leading-tight">
                {agentName?.toUpperCase()}
                <span className="text-red-500 ml-2">LINEUP</span>
              </h1>
              <p className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base uppercase tracking-widest">
                Map • {mapName?.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* ADD LINEUP */}
        <div className="mb-12">
          {isCreatePage && (
            <AddLineupForm
              mapName={mapName}
              agentName={agentName}
              reload={loadLineups}
            />
          )}

          {/* LINEUP LIST */}
          {!isCreatePage && (
            <>
              {lineups.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 p-10 border border-dashed border-white/10 rounded-3xl bg-white/5">
                  <p className="text-gray-400 text-lg italic">
                    No lineups yet.
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Be the first to share a lineup for this agent!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                  {lineups.map((lineup) => (
                    <div
                      key={lineup.id}
                      onClick={() => navigate(`/lineup/detail/${lineup.id}`)}
                      className="group relative bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-1 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]"
                    >
                      {/* Hover Highlight Border */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-red-500/0 group-hover:border-red-500/50 transition-all duration-300" />

                      <div className="bg-[#0b0f19]/80 backdrop-blur-xl p-6 rounded-[14px] h-full flex flex-col justify-between">
                        <div>
                          {/* Type Tag */}
                          <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-red-500/10 border border-red-500/20 text-red-500 rounded-md">
                              {"Lineup"}
                            </span>
                            <div className="text-white/20 group-hover:text-red-500 transition-colors">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                              >
                                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                              </svg>
                            </div>
                          </div>

                          {/* Title & Description */}
                          <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors mb-2 line-clamp-1 italic">
                            {lineup.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-light">
                            {lineup.description ||
                              "No additional details provided for this lineup."}
                          </p>
                        </div>

                        {/* Info Footer */}
                        <div className="space-y-2 border-t border-white/5 pt-4">
                          <div className="flex justify-between text-[11px] uppercase tracking-tighter">
                            <span className="text-gray-500">Map</span>
                            <span className="text-white font-semibold">
                              {lineup.map}
                            </span>
                          </div>
                          <div className="flex justify-between text-[11px] uppercase tracking-tighter">
                            <span className="text-gray-500">Agent</span>
                            <span className="text-red-500 font-bold">
                              {lineup.agent}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lineup;
