<template>
  <b-container fluid id="home">
    <h1>
      Golf

      <b-button variant="outline-primary" size="sm" @click="showData">
        Show/Save Data
      </b-button>

      &nbsp;

      <b-button variant="danger" size="sm" @click="resetData">
        Reset Data
      </b-button>

      &nbsp;

      <b-button
        :variant="isEnabled ? 'primary' : ''"
        size="sm"
        @click="toggleGestures"
      >
        Move/Zoom: {{ isEnabled ? "ON" : "OFF" }}
      </b-button>
    </h1>

    <b-row>
      <b-col cols="12">
        Zoom:
      </b-col>
      <b-col cols="12">
        <b-form-input
          type="range"
          v-model="data.zoom.current"
          :min="data.zoom.min"
          :max="data.zoom.max"
          step="0.001"
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
        <b-img
          :src="img"
          :id="`img-${index}`"
          :style="imageStyles"
          v-hammer:pinch="zoomImg"
          v-hammer:pan="dragImg"
          v-hammer:panstart="initDrag"
        />
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
      isEnabled: true,
      mousePos: {},
      data: {
        imgDimensions: {
          width: null,
          height: null
        },
        zoom: {
          current: "1",
          min: "0.1",
          max: "2"
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
      const imgWidth = this.data.imgDimensions.width;

      return {
        width: `${imgWidth * this.data.zoom.current}px`,
        top: `${this.data.position.top}px`,
        left: `${this.data.position.left}px`
      };
    },
    formattedData: function() {
      return JSON.stringify(this.data, null, 2);
    }
  },
  methods: {
    toggleGestures: function() {
      const els = document.querySelectorAll(".img");

      els.forEach(el => {
        if (!this.isEnabled) {
          el.classList.remove("disabled");
        } else {
          el.classList.add("disabled");
        }
      });

      this.isEnabled = !this.isEnabled;
    },
    showData: function() {
      this.$bvModal.show("data");
      localStorage.setItem("golf-data", JSON.stringify(this.data));
    },
    resetData: function() {
      localStorage.removeItem("golf-data");
    },
    zoomImg: function(e) {
      if (e.scale > 1) {
        this.data.zoom.current = 1 * this.data.zoom.current + e.scale / 1000;
      } else {
        this.data.zoom.current =
          1 * this.data.zoom.current - (1 - e.scale) / 100;
      }
    },
    initDrag: function(e) {
      this.mousePos.prevX = e.changedPointers[0].pageX;
      this.mousePos.prevY = e.changedPointers[0].pageY;
    },
    dragImg: function(e) {
      e.preventDefault();

      const img = e.target;

      this.mousePos.curX = this.mousePos.prevX - e.changedPointers[0].pageX;
      this.mousePos.curY = this.mousePos.prevY - e.changedPointers[0].pageY;
      this.mousePos.prevX = e.changedPointers[0].pageX;
      this.mousePos.prevY = e.changedPointers[0].pageY;

      this.startDrag(img);
    },
    startDrag: function(img) {
      const offset = {};

      offset.top = img.offsetTop - this.mousePos.curY;
      offset.left = img.offsetLeft - this.mousePos.curX;

      this.data.position = offset;

      const children = document.querySelectorAll(".img img");
      children.forEach(child => {
        child.style.top = offset.top + "px";
        child.style.left = offset.left + "px";
      });
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
        // $this.data.zoom.current = this.width;
        // $this.data.zoom.min = `${this.width * 0.1}`;
        // $this.data.zoom.max = `${this.width * 2}`;
      };
      imageObj.src = this.images[0];
    }
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
        z-index: 1;
      }

      &.disabled {
        &:before {
          content: " ";
          z-index: 2;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
        }
      }
    }
  }
}
</style>
