<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#">
          <img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
          />
        </a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="signupField.email"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
            v-model="signupField.password"
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="signupField.nickname"
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            onclick="javascript:location.href='#todoListPage'"
            value="註冊帳號"
            @click="signup"
          />
          <br />
          {{ signupField }}
          <!--<button type="button" @click="signup">註冊</button>-->
          <a class="formControls_btnLink" href="#loginPage">登入</a>
          <a class="formControls_btnLink" href="#verifyPage">驗證登入狀態</a>
        </form>
      </div>
    </div>
  </div>

  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#">
          <img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
          />
        </a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">登入功能</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="signInField.email"
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
            v-model="signInField.password"
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            onclick="javascript:location.href='#todoListPage'"
            value="登入"
            @click="signIn"
          />
          <br />
          {{ signInField }}
          <!--<button type="button" @click="signIn">登入</button>-->
          <br />
          token:{{ signInRes }}
          <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a>
          <a class="formControls_btnLink" href="#verifyPage">驗證登入狀態</a>
        </form>
      </div>
    </div>
  </div>

  <!-- 驗證功能 -->
  <div id="verifyPage" class="bg-yellow">
    <div class="conatiner verifyPage vhContainer">
      <div class="side">
        <a href="#">
          <img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
          />
        </a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div v-if="user.uid">
        <h2 class="formControls_txt">驗證登入狀態</h2>
        <p>UID:{{ user.uid }}</p>
        <p>nickname:{{ user.nickname }}</p>
      </div>
      <div v-else>
        <h2 class="formControls_txt">驗證登入狀態</h2>
        <p>你還沒有登入</p>
        <form class="formControls" action="index.html">
          <a class="formControls_btnLink" href="#loginPage">登入</a>
          <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
//import axios from "axios";
import axios from "https://esm.sh/axios";
const api = "https://todolist-api.hexschool.io/";
const signupField = ref({
  email: "",
  password: "",
  nickname: ""
});
const signupRes = ref("");
const signup = async () => {
  try {
    const res = await axios.post(`${api}users/sign_up`, signupField.value);
    console.log(res);
    signupRes.value = res.data.uid;
  } catch (error) {
    console.log("註冊錯誤!");
    console.log(error);
  }
};

const signInField = ref({
  email: "",
  password: ""
});
const signInRes = ref("");
const signIn = async () => {
  try {
    const res = await axios.post(`${api}users/sign_in`, signInField.value);
    console.log(res);
    signInRes.value = res.data.token;
    document.cookie = `customTodoToken=${res.data.token};path=/`;
  } catch (error) {
    console.log("登入錯誤!");
    console.log(error);
  }
};

// 驗證

const user = ref({
  nickname: "",
  uid: ""
});

onMounted(async () => {
  // 驗證登入 
  const token = document.cookie.replace(
    /(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$/i,
    "$1"
  );
  const res = await axios.get(`${api}users/checkout`, {
    headers: {
      Authorization: token
    }
  });
  console.log(res);
  user.value = res.data;
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap");
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.selector-for-some-widget {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

html {
  height: 100%;
}

body {
  font-family: "Noto Sans TC";
  margin: 0 auto;
  overflow: hidden;
}

img {
  width: 100%;
  vertical-align: middle;
}

.logoImg {
  margin-bottom: 16px;
}

.vhContainer {
  height: 100vh;
}

.bg-yellow {
  background-color: #ffd370;
}

.bg-half {
  background-image: linear-gradient(175deg, #ffd370 60%, #fff 40%);
}

.conatiner {
  margin: 0 auto;
  padding: 87px 32px;
}

@media (max-width: 576px) {
  .conatiner {
    padding: 18px 32px;
  }
}

.side {
  width: 386px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

@media (max-width: 576px) {
  .side {
  width: 100%;
  }
}

nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 24px 32px 0 32px;
}

@media (max-width: 576px) {
  nav {
    margin-bottom: 16px;
  }
}

nav h1 a {
  width: 243px;
  height: 39px;
  background: url(https://upload.cc/i1/2022/03/23/8vTzYG.png) no-repeat;
  display: block;
  text-indent: 101%;
  overflow: hidden;
  white-space: nowrap;
}

nav ul {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 1rem;
}

@media (max-width: 576px) {
  nav ul li {
    margin-top: 11px;
  }
}

nav ul a {
  text-decoration: none;
  color: #333333;
  margin-left: 24px;
}

@media (max-width: 576px) {
  nav ul a {
    margin-left: 0;
  }
}

nav ul a:hover {
  color: #d87355;
}

nav ul a span {
  font-weight: bold;
}

@media (max-width: 576px) {
  nav ul .todo_sm {
    display: none;
  }
}

@media (max-width: 576px) {
  .d-m-n {
    display: none;
  }
}

.formControls {
  margin-left: 100px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

@media (max-width: 576px) {
  .formControls {
    margin-left: 0;
  }
}

.formControls .formControls_txt {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
}

@media (max-width: 576px) {
  .formControls .formControls_txt {
    font-size: 1.25rem;
    text-align: center;
  }
}

.formControls .formControls_label {
  font-size: 0.875rem;
  font-weight: bold;
  margin: 16px 0 4px 0;
}

.formControls .formControls_input {
  font-weight: normal;
  border: none;
  border-radius: 10px;
  width: 304px;
  padding: 12px 16px;
  margin: 4px 0;
}

.formControls .formControls_input:focus {
  outline: 3px solid #fff;
}

.formControls .formControls_input::-webkit-input-placeholder {
  color: #9f9a91;
}

.formControls .formControls_input:-ms-input-placeholder {
  color: #9f9a91;
}

.formControls .formControls_input::-ms-input-placeholder {
  color: #9f9a91;
}

.formControls .formControls_input::placeholder {
  color: #9f9a91;
}

.formControls .formControls_btnSubmit {
  width: 128px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: #333333;
  color: #fff;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
  margin: 24px 0;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  font-size: 1rem;
}

.formControls a {
  text-decoration: none;
}

.formControls span {
  margin: 4px 0 16px 0;
  color: #d87355;
  font-size: 0.875rem;
}

.formControls .formControls_btnLink {
  display: block;
  color: #333333;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
}

.loginPage {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 800px;
}

@media (max-width: 576px) {
  .loginPage {
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 0 auto;
    padding: 48px 31px;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
  }
}

.signUpPage {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 800px;
}

@media (max-width: 576px) {
  .signUpPage {
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 48px auto 0 auto;
    padding: 48px 31px;
  }
}

.verifyPage {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 800px;
}

@media (max-width: 576px) {
  .verfiyPage {
    width: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 0 auto;
    padding: 48px 31px;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
  }
}

/*# sourceMappingURL=all.css.map */
</style>