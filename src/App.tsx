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

  const [isFirstClick, setIsFirstClick] = useState(false);
  const [isBackgroundGray, setIsBackgroundGray] = useState(false);

  const downloadRef = useRef<HTMLDivElement>(null);

  const changeBgInputRef = useRef<HTMLInputElement | null>(null);
  const addImageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="flex flex-col justify-between xl:flex-row  w-full gap-4  xl:px-[193px] px-[50px] py-[50px] font-poppins"
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
        isFirstClick={isFirstClick}
        setIsFirstClick={setIsFirstClick}
        isBackgroundGray={isBackgroundGray}
        setIsBackgroundGray={setIsBackgroundGray}
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
        setIsBackgroundGray={setIsBackgroundGray}
        setActiveElementId={setActiveElementId}
      />
    </div>
  );
}

export default App;
