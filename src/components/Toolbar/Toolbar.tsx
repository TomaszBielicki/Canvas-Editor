import ButtonList from "../ButtonList/ButtonList";
import { LogoIcon, MoveBackIcon } from "../Icons";

import ResetWarning from "../ResetWarrning/ResetWarning";
import createposter from "../../assets/create-poster.png";
import { EditorText, ToolbarProps } from "../../types";

import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export const Toolbar = ({
  addImageInputRef,
  changeBgInputRef,
  setEditorText,
  downloadRef,
  isReset,
  setIsReset,
  setEditorBackgroundSrc,
  setEditorImages,
  setTextColor,
  setIsBackgroundGray,
  setActiveElementId,
}: ToolbarProps) => {
  const handleChangeBgClick = () => changeBgInputRef.current?.click();
  const handleAddImage = () => addImageInputRef.current?.click();

  const captureImage = async () => {
    if (downloadRef.current) {
      try {
        const dataUrl = await toPng(downloadRef.current, {
          width: 1080,
          height: 1350,
          pixelRatio: 1,
          style: {
            transformOrigin: "top left",
          },
        });

        saveAs(dataUrl, "exported_image.png");
      } catch (error) {
        console.error("Error exporting image:", error);
      }
    }
  };

  const addTextHandler = () => {
    setIsBackgroundGray(true);
    const id = crypto.randomUUID();

    setEditorText((prev: EditorText[]) => [
      ...prev,
      {
        id,
        text: "Type your text here",
        width: 200,
        height: 100,
        x: 0,
        y: 0,
      },
    ]);
    setActiveElementId(id);
  };

  const resetClickHandler = () => {
    setIsReset(true);
  };

  const confirmReset = () => {
    setEditorBackgroundSrc(createposter);
    setEditorImages([]);
    setEditorText([]);
    setTextColor("black");
    setIsReset(false);
  };

  const cancelReset = () => {
    setIsReset(false);
  };
  return (
    <div className="flex flex-col flex-1  xl:gap-3 2xl:gap-10">
      <div className="flex justify-between items-center py-[8px]">
        <div className="flex gap-[12px] items-center">
          <LogoIcon />
          <h1 className="text-[32px] font-[700] text-[#676767]">
            Canvas Editor
          </h1>
        </div>

        <button
          className="flex items-center gap-[8px] w-[90px] h-[32px] text-[#CB0000] text-[18px] border-b-1"
          onClick={resetClickHandler}
        >
          <p>Reset</p>
          <MoveBackIcon />
        </button>
      </div>

      <div className="border-b border-[#FAFAFA]"></div>

      <div className="bg-[#F7F7F8] h-[75px] rounded py-[24px] px-[16px] text-[18px] font-[700]">
        <p>Add Content</p>
      </div>

      <ButtonList
        setEditorText={setEditorText}
        handleAddImage={handleAddImage}
        handleChangeBgClick={handleChangeBgClick}
        setIsBackgroundGray={setIsBackgroundGray}
        addTextHandler={addTextHandler}
      />

      <div className="border-b-2 border-[#FAFAFA]"></div>
      <div className="flex justify-end items-end">
        <button
          className="bg-[#7209B7] rounded-[10px] text-white h-[40px] w-[172px] text-[15px] font-[700]"
          onClick={captureImage}
        >
          Export to PNG
        </button>
      </div>

      {isReset && (
        <ResetWarning confirmReset={confirmReset} cancelReset={cancelReset} />
      )}
    </div>
  );
};
