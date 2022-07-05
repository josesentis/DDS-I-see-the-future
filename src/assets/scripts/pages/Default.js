import { Scroll } from '../_app/cuchillo/scroll/Scroll';
import Page from '../_app/cuchillo/pages/Page';
import { ControllerPage } from '../_app/cuchillo/pages/ControllerPage';
import { isMobile } from '../_app/cuchillo/core/Basics';
import { GetBy } from '../_app/cuchillo/core/Element';
import { FormValidator } from '../_app/cuchillo/forms/FormValidator';
import Wrap from '../layout/Wrap';
import characters from '../characters';

export default class Default extends Page {
  _form;
  _characterPrinter;
  _characters = [];

  constructor() {
    super();

    this._onSubmit = (data) => { this.onSubmit(data) };

    this._characterPrinter = GetBy.id('char-printer');
    this._form = new FormValidator(GetBy.id('form'), this._onSubmit);

    this._characters.push({
      name: 'rosa',
      val: 0
    });
    this._characters.push({
      name: 'ovni',
      val: 0
    });
    this._characters.push({
      name: 'espejo',
      val: 0
    });
    this._characters.push({
      name: 'mariposa',
      val: 0
    });
    this._characters.push({
      name: 'wildHorse',
      val: 0
    });
  }

  //SHOW
  beforeShow () {
    Scroll.init(Scroll.AXIS_Y, { domResize: this.container, smooth: !isMobile, multiplicator: 1 });
    Scroll.start();
  }

  show__effect (__call) {
    Wrap.show(() => { this.afterShow() });
  }

  afterShow () {
    super.afterShow();
  }

  //HIDE
  beforeHide () { }
  hide__effect () {
    Scroll.hide();
    Wrap.hide(() => { this.afterHide(); });
  }

  afterHide () {
    Scroll.dispose();
    super.afterHide();
  }

  //RESIZE
  resize () {
    super.resize();
  }

  //LOOP
  loop () {
    if (this._isActive) {
      super.loop();
    }
  }

  onSubmit (data) {
    console.log(data);

    Object.keys(data).map((q, i) => {
      this._characters.map(char => {
        char.val += characters[char.name][i][data[q]];
      });
    });

    this._characters.sort((a, b) => {
      return b.val - a.val;
    });

    console.log(this._characters);

    this._characterPrinter.innerHTML = this._characters[0].name;

    this._characters.map(char => { char.val = 0; });
  }
}

ControllerPage._addPage("default", Default)
