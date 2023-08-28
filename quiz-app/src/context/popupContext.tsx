import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Popup from "../components/Popup";

export const PopupContext = createContext({
  visible: false,
  updateStatus: (val: boolean) => {
    return;
  },
  text: "",
  avgSimilarity: 0,
  updateSimilarity: (val: number) => {
    return;
  },
});
PopupContext.displayName = "PopupContext";

function PopupProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [avgSimilarity, setAvgSimilarity] = useState(0);
  const updateStatus = (updatedVal: boolean) => {
    setVisible(updatedVal);
  };
  const updateSimilarity = (updatedVal: number) => {
    setAvgSimilarity(updatedVal);
  };
  const props = {
    visible: visible,
    updateStatus: updateStatus,
    text: "Your quiz was successfully submitted!",
    avgSimilarity: avgSimilarity,
    updateSimilarity: updateSimilarity,
  };
  return (
    <PopupContext.Provider value={props}>
      <Popup>{children}</Popup>
    </PopupContext.Provider>
  );
}
function usePopup() {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error(`usePopup must be used within a PopupProvider`);
  }
  return context;
}
export { PopupProvider, usePopup };
