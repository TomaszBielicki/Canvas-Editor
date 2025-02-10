import { MutableRefObject, ReactNode } from "react";

export interface EditorImage {
  id: string;
  src: string;
  width: number | string;
  height: number | string;
  x: number;
  y: number;
}

export interface EditorText {
  id: string;
  color: string;
  text: string;
  width: number | string;
  height: number | string;
  x: number;
  y: number;
}

export interface EditorProps {
  downloadRef: MutableRefObject<HTMLDivElement | null>;
  changeBgInputRef: MutableRefObject<HTMLInputElement | null>;
  addImageInputRef: MutableRefObject<HTMLInputElement | null>;
}

export type ToolbarProps = {
  addImageInputRef: MutableRefObject<HTMLInputElement | null>;
  changeBgInputRef: MutableRefObject<HTMLInputElement | null>;
  downloadRef: MutableRefObject<HTMLDivElement | null>;
};

export type ButtonItem = {
  icon: ReactNode;
  text: string;
  onClick: VoidFunction;
};

export type ButtonListProps = {
  setEditorText: React.Dispatch<React.SetStateAction<EditorText[]>>;
  handleAddImage: () => void;
  handleChangeBgClick: () => void;
  setIsBackgroundGray: React.Dispatch<React.SetStateAction<boolean>>;
  addTextHandler: () => void;
};

export type ButtonProps = {
  icon: ReactNode;
  text: string;
  onClick: () => void;
};

export interface CanvasContextType {
  background: {
    editorBackgroundSrc: string;
    setEditorBackgroundSrc: React.Dispatch<React.SetStateAction<string>>;
    isBackgroundGray: boolean;
    setIsBackgroundGray: React.Dispatch<React.SetStateAction<boolean>>;
  };
  objects: {
    editorImages: EditorImage[];
    setEditorImages: React.Dispatch<React.SetStateAction<EditorImage[]>>;
    editorText: EditorText[];
    setEditorText: React.Dispatch<React.SetStateAction<EditorText[]>>;
  };
  settings: {
    isReset: boolean;
    setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
    activeElementId: string | null;
    setActiveElementId: React.Dispatch<React.SetStateAction<string | null>>;
  };
  refs: {
    downloadRef: MutableRefObject<HTMLDivElement | null>;
    changeBgInputRef: MutableRefObject<HTMLInputElement | null>;
    addImageInputRef: MutableRefObject<HTMLInputElement | null>;
  };
}
