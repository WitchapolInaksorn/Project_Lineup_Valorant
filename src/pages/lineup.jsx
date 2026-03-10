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
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const isCreatePage = location.pathname.includes("/create/");

  const [filterSide, setFilterSide] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("valorant-favs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("valorant-favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

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
    setIsLoading(true);
    try {
      const data = await getLineupsByMapAgent(mapName, agentName);
      setLineups(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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

          {!isCreatePage && (
            <>
              {/* SEARCH & FILTER AREA */}
              <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-red-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search lineup title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-red-500/50 transition-all text-sm"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                  {["All", "Favorite"].map((side) => (
                    <button
                      key={side}
                      onClick={() => setFilterSide(side)}
                      className={`flex-1 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300 ${
                        filterSide === side
                          ? "bg-red-500 text-white shadow-lg"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {side}
                    </button>
                  ))}
                </div>
              </div>

              {/* FILTER LOGIC */}
              {(() => {
                if (isLoading) {
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="animate-pulse bg-white/5 border border-white/10 rounded-2xl h-[280px] relative overflow-hidden"
                        >
                          <div className="p-6 space-y-4">
                            <div className="h-4 bg-white/10 rounded w-1/4"></div>
                            <div className="h-8 bg-white/10 rounded w-3/4"></div>
                            <div className="space-y-2">
                              <div className="h-3 bg-white/5 rounded w-full"></div>
                              <div className="h-3 bg-white/5 rounded w-5/6"></div>
                            </div>
                            <div className="pt-10 space-y-3">
                              <div className="h-2 bg-white/5 rounded w-full"></div>
                              <div className="h-2 bg-white/5 rounded w-full"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                // 2. กรองข้อมูลตาม Search และ Tabs
                const filteredLineups = lineups.filter((l) => {
                  const matchSearch = l.title
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());

                  if (filterSide === "Favorite") {
                    return favorites.includes(l.id) && matchSearch;
                  }
                  const matchSide =
                    filterSide === "All" || l.side === filterSide;
                  return matchSide && matchSearch;
                });

                // 3. ถ้าโหลดเสร็จแล้วแต่ไม่มีข้อมูลจริงๆ
                if (filteredLineups.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center mt-10 p-16 border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        fill="gray"
                        viewBox="0 0 256 256"
                        className="mb-4 opacity-20"
                      >
                        <path
                          d="M228,128a100,100,0,1,1-100-100A100,100,0,0,1,228,128Z"
                          opacity="0.2"
                        ></path>
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm12-88a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"></path>
                      </svg>
                      <p className="text-gray-300 text-lg font-medium italic">
                        {filterSide === "Favorite"
                          ? "You haven't favorited any lineups yet."
                          : "No tactical lineups found."}
                      </p>

                      <p className="text-gray-400 text-sm font-light">
                        {filterSide === "Favorite"
                          ? "Try clicking the star icon on any lineup to save it here."
                          : "You need to add a lineup first."}
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLineups.map((lineup) => {
                      const isClubLineup =
                        lineup.clubId !== null &&
                        lineup.clubId !== undefined &&
                        lineup.clubId !== "";
                      return (
                        <div
                          key={lineup.id}
                          onClick={() =>
                            navigate(`/lineup/detail/${lineup.id}`)
                          }
                          className={`group relative bg-gradient-to-br from-white/10 to-transparent p-1 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] border ${
                            isClubLineup
                              ? "border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                              : "border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                          }`}
                        >
                          {/* Badge แยกประเภท (มุมซ้ายบน) */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-max">
                            {isClubLineup ? (
                              <span className="px-3 py-1 text-[12px] font-bold tracking-widest border rounded-md bg-cyan-500/10 border-cyan-500/20 text-cyan-400">
                                Club Lineup
                              </span>
                            ) : (
                              <span className="px-3 py-1 text-[12px] font-bold tracking-widest border rounded-md bg-red-500/10 border-red-500/20 text-red-500">
                                My Lineup
                              </span>
                            )}
                          </div>

                          {/* Star Icon (Favorite Button) */}
                          <button
                            onClick={(e) => toggleFavorite(e, lineup.id)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill={
                                favorites.includes(lineup.id)
                                  ? "#ef4444"
                                  : "none"
                              }
                              stroke={
                                favorites.includes(lineup.id)
                                  ? "#ef4444"
                                  : "currentColor"
                              }
                              viewBox="0 0 256 256"
                              className="transition-colors duration-300"
                            >
                              <path
                                d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.07-31-51.07,31a16,16,0,0,1-23.84-17.34L66.6,153.74l-45.1-39.36A16,16,0,0,1,30.4,87.1l59.89-5.12L113.88,26a16,16,0,0,1,28.24,0l23.59,55.94,59.89,5.12A16,16,0,0,1,234.5,114.38Z"
                                strokeWidth="16"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </button>

                          <div
                            className={`bg-[#0b0f19]/80 backdrop-blur-xl p-6 rounded-[14px] h-full flex flex-col justify-between ${isClubLineup ? "border-t border-cyan-500/20" : ""}`}
                          >
                            <div>
                              <div className="flex justify-between items-start mb-4">
                                <span
                                  className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border rounded-md ${
                                    isClubLineup
                                      ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                                      : "bg-red-500/10 border-red-500/20 text-red-500"
                                  }`}
                                >
                                  {lineup.type || "other"}
                                </span>
                              </div>

                              <h3
                                className={`text-xl font-black group-hover:text-white transition-colors mb-2 line-clamp-1 italic ${
                                  isClubLineup ? "text-cyan-100" : "text-white"
                                }`}
                              >
                                {lineup.title}
                              </h3>
                              <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-light">
                                {lineup.description || "No details provided."}
                              </p>
                            </div>

                            <div className="space-y-2 border-t border-white/5 pt-4">
                              <div className="flex justify-between text-[11px] uppercase tracking-tighter">
                                <span className="text-gray-500 font-medium">
                                  Map
                                </span>
                                <span className="text-white font-semibold">
                                  {lineup.map}
                                </span>
                              </div>
                              <div className="flex justify-between text-[11px] uppercase tracking-tighter">
                                <span className="text-gray-500 font-medium">
                                  Agent
                                </span>
                                <span
                                  className={`font-bold ${isClubLineup ? "text-cyan-500" : "text-red-500"}`}
                                >
                                  {lineup.agent}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lineup;
