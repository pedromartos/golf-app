export default {
  bind: function(el) {
    const mousePos = {};

    const stopDrag = function() {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const startDrag = function(e) {
      e.preventDefault();

      const offset = {};
      const container = e.target.parentNode;

      mousePos.curX = mousePos.prevX - e.clientX;
      mousePos.curY = mousePos.prevY - e.clientY;
      mousePos.prevX = e.clientX;
      mousePos.prevY = e.clientY;

      offset.top = e.target.offsetTop - mousePos.curY;
      offset.left = e.target.offsetLeft - mousePos.curX;

      if (offset.top >= 0) {
        offset.top = 0;
      } else if (offset.top < -e.target.offsetHeight + container.offsetHeight) {
        offset.top = -e.target.offsetHeight + container.offsetHeight;
      }

      if (offset.left >= 0) {
        offset.left = 0;
      } else if (offset.left < -e.target.offsetWidth + container.offsetWidth) {
        offset.left = -e.target.offsetWidth + container.offsetWidth;
      }

      const children = el.querySelectorAll(".img img");

      children.forEach(child => {
        child.style.top = offset.top + "px";
        child.style.left = offset.left + "px";
      });
    };

    el.addEventListener("mousedown", function(e) {
      e.preventDefault();

      console.log(el !== e.target);

      mousePos.prevX = e.clientX;
      mousePos.prevY = e.clientY;

      document.onmouseup = stopDrag;
      document.onmousemove = startDrag;
    });
  }
};
