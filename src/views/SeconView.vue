<script setup>

import { ref } from "vue";

const drinks = ref([
  {
    id: "item01",
    item: "珍珠奶茶",
    desc: "香濃奶茶搭配QQ珍珠",
    price: "50",
    counts: "20"
  },
  {
    id: "item02",
    item: "冬瓜檸檬",
    desc: "清新冬瓜配上新鮮檸檬",
    price: "45",
    counts: "18"
  },
  {
    id: "item03",
    item: "翡翠檸檬",
    desc: "綠茶與檸檬的完美結合",
    price: "55",
    counts: "34"
  },
  {
    id: "item04",
    item: "四季春茶",
    desc: "香醇四季春茶，回甘無比",
    price: "45",
    counts: "10"
  },
  {
    id: "item05",
    item: "阿薩姆奶茶",
    desc: "阿薩姆紅茶搭配香醇鮮奶",
    price: "50",
    counts: "25"
  },
  {
    id: "item06",
    item: "檸檬冰茶",
    desc: "檸檬與冰茶的清新組合",
    price: "45",
    counts: "20"
  },
  {
    id: "item07",
    item: "芒果綠茶",
    desc: "芒果與綠茶的獨特風味",
    price: "55",
    counts: "18"
  },
  {
    id: "item08",
    item: "抹茶拿鐵",
    desc: "抹茶與鮮奶的絕配",
    price: "60",
    counts: "20"
  }
]);
</script>

<template>

    <div class="middleToDo">

      
        <table >
          <thead class="table">
            <tr>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col">價格</th>
              <th scope="col">庫存</th>
            </tr>
          </thead>
          
        <!--  for 迴圈 vue -->
          <tbody>
            <tr v-for="tea in drinks"
                :key="tea.id">
              <td> {{tea.item}} </td>
              
              <td><small> {{tea.desc}} </small></td>
              
              <td> {{tea.price}} 元</td>
              
              <td>
                <button v-on:click="tea.counts--"  :disabled="tea.counts <=0" class="btn">-</button> 
                {{tea.counts}} 
                <button v-on:click="tea.counts++" class="btn">+</button></td>
            </tr>
            
          </tbody>
             
            
        </table>
    </div>
</template>

<style>
  th,tr,td{
    border: 1px solid black;
  }
  td{
    padding: 5px 10px;
  }
  
  .middleToDo {
  margin-top: 25px;
  margin-left: 300px;
}
.btn{
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: bolder;
    margin: 0.5px;
}
</style>