const IconWithLabel = ({ id, classes, children }) => {
  if (!id) {
    console.error("IconWithLabel: missing `id` prop");
  }

  return (
    <div id={`${id}-icon-container`} className="icon-with-label">
      <i
        id={`${id}-icon`}
        className={`icon ${classes}`}
        aria-label={`${id} icon`}
      ></i>
      {children}
    </div>
  );
};

export default IconWithLabel;
