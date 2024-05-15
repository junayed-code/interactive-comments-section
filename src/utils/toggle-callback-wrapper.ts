/**
 * `toggleCallbackWrapper` function sets the aria-pressed attribute value of a toggle button
 */
const toggleCallbackWrapper = (callback: Function) => {
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    const isPressed = e.currentTarget.getAttribute("aria-pressed") === "true";
    e.currentTarget.setAttribute("aria-pressed", !isPressed + "");
    callback(e);
  };
};

export default toggleCallbackWrapper;
