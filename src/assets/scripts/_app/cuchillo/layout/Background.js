import { gsap } from "gsap";

export default class BG {
  static colors;
  static container = document.body;
  static actualPalette = null;
  static actualColor = null;
  static time = .2;
  static ease = "";

  static init(__colors) {
    this.colors = __colors;
  }

  static changePaletteDirect(__color, __call = null) {
    this.changePalette(__color, __call, 0);
  }

  static changePalette(__color, __call = null, __time = BG.time, __ease = null) {
    const color = this.colors[__color];

    if(__color && this.actualPalette !== color.str) {
      if (this.actualPalette !== null) {
        document.body.classList.remove(this.actualPalette);
      }

      this.actualPalette = color.str;
      document.body.classList.add(this.actualPalette);

      this.changeBG(color.css, __call, __time, __ease);
    } else if(__call) {
       __call();
    }
  }

  static changeBG(__color, __call = null, __time = BG.time, __ease = BG.ease) {
    if(this.actualColor === __color) {
      if(__call) __call();
      return;
    }

    this.actualColor = __color;

    if(__time === 0) {
      gsap.set(this.container,{backgroundColor:__color});
      if(__call) __call();
    } else {
      gsap.to(this.container, {backgroundColor:__color, duration:__time, ease: __ease, onComplete:()=>{if(__call) __call();}});
    }
  }
}


