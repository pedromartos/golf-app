<template>
  <b-container fluid id="home" v-on:drag="updatePosition($event)">
    <h1>
      Golf

      <b-button variant="outline-primary" size="sm" @click="showData">
        Show/Save Data
      </b-button>

      &nbsp;

      <b-button variant="danger" size="sm" @click="resetData">
        Reset Data
      </b-button>
    </h1>

    <b-row>
      <b-col>
        <b-form-input
          type="range"
          v-model="data.zoom.current"
          :min="data.zoom.min"
          :max="data.zoom.max"
          step="1"
        >
        </b-form-input>
      </b-col>
    </b-row>

    <b-row class="images px-1 px-md-3" id="gallery">
      <b-col
        cols="12"
        md="4"
        class="img px-0"
        v-for="(img, index) in images"
        :key="index"
      >
        <b-img :src="img" :id="`img-${index}`" :style="imageStyles" />
      </b-col>
    </b-row>

    <b-modal id="data" title="SAVED DATA">
      <code>{{ formattedData }}</code>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      data: {
        imgDimensions: {
          width: null,
          height: null
        },
        zoom: {
          current: "50",
          min: "0",
          max: "100"
        },
        boxWidth: null,
        position: {
          top: 0,
          left: 0
        }
      },
      images: [
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/1s.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/2b.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/3t.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/4d.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/5c.png",
        "http://fellipebrito.com/golf-swing/20190828/hit-to-the-right/6f.png"
      ]
    };
  },
  computed: {
    imageStyles: function() {
      return {
        width: `${this.data.zoom.current}px`,
        top: `${this.data.position.top}px`,
        left: `${this.data.position.left}px`
      };
    },
    formattedData: function() {
      return JSON.stringify(this.data, null, 2);
    }
  },
  methods: {
    showData: function() {
      this.$bvModal.show("data");
      localStorage.setItem("golf-data", JSON.stringify(this.data));
    },
    resetData: function() {
      localStorage.removeItem("golf-data");
    }
  },
  mounted: function() {
    const $this = this;

    // RESTORE SAVED DATA
    if (localStorage.getItem("golf-data")) {
      this.data = JSON.parse(localStorage.getItem("golf-data"));
    } else {
      // Get image boxes size
      this.data.boxWidth = document.querySelector(".img").offsetWidth;

      // Get Image actual size
      const imageObj = new Image();
      imageObj.onload = function() {
        $this.data.imgDimensions.width = this.width;
        $this.data.imgDimensions.height = this.height;
        $this.data.zoom.current = this.width;
        $this.data.zoom.min = `${this.width * 0.1}`;
        $this.data.zoom.max = `${this.width * 2}`;
      };
      imageObj.src = this.images[0];
    }

    // DRAGGABLE
    const mousePos = {};
    const el = document.getElementById("gallery");

    const stopDrag = function() {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const startDrag = function(img) {
      const offset = {};
      // const container = img.parentNode;

      offset.top = img.offsetTop - mousePos.curY;
      offset.left = img.offsetLeft - mousePos.curX;

      $this.data.position = offset;

      // if (offset.top >= 0) {
      //   offset.top = 0;
      // } else if (offset.top < -img.offsetHeight + container.offsetHeight) {
      //   offset.top = -img.offsetHeight + container.offsetHeight;
      // }

      // if (offset.left >= 0) {
      //   offset.left = 0;
      // } else if (offset.left < -img.offsetWidth + container.offsetWidth) {
      //   offset.left = -img.offsetWidth + container.offsetWidth;
      // }

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
</script>

<style lang="scss">
#home {
  .images {
    .img {
      height: 350px;
      overflow: hidden;
      flex: 0 0 auto;
      position: relative;
      margin: 0 0 0 0;
      // box-shadow: 0 0 0 1px #fff;
      border: 1px solid #fff;
      background-color: #ccc;

      img {
        position: absolute;
      }
    }
  }
}
</style>
