import { useNavigate } from "react-router-dom";

function MapCard({ map }) {
  const navigate = useNavigate();

  const goToAgents = () => {
    navigate(`/agents/${map.name.toLowerCase()}`);
  };

  return (
    <div
      onClick={goToAgents}
      className="relative cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:scale-105 transition"
    >
      <img src={map.image} className="w-full h-40 object-cover" />

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h2 className="text-xl font-bold tracking-widest">{map.name}</h2>
      </div>
    </div>
  );
}

export default MapCard;
