import MapCard from "../component/mapCard";
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

const maps = [
  {
    name: "Ascent",
    image: ascent,
  },
  {
    name: "Bind",
    image: bind,
  },
  {
    name: "Breeze",
    image: breeze,
  },
  {
    name: "Fracture",
    image: fracture,
  },
  {
    name: "Haven",
    image: haven,
  },
  {
    name: "Icebox",
    image: icebox,
  },
  {
    name: "Lotus",
    image: lotus,
  },
  {
    name: "Pearl",
    image: pearl,
  },
  {
    name: "Split",
    image: split,
  },
  {
    name: "Sunset",
    image: sunset,
  },
  {
    name: "Abyss",
    image: abyss,
  },
  {
    name: "Corrode",
    image: corrode,
  },
];

function Maps() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1923] via-[#111827] to-black text-white relative overflow-hidden">
      {/* glow background */}
      <div className="absolute w-[500px] h-[500px] bg-primary opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-1">
          SELECT <span className="text-red-500">MAP</span>
        </h1>

        <p className="text-gray-400 mb-10">Choose a map to browse lineups</p>

        {/* Grid Map */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {maps.map((map) => (
            <MapCard key={map.name} map={map} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Maps;
