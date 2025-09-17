<template>
  <!-- 訂單 -->
  <div class="row justify-content-center"  v-if="order.drinks.length > 0 ">
      <div class="col-8">
        <div class="card">
          <div class="card-body">

            <div class="card-title">
              <h5>訂單</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">品項</th>
                    <th scope="col">數量</th>
                    <th scope="col">小計</th>
                    <th scope="col">備註</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="item in order.drinks" :key="item.id">
                    <tr >
                      <td>{{ item.name }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.subTotal }}</td>
                       <td >

                      <span>{{ item.note }}</span>
                    </td>
                  </tr>

                  </template>

                </tbody>
              </table>
              <!-- <div class="text-end">備註:
                <span>{{ order.note }}</span>
              </div> -->
              <div class="text-end">
                <h5>總計:
                  <span>${{ order.totalPrice }}</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
defineProps(['order'])
// console.log(order.value)
</script>