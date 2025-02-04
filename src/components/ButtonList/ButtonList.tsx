import { Button } from "../Button/Button";
import { BackgroundIcon, ImageIcon, TextIcon } from "../Icons";
import { ButtonItem, ButtonListProps } from "../../types";

const ButtonList = ({
  handleAddImage,
  handleChangeBgClick,
  addTextHandler,
}: ButtonListProps) => {
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
