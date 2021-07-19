<!--  -->
<template>
  <div class="user" v-if="Object.keys(profile).length > 0">
    <div class="user-top">
      <div class="user-avator">
        <img :src="profile.avatarUrl" alt="" />
        <div class="upload-avator">
          修改头像<input type="file" id="avatorFile" @change="avatorChange" />
        </div>
      </div>
      <div class="user-message">
        <div class="user-name">{{ profile.nickname }}</div>
        <div class="user-info"></div>
      </div>
    </div>
    <div class="user-playlist">
      <div class="my-playlist">
        <p>我创建的歌单({{ playlist.length }})</p>
      </div>
      <div
        class="playlist"
        v-for="(item, i) in playlist"
        :key="item.id"
        v-if="playlist && playlist.length > 0"
      >
        <div class="image" @click="$router.push('/home/playlist/' + item.id)">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <div class="playlist-name">{{ getName(item.name, i) }}</div>
        <div class="playlist-length">{{ item.trackCount }}首</div>
      </div>
    </div>
    <div class="avator-dialog">
      <change-avator
        ref="avator"
        :avatorUrl="avatorUrl"
        :width="width"
        :height="height"
        v-if="width > 0"
        @close="width = 0"
      ></change-avator>
    </div>
  </div>
</template>

<script>
import {
  getUserAccount,
  getUserSubcount,
  getPlaylist,
} from "../../network/api/user";
import ChangeAvator from "./ChangeAvator.vue";
export default {
  name: "user",
  created() {
    this.init();
  },
  components: {
    ChangeAvator,
  },
  data() {
    return {
      profile: {},
      playlist: [],
      avatorUrl: "",
      width: 0,
      height: 0,
    };
  },
  methods: {
    async init() {
      let res = await getUserAccount();
      // console.log(res);
      if (res && res.code === 200) {
        this.profile = res.profile;
      }
      res = await getPlaylist(this.$store.getters.userId);
      // console.log(res);
      if (res && res.code === 200) {
        this.playlist = res.playlist;
      }
    },
    getName(name, i) {
      if (i === 0) {
        return "我喜欢的音乐";
      } else {
        return name;
      }
    },
    avatorChange() {
      const avatorImage = document.querySelector("#avatorFile").files[0];
      this.avatorUrl = window.webkitURL.createObjectURL(avatorImage);
      let img = new Image();
      img.src = this.avatorUrl;
      img.onload = () => {
        // console.dir(img);
        this.width = img.width;
        this.height = img.height;
        setTimeout(() => {
          this.$refs.avator.avatorDialogVisible = true;
        });
      };
    },
  },
};
</script>
<style scoped lang='less'>
.user {
  width: 80%;
  padding: 20px;
  background-color: #fff;
  text-align: left;
  margin: 0 auto;
  min-width: 700px;
  .user-top {
    display: flex;
    .user-avator {
      width: 180px;
      height: 180px;
      .upload-avator {
        &:hover {
          background-color: #f2f2f2;
          text-decoration: none;
        }
        margin-left: 42px;
        height: 30px;
        width: 90px;
        border-radius: 20px;
        position: relative;
        text-align: center;
        line-height: 30px;
        border: 1px solid #e6e6e6;
        font-size: 13px;
        z-index: 3;
        input {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 80px;
        }
      }
      img {
        border-radius: 50%;
        width: 100%;
      }
    }
    .user-message {
      margin-left: 30px;
      width: 80%;
      .user-name {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }
  .user-playlist {
    margin-top: 60px;
    .my-playlist {
      font-weight: bolder;
      margin-bottom: 20px;
    }
    .image {
      width: 15%;
      height: 15%;
      img {
        width: 100%;
        cursor: pointer;
      }
    }
    .playlist-name {
      margin-top: 5px;
    }
    .playlist-length {
      margin-top: 5px;
      font-size: 10px;
      color: #5e5e5e;
    }
  }
}
</style>