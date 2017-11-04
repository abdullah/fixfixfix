const insertAfter = (element, target) => {
  const parent = target.parentNode;
  if (parent.lastChild === target) {
    parent.appendChild(element);
  } else {
    parent.insertBefore(element, target.nextSibling);
  }
};

export default class FixFixFix {
  constructor(table, options) {
    this.cloneIsVisible = false;
    this.options = options || {};
    this.table =
      typeof table === 'string' ? document.querySelector('table') : table;
    this.thead = this.table.querySelector('thead');
    this.cloneThead = this.thead.cloneNode(true);
    this.cloneThead.classList.add('FixFixFix-clone-node');
    this.cloneThead.style.display = 'none';
    insertAfter(this.cloneThead, this.thead);
    this.setTheadThWidth();
    this.setTheadPosition();
  }

  setTheadPosition() {
    const activeElement = this.cloneIsVisible ? this.cloneThead : this.thead;
    const { width, left } = activeElement.getBoundingClientRect();
    const { extraWidth = 0 } = this.options;
    this.thead.style.width = width + extraWidth;
    this.thead.style.left = left - extraWidth;
    this.thead.style.paddingLeft = extraWidth;
    this.thead.style.top = 0;
  }

  setTheadThWidth() {
    const activeElement = this.cloneIsVisible ? this.cloneThead : this.thead;

    const activeChildren = activeElement.querySelectorAll('th');
    const cloneChildren = this.cloneThead.querySelectorAll('th');
    const childrenOrjinal = this.thead.querySelectorAll('th');

    activeChildren.forEach((e, index) => {
      const { width } = e.getBoundingClientRect();
      cloneChildren[index].style.width = width;
      childrenOrjinal[index].style.width = width;
    });
  }

  listenEvents() {
    window.addEventListener('scroll', () => {
      const { top, height } = this.table.getBoundingClientRect();
      if (Math.abs(top) + 100 >= height) {
        this.thead.style.top = -100;
      } else {
        this.thead.style.top = 0;
      }

      if (top <= 0) {
        this.cloneIsVisible = true;
        this.thead.style.position = 'fixed';
        this.cloneThead.style.display = 'table-header-group';
        this.thead.classList.add('FixFixFix-fixed-thead');
      } else {
        this.thead.classList.remove('FixFixFix-fixed-thead');
        this.cloneIsVisible = false;
        this.thead.style.position = '';
        this.cloneThead.style.display = 'none';
      }
    });

    window.addEventListener('resize', () => {
      this.setTheadThWidth();
      this.setTheadPosition();
    });
  }

  update() {
    this.setTheadThWidth();
    this.setTheadPosition();
  }

  run() {
    this.listenEvents();
  }
}
