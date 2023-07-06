// @ts-ignore
import css from 'dom-css';
let scrollbarWidth: boolean | number = false;

export default function getScrollbarWidth(cacheEnabled = true) {
  if (cacheEnabled && scrollbarWidth !== false) return scrollbarWidth;
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    css(div, {
      width: 100,
      height: 100,
      position: 'absolute',
      top: -9999,
      overflow: 'scroll',
      MsOverflowStyle: 'scrollbar',
    });
    document.body.appendChild(div);
    scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  } else {
    scrollbarWidth = 0;
  }
  return scrollbarWidth || 0;
}
