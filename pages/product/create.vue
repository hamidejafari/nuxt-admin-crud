<template>
  <div>
    <Headline :headLine="headLine" :headLineIcon="headLineIcon" />
    <v-form
      v-model="valid"
      ref="form"
      lazy-validation
      v-on:submit.prevent="validate()"
    >
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              outlined
              v-model="title"
              :rules="titleRules"
              :counter="200"
              label="عنوان"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              outlined
              v-model="titleSeo"
              :rules="titleSeoRules"
              :counter="200"
              label="عنوان سئو"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              outlined
              v-model="url"
              :rules="urlRules"
              :counter="200"
              label="آدرس (URL)"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="10">
            <v-file-input
              @change="Preview_image"
              v-model="image"
              show-size
              label="عکس محصول را انتخاب کنید."
            >
            </v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-img :src="urlImage" style="width: 100px; height: 100px"></v-img>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-textarea
              outlined
              name="input-7-4"
              label="توضیحات سئو"
              rows="1"
              v-model="descriptionSeo"
              :rules="descriptionSeoRules"
            ></v-textarea>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              outlined
              v-model="price"
              :rules="priceRules"
              label="قیمت"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-switch
              v-model="status"
              inset
              :label="`وضعیت : ${status ? 'فعال' : 'غیرفعال'}`"
            ></v-switch>
          </v-col>

          <v-col cols="12" sm="6" md="12">
            <div class="text-p mb-2">توضیحات</div>
            <client-only placeholder="loading...">
              <ckeditor-nuxt v-model="contentHolder" :config="editorConfig" />
            </client-only>
          </v-col>
        </v-row>
      </v-container>

      <v-btn tile color="primary" class="mr-3 mt-2 mb-2" type="submit">
        <v-icon left small>mdi-content-save-all</v-icon>
        ذخیره
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      dialog: false,
      section: "محصولات",
      headLine: "افزودن محصول",
      headLineIcon: "mdi-package-variant-plus",
      loading: false,

      status: true,

      valid: false,
      descriptionSeo: "",
      descriptionSeoRules: [(v) => !!v || "وارد کردن توضیحات سئو الزامیست."],
      title: "",
      titleRules: [
        (v) => !!v || "وارد کردن عنوان الزامیست.",
        (v) => v.length <= 200 || "عنوان باید کمتر از ۲۰۰ کاراکتر باشد",
      ],

      titleSeo: "",
      titleSeoRules: [
        (v) => !!v || "وارد کردن عنوان سئو الزامیست.",
        (v) => v.length <= 200 || "عنوان سئو باید کمتر از ۲۰۰ کاراکتر باشد",
      ],

      price: "",
      priceRules: [
        (v) => !!v || "وارد کردن قیمت الزامیست.",
        (v) =>
          /^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$/.test(v) ||
          "قیمت نامعتبر است.",
      ],

      url: "",
      urlRules: [(v) => !!v || "وارد کردن آدرس الزامیست."],
      urlImage: null,
      image: null,

      editorConfig: {
        language: "fa",
      },
      contentHolder: "",
    };
  },
  methods: {
    Preview_image() {
      this.urlImage = URL.createObjectURL(this.image);
    },
    async validate() {
      if (this.$refs.form.validate() === true) {
        let form = new FormData();
        form.append("image", this.image);
        form.append("title", this.title);
        form.append("title_seo", this.titleSeo);
        form.append("price", this.price);
        form.append("url", this.url);
        form.append("descriptionSeo", this.descriptionSeo);
        form.append("description", this.description);
        form.append("status", this.status ? 1 : 0);

        const response = await this.$axios.$post("/api/admin/products", form);

        this.$router.push("/product/list")
      }
    },
  },
};
</script>