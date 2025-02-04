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
  text: string;
  width: number | string;
  height: number | string;
  x: number;
  y: number;
}

export interface EditorProps {
  downloadRef: MutableRefObject<HTMLDivElement | null>;
  editorBackgroundSrc: string;
  editorImages: EditorImage[];
  activeElementId: string | null;
  setActiveElementId: React.Dispatch<React.SetStateAction<string | null>>;
  editorText: EditorText[];
  textColor: string;
  changeBgInputRef: MutableRefObject<HTMLInputElement | null>;
  setEditorImages: React.Dispatch<React.SetStateAction<EditorImage[]>>;
  addImageInputRef: MutableRefObject<HTMLInputElement | null>;
  setEditorText: React.Dispatch<React.SetStateAction<EditorText[]>>;
  setEditorBackgroundSrc: React.Dispatch<React.SetStateAction<string>>;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  setIsBackgroundGray: React.Dispatch<React.SetStateAction<boolean>>;
  isBackgroundGray: boolean;
  isFirstClick: boolean;
  setIsFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ToolbarProps = {
  addImageInputRef: MutableRefObject<HTMLInputElement | null>;
  changeBgInputRef: MutableRefObject<HTMLInputElement | null>;
  setEditorText: React.Dispatch<React.SetStateAction<EditorText[]>>;
  downloadRef: MutableRefObject<HTMLDivElement | null>;
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
  setEditorBackgroundSrc: React.Dispatch<React.SetStateAction<string>>;
  setEditorImages: React.Dispatch<React.SetStateAction<EditorImage[]>>;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  setIsBackgroundGray: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveElementId: React.Dispatch<React.SetStateAction<string | null>>;
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
  onClick: any;
};
