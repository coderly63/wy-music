<!--  -->
<template>
  <div class="change-avator">
    <el-dialog
      title="上传头像"
      v-model="avatorDialogVisible"
      width="40%"
      center
    >
      <div class="change-area">
        <div class="block">
          <div class="img-mask">
            <img :src="avatorUrl" alt="" />
          </div>
          <div class="img-crop" @mousedown="changeArea">
            <img :src="avatorUrl" ref="crop" />
          </div>
        </div>
        <div class="display"></div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="avatorDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="avatorDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatorDialogVisible: false,
      top: 0,
      right: 150,
      bottom: 100,
      left: 50,
      cropLength: 100,
    };
  },
  mounted() {
    document.ondragstart = function (ev) {
      ev.preventDefault();
    };
    document.ondragend = function (ev) {
      ev.preventDefault();
    };
  },
  props: {
    avatorUrl: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeArea(e) {
      const crop = this.$refs.crop;
      e = e || window.Event;
      console.dir(crop);
      let startX = e.clientX;
      let startY = e.clientY;
      let imageWidth = crop.clientWidth;
      let imageHeight = crop.clientHeight;
      let offsetX = 0;
      let offsetY = 0;
      document.onmousemove = (e) => {
        e = e || window.Event;
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        if (this.top + offsetY <= 0) {
          crop.style.clip = `rect(0px, ${this.right + offsetX}px, ${
            this.cropLength
          }px, ${this.left + offsetX}px)`;
        } else if (this.bottom + offsetY >= imageHeight) {
          crop.style.clip = `rect(${imageHeight - this.cropLength}px, ${
            this.right + offsetX
          }px, ${imageHeight}px, ${this.left + offsetX}px)`;
        } else if (this.left + offsetX <= 0) {
          crop.style.clip = `rect(${this.top + offsetY}px, ${
            this.cropLength
          }px, ${this.bottom + offsetY}px, 0px)`;
        } else if (this.right + offsetX >= imageWidth) {
          crop.style.clip = `rect(${this.top + offsetY}px, ${imageWidth}px, ${
            this.bottom + offsetY
          }px, ${imageWidth - this.cropLength}px)`;
        } else {
          crop.style.clip = `rect(${this.top + offsetY}px, ${
            this.right + offsetX
          }px, ${this.bottom + offsetY}px, ${this.left + offsetX}px)`;
        }
      };
      document.onmouseup = () => {
        this.top = this.top + offsetY;
        this.right = this.right + offsetX;
        this.bottom = this.bottom + offsetY;
        this.left = this.left + offsetX;
        document.onmousemove = document.onmouseup = 0;
      };
    },
  },
};
</script>
<style scoped lang='less'>
.change-avator {
  .change-area {
    display: flex;
    .block {
      width: 250px;
      height: 250px;
      background-color: #000;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-size: cover;
        width: 100%;
      }
      .img-mask {
        width: 100%;
        > img {
          opacity: 0.4;
        }
      }
      .img-crop {
        width: 100%;
        height: 100%;
        cursor: move;
        > img {
          clip: rect(0px, 150px, 100px, 50px);
        }
      }
    }
  }
}
</style>
