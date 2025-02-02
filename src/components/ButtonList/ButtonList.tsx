import { Button } from "../Button/Button";
import { ButtonItem } from "../../App";

type ButtonListProps = {
  data: ButtonItem[];
};

const ButtonList = ({ data }: ButtonListProps) => {
  // const buttonData: ButtonItem[] = [
  //   { icon: <TextIcon />, text: "Text", onClick: addElement },
  //   { icon: <ImageIcon />, text: "Image", onClick: null },
  //   { icon: <BackgroundIcon />, text: "Background", onClick: null },
  // ];

  return (
    <div className="flex flex-wrap gap-4">
      {data.map(({ icon, text, onClick }) => (
        <Button key={text} icon={icon} text={text} onClick={onClick} />
      ))}
    </div>
  );
};

export default ButtonList;
