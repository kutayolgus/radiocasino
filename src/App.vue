<template>
  <div id="app">
    <header role="banner">
		<div id="cd-logo" v-if=" this.$store.state.username">@{{getUsername}}</div>
		<nav class="main-nav" v-if="this.$store.state.currentUser">
			<ul>
				<!-- inser more links here -->

				<li><a class="cd-signin" href="#0">{{getCoin}} Coin</a></li>
				<li><a class="cd-signup" @click="logout">Logout</a></li>
			</ul>
		</nav>
	</header>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

const fb = require('./services/firebase.js')
export default {
    name: 'app',
    computed:{
       getUsername(){
        let currentUser =  this.$store.state.username
        if(currentUser){
          return currentUser
        }
        return "Guest"
      },
      getCoin(){
        return this.$store.state.coin
      }
    },
    methods: {

        logout() {
            fb.auth.signOut().then(() => {
                this.$store.dispatch('clearData')
                this.$router.push('/')
            }).catch(err => {
                console.log(err)
            })
        }
    }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

body{
  background: #8E92B0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
}

.container{
  margin-top: 30px;
}


/* --------------------------------

Main components

-------------------------------- */
header[role=banner] {
  position: relative;
  height: 50px;
  background: #343642;
}
header[role=banner] #cd-logo {
  font-size:20px;
      font-family: 'Righteous', serif;
  float: left;
  margin: 4px 0 0 5%;
  /* reduce logo size on mobile and make sure it is left aligned with the transform-origin property */
  -webkit-transform-origin: 0 50%;
  -moz-transform-origin: 0 50%;
  -ms-transform-origin: 0 50%;
  -o-transform-origin: 0 50%;
  transform-origin: 0 50%;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -ms-transform: scale(0.8);
  -o-transform: scale(0.8);
  transform: scale(0.8);
}
header[role=banner] #cd-logo img {
  display: block;
}
header[role=banner]::after {
  /* clearfix */
  content: '';
  display: table;
  clear: both;
}

header a span {
  display: block;
  height: 50px;
  line-height: 50px;
  padding-left: 5%;
  position:absolute;
  right:10px;
  top:-5px;
  color: #FFF;
}
@media only screen and (min-width: 768px) {
  header[role=banner] {
    height: 80px;
  }
  header[role=banner] #cd-logo {
    margin: 20px 0 0 5%;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
}

.main-nav {
  float: right;
  margin-right: 5%;
  width: 44px;
  height: 100%;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-menu.svg") no-repeat center center;
  cursor: pointer;
}
.main-nav ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  -ms-transform: translateY(-100%);
  -o-transform: translateY(-100%);
  transform: translateY(-100%);
}
.main-nav ul.is-visible {
  -webkit-transform: translateY(50px);
  -moz-transform: translateY(50px);
  -ms-transform: translateY(50px);
  -o-transform: translateY(50px);
  transform: translateY(50px);
}
.main-nav a {
  display: block;
  height: 50px;
  line-height: 50px;
  padding-left: 5%;
  background: #292a34;
  border-top: 1px solid #3b3d4b;
  color: #FFF;
}
@media only screen and (min-width: 768px) {
  .main-nav {
    width: auto;
    height: auto;
    background: none;
    cursor: auto;
  }
  .main-nav ul {
    position: static;
    width: auto;
    margin: 0px;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
    line-height: 80px;
  }
  .main-nav ul.is-visible {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }
  .main-nav li {
    display: inline-block;
    margin-left: 1em;
  }
  .main-nav li:nth-last-child(2) {
    margin-left: 2em;
  }
  .main-nav a {
    display: inline-block;
    height: auto;
    line-height: normal;
    background: transparent;
  }
  .main-nav a.cd-signin, .main-nav a.cd-signup {
    padding: .6em 1em;
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 50em;
  }
  .main-nav a.cd-signup {
    background: #2f889a;
    border: none;

  }
  .is-loading { background: cyan; }

}

@import "assets/css/layout.css";
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css";
</style>
