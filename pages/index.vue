<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <v-alert
          v-model="alert"
          border="left"
          close-text="Close Alert"
          color="deep-purple accent-4"
          dark
          dismissible
        >
          {{$auth.user.name}}  به پنل مدیریت خوش آمدید!
        </v-alert>
      </v-col>

      <v-col v-for="item in items" cols="12" sm="8" md="3">
        <v-card
          class="mx-auto"
          max-width="344"
          style="border-radius: 10px; background-color: #6200ea"
        >
          <v-card-text class="mt-1">
            <p
              class="text-h4 text--primary mt-2"
              style="color: white !important; font-family: Vazir !important"
            >
              {{ item.title }}

              <v-badge
                bordered
                color="green"
                overlap
                style="float: left"
                :content="item.count"
                left
              >
                <v-icon
                  dark
                  large
                  class="float-left"
                  @click="expand2 = !expand2"
                >
                  {{ item.icon }}
                </v-icon>
              </v-badge>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-right">عنوان محصول </th>
                <th class="text-right">قیمت</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>

      <v-col cols="12" sm="8" md="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                   <th class="text-right">عنوان محصول </th>
                <th class="text-right">قیمت</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" style="padding: 10px">
      <v-col
        cols="12"
        sm="8"
        md="12"
        style="background-color: white; border-radius: 10px;box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)"
      >
        <div
          class="transition-swing text-h4"
          style="
            text-align: center;
            font-family: Vazir !important;
            font-wight: bold;
            letter-spacing: -1px !important;
          "
        >
          نمودار فروش هفته اخیر
        </div>

        <v-sparkline
          :value="value"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
          style="width: 70%; margin: auto"
        ></v-sparkline>
      </v-col>
    </v-row>


  </div>
</template>

<script>
const gradients = [
  ["#00dc82"],
  ["#6200ea"],
  ["#00dc82", "#6200ea", "#00dc82"],
  ["purple", "violet"],
  ["green", "blue", "white"],
  ["#00dc82", "#6200ea", "#00dc82"],
];

export default {
  name: "IndexPage",
  data() {
    return {
      alert: true,

      width: 3,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 12, 1, 8, 2, 9,2,5,7,9,1,15],
      gradientDirection: "top",
      gradients,
      fill: false,
      type: "trend",
      autoLineWidth: false,

      desserts: [
        {
          name: "پالت سایه چشم دودو گرل مدل A3 شماره 02",
          calories: "12,000 تومان",
        },
        {
          name: "خط چشم ماژیکی مک سری Real Pen Eyeliner",
          calories: "1,500,000 تومان",
        },
        {
          name: "بالم لب کیو سی طرح توت فرنگی کد 2020",
          calories: "140,000 تومان",
        },
        {
          name: "رژ لب مایع اتود هوس مدل Water Tint ",
          calories: "999,000 تومان",
        }
      ],
      items: [
        {
          icon: "mdi-package",
          title: "محصولات",
          count: "6",
          to: "/",
        },
        {
          icon: "mdi-home-group",
          title: "برند ها",
          count: "2",
          to: "/",
        },

        {
          icon: "mdi-cart",
          title: "سفارشات",
          count: "2",
          to: "/",
        },
        {
          icon: "mdi-newspaper-variant-outline",
          title: "مقالات",
          count: "6",
          to: "/",
        },
      ],
    };
  },
};
</script>
