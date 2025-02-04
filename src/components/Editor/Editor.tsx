import { Rnd } from "react-rnd";
import { ClickToMoveIcon } from "../Icons";
import { EditorImage, EditorProps, EditorText } from "../../types";
import BinIcon from "../Icons/BinIcon";

const Editor: React.FC<EditorProps> = ({
  downloadRef,
  editorBackgroundSrc,
  editorImages,
  activeElementId,
  setActiveElementId,
  editorText,
  textColor,
  changeBgInputRef,
  setEditorImages,
  addImageInputRef,
  setEditorText,
  setEditorBackgroundSrc,
  setTextColor,
}) => {
  const changeTextHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
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
    } else {
      alert("Please upload a valid image file (PNG, JPG, JPEG).");
    }
  };

  const deleteImageHandler = (index: number) => {
    setEditorImages((prev: EditorImage[]) =>
      prev.filter((_, idx) => index !== idx)
    );
  };
  const deleteTextHandler = (index: number) => {
    setEditorText((prev: EditorText[]) =>
      prev.filter((_, idx) => index !== idx)
    );
  };

  const changeColorHandler = (color: string) => {
    setTextColor(color);
  };

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditorImages((prev: EditorImage[]) => [
          ...prev,
          {
            id: file.name,
            src: reader.result as string,
            width: 200,
            height: 100,
            x: 0,
            y: 0,
          },
        ]);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (PNG, JPG, JPEG).");
    }
  };

  return (
    <>
      {/* EDITOR */}
      <div
        ref={downloadRef}
        className="flex-1 h-[948px] min-w-[759px] sm:min-w-[500px] md:min-w-[600px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${editorBackgroundSrc})` }}
      >
        {/* IMAGES */}
        {editorImages?.map(
          ({ id, src, x, y, width, height }: EditorImage, index: number) => {
            return (
              <Rnd
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
                default={{ x, y, width: 200, height: 200 }}
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
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

        {/* TEXTS */}
        {editorText?.map(
          ({ id, text, x, y, width, height }: EditorText, index: number) => {
            return (
              <Rnd
                className=" relative  px-[24px] py-[12px] focus-within:border-2 focus-within:border-[#7209B7]"
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
                default={{ x, y, width: 350, height: 120 }}
                style={{
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
                dragHandleClassName="drag-handle"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setActiveElementId(id);
                }}
              >
                <input
                  type="text"
                  value="Type your text here"
                  onChange={(e) => changeTextHandler(e, index)}
                  className=" w-[302px] h-[98px]  font-[700] break-words focus:placeholder-opacity-100 placeholder-opacity-25 text-[32px] text-center focus:outline-none focus:ring-0 focus:border-none"
                  style={{ color: textColor }}
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
                    {[
                      "#353535",
                      "#FFFFFF",
                      "#CF0000",
                      "#0055FF",
                      "#00DA16",
                    ].map((color) => (
                      <button
                        key={color}
                        className={`h-[16px] w-[16px] m-[4px] rounded-[50%] bg-[${color}] ${
                          textColor === color ? "outline-2 outline-white" : ""
                        }`}
                        onClick={() => changeColorHandler(color)}
                      ></button>
                    ))}
                  </div>
                )}
                {/* {activeElementId === id && (
                  <div className="flex gap-[4px]">
                    <button
                      className="h-[16px] w-[16px]  m-[4px] rounded-[50%] bg-[#353535]"
                      onClick={() => changeColorHandler("#353535")}
                    ></button>
                    <button
                      className="h-[16px] w-[16px]  m-[4px]  rounded-[50%] bg-[#FFFFFF]"
                      onClick={() => changeColorHandler("#FFFFFF")}
                    ></button>

                    <button
                      className="h-[16px] w-[16px]   m-[4px] rounded-[50%] bg-[#CF0000]"
                      onClick={() => changeColorHandler("#CF0000")}
                    ></button>
                    <button
                      className="h-[16px] w-[16px]  m-[4px] rounded-[50%] bg-[#0055FF]"
                      onClick={() => changeColorHandler("#0055FF")}
                    ></button>
                    <button
                      className="h-[16px] w-[16px]  m-[4px] rounded-[50%] bg-[#00DA16]"
                      onClick={() => changeColorHandler("#00DA16")}
                    ></button>
                  </div>
                )} */}
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
