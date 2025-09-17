<script setup>


import { ref , computed, onMounted } from 'vue';  // 加總所有數字，需要computed

import axios from 'axios'; // 帶入axios 需要

const newName = ref('');
const newNumber= ref(0);
const addProduct = () =>{
    console.log("addProduct");
    data.value.push({              // 把data的值給推上去
        id: new Date().getTime(),  // 時間格式
        name: newName.value,
        price: newNumber.value
    })
    newName.value='';   // 輸入完後變成空字串
    newNumber.value=0;  // 輸入完後歸 0 
}
const deleteItem = (id) => {
    console.log('deleteItem',id);  // 去刪除品項的 button 案扭區設置 @click="deleteItem(item.id)
    const index = data.value.findIndex(item => item.id === id);  // findIndex 自動找到索引值位置
    data.value.splice(index,1);  // splice (刪除特定位置值的資料, 1 ) 刪除一筆
}

const data = ref([
    {id:1,name: "珍珠奶茶",price:50,quantity:1},
    {id:2,name: "冬瓜檸檬",price:45,quantity:1},
    {id:3,name: "翡翠檸檬",price:55,quantity:1},
    {id:4,name: "四季春茶",price:45,quantity:1},
    {id:5,name: "阿薩姆奶茶",price:50,quantity:1},
    {id:6,name: "檸檬冰茶",price:45,quantity:1},
    {id:7,name: "芒果綠茶",price:55,quantity:1},
    {id:8,name: "抹茶拿鐵",price:60,quantity:1}
    ])
 
const sum = computed(()=>{
    console.log('sum',data.value)
    let tempSum = 0;
    data.value.forEach((name)=>{
        tempSum += Number(name.price) ;
    })
    return tempSum;
})


onMounted(()=>{
    setTimeout(()=>{
    data.value=[
    {id:1,name: "珍珠奶茶",price:50},
    {id:2,name: "冬瓜檸檬",price:45},
    {id:3,name: "翡翠檸檬",price:55},
    {id:4,name: "四季春茶",price:45},
    {id:5,name: "阿薩姆奶茶",price:50},
    {id:6,name: "檸檬冰茶",price:45},
    {id:7,name: "芒果綠茶",price:55},
    {id:8,name: "抹茶拿鐵",price:60}
    ] },5000)
});
// [以上]超級實用的 sum加總功能 computed 

//AJAX
console.log(1)
setTimeout(()=>{
    console.log(2)
},0);
console.log(3)

// console.log = 會跑出 (1)->(3)->(2)

//終端機:安裝 npm install axios
// 找個外部api ，校長提供 => https://randomuser.me/api/

// 寫法
async function getData(){
    console.log('getData');
    const response = await axios.get('https://randomuser.me/api/');  // 網址是跟遠端要資料
    console.log(response);
}
getData();

// 終端機再重開啟 cd vite-project
// 再輸入 npm run dev
</script>



<template>


<div class="middleToDo">
    
    品項：
    <input type="text" v-model="newName" placeholder="新增品項">
    <!-- {{newName}} -->
    金額：
    <input type="number" v-model="newNumber" placeholder="請輸入金額">
    <span>😁</span>
    <button type="button" @click="addProduct" class="btn"> 新增 </button>
    
    <!-- 小步驟測試 是否點擊正常 -->
    <h4 class="total">目前總金額:{{ sum }}</h4>
    <table>
        <thead class="table">
            
            <tr >
                <th>品項名稱</th>
                <th>價格</th>
                <th>調整價格</th>
                <th>刪除</th>
            </tr>
        </thead>

        <!-- body才能做 v-for 迴圈 -->
        <tbody class="tbody">
            <tr v-for="item in data" :key="item.id" > <!-- 標題 -->
                
                <td class="name"> {{item.name}} </td>
                <!-- 價格 -->  
                <td class="name"> {{item.price}} </td> 
                <!-- 調整價格 -->
                <td>
                    <input type="number" v-model="item.price">
                </td>  
                <td>
                    <!-- 刪除品項 -->
                    <button type="button" @click="deleteItem(item.id)" class="btn">刪除品項</button>
                </td> 
            </tr>
        </tbody>
    </table>
    
    
</div>
</template>




<style>

.table{
    
    text-align: center;
    background-color: rgb(245, 215, 241);
    border-radius: 2cqi;
    border: 1px solid rgb(0, 0, 0);
    font-size: 17px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.middleToDo {

  margin-top: 25px;
  margin-left: 300px;
}
.tbody{
    border: 1px solid black;
    background-color: rgb(255, 255, 255);
}
.name{
    border: 1px solid black;
    text-align: center;
}
.total{
    color: rgb(189, 9, 9);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: x-large;
    
}
.btn{
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: bolder;
}
</style>