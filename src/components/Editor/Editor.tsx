import { Rnd } from "react-rnd";
import { EditorImage, EditorProps, EditorText } from "../../types";
import { ClickToMoveIcon, BinIcon } from "../Icons";

const COLORS = ["#353535", "#FFFFFF", "#CF0000", "#0055FF", "#00DA16"];

const Editor = ({
  downloadRef,
  editorBackgroundSrc,
  editorImages,
  activeElementId,
  setActiveElementId,
  editorText,
  changeBgInputRef,
  setEditorImages,
  addImageInputRef,
  setEditorText,
  setEditorBackgroundSrc,
  isBackgroundGray,
  setIsBackgroundGray,
}: EditorProps) => {
  const changeBackgroundHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditorBackgroundSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsBackgroundGray(false);
    } else {
      alert("Please upload a valid image file (PNG, JPG, JPEG).");
    }
  };

  const deleteImageHandler = (index: number) => {
    setEditorImages((prev: EditorImage[]) =>
      prev.filter((_, idx) => index !== idx)
    );
  };

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      setActiveElementId(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditorImages((prev: EditorImage[]) => [
          ...prev,
          {
            id: file.name,
            src: reader.result as string,
            x: (759 - 200) / 2,
            y: (948 - 200) / 2,
            width: 200,
            height: 200,
          },
        ]);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (PNG, JPG, JPEG).");
    }
  };

  const deleteTextHandler = (index: number) => {
    setEditorText((prev: EditorText[]) =>
      prev.filter((_, idx) => index !== idx)
    );
  };

  const changeColorHandler = (color: string, index: number) => {
    setEditorText((prev: EditorText[]) =>
      prev.map((item: EditorText, idx: number) => {
        if (index === idx) return { ...item, color };
        return item;
      })
    );
  };

  const changeTextHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedText = e.target.value;

    setEditorText((prev: EditorText[]) =>
      prev.map((item: EditorText, idx: number) => {
        if (index === idx) return { ...item, text: updatedText };
        return item;
      })
    );
  };

  return (
    <>
      {/* EDITOR */}
      <div
        ref={downloadRef}
        className="flex items-center justify-center xl:flex-1 sm:h-[924px] h-[400px] xl:h-[948px] xl:min-w-[759px] overflow-hidden bg-cover bg-center bg-[#9B9B9B]"
        style={{
          backgroundImage: isBackgroundGray
            ? ""
            : `url(${editorBackgroundSrc})`,
        }}
      >
        {/* IMAGES */}
        {editorImages?.map(
          ({ id, src, x, y, width, height }: EditorImage, index: number) => {
            return (
              <Rnd
                className={`bg-center bg-cover bg-no-repeat ${
                  activeElementId === id ? "border-2 border-[#7209B7]" : ""
                }`}
                bounds="parent"
                key={id}
                enableResizing={{
                  top: false,
                  right: false,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: true,
                  bottomLeft: false,
                  topLeft: false,
                }}
                default={{
                  x: x,
                  y: y,
                  width: width,
                  height: height,
                }}
                style={{
                  backgroundImage: `url(${src})`,
                }}
                dragHandleClassName="drag-handle"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setActiveElementId(id);
                }}
              >
                {activeElementId === id && (
                  <button className="drag-handle absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-[40px] w-[40px] rounded-[50%] bg-white">
                    <ClickToMoveIcon />
                  </button>
                )}
                {activeElementId === id && (
                  <button
                    className="absolute top-0 right-0 -translate-y-1/2  translate-x-1/2  flex items-center justify-center w-[24px] h-[24px] bg-white rounded-[50%]"
                    onClick={() => deleteImageHandler(index)}
                  >
                    <BinIcon />
                  </button>
                )}
                {activeElementId === id && (
                  <button className="rnd-resizer absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 flex items-center justify-center w-[24px] h-[24px] bg-[#7209B7] border-3 border-white rounded-[50%]"></button>
                )}
              </Rnd>
            );
          }
        )}
        {editorText?.map(
          (
            { id, text, x, y, width, height, color }: EditorText,
            index: number
          ) => {
            return (
              <Rnd
                className={`relative px-[24px] py-[12px] bg-contain bg-no-repeat ${
                  activeElementId === id ? "border-2 border-[#7209B7]" : ""
                }`}
                bounds="parent"
                key={id}
                enableResizing={{
                  top: false,
                  right: false,
                  bottom: false,
                  left: false,
                  topRight: false,
                  bottomRight: true,
                  bottomLeft: false,
                  topLeft: false,
                }}
                default={{
                  x: (759 - 350) / 2,
                  y: (948 - 120) / 2,
                  width: "18%",
                  height: "11%",
                }}
                dragHandleClassName="drag-handle"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setActiveElementId(id);
                }}
                onResize={(e, direction, ref) => {
                  const width = ref.offsetWidth;
                  const height = ref.offsetHeight;
                  const fontSize = Math.min(width / 12, height / 3);
                  ref.querySelector("textarea")!.style.fontSize = `${Math.min(
                    Math.max(fontSize, 8),
                    48
                  )}px`;
                }}
              >
                <textarea
                  value={text}
                  onChange={(e) => changeTextHandler(e, index)}
                  className="sm:w-full sm:h-full w-[100px] h-[100px] resize-none font-[700] break-words focus:placeholder-opacity-100 placeholder-opacity-25 text-[32px] text-center focus:outline-none focus:ring-0 focus:border-none overflow-hidden leading-[1.2]"
                  style={{
                    color,
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />

                {activeElementId === id && (
                  <button className="drag-handle absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-[40px] w-[40px] rounded-[50%] bg-white">
                    <ClickToMoveIcon />
                  </button>
                )}
                {activeElementId === id && (
                  <button
                    className="absolute top-0 right-0 -translate-y-1/2  translate-x-1/2  flex items-center justify-center w-[24px] h-[24px] bg-white rounded-[50%]"
                    onClick={() => deleteTextHandler(index)}
                  >
                    <BinIcon />
                  </button>
                )}
                {activeElementId === id && (
                  <button className="rnd-resizer absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 flex items-center justify-center w-[24px] h-[24px] bg-[#7209B7] border-3 border-white rounded-[50%]"></button>
                )}
                {activeElementId === id && (
                  <div className="absolute bottom-[-30px] left-0 flex gap-[4px]">
                    {COLORS.map((colorItem) => (
                      <button
                        key={colorItem}
                        className={`h-[16px] w-[16px] m-[4px] rounded-[50%]`}
                        onClick={() => changeColorHandler(colorItem, index)}
                        style={{
                          backgroundColor: colorItem,
                          outline:
                            colorItem === color ? "2px solid white" : " ",
                          outlineOffset: "2px",
                        }}
                      ></button>
                    ))}
                  </div>
                )}
              </Rnd>
            );
          }
        )}

        {/* HIDDEN CHANGE BG */}
        <input
          type="file"
          accept="image/*"
          onChange={changeBackgroundHandler}
          className="hidden"
          id="fileInput"
          ref={changeBgInputRef}
        />

        {/* HIDDEN ADD IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={addImageHandler}
          className="hidden"
          id="fileInput"
          ref={addImageInputRef}
        />
      </div>
    </>
  );
};

export default Editor;
