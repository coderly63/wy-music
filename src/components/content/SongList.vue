<!--  -->
<template>
  <div class="songList">
    <list>
      <template v-slot:title>
        <p>热门推荐</p>
      </template>
      <template v-slot:content>
        <ul>
          <li
            v-for="(music, i) in songList"
            @click="toDetail(music)"
            :key="music.id"
          >
            <div
              class="item"
              @mouseenter="currentIndex = i"
              @mouseleave="currentIndex = -1"
            >
              <transition name="playcount">
                <div class="play-count" v-show="currentIndex === i">
                  {{ music.playCount }}
                </div>
              </transition>
              <img :src="music.picUrl" />
            </div>
            <p>{{ music.name }}</p>
          </li>
        </ul>
      </template>
    </list>
  </div>
</template>

<script>
import List from "../common/List.vue";
export default {
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: -1,
    };
  },
  components: {
    List,
  },
  mounted() {
    // console.log(this.songList);
  },
  methods: {
    toDetail(item) {
      this.$router.push("/home/playlist/" + item.id);
    },
  },
};
</script>
<style scoped lang='less'>
@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.songList {
  min-height: 300px;
  ul {
    margin-top: 60px;
    li {
      .item {
        position: relative;
        width: 140px;
        height: 140px;
        .play-count {
          position: absolute;
          top: 0;
          left: 0;
          right: 2px;
          width: 91%;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.4)
          );
          text-align: right;
          color: #fff;
        }
      }
      cursor: pointer;
      font-size: 14px;
      list-style: none;
      float: left;
      padding-left: 20px;
      overflow: hidden;
      width: 130px;
      height: 130px;
      padding: 0 0 100px 30px;
      img {
        width: 140px;
        height: 140px;
        cursor: pointer;
      }
      p {
        margin: 8px 0 3px;
      }
    }
  }
}
.playcount-enter-active {
  animation: slideInDown 0.4s;
}
.playcount-leave-active {
  animation: slideInDown 0.4s reverse;
}
</style>