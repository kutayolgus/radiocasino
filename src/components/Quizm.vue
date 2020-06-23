<template>
    <div class="container shadow" align="center">
              <router-link to="/list"  class="btn btn-primary btn-sm" style="float:left"> <li v-on:click="stopAudio()">Back to Game List</li></router-link>

        <div v-if="this.$store.state.coin">
          <div>
        <h1 id="virsraksts">Do you trust your luck? </h1>
        </div>

        <div>
            <div v-show="true">
                <div class="row">
                    <ul>
                        <li class="col-sm-12 col-md-12 col-lg-6" v-for="index in quizIndexes" :key="index">
                            <div class="btn-group btn-group-toggle" >
                            <label :class="{disabled: isEnable === 'end'}" class="btn btn-success btn-block quesion-b" style="padding: 20px; width: 400px!important; margin: 20px; white-space: normal;">
                              <input type="radio"
                                :id="index"
                                :class="{ active: isActive }"
                                :value="index"
                                v-on="isEnable !== 'end' ? { click: () => [next(), select(), score(index-1)] } : {}"
                                checked> {{musicList[(index-1)]}}
                            </label>
                            </div>
                        </li>
                    </ul>
            </div>

            <button type="button" class="btn btn-info btn-sm stop" v-if="audio != null" v-on:click="stopAudio()">
                Stop Music
            </button>

            </div>
        </div>
        <div v-show="isEnable === 'end'">
          <h2>
            Opss !! Not enough money to continue.
          </h2>
        </div>
        <div v-show="isEnable === 'win'" class="alert alert-success" data-dismiss="alert" aria-label="Close" role="alert">
          You win 10 - Music playing now "{{musicName}}"
        </div>
        <div v-show="isEnable === 'lose'" class="alert alert-danger" role="alert">
          You lose! 10 Coin - Music playing now "{{musicName}}"
        </div>

        </div>
              <div v-else>
        Your coins are over!
        </div>
    </div>
</template>

<script>
import {musicList} from '../helpers/index.js'
export default {
  name: 'Quiz',

data() {return {
    musicList: musicList,
    // Store current question index
    questionIndex: 0,
    // An array initialized with "false" values for each question
    // It means: "did the user answered correctly to the question n?" "no".
    //userResponses: Array(quiz.questions.length).fill(false),
    isActive: false,
    response: 0,
    audio: null,
    quizIndexes: [],
    isEnable: "",
    correctAnswer: 0,
    nextCorrectAnswer: 0,
    isTrue: null,
    musicName: ""
  }
},
  created: function () {
    console.log("quiz coin check",this.$store.state.getCoin)
    this.quizIndexes = this.randomChoice();
    this.correctAnswer = this.quizIndexes[this.randomChoice(4,1)[0]-1];
    this.nextCorrectAnswer = this.correctAnswer;

  },
  // The view will trigger these methods on click
  methods: {
    randomChoice: function (size=27, n=4) {
      var arr = [];

      if (size < n) {
        console.log("Size > n");
        return null
      }

      while(arr.length < n){
          var r = Math.floor(Math.random() * size) + 1;
          if(arr.indexOf(r) === -1) arr.push(r);
      }
      return arr
    },
    // Go to next question
    select: function(){
        this.isActive = true;
    },
    next: function() {
      this.quizIndexes = this.randomChoice();
      this.correctAnswer = this.nextCorrectAnswer;
      this.nextCorrectAnswer = this.quizIndexes[this.randomChoice(4,1)[0]-1];

    },

    // Return "true" count in userResponses
    score: function(index) {
      this.response = index + 1;
      this.musicName = this.musicList[(index)];

      if (this.response == this.correctAnswer) {
        this.playSound(this.musicList[(index)]);

        this.$store.dispatch('updateCoin',this.$store.state.coin+10)
        this.isTrue = true;
        this.isEnable = "win";
      }
      else {
        this.playSound(this.musicList[(index)]);
        this.$store.dispatch('updateCoin',this.$store.state.coin-10)
        this.isTrue = false;

        if (this.$store.state.coin < 10) {
          this.$store.state.isPlay = false;
          this.isEnable = "end";
        }
        else {
          this.isEnable = "lose";
        }
      }
    },
    playSound: function(sound) {
      if (sound) {

        if (!! this.audio){
          console.log(this.audio);
          this.audio.pause();
        }

        var audio = new Audio(require('../assets/music/'+ sound));
        audio.play();
        this.audio = audio;

      }
    },
    stopAudio: function () {
      if (!! this.audio) {
        this.audio.pause();
      }
    }
  }
}
</script>

<style scoped>

/*Elements*/

ul {
    margin: 0 auto;
    text-align: center;
    width:100%;
}

li {
    display: inline;
    vertical-align: top;
	  width: 400px!important;
}
.stop {
  margin-bottom: 20px;
}
/*Classes*/
.question-b {
	padding: 20px;
	width: 400px!important;
	margin: 20px;
	white-space: normal;
}

.row {
	padding:30px;
}
.progress {
	padding:30px;
	margin:30px;
}

.container {
	padding:50px;
    z-index: 10;
    box-shadow: 2px 2px 4px black;
    background-color: #e5e5e5;
}

.shadow
{
    position:relative;
    -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
       -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
            box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.shadow:before, .shadow:after
{
    content:"";
    position:absolute;
    z-index:-1;
    -webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
    -moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
    box-shadow:0 0 20px rgba(0,0,0,0.8);
    top:0;
    bottom:0;
    left:10px;
    right:10px;
    -moz-border-radius:100px / 10px;
    border-radius:100px / 10px;
}
.shadow:after
{
    right:10px;
    left:auto;
    -webkit-transform:skew(8deg) rotate(3deg);
       -moz-transform:skew(8deg) rotate(3deg);
        -ms-transform:skew(8deg) rotate(3deg);
         -o-transform:skew(8deg) rotate(3deg);
            transform:skew(8deg) rotate(3deg);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;

}
/*By ID*/
#virsraksts {
	font-size: 22pt;
	font-weight: bold;
	padding: 6px;
}

#jautajums {
	font-size: 16pt;
	font-weight: bold;
	padding: 6px;
}


/*Media Queries*/

@media only screen and (max-width: 574px) {
    .question-b {
        width:250px;
    }
}
@media only screen and (min-width: 1272px) {
    .question-b {
        width:500px;
    }
}

</style>
