import ReactDOM from "react-dom";
import { WarningIcon } from "../Icons";
import CrossIcon from "../Icons/CrossIcon";
import { useCanvas } from "../../store/CanvasContext";
import createposter from "../../assets/create-poster.png";

function ResetWarning() {
  const portal = document.getElementById("portal-root");

  const { background, objects, settings } = useCanvas();
  const { setEditorBackgroundSrc, setIsBackgroundGray } = background;
  const { setEditorImages, setEditorText } = objects;
  const { setIsReset } = settings;

  const confirmReset = () => {
    setEditorBackgroundSrc(createposter);
    setIsBackgroundGray(false);
    setEditorImages([]);
    setEditorText([]);
    setIsReset(false);
  };

  const cancelReset = () => {
    setIsReset(false);
  };

  if (!portal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center w-[643px] h-[584px] rounded-[10px] bg-white  px-[128px] py-[48px] gap-[48px]">
        <div className="absolute top-6 right-6" onClick={cancelReset}>
          <CrossIcon />
        </div>
        <WarningIcon />
        <div className="flex flex-col items-center justify-center gap-2 w-[387px]">
          <h1 className="text-[32px] font-[700]">WARNING</h1>
          <p className="text-center text-[18px] font-[500] text-[#676767]">
            You’re about to reset whole process. Are you sure you want to do it?
          </p>
        </div>

        <div className="flex gap-[32px]">
          <button onClick={cancelReset}>Cancel</button>
          <button
            className="px-[32px] py-[8px] rounded-[5px] bg-[#7209B7] text-white font-poppins font-semibold text-[15px]"
            onClick={confirmReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>,
    portal
  );
}

export default ResetWarning;
