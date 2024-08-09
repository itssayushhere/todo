/* eslint-disable react/prop-types */
import {  Suspense, useEffect, useRef, useState } from "react";
// Import JoditEditor lazily
import JoditEditor from "jodit-react";
// const JoditEditor = lazy(() => import("jodit-react"));
import { getCurrentDateFormatted } from "../../utils/formatDate";
import BasicModal from "./BasicModal";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
const Journal = ({ entries, reload }) => {
  const [write, setWrite] = useState(false);
  const editor = useRef(null);
  const journalInputRef = useRef(null); // Reference for the journal input section
  const [content, setContent] = useState(
    JSON.parse(localStorage.getItem("content")) || ""
  );

  const config = {
    readonly: false,
    height: 400,
    toolbarAdaptive: true,
    placeholder:
      "Tip: it can be full screen by selecting button from the three dot button",
  };

  const [input, setInput] = useState({
    date: getCurrentDateFormatted() || "",
    data: content || "",
  });

  useEffect(() => {
    localStorage.setItem("content", JSON.stringify(content));
  }, [content]);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleJournal = async () => {
    if (!window.confirm(`Are you sure you want to upload?`)) {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/user/journal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: input.date,
          data: content,
        }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Saved Entry successfully");
        localStorage.removeItem("content");
        setContent("");
        reload();
        setWrite(false);
      } else {
        const errorText = await response.text();
        toast.error(`Error Saving: ${errorText}`);
      }
    } catch (error) {
      toast.error(`Error Saving: ${error.message}`);
    }
  };

  // Scroll to the journal input section when the write button is clicked
  const handleEnterJournal = () => {
    setWrite(true);
    setTimeout(() => {
      journalInputRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-2xl border-b-2 w-fit opacity-80 font-mono font-medium py-4 px-2">
            Journal Records:
          </h1>
        </div>
        {entries && entries.length !== 0 ? (
          entries.map((item, index) => (
            <div key={index} className="w-full">
              <BasicModal contents={item} refresh={reload} />
            </div>
          ))
        ) : (
          <h1 className="opacity-65 p-5 text-lg">No Entries...</h1>
        )}

        {!write && (
          <button
            onClick={handleEnterJournal}
            className="bg-emerald-500 p-1 border-2 border-white border-opacity-35 rounded-lg text-black"
          >
            Enter Journal
          </button>
        )}
        {write && (
          <div ref={journalInputRef} className="w-full"> {/* Add the ref here */}
            <div className="w-full text-lg flex justify-between items-center">
              <div className="flex gap-2 text-base ml-1">
                <p>Date:</p>
                <input
                  type="date"
                  value={input.date}
                  name="date"
                  className="bg-black bg-opacity-0 w-28"
                  onChange={handleInput}
                />
              </div>
              <button className="text-red-600" type="button" onClick={() => setWrite(false)}>
                <CloseIcon/>
              </button>
            </div>
            <Suspense fallback={<p>...loading</p>}>
              <div className="flex w-full h-full border">
                <div className="w-full text-black bg-black">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                  />
                </div>
              </div>
            </Suspense>
            <div className="mt-2 w-full flex items-center justify-center gap-3">
              <button type="button" onClick={handleJournal} className="px-2 py-1 border-2 border-white border-opacity-60 rounded bg-green-500">
                Save
              </button>
              <button  className="px-2 py-1 border-2 border-white border-opacity-60 rounded bg-black bg-opacity-80" type="button" onClick={() => setContent("")}>
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
