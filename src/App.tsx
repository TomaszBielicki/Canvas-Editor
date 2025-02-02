import { ReactNode, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import createposter from "./assets/create-poster.png";
import { BackgroundIcon, ImageIcon, TextIcon } from "./components/Icons";
import ButtonList from "./components/ButtonList/ButtonList";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import ResetWarning from "./components/ResetWarning/ResetWarning";

export type ButtonItem = {
  icon: ReactNode;
  text: string;
  onClick: VoidFunction;
};

type EditorImage = {
  id: string;
  src: string;
  width: number | string;
  height: number | string;
  x: number;
  y: number;
};

type EditorText = {
  id: string;
  text: string;
  width: number | string;
  height: number | string;
  x: number;
  y: number;
};

function App() {
  const [editorBackgroundSrc, setEditorBackgroundSrc] = useState(createposter);
  const [editorImages, setEditorImages] = useState<EditorImage[]>([]);
  const [editorText, setEditorText] = useState<EditorText[]>([]);
  const [textColor, setTextColor] = useState("black");
  const [isReset, setIsReset] = useState(false);

  const downloadRef = useRef<HTMLDivElement>(null);

  const changeBgInputRef = useRef<HTMLInputElement | null>(null);
  const addImageInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeBgClick = () => changeBgInputRef.current?.click();
  const handleAddImage = () => addImageInputRef.current?.click();

  const addImageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditorImages((prev) => [
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

  const addTextHandler = () => {
    setEditorText((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: "Text",
        width: 200,
        height: 100,
        x: 0,
        y: 0,
      },
    ]);
  };

  const changeTextHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedText = e.target.value;

    setEditorText((prev) =>
      prev.map((item, idx) => {
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
    setEditorImages((prev) => prev.filter((_, idx) => index !== idx));
  };
  const deleteTextHandler = (index: number) => {
    setEditorText((prev) => prev.filter((_, idx) => index !== idx));
  };

  const changeColorHandler = (color: string) => {
    setTextColor(color);
  };

  // const captureImage = async () => {
  //   if (downloadRef.current) {
  //     const canvas = await html2canvas(downloadRef.current, {
  //       width: 1080, // ustawiona szerokość obrazu
  //       height: 1350, // ustawiona wysokość obrazu
  //       scale: 10, // zwiększa jakość obrazu (np. dla retina)
  //     });
  //     const image = canvas.toDataURL("image/png");
  //     const link = document.createElement("a");
  //     link.href = image;
  //     link.download = "captured_image.png";
  //     link.click();
  //   }
  // };

  const captureImage = async () => {
    if (downloadRef.current) {
      try {
        const dataUrl = await toPng(downloadRef.current, {
          width: 1080, // docelowa szerokość
          height: 1350, // docelowa wysokość
          // canvasWidth: 1080, // wymuszenie szerokości na canvasie
          // canvasHeight: 1350, // wymuszenie wysokości na canvasie
          style: {
            // transform: "scale(1)", // zapobiega rozciąganiu
            transformOrigin: "top left",
          },
        });

        saveAs(dataUrl, "exported_image.png");
      } catch (error) {
        console.error("Error exporting image:", error);
      }
    }
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

  const buttonData: ButtonItem[] = [
    { icon: <TextIcon />, text: "Text", onClick: addTextHandler },
    { icon: <ImageIcon />, text: "Image", onClick: handleAddImage },
    {
      icon: <BackgroundIcon />,
      text: "Background",
      onClick: handleChangeBgClick,
    },
  ];

  return (
    <div className="flex gap-4 px-[189px] py-[50px]">
      <button onClick={resetClickHandler}>RESET</button>
      {/* EDITOR */}
      <div
        ref={downloadRef}
        className="w-150 h-150 bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${editorBackgroundSrc})` }}
      >
        {/* IMAGES */}
        {editorImages?.map(({ id, src, x, y, width, height }, index) => {
          return (
            <Rnd
              bounds="parent"
              key={id}
              default={{ x, y, width, height }}
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <button onClick={() => deleteImageHandler(index)}>X</button>
            </Rnd>
          );
        })}

        {/* TEXTS */}
        {editorText?.map(({ id, text, x, y, width, height }, index) => {
          return (
            <Rnd
              bounds="parent"
              key={id}
              default={{ x, y, width, height }}
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => changeTextHandler(e, index)}
                style={{ color: textColor }}
              />
              <button onClick={() => deleteTextHandler(index)}>X</button>
              <button onClick={() => changeColorHandler("red")}>Red</button>
              <button onClick={() => changeColorHandler("blue")}>Blue</button>
            </Rnd>
          );
        })}
      </div>

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

      <div className="flex">
        <ButtonList data={buttonData} />
      </div>

      <button onClick={captureImage}>Export to png</button>
      {/* {isReset ? (
        <div>
          <h1>Are you sure to reset? </h1>
          <button onClick={confirmReset}>yes</button>
          <button onClick={cancelReset}>no</button>
        </div>
      ) : null} */}
      {isReset ? (
        <ResetWarning confirmReset={confirmReset} cancelReset={cancelReset} />
      ) : null}
    </div>
  );
}

export default App;
