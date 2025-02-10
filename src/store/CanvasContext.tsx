import { createContext, ReactNode, useContext, useRef, useState } from "react";
import createposter from "../assets/create-poster.png";
import { CanvasContextType, EditorImage, EditorText } from "../types";

const CanvasContext = createContext<CanvasContextType>({} as CanvasContextType);

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [editorBackgroundSrc, setEditorBackgroundSrc] = useState(createposter);
  const [isBackgroundGray, setIsBackgroundGray] = useState(false);

  const [editorImages, setEditorImages] = useState<EditorImage[]>([]);
  const [editorText, setEditorText] = useState<EditorText[]>([]);

  const [isReset, setIsReset] = useState(false);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);

  const downloadRef = useRef<HTMLDivElement>(null);

  const changeBgInputRef = useRef<HTMLInputElement | null>(null);
  const addImageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <CanvasContext.Provider
      value={{
        background: {
          editorBackgroundSrc,
          setEditorBackgroundSrc,
          isBackgroundGray,
          setIsBackgroundGray,
        },
        objects: { editorImages, setEditorImages, editorText, setEditorText },
        settings: { isReset, setIsReset, activeElementId, setActiveElementId },
        refs: { downloadRef, changeBgInputRef, addImageInputRef },
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  return context;
};
