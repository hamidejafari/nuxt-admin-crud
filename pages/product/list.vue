<template>
  <div>
    <div
      class="text-h4 transition-swing mb-10 mt-5 custom-headline"
      style="font-family: Vazir !important"
    >
      {{ headLine }}
      <v-icon large color="green">
        {{ headLineIcon }}
      </v-icon>

      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            class="float-left"
            dark
            v-bind="attrs"
            v-on="on"
            style="letter-spacing: 0 !important"
          >
            <v-icon dark small> mdi-magnify </v-icon>
            جستجو
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5" style="font-family: Vazir !important"
              >جستجو در {{ section }}</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    v-model="title"
                    label="عنوان "
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              بستن
            </v-btn>
            <v-btn color="blue darken-1" text @click="search()"> جستجو </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="items"
      class="elevation-1"
      hide-default-footer
      loading-text="درحال پردازش, لطفا صبر کنید.."
    >
      <template slot="no-data">
        <p class="text-h6 mt-4" style="font-family: Vazir !important">
          محتوایی برای نمایش وجود ندارد!
        </p>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip color="green" dark v-if="item.status == true"> فعال </v-chip>
        <v-chip color="red" dark v-else> غیرفعال </v-chip>
      </template>

      <template v-slot:item.image="{ item }">
        <img :src="'http://mylara:8888/assets/'+item.image" style="width: 100px;margin: 8px;" />
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark small color="green custom-btn">
              <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
          </template>
          <span>ویرایش</span>
        </v-tooltip>

        <v-btn class="mx-2" fab dark small color="red custom-btn">
          <v-icon dark> mdi-delete-empty </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-row justify="center">
      <v-col cols="12">
        <v-container class="max-width">
          <v-pagination
            v-model="currentPage"
            class="my-4"
            :length="pageCount"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      dialog: false,
      currentPage: 1,
      pageCount: 1,
      title: "",
      section: "محصولات",
      headLine: "لیست محصولات",
      headLineIcon: "mdi-package",
      loading: false,
      headers: [
        {
          text: "عنوان",
          value: "title",
        },
        { text: "تصویر", value: "image" },
        { text: "وضعیت", value: "status" },
        { text: "قیمت", value: "price" },
        { text: "عملیات", value: "actions" },
      ],
      items: [],
    };
  },
  async created() {
    this.loading = true;
    const response = await this.$axios.$get(
      "/api/admin/products" +
        (this.$route.query.page
          ? "?page=" + this.$route.query.page
          : "?page=1") +
        (this.$route.query.title ? "&title=" + this.$route.query.title : "")
    );
    this.currentPage = response.current_page;
    this.pageCount = response.last_page;
    this.items = response.data;
    this.loading = false;
  },
  methods: {
    async search() {
      this.dialog = false;
      this.$router.replace({
        query: { page: this.currentPage, title: this.title },
      });
      this.getData(this.currentPage, this.title);
    },
    async getData(page, title) {
      this.loading = true;
      const response = await this.$axios.$get(
        "/api/admin/products" +
          (page ? "?page=" + page : "?page=1") +
          (title ? "&title=" + title : "")
      );
      this.currentPage = response.current_page;
      this.pageCount = response.last_page;
      this.items = response.data;
      this.loading = false;
    },
  },

  watch: {
    currentPage: async function (val, oldVal) {
      this.$router.replace({ query: { page: val } });
      this.getData(val);
    },
  },
};
</script>