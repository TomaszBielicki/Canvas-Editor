import { Button } from "../Button/Button";
import { BackgroundIcon, ImageIcon, TextIcon } from "../Icons";
import { EditorText, ButtonItem, ButtonListProps } from "../../types";

const ButtonList = ({
  setEditorText,
  handleAddImage,
  handleChangeBgClick,
}: ButtonListProps) => {
  const addTextHandler = () => {
    setEditorText((prev: EditorText[]) => [
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
    <div className="flex flex-wrap gap-5  justify-between">
      {buttonData.map(({ icon, text, onClick }) => (
        <Button key={text} icon={icon} text={text} onClick={onClick} />
      ))}
    </div>
  );
};

export default ButtonList;
