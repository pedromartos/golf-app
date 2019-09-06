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

    <!-- VIDEO -->
    <div class="video">
      <b-row>
        <b-col cols="12">Select a video</b-col>

        <b-col cols="12">
          <b-form-file v-model="video"></b-form-file>
        </b-col>
      </b-row>

      <b-row v-show="Boolean(video)" class="video-player">
        <b-col cols="12">
          <video width="375" id="video">
            <source id="video-source" />
          </video>
        </b-col>

        <b-col cols="12" class="video-control">
          <b-button variant="primary" size="sm" @click="play">
            <span v-if="isPaused">
              <fa-icon :icon="['far', 'play-circle']" />
              Play
            </span>
            <span v-else>
              <fa-icon :icon="['far', 'pause-circle']" />
              Pause
            </span>
          </b-button>

          <div class="spacer"></div>

          <b-button variant="outline-primary" size="sm" @click="seek('-')">
            <fa-icon icon="fast-backward" />
          </b-button>
          <b-button variant="outline-primary" size="sm" @click="seek('+')">
            <fa-icon icon="fast-forward" />
          </b-button>

          <div class="spacer"></div>

          <b-button variant="primary" size="sm" @click="saveFrame">
            <fa-icon :icon="['far', 'save']" />
            Save Frame
          </b-button>
        </b-col>
      </b-row>
    </div>

    <!-- IMAGE ADJUSTMENTS -->
    <div class="adjust-images" v-show="false">
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
    </div>

    <b-modal id="data" title="SAVED DATA">
      <code>{{ formattedData }}</code>
    </b-modal>

    <b-modal id="frame-preview" title="Frame Preview">
      <b-img class="image-preview" />
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      videoNode: null,
      isPaused: true,
      video: null,
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
  watch: {
    video: function(newValue) {
      const source = document.getElementById("video-source");
      source.src = URL.createObjectURL(newValue);
      source.parentNode.load();
    }
  },
  computed: {
    imageStyles: function() {
      const imgWidth = this.data.imgDimensions.width;

      return {
        width: `${Math.ceil(imgWidth * this.data.zoom.current)}px`,
        top: `${this.data.position.top}px`,
        left: `${this.data.position.left}px`
      };
    },
    formattedData: function() {
      return JSON.stringify(this.data, null, 2);
    }
  },
  methods: {
    play: function() {
      if (this.videoNode == null) {
        return false;
      }

      if (this.videoNode.paused) {
        this.videoNode.play();
        this.isPaused = false;
      } else {
        this.videoNode.pause();
        this.isPaused = true;
      }
    },
    seek: function(type) {
      if (type == "-") {
        this.videoNode.currentTime -= 0.05;
      } else {
        this.videoNode.currentTime += 0.05;
      }
    },
    saveFrame: function() {
      this.$bvModal.show("frame-preview");

      const canvas = document.createElement("canvas");

      canvas.width = this.videoNode.videoWidth;
      canvas.height = this.videoNode.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
      const dataURI = canvas.toDataURL("image/jpeg");

      setTimeout(() => {
        const img = document.querySelector("#frame-preview .image-preview");
        img.src = dataURI;
      }, 100);
    },
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
    this.videoNode = document.getElementById("video");

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
  .video-player {
    background-color: #e6e6e6;
    padding-top: 10px;
    margin-top: 10px;

    .video-control {
      margin: 10px 0;

      .spacer {
        width: 1px;
        height: 20px;
        background-color: #ccc;
        margin: 0 20px;
        display: inline-block;
        vertical-align: middle;
      }
      .btn {
        margin-right: 5px;
      }
    }
  }

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

#frame-preview {
  img {
    width: 100%;
  }
}
</style>
