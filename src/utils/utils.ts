export function translateObject(x: string, y: string, element: HTMLElement) {
	if (element)
		element.style.transform = "translate3d(" + x + ", " + y + ", 0)";
}

export function addCSSClass(element: Element | string | null, css: string | string[]) {
  if (!element) return;
  if (!Array.isArray(css)) css = [css];
  if (typeof element === 'string') {
    const isElement = document.querySelector(element);
    if (isElement !== null) {
      element = isElement as HTMLElement;
    } else return;
  }

  css.forEach((value) => {element.classList.add(value)});
}

export function lessCSSClass(element: Element | string | null, css: string | string[]) {
  if (!element) return;
  if (!Array.isArray(css)) css = [css];
  if (typeof element === 'string') {
    const isElement = document.querySelector(element);
    if (isElement !== null) {
      element = isElement as HTMLElement;
    } else return;
  }

  css.forEach((value) => {element.classList.remove(value)});
}

export function hasCSSClass(element: Element | null, css: string | string[]): boolean {
  if (!element) return false;
  if (!Array.isArray(css))
    css = [css];

  return css.every( (c) => element.classList.contains(c) );
}

export function getSrc(path: string): string {
  const modules = import.meta.glob("/assets/**", { eager: true});
  const file = <{ default: string }>(modules[path]) || {default: ''};

  return file.default || '';
}

export async function sleep(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

export function isDebug() { return import.meta.env.DEV === true; }