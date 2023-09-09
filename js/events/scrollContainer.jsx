const useScrollSpy = (onScrollChange) => {
  const container = useRef();

  useEffect(() => {
    container.current.addEventListener("scroll", () =>
      onScrollChange(container.current)
    );
    window.addEventListener("resize", () => onScrollChange(container.current));
    onScrollChange(container.current);
  }, [container]);

  return container;
};

const ScrollContainer = ({ children }) => {
  const [shouldShowScrollHintLeft, setShouldShowScrollHintLeft] =
    useState(false);
  const [shouldShowScrollHintRight, setShouldShowScrollHintRight] =
    useState(false);

  const ref = useScrollSpy((elem) => {
    const hasScrollBar = elem.scrollWidth !== elem.clientWidth;
    const isAllLeft = elem.scrollLeft === 0;
    const isAllRight = elem.scrollLeft + elem.clientWidth == elem.scrollWidth;

    if (!hasScrollBar) {
      setShouldShowScrollHintLeft(false);
      setShouldShowScrollHintRight(false);
    } else {
      setShouldShowScrollHintLeft(!isAllLeft);
      setShouldShowScrollHintRight(!isAllRight);
    }
  });

  return (
    <div className="scroll-outer">
      {shouldShowScrollHintLeft && (
        <div className="scroll-hint scroll-hint-left"></div>
      )}
      <div className="scroll-container" ref={ref}>
        {children}
      </div>
      {shouldShowScrollHintRight && (
        <div className="scroll-hint scroll-hint-right"></div>
      )}
    </div>
  );
};
