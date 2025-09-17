<template>
  <div id="root">
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">

        <!-- 商品列表 -->
         <DrinkList :data="data"
         @addItem="addItem"
         />
      </div>

      <!-- 購物車列表 -->
      <div class="col-md-8">
        <div  v-if="temp.length>0">
          <table class="table">
          <thead>
            <tr>
              <th scope="col" width="50">操作</th>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col" width="90">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in temp" :key="item.id">
              <tr >
              <td><button type="button" class="btn btn-sm"
                @click="delItem(index)">x</button></td>
              <td>{{ item.name }}</td>
              <td><small>{{ item.description }}</small></td>
              <td>
                <select class="form-select" v-model="item.amount"
                >

                 <option
                v-for="n in 10" :value="n" :key="n">{{ n }}</option>

                </select>
              </td>
              <td>{{ item.price }}</td>
              <td>{{ itemSubtotal(item) }}</td>

            </tr>
            <tr>
              <td colspan="6">
                <!-- <textarea
                class="form-control mb-3"
                rows="1"
                placeholder="備註"
                v-model="item.note"
              ></textarea> -->
              <!-- {{  item.note }} -->
              <!-- <button type="button" v-on:click="noIce(index)">去冰</button> -->
               <select name="ice" class="form-select"
               v-model="item.ice"
               @change="noIce(index)">
                <option value="" disabled selected>冰塊選項</option>
                <option value="少點冰">少點冰</option>
                <option value="去冰">去冰</option>
               </select> |
               <select name="sugar" class="form-select"
               v-model="item.sugar"
               @change="noSugar(index)">
                <option value="" disabled selected>糖分選項</option>
                <option value="少點糖">少點糖</option>
                <option value="半糖">半糖</option>
               </select>
              </td>
            </tr>
            </template>

          </tbody>
        </table>
          <div class="text-end mb-3">
            <h5>總計: <span>${{ tempPrice }}</span></h5>
          </div>
          <!-- <textarea
            class="form-control mb-3"
            rows="3"
            placeholder="備註"
            v-model="note"
          ></textarea> -->
          <div class="text-end">
            <button class="btn btn-primary"
            @click="sendOrder">送出</button>
          </div>
        </div>
        <div v-else class="alert alert-success">
        尚未選取飲品
      </div>
      </div>

    </div>

    <hr />

    <!-- 訂單列表 -->
    <DrinkOrder :order="order"/>

  </div>
</div>

</template>
<script setup>

import DrinkList from '@/components/DrinkList.vue';

import DrinkOrder from '@/components/DrinkOrder.vue';

import {  computed, onMounted, ref , } from 'vue';

const order = ref({
    drinks: [],
    note: '',
    totalPrice: 0,
  });

const note = ref('');

// const showOrder = ref(false)
const sendOrder=()=>{
  // console.log('note', note.value)
  // note.value = ''
  order.value.drinks = temp.value;
  order.value.note = note.value;
  order.value.totalPrice = computed(()=>{
    return order.value.drinks.reduce((sum,item)=>{
      return sum+item.subTotal;
    },0)
  })
  // console.log(order.value)
  temp.value = [];
  note.value = '';
  // tempPrice.value = 0;
}



// 總共購買的金額
const tempPrice = ref(0)
tempPrice.value = computed(()=>{
  return temp.value.reduce((sum, item)=> {return sum+item.subTotal;
},0)
})

// 冰塊的備註
// const noIceValue = ref('')
const noIce = (index)=>{
  temp.value[index].note += temp.value[index].ice +' | '
}

// 糖分的備註
// const noSugarValue = ref('')
const noSugar = (index)=>{
  temp.value[index].note += temp.value[index].sugar +' | '
}

// 每項商品的小計
const itemSubtotal=(item)=>{
  item.subTotal = item.amount * item.price;
  // console.log('itemSubtotal: ', temp.value)
  return item.amount * item.price;
}

// 刪除不要的 選取物
const delItem = (index)=>{
  temp.value.splice(index, 1);
}

// 建立暫存陣列，將選取的商品放入
const temp = ref([])

const addItem = (item) => {

  // 預設商品是一項，小計=數量*價格
  const tempItem = {...item, amount: 1, subTotal: 0, note:'', ice:'', sugar:''}
  tempItem.subTotal = (tempItem.amount, tempItem.price)
  temp.value.push(tempItem);
  // console.log(temp.value)
}


const data = ref([]);
onMounted(()=>{
  // 商品的資料(物件)
  data.value = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60
  }
]
})
</script>