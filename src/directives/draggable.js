export default {
  bind: function(el) {
    const mousePos = {};

    const stopDrag = function() {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const startDrag = function(img) {
      const offset = {};
      const container = img.parentNode;

      offset.top = img.offsetTop - mousePos.curY;
      offset.left = img.offsetLeft - mousePos.curX;

      if (offset.top >= 0) {
        offset.top = 0;
      } else if (offset.top < -img.offsetHeight + container.offsetHeight) {
        offset.top = -img.offsetHeight + container.offsetHeight;
      }

      if (offset.left >= 0) {
        offset.left = 0;
      } else if (offset.left < -img.offsetWidth + container.offsetWidth) {
        offset.left = -img.offsetWidth + container.offsetWidth;
      }

      const children = el.querySelectorAll(".img img");

      children.forEach(child => {
        child.style.top = offset.top + "px";
        child.style.left = offset.left + "px";
      });
    };

    el.addEventListener("mousedown", function(e) {
      e.preventDefault();

      mousePos.prevX = e.clientX;
      mousePos.prevY = e.clientY;

      const img = e.target;

      document.onmouseup = stopDrag;
      document.onmousemove = function(evt) {
        evt.preventDefault();

        mousePos.curX = mousePos.prevX - evt.clientX;
        mousePos.curY = mousePos.prevY - evt.clientY;
        mousePos.prevX = evt.clientX;
        mousePos.prevY = evt.clientY;

        startDrag(img);
      };
    });

    el.addEventListener("touchstart", function(e) {
      e.preventDefault();

      mousePos.prevX = e.targetTouches[0].pageX;
      mousePos.prevY = e.targetTouches[0].pageY;

      const img = e.target;

      el.addEventListener("touchmove", function(evt) {
        evt.preventDefault();

        mousePos.curX = mousePos.prevX - evt.targetTouches[0].pageX;
        mousePos.curY = mousePos.prevY - evt.targetTouches[0].pageY;
        mousePos.prevX = evt.targetTouches[0].pageX;
        mousePos.prevY = evt.targetTouches[0].pageY;

        startDrag(img);
      });
    });
  }
};
