import { Scroll } from '../_app/cuchillo/scroll/Scroll';
// import Scrollbar from '../_app/cuchillo/scroll/Scrollbar';
import Page from '../_app/cuchillo/pages/Page';
import { ControllerPage } from '../_app/cuchillo/pages/ControllerPage';
import Wrap from '../layout/Wrap';
import { isMobile } from '../_app/cuchillo/core/Basics';
import { GetBy } from '../_app/cuchillo/core/Element';
// import { Videos } from '../_app/cuchillo/components/Videos';
// import { Acordions } from '../_app/cuchillo/components/Acordions';
import Forms, { FormValidator } from '../_app/cuchillo/forms/FormValidator';

export default class Default extends Page {
  _form;
  _characterPrinter;

  constructor() {
    super();

    // Videos.init();
    // Acordions.init();
    // Forms.init();

    this._onSubmit = () => {
      // e.preventDefault();
      this.onSubmit();
    };

    this._characterPrinter = GetBy.id('char-printer');
    this._form = new FormValidator(GetBy.id('form'), this._onSubmit);
    // this._form.addEventListener('submit', this._onSubmit);
  }

  //SHOW
  beforeShow() {
    Scroll.init(Scroll.AXIS_Y, {domResize:this.container, smooth:!isMobile, multiplicator:1});
    // Scroll.setScrollbar(new Scrollbar());
    Scroll.start();
  }

  show__effect(__call) {
    Wrap.show(()=> { this.afterShow()} );
  }

  afterShow() {
    super.afterShow();
  }

  //HIDE
  beforeHide() {}
  hide__effect() {
    Scroll.hide();
    Wrap.hide(() => {this.afterHide();});
  }

  afterHide() {
    Scroll.dispose();
    super.afterHide();
  }

  //RESIZE
  resize() {
    super.resize();
    // Acordions.resize();
  }

  //LOOP
  loop() {
    if(this._isActive) {
      super.loop();
    }
  }

  onSubmit () {
    console.log('Submit', this._characterPrinter);
  }
}

ControllerPage._addPage("default", Default)
