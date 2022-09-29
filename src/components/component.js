export class Component {
  _mount(fn) {
    window.addEventListener("load", (event) => {
      fn(event);
    });
  }

  _unMount(fn) {
    window.addEventListener("beforeunload", (event) => {
      fn(event);
    });
  }
};