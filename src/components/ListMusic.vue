<template>
      <div>
        <ul class="list-group">
          <li v-for="(music,index) in musicList" class="list-group-item" :key="music">
         <span>{{index+1}}. </span>   {{ music }}
          </li>
        </ul>
      </div>
</template>

<script>
import {musicList } from '../helpers/index.js'
export default {
  name: 'MusicList',
  data() {
    return {
      musicList:musicList
    };
  },
methods: {
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  }
}
</script>

<style scoped>

.list-group{
    width:320px;
    margin:0 auto;
    max-height: 300px;
    
    margin-bottom: 10px;
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
}
.list-group li {
  color:#2f889a;
  text-align:left;
padding:10px;
}
.list-group li span {
  float:left;
  padding-right:5px;
  font-weight:900;
}
</style>
