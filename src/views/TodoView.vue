
<!-- <HTML> -->
<template >

<div class="middleToDo">
    <!--註冊功能 -->
    
    <h2 class="keyWord">註冊功能</h2>
    <div class="box">
        <span>註冊郵箱：</span>
        <input class="input" type="email" placeholder="輸入Email" v-model="signupField.email">      <!-- email ，確定能雙向綁定複寫後，後續才能推往後端伺服器-->
        <br>
        <span>註冊密碼：</span><input class="input" type="text"  placeholder="輸入密碼"   v-model="signupField.password">  <!-- password-->
        <br>
        <span>您的暱稱：</span><input class="input" type="text"  placeholder="輸入暱稱"   v-model="signupField.nickname">  <!-- 文字-->
        <br>
    </div>
    <!-- {{ signupField }} -->
    <button type="button" v-on:click="signup" class="btn">註冊</button>  <!-- 綁定 @click 註冊的行為 -->
    
    UID號：{{ signupRes }}   <!-- 印出 自己的res.data.uid * 這串英文代碼代表 : 每個人的金鑰匙 獨一無二-->
    <br><br>
    <!--登入功能 -- ingn up 改 全改In> -->
    <div class="box">
        <h2 class="keyWord">登入功能</h2>
        <span>登入郵箱：</span><input class="input" type="email" placeholder="輸入Email" v-model="signInField.email">      
        <br>
        <span>登入密碼：</span><input class="input" type="text"  placeholder="輸入密碼"   v-model="signInField.password">  
    </div>
    <!-- 登入不需要暱稱 --> 
    
    <!-- {{ signInField }} -->
    
    <button type="button" v-on:click="signIn" class="btn">登入</button>  
    
    token號：{{ signInRes }}   <!-- 印出 自己的res.data.uid * 這串英文代碼代表 : 每個人的金鑰匙 獨一無二-->

    <!-- 驗證  --> 
    <br><br>
    <h2 class="keyWord">驗證功能</h2>
    
    <!-- 如果再登入狀態就顯示p 標籤內容，如果沒有登入就顯示:你還沒登入  --> 
    <div class="user"> {{ user }}  </div>
     <!-- 反查回去看給什麼值(如果有錯)  -->
    <div class="box">
        <div v-if="user.uid"> 
            <p>最後狀態:</p> 
            <p>您的UID號 : {{ user.uid }}</p>
            <p>您的暱稱為：{{ user.nickname }}</p>
            
        </div>
        <div v-else>
            <p>注意!! 你還沒有成功登入</p>
        </div>
    </div>
</div>
</template>

<!-- <JS> -->
<script setup>



import { onMounted,ref } from 'vue';

import axios from 'axios';  

// import axios from "https://esm.sh/axios";  // codePen 的axios http: 套件網址

// axios from 來自 自己 不用{}  大括號


const api = 'https://todolist-api.hexschool.io/';  // 需要註冊就去button @click 綁定上去

const signupField = ref({    // signup 註冊 Field 欄位名稱
    email:'',
    password:'',
    nickname:''              // 這個網路請求格式，是依照後端提供的格式，照著傳給他的
})

const signupRes = ref('')
const signup = async()=>{   // 註冊 buttom 按鈕的監聽 行為 ，async 是vue3的固定函式語法
    console.log(`${api}users/sign_up`)   // 會顯示註冊的網址
    // console.log(axios);  
    // const res = await axios.post(`${api}users/sign_up`,signupField.value);  // axios.get = 取得資料，axios.post = 傳送資料給對方 
    // console.log(res); 
    //                                                       // ,逗號後面，傳值 = 物件組好的變數，網址少一個斜線跟多一個斜線都會出錯
// 捕捉錯誤語法
    try{
        const res = await axios.post(`${api}users/sign_up`,signupField.value);
        console.log(res);
        signupRes.value = res.data.uid
    }catch(error){
        console.log("註冊錯誤!!");
        console.log(error);
    }
}   
//問題一: 如果每次vue3 用vsCode 開啟畫面都有異常 首先；cd C:\Users\asdqwe\OneDrive\桌面\pro7\vite-project (解決路徑錯誤問題)  >  第二: 下載 npm install > 第三:npm run dev > 第四:等待localhost網址跳出來 即可

// 以下為登入 功能 

const signInField = ref({    // signIn 登入 Field 欄位名稱
    email:'',
    password:''              // 登入只需傳 這兩個條件就好
    
})

const signInRes = ref('')
const signIn = async()=>{   // 註冊 buttom 按鈕的監聽 行為 ，async 是vue3的固定函式語法
    console.log(`${api}users/sign_In`)   // 會顯示註冊的網址
    // console.log(axios);  
    // const res = await axios.post(`${api}users/sign_up`,signupField.value);  // axios.get = 取得資料，axios.post = 傳送資料給對方 
    // console.log(res); 
    //                                                       // ,逗號後面，傳值 = 物件組好的變數，網址少一個斜線跟多一個斜線都會出錯
// 捕捉錯誤語法
    try{
        const res = await axios.post(`${api}users/sign_In`,signInField.value);
        console.log(res);
        signInRes.value = res.data.token;   // uid 改 token  這串英文代碼代表 : 每個人的金鑰匙 獨一無二
        document.cookie = `customTodoToken = ${res.data.token};path=/`  // 永久 application 的 cookie 獨一無二金鑰匙資料，F5 重新整理一樣存在 ，比較安全!! 定期清除cookie 很多東西會消失 也沒比較好
    
    }catch(error){
        console.log("登入錯誤!!");
        console.log(error);
    }
}   


// 以下為 驗證 功能 
const user = ref({
    nickname :'',
    uid:''
 })

 //檢查是否在登入的狀態 用 onMounted

onMounted(async()=>{  // 需新增放到 ref 隔壁 ，cookies 設置到期假如3天內，時間一到就會需要重新登入
    // 驗證登入
     const token = document.cookie.replace(/(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$/i,
    "$1")
    // console.log(token);  // 確認是否有取出 token的值 ，這個亂碼 其實載入套件即可

    const res = await axios.get(`${api}users/checkout`,{
        headers:{           
        Authorization:token // 把資料傳送給後端工程師
        }
    })
    console.log(res);  // 確認 res 是否有資料 
    user.value = res.data;  // 有資料的話，把資料複寫到資料內
})

</script>



<!-- <CSS> -->
<style>

.middleToDo {
  margin-top: 25px;
  margin-left: 300px;
}

.keyWord{
    color: rgb(41, 146, 55);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: x-large;
}
.box{
    color: rgb(20, 55, 253);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 18px;
}
.btn{
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: bolder;
}
.user{
    color: rgb(255, 254, 253);
}
.input {
    font-size: 15px;
}
</style>