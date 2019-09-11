<template>
  <div id="view-group">
    <section class="header">
      <h1>Managing group: {{ group.name }}</h1>
      <p class="lead">
        Move/Zoom the images

        <b-button
          :variant="isEnabled ? 'primary' : ''"
          size="sm"
          @click="toggleGestures"
          class="toggle-gestures"
        >
          Move/Zoom: {{ isEnabled ? "ON" : "OFF" }}
        </b-button>
      </p>
    </section>

    <section class="body">
      <div class="adjust-images" v-show="group.images.length > 0">
        <b-row>
          <b-col cols="12">
            Zoom:
          </b-col>
          <b-col cols="12">
            <b-form-input
              type="range"
              v-model="group.zoom"
              min="0.1"
              max="2"
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
            v-for="(img, index) in group.images"
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
    </section>

    <section class="footer top-spaced-border">
      <b-button variant="primary" size="lg" @click="saveGroup">
        <fa-icon icon="save" />
        Save Group
      </b-button>
    </section>
  </div>
</template>

<script>
export default {
  name: "ViewGroup",
  props: ["groupId"],
  data: function() {
    return {
      group: {},
      mousePos: {},
      isEnabled: true
    };
  },
  computed: {
    imageStyles: function() {
      const imgWidth = this.group.videoDimensions.width;

      return {
        width: `${Math.ceil(imgWidth * this.group.zoom)}px`,
        top: `${this.group.position.top}px`,
        left: `${this.group.position.left}px`
      };
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
    zoomImg: function(e) {
      if (e.scale > 1) {
        this.group.zoom = 1 * this.group.zoom + e.scale / 1000;
      } else {
        this.group.zoom = 1 * this.group.zoom - (1 - e.scale) / 100;
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

      this.group.position = offset;

      const children = document.querySelectorAll(".images .img img");
      children.forEach(child => {
        child.style.top = offset.top + "px";
        child.style.left = offset.left + "px";
      });
    },
    saveGroup: function() {
      this.$store.dispatch("saveGroup", this.group).then(response => {
        this.$bvToast.toast(response.msg, {
          title: response.status
        });

        console.log("RESPONSE", response.data);
      });
    }
  },
  created: function() {
    this.$store.dispatch("recoverGroups");
    this.group = this.$store.getters["getGroup"](this.groupId);
    if (this.group.position === undefined) {
      this.group.position = {};
    }
  }
};
</script>

<style lang="scss">
#view-group {
  .toggle-gestures {
    @media (min-width: 768px) {
      display: none;
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
</style>
