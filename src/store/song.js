import { getSongUrl } from '../network/api/music-list'
export const song = {
  state() {
    return {
      songsList: [], //歌曲列表
      isPlay: false,  //是否播放中
      url: '', //歌曲地址
      id: '', //歌曲id
      duration: '00:00', //歌曲时长
      curTime: "00:00", //当前音乐播放位置
      curSeconds: 0, //当前音乐播放的秒数
      changeTime: 0, //指定播放时刻
      name: '', //歌曲名称
      artist: '', //歌手
      picUrl: '', //歌曲图片
      autoNext: true, //自动播放下一首
      lyric: [], //歌词
      listIndex: -1, //当前歌曲的位置
      volume: 0, //歌曲音量
      isLoading: false,
      error: false,
      isLike: false,
      likeList: [],
    }
  },
  getters: {
    songsList: state => state.songsList,
    isPlay: state => state.isPlay,
    url: state => state.url,
    id: state => state.id,
    duration: state => state.duration,
    curTime: state => state.curTime,
    curSeconds: state => state.curSeconds,
    changeTime: state => state.changeTime,
    name: state => state.name,
    artist: state => state.artist,
    picUrl: state => state.picUrl,
    autoNext: state => state.autoNext,
    lyric: state => state.lyric,
    listIndex: state => state.listIndex,
    volume: state => state.volume,
    isLoading: state => state.isLoading,
    error: state => state.error,
    isLike: state => state.isLike,
    likeList: state => state.likeList,
  },
  mutations: {
    setSongsList: (state, songsList) => { state.songsList = songsList },
    setIsPlay: (state, isPlay) => { state.isPlay = isPlay },
    setUrl: (state, url) => { state.url = url },
    setId: (state, id) => { state.id = id },
    setDuration: (state, duration) => { state.duration = duration },
    setCurSeconds: (state, curSeconds) => { state.curSeconds = curSeconds },
    setCurTime: (state, curTime) => { state.curTime = curTime },
    setChangeTime: (state, changeTime) => { state.changeTime = changeTime },
    setName: (state, name) => { state.name = name },
    setArtist: (state, artist) => { state.artist = artist },
    setPicUrl: (state, picUrl) => { state.picUrl = picUrl },
    setAutoNext: (state, autoNext) => { state.autoNext = autoNext },
    setLyric: (state, lyric) => { state.id = lyric },
    setListIndex: (state, listIndex) => { state.listIndex = listIndex },
    setVolume: (state, volume) => { state.volume = volume },
    setIsLoading: (state, isLoading) => { state.isLoading = isLoading },
    setError: (state, error) => { state.error = error },
    setIsLike: (state, isLike) => { state.isLike = isLike },
    setLikeList: (state, likeList) => { state.likeList = likeList },
    pushLikeSong: (state, song) => { state.likeList.unshift(song) },
    spliceLikeSong: (state, index = state.listIndex) => { state.likeList.splice(index, 1); state.songsList.splice(index, 1) }
  },
  actions: {
    nextSong: async ({ state, commit }, products) => {
      commit("setIsLoading", true);
      commit('setIsLike', false);
      let songsList = state.songsList;
      let index = state.listIndex + products.index;
      if (index >= songsList.length) index = 0;
      if (index < 0) index = songsList.length - 1;
      let music = songsList[index];
      commit("setIsPlay", false);
      commit("setListIndex", index);
      console.log(state.listIndex);
      commit("setId", music.id);
      commit("setName", music.name);
      commit("setDuration", music.time);
      commit("setPicUrl", music.pic);
      commit("setArtist", music.artist);
      commit("setCurTime", "00:00");
      commit("setCurSeconds", 0);
      for (let i = 0; i < state.likeList.length; i++) {
        if (state.id === state.likeList[i]) {
          commit('setIsLike', true);
          break;
        }
      }
      getSongUrl(music.id).then(res => {
        let url = res.data[0].url
        if (res && res.code === 200 && url) {
          commit('setError', false);
          commit("setUrl", url);
          commit("setIsLoading", false);
          commit("setIsPlay", true);
        } else {
          commit('setError', true);
          commit("setIsLoading", false);
          commit("setIsPlay", false);
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}