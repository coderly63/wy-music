<!--  -->
<template>
  <div class="box">
    <div class="swiper">
      <ul :onmouseover="clear" :onmouseout="start">
        <li v-for="item in banners"><img :src="item.imageUrl" alt="" /></li>
      </ul>
      <ol>
        <li
          v-for="(item, i) in imgNum"
          :class="{ active: i == index }"
          @click="changeIndex(i)"
        ></li>
      </ol>
    </div>
  </div>
</template>

<script>
import { getBanners } from "../network/api/home";
import { ref, reactive, onMounted } from "vue";
export default {
  props: {
    animDuration: {
      type: Number,
      default: 1000,
    },
    interval: {
      type: Number,
      default: 2000,
    },
  },
  async setup(props) {
    onMounted(() => {
      start();
    });
    const res = await getBanners(); //获取轮播图图片
    const banners = res ? res.banners : [];
    const index = ref(0);
    const imgNum = banners.length;
    const timer = ref(null);
    function start() {
      //开始轮播
      const img = document.querySelector(".swiper ul img");
      const imgWidth = img && img.offsetWidth;
      const swiper = document.querySelector(".swiper ul");
      swiper.style.transition = "left " + props.animDuration + "ms"; //初始化动画
      swiper.style.left = -index.value * imgWidth + "px"; //给一个基础定位 否则第一张没有效果
      const cloneLi =
        document.querySelectorAll(".swiper ul>li")[0] &&
        document.querySelectorAll(".swiper ul>li")[0].cloneNode(true);
      swiper && swiper.appendChild(cloneLi);
      // swiper.transition.
      timer.value = setInterval(() => {
        index.value++;
        swiper.style.transition = "left " + props.animDuration + "ms";
        if (index.value == imgNum) {
          index.value = 0;
          swiper.style.left = -imgNum * imgWidth + "px";
          setTimeout(() => {
            swiper.style.transition = "0ms";
            swiper.style.left = "0px";
          }, props.animDuration);
        } else {
          swiper.style.left = -index.value * imgWidth + "px";
        }
      }, props.interval);
    }
    function changeIndex(i) {
      //点击小按钮是的操作
      clearInterval(timer.value);
      index.value = i;
      start();
    }
    function clear() {
      clearInterval(timer.value);
    }

    return {
      clear,
      start,
      banners,
      changeIndex,
      index,
      imgNum,
    };
  },
};
</script>
<style scoped lang="less">
.swiper {
  width: 700px;
  height: 280px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  ul {
    display: flex;
    position: absolute;
    > li {
      list-style: none;
    }
    img {
      width: 700px;
      height: 280px;
    }
  }
  ol {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 10px;
    > li {
      // list-style: none;
      width: 10px;
      height: 10px;
      border: solid #000 1px;
      border-radius: 50%;
      list-style: none;
      margin-left: 10px;
      margin-right: 10px;
      cursor: pointer;
    }
    .active {
      background-color: brown;
    }
  }
}
</style>