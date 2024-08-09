import { lazy, Suspense, useEffect, useRef, useState } from "react";
// Import JoditEditor lazily
const JoditEditor = lazy(() => import("jodit-react"));
import { getCurrentDateFormatted } from "../../utils/formatDate";
import BasicModal from "./BasicModal";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const Journal = ({entries}) => {
  const [write, setWrite] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState(JSON.parse(localStorage.getItem("content")) || "");

  const config = {
    readonly: false,
    height: 400,
    toolbarAdaptive: true,
    placeholder: "Tip: it can be full screen by selecting button from the three dot button",
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: input.date,
          data: content
        }),
        credentials: "include"
      });

      if (response.ok) {
        toast.success("Saved Entry successfully");
        localStorage.removeItem("content");
        setContent('');
        setWrite(false)
      } else {
        const errorText = await response.text();
        toast.error(`Error Saving: ${errorText}`);
      }
    } catch (error) {
      toast.error(`Error Saving: ${error.message}`);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center">
        <div className="w-full">
          <h1 className="text-2xl border-b-2 w-fit opacity-80 font-mono font-medium py-4 px-2">
            Journal Records:
          </h1>
        </div>
        {entries  && entries.map((item,index)=>(
          <div key={index} >
          <BasicModal contents={item} />
        </div>)
        )}
        
        {!write && (
          <button onClick={() => setWrite(true)}>Write New Entry</button>
        )}
        {write && (
          <div className="w-full">
            <div className="w-full text-lg flex justify-between items-center">
              <div className="flex gap-2">
                <p>Date:</p>
                <input
                  type="date"
                  value={input.date}
                  name="date"
                  className="bg-black bg-opacity-0 w-32"
                  onChange={handleInput}
                />
              </div>
              <button type="button" onClick={() => setWrite(false)}>
                Close
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
            <div className="w-full flex items-center justify-center gap-3">
              <button type="button" onClick={handleJournal}>
                Save
              </button>
              <button type="button" onClick={() => setContent("")}>
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
