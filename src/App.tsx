import { useRef, useState } from "react";
import createposter from "./assets/create-poster.png";
import { Toolbar } from "./components/Toolbar/Toolbar";
import Editor from "./components/Editor/Editor";
import { EditorImage, EditorText } from "./types";

function App() {
  const [editorBackgroundSrc, setEditorBackgroundSrc] = useState(createposter);
  const [editorImages, setEditorImages] = useState<EditorImage[]>([]);
  const [editorText, setEditorText] = useState<EditorText[]>([]);
  const [textColor, setTextColor] = useState("black");
  const [isReset, setIsReset] = useState(false);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);

  const downloadRef = useRef<HTMLDivElement>(null);

  const changeBgInputRef = useRef<HTMLInputElement | null>(null);
  const addImageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="flex justify-between md:flex-row  w-full gap-4  px-[193px] py-[50px] font-poppins"
      onMouseDown={() => setActiveElementId(null)}
    >
      <Editor
        downloadRef={downloadRef}
        editorBackgroundSrc={editorBackgroundSrc}
        editorImages={editorImages}
        activeElementId={activeElementId}
        setActiveElementId={setActiveElementId}
        editorText={editorText}
        textColor={textColor}
        changeBgInputRef={changeBgInputRef}
        setEditorImages={setEditorImages}
        addImageInputRef={addImageInputRef}
        setEditorText={setEditorText}
        setEditorBackgroundSrc={setEditorBackgroundSrc}
        setTextColor={setTextColor}
      />

      <Toolbar
        addImageInputRef={addImageInputRef}
        changeBgInputRef={changeBgInputRef}
        setEditorText={setEditorText}
        setEditorBackgroundSrc={setEditorBackgroundSrc}
        setEditorImages={setEditorImages}
        setTextColor={setTextColor}
        downloadRef={downloadRef}
        isReset={isReset}
        setIsReset={setIsReset}
      />
    </div>
  );
}

export default App;
