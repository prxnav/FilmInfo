import { useEffect, useState } from "react";
export function Paginate({ atOnce, items, containerClass, render, nextButtonClass, previousButtonClass, buttonWrapperClass, dualButtons, nextText, previousText, buttonClass, }) {
    const itemLength = items.length;
    const [index, setIndex] = useState(0);
    const endIndex = index + atOnce;
    const hasPrev = index !== 0;
    const hasMore = endIndex < itemLength;
    useEffect(() => setIndex(0), [items]);
    const list = useCurrentItems(items, render, index, endIndex);
    function next() {
        setIndex(index + atOnce);
    }
    function prev() {
        setIndex(Math.max(0, index - atOnce));
    }
    const buttons = list && (<div className={buttonWrapperClass}>
      <button className={previousButtonClass || buttonClass} onClick={prev} style={{ visibility: hasPrev ? "visible" : "hidden", transition: "0s" }}>
        {previousText || "Previous"}
      </button>

      <button className={nextButtonClass || buttonClass} onClick={next} style={{ visibility: hasMore ? "visible" : "hidden", transition: "0s" }}>
        {nextText || "Next"}
      </button>
    </div>);
    return (<div className={containerClass}>
      {dualButtons && buttons}
      <div>{list}</div>
      {buttons}
    </div>);
}
function useCurrentItems(all, render, currentIndex, endndex) {
    function getItems() {
        const items = [];
        for (let i = currentIndex; i < Math.min(endndex, all.length); i++) {
            items.push(render(all[i]));
        }
        return items;
    }
    function updateItems() {
        setItems(getItems);
    }
    const [items, setItems] = useState(null);
    useEffect(updateItems, [all, render, currentIndex, endndex]);
    return items;
}