<template>
 <div class="wrapper">
	<div class="container">
		<h1></h1>

<section>
           <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
                <form v-if="showLoginForm" @submit.prevent>

		        <h1>Radio Casino Game</h1>
                    <label for="email1">Email</label>
                    <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />

                    <label for="password1">Password</label>
                    <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />

                    <button @click="login" class="button">Log In</button>
                       <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                    <div class="extras">
                        <a @click="toggleForm" class="button">Create an Account</a>
                    </div>
               </form>
                <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
                    <h1>Get Started</h1>
                                     <transition name="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
                    </div>
                </transition>


                    <label for="name">Name</label>
                    <input v-model.trim="signupForm.name" type="text" placeholder="Name" id="name" />

                    <label for="email2">Email</label>
                    <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

                    <label for="password2">Password</label>
                    <input v-model.trim="signupForm.password" type="password" placeholder="Min 6 Characters" id="password2" />

                    <button @click="signup" class="button">Sign Up</button>

                    <div class="extras">
                        <a @click="toggleForm" class="button">Back to Log In</a>
                    </div>
                </form>
                <form v-if="showForgotPassword" @submit.prevent class="password-reset">
                    <div v-if="!passwordResetSuccess">
                        <h1>Reset Password</h1>
                        <p>We will send you an email to reset your password</p>

                        <label for="email3">Email</label>
                        <input v-model.trim="passwordForm.email" type="text" placeholder="you@email.com" id="email3" />

                        <button @click="resetPassword" class="button">Submit</button>

                        <div class="extras">
                            <a @click="togglePasswordReset" class="button">Back to Log In</a>
                        </div>
                    </div>
                    <div v-else>
                        <h1>Email Sent</h1>
                        <p>check your email for a link to reset your password</p>
                        <button @click="togglePasswordReset" class="button">Back to login</button>
                    </div>
                </form>
            </div>
        </section>
	</div>

	<ul class="bg-bubbles">
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>

</template>


<script>
const fb = require('../services/firebase.js')
import firebase from 'firebase';
export default {
name:"Login",
data(){
  return {
    loginForm: {
      email: '',
      password: ''
    },
    signupForm: {
      name: '',
      email: '',
      password: ''
    },
    passwordForm: {
      email: ''
    },
    showLoginForm: true,
    showForgotPassword: false,
    passwordResetSuccess: false,
    performingRequest: false,
    errorMsg: ''
  }
},
methods: {
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            },
            togglePasswordReset() {
                if (this.showForgotPassword) {
                    this.showLoginForm = true
                    this.showForgotPassword = false
                    this.passwordResetSuccess = false
                } else {
                    this.showLoginForm = false
                    this.showForgotPassword = true
                }
            },
            async login() {
                this.performingRequest = true
                try{
                  const userRequest = await fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password);
                   const user = userRequest.user

                  this.$store.commit('setCurrentUser', user)
                  this.$store.dispatch('fetchUserProfile')
                  this.performingRequest = false
                  this.$router.push('/list')
                }catch(err){
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                }


            },
            signup() {
                this.performingRequest = true
                fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(r => {
                  const user = r.user;
                    this.$store.commit('setCurrentUser', user)
                    // create user obj


                        firebase.database().ref('users/' +  user.uid).set({
                          name: this.signupForm.name,
                          email:user.email,
                        uid: user.uid,
                        coin: 100
                      }, function(error) {
                        if (error) {
                          console.error("Error writing document: ", error);

                        } else {
                          console.log("Document successfully written!");
                        }
                      });

                        this.$store.dispatch('fetchUserProfile')
                        this.performingRequest = false
                        this.$router.push('/list')


                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            },
            resetPassword() {
                this.performingRequest = true
                fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
                    this.performingRequest = false
                    this.passwordResetSuccess = true
                    this.passwordForm.email = ''
                }).catch(err => {
                    console.log(err)
                    this.performingRequest = false
                    this.errorMsg = err.message
                })
            }
        }

}
</script>

<style scoped>

@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 200;
  src: local('Source Sans Pro ExtraLight'), local('SourceSansPro-ExtraLight'), url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf) format('truetype');
}
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 300;
  src: local('Source Sans Pro Light'), local('SourceSansPro-Light'), url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf) format('truetype');
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}

.wrapper {
  background: #8E92B0;
  background: -webkit-gradient(linear, left top, right bottom, from(#8E92B0), to(#bdc3c7));
  background: linear-gradient(to bottom right, #8E92B0 0%, #bdc3c7 100%);
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 450px;
  margin-top: -200px;
  overflow: hidden;
}
.extras { margin-top:20px; color:#8E92B0}
.wrapper.form-success .container h1 {
  -webkit-transform: translateY(85px);
          transform: translateY(85px);
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 0;
  height: 400px;
  text-align: center;
}
.container h1 {
  font-size: 40px;
  -webkit-transition-duration: 1s;
          transition-duration: 1s;
  -webkit-transition-timing-function: ease-in-put;
          transition-timing-function: ease-in-put;
  font-weight: 200;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #8E92B0;
}
.button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #8E92B0;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
}
.button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
          animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
            transform: translateY(-700px) rotate(600deg);
  }
}

</style>