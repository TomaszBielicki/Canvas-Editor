import { Toolbar } from "./components/Toolbar/Toolbar";
import Editor from "./components/Editor/Editor";
import { useCanvas } from "./store/CanvasContext";

function App() {
  const { settings } = useCanvas();
  const { setActiveElementId } = settings;

  return (
    <div
      className="flex flex-col justify-between xl:flex-row  w-full gap-4  xl:px-[193px] px-[50px] py-[50px] font-poppins"
      onMouseDown={() => setActiveElementId(null)}
    >
      <Editor />
      <Toolbar />
    </div>
  );
}

export default App;
