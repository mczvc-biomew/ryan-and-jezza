type AnimationMap<K extends string, V> = {
  [k in K]: V
}
const animations: AnimationMap<string, Ref<NodeJS.Timeout[]>> = {};


export default function (text: string, pendingStatus: Ref<boolean>, animateEl?: HTMLElement, viewRef?: Ref<string>, maxBlink?: number, modifyElement = false) {
  let nextLetter = 0;
  let maxTicks = maxBlink ?? 3;
  let nextText = "";
  let internalView: Ref<string>;
  const key = text;
  if (!viewRef) internalView = ref('');
  else internalView = viewRef;

  pendingStatus.value = true;

  if (!(key in animations)) animations[key] = ref([]);

  while (animations[key].value.length > 0) {
    clearTimeout(animations[key].value.pop());
  }

  if (animateEl) {
    const cursorBlink = () => {
      animations[key].value.push( setTimeout( () => {
        animateEl.classList.contains("tick") ? lessCSSClass(animateEl, "tick") : addCSSClass(animateEl, "tick");
        maxTicks--;
        if (maxTicks > 0 || (maxTicks <= 0 && animateEl.classList.contains("tick")))
          cursorBlink();
      }, 700) );
    };

    cursorBlink();
  }

  const textArray = [...text];
  textArray.forEach((c) => {
    animations[key].value.push( setTimeout(() => {
      nextText = nextText + c;

      internalView.value = nextText;
      if (modifyElement && animateEl) {
        animateEl.textContent = nextText;
      }
      if (animateEl) addCSSClass(animateEl, "tick");
    }, nextLetter) );
    nextLetter += 120;
  });

  setTimeout( () => { pendingStatus.value = false; }, nextLetter + 2000);

  return internalView;
}