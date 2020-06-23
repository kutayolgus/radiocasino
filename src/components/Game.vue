<template>

<div>
       <router-link to="/list"  class="btn btn-primary btn-sm" style="float:left"><li v-on:click="stopAudio()"> Back to Game List</li></router-link>
       <div v-if="this.$store.state.coin >0">
     <Wheel />
      <Board style="margin-top:70px;" v-bind:audio="audio"/>
      </div>
      <div v-else>
        Your coins are over!
      </div>
</div>
</template>

<script>
import Wheel from './Wheel.vue';
import Board from './Board.vue';

export default {
  name: 'game',
  components: {
    Wheel,
    Board
  },
  data () {
    return {
      audio: null,
    }
  },
  created() {
    console.log(Board.data.audio);
  },
  methods: {
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    stopAudio: function () {
      this.$emit('stop');
/*       if (!! this.audio) {
        this.audio.pause();
      } */
    }

  }
}
</script>

<style>

.list-group{
    max-height: 300px;
    margin-bottom: 10px;
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
    color: red;
}

@import "../assets/css/layout.css";
</style>
