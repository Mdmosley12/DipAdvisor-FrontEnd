import { useEffect } from "react";
import { Keyboard } from "react-native";
export const marginTopChanger = (setContainerMarginTop) => {
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
    Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);

  const handleKeyboardShow = () => {
    setContainerMarginTop(40);
  };

  const handleKeyboardHide = () => {
    setContainerMarginTop(125);
  };
};
