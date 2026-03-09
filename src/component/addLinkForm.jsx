import { useState } from "react";
import { db } from "../service/firebase";
import { collection, addDoc } from "firebase/firestore";

function AddLinkForm({ fetchLinks }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addLink = async () => {
    if (!title || !url) return;

    await addDoc(collection(db, "links"), {
      title,
      url,
      favorite: false,
      createdAt: new Date(),
    });

    setTitle("");
    setUrl("");

    fetchLinks();
  };

  return (
    <div className="flex gap-3">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-card border border-border p-2 rounded"
      />

      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="bg-card border border-border p-2 rounded"
      />

      <button
        onClick={addLink}
        className="bg-primary px-4 rounded hover:opacity-80"
      >
        Add
      </button>
    </div>
  );
}

export default AddLinkForm;
