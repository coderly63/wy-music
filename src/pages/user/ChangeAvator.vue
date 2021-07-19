<!--  -->
<template>
  <div class="change-avator">
    <el-dialog
      title="上传头像"
      v-model="avatorDialogVisible"
      width="470px"
      center
      @close="$emit('close')"
    >
      <div class="change-area">
        <div class="block">
          <div class="img-mask">
            <img
              :src="avatorUrl"
              :style="{
                width: currentWidth + 'px',
                height: currentHeight + 'px',
              }"
            />
          </div>
          <div class="img-crop" @mousedown="changeArea">
            <img
              :src="avatorUrl"
              ref="crop"
              :style="{
                width: currentWidth + 'px',
                height: currentHeight + 'px',
              }"
            />
          </div>
        </div>
        <div class="display">
          <div class="big-display">
            <img
              ref="big"
              :src="avatorUrl"
              :style="{ width: getWidth(1), height: getHeight(1) }"
            />
          </div>
          <div class="small-display">
            <img
              ref="small"
              :src="avatorUrl"
              :style="{ width: getWidth(2), height: getHeight(2) }"
            />
          </div>
        </div>
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
  name: "change-avator",
  data() {
    return {
      avatorDialogVisible: false,
      top: 0,
      right: 150,
      bottom: 100,
      left: 50,
      cropLength: 100,
      currentWidth: 0,
      currentHeight: 0,
      bigLength: 140,
      smallLength: 50,
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
  created() {
    if (this.width > this.height) {
      this.currentWidth = 250;
      this.currentHeight = (this.height * 250) / this.width;
      console.log(this.currentHeight);
    } else {
      this.currentWidth = (this.width * 250) / this.height;
      this.currentHeight = 250;
    }
  },
  props: {
    avatorUrl: {
      type: String,
      default: "",
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changeArea(e) {
      const crop = this.$refs.crop;
      const big = this.$refs.big;
      const small = this.$refs.small;
      e = e || window.Event;
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
        let t = this.top + offsetY;
        let r = this.right + offsetX;
        let b = this.bottom + offsetY;
        let l = this.left + offsetX;
        if (t <= 0) {
          t = 0;
          b = this.cropLength;
        }
        if (b >= imageHeight) {
          b = imageHeight;
          t = imageHeight - this.cropLength;
        }
        if (l <= 0) {
          l = 0;
          r = this.cropLength;
        }
        if (r >= imageWidth) {
          r = imageWidth;
          l = imageWidth - this.cropLength;
        }
        crop.style.clip = `rect(${t}px, ${r}px, ${b}px, ${l}px)`;
        big.style.left = -(l * this.bigLength) / this.cropLength + "px";
        big.style.top = -(t * this.bigLength) / this.cropLength + "px";
        small.style.left = -(l * this.smallLength) / this.cropLength + "px";
        small.style.top = -(t * this.smallLength) / this.cropLength + "px";
      };
      document.onmouseup = () => {
        this.top = this.top + offsetY;
        this.right = this.right + offsetX;
        this.bottom = this.bottom + offsetY;
        this.left = this.left + offsetX;
        document.onmousemove = document.onmouseup = 0;
      };
    },
    getWidth(type) {
      if (type === 1) {
        return (this.bigLength / this.cropLength) * this.currentWidth + "px";
      } else {
        return (this.smallLength / this.cropLength) * this.currentWidth + "px";
      }
    },
    getHeight(type) {
      if (type === 1) {
        return (this.bigLength / this.cropLength) * this.currentHeight + "px";
      } else {
        return (this.smallLength / this.cropLength) * this.currentHeight + "px";
      }
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
    .display {
      margin-left: 20px;
      > div {
        border-radius: 5px;
      }
      .big-display {
        width: 140px;
        height: 140px;
        overflow: hidden;
        margin-top: 10px;
      }
      .small-display {
        width: 50px;
        height: 50px;
        overflow: hidden;
        margin-top: 40px;
      }
      img {
        position: relative;
        border-radius: 10px;
      }
    }
  }
}
</style>
