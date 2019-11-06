<template>
  <div id="new-group">
    <section class="header">
      <h1>New image group</h1>
      <p class="lead">Select a video file and take screenshots</p>
    </section>

    <section class="body">
      <b-row>
        <b-col cols="12">Select a video</b-col>

        <b-col cols="12">
          <b-form-file v-model="videoFile"></b-form-file>
        </b-col>
      </b-row>

      <div v-show="Boolean(videoFile)">
        <b-row class="video-player">
          <b-col cols="12" md="5">
            <video id="video" @loadedmetadata="getVideoData">
              <source id="video-source" />
            </video>
          </b-col>
        </b-row>

        <b-row class="video-control">
          <b-col cols="12" md="5">
            <b-row>
              <b-button-group size="sm" class="col-12">
                <b-button variant="outline-primary" size="sm" @click="seek(-5)">
                  <fa-icon icon="fast-backward" />
                </b-button>

                <b-button
                  variant="outline-primary"
                  size="sm"
                  @click="seek(-0.05)"
                >
                  <fa-icon icon="step-backward" />
                </b-button>

                <b-button
                  variant="outline-primary"
                  size="sm"
                  @click="seek(0.05)"
                >
                  <fa-icon icon="step-forward" />
                </b-button>

                <b-button variant="outline-primary" size="sm" @click="seek(5)">
                  <fa-icon icon="fast-forward" />
                </b-button>
              </b-button-group>
            </b-row>

            <b-row>
              <b-button-group size="sm" class="col-6">
                <b-button variant="primary" @click="play">
                  <span v-if="isPaused">
                    <fa-icon :icon="['far', 'play-circle']" />
                    Play
                  </span>

                  <span v-else>
                    <fa-icon :icon="['far', 'pause-circle']" />
                    Pause
                  </span>
                </b-button>
              </b-button-group>

              <b-button-group size="sm" class="col-6">
                <b-button variant="primary" @click="saveFrame">
                  <fa-icon :icon="['far', 'image']" />
                  Take Screenshot
                </b-button>
              </b-button-group>
            </b-row>
          </b-col>
        </b-row>
      </div>

      <div class="preview-group top-spaced-border" v-if="group.images.length">
        <h5>Group Preview</h5>

        <b-form-group label="Name:" label-for="name">
          <b-form-input id="name" v-model="group.name" type="text" required />
        </b-form-group>

        <div class="d-block">Images:</div>
        <b-row no-gutters>
          <b-col cols="6" md="3" v-for="(image, i) in group.images" :key="i">
            <b-img :src="image" />
          </b-col>
        </b-row>
      </div>
    </section>

    <section class="footer top-spaced-border" v-if="group.images.length">
      <b-button
        variant="primary"
        size="lg"
        @click="saveGroup"
        :disabled="!isValid"
      >
        <fa-icon icon="save" />
        Save Group
      </b-button>
    </section>
  </div>
</template>
<script>
export default {
  name: "NewGroup",
  data: function() {
    return {
      videoNode: null,
      isPaused: true,
      videoFile: null,
      group: {
        name: "",
        images: [],
        videoDimensions: {}
      }
    };
  },
  computed: {
    isValid: function() {
      return this.group.images.length > 0 && this.group.name != "";
    }
  },
  watch: {
    videoFile: function(newValue) {
      console.log(newValue);
      const source = document.getElementById("video-source");
      source.src = URL.createObjectURL(newValue);
      source.parentNode.load();
    }
  },
  methods: {
    saveGroup: function() {
      this.$store.dispatch("imageGroup/addGroup", this.group).then(response => {
        this.$bvToast.toast(response.msg, {
          title: response.status
        });

        this.$router.push({
          name: "view-group",
          params: { groupId: response.id }
        });
      });
    },
    getVideoData: function(e) {
      this.group.videoDimensions = {
        width: e.target.videoWidth,
        height: e.target.videoHeight
      };
    },
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
    seek: function(value) {
      this.videoNode.currentTime += value;
    },
    saveFrame: function() {
      this.$bvModal.show("frame-preview");

      const canvas = document.createElement("canvas");

      canvas.width = this.videoNode.videoWidth;
      canvas.height = this.videoNode.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

      this.group.images.push(canvas.toDataURL("image/jpeg"));
    },
    addImage: function() {
      const img = document.querySelector("#frame-preview .modal-body img");
      this.data.imgDimensions.width = img.width;
      this.data.imgDimensions.height = img.height;

      this.data.images.push(img.src);
    }
  },
  mounted: function() {
    this.videoNode = document.getElementById("video");
  }
};
</script>
<style lang="scss">
#new-group {
  .header {
    text-align: center;
  }
  .body {
    .video-player {
      video {
        width: 100%;
      }
    }

    .video-control {
      .row + .row {
        margin-top: 20px;
      }

      .btn {
        * {
          vertical-align: middle;
        }
      }
    }

    .preview-group {
      img {
        width: 100%;
      }
    }
  }
}
</style>
