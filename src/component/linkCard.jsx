import { db } from "../service/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

function LinkCard({ link, fetchLinks }) {
  const deleteLink = async () => {
    await deleteDoc(doc(db, "links", link.id));
    fetchLinks();
  };

  const toggleFavorite = async () => {
    const linkRef = doc(db, "links", link.id);

    await updateDoc(linkRef, {
      favorite: !link.favorite,
    });

    fetchLinks();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">{link.title}</h3>

      <a
        href={link.url}
        target="_blank"
        rel="noreferrer"
        className="text-primary break-all"
      >
        {link.url}
      </a>

      <div className="flex gap-3 mt-4">
        <button
          onClick={toggleFavorite}
          className="px-3 py-1 bg-primary rounded hover:opacity-80"
        >
          {link.favorite ? "⭐" : "☆"}
        </button>

        <button
          onClick={deleteLink}
          className="px-3 py-1 bg-red-500 rounded hover:opacity-80"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default LinkCard;
