<template>
  <div>
    <v-container>
      <v-row justify="center" align="center" style="padding: 25% 0">
        <v-col cols="12" sm="8" md="5">
          <v-form
            v-model="valid"
            ref="form"
            lazy-validation
            v-on:submit.prevent="validate()"
          >
            <div
              class="transition-swing text-h4 mb-5 mt-5"
              style="
                text-align: center;
                font-family: Vazir !important;
                font-wight: bold;
                color: black;
              "
            >
              ورود به پنل مدیریت
            </div>

            <v-col cols="12" sm="6" md="12">
              <v-text-field
                outlined
                v-model="email"
                :rules="emailRules"
                label="ایمیل"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                outlined
                v-model="password"
                :rules="passwordRules"
                :type="show3 ? 'text' : 'password'"
                @click:append="show3 = !show3"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                label="رمز عبور"
                required
              ></v-text-field>
            </v-col>

            <p v-if="error" style="color: red !important; text-align: center">
              {{ error }}
            </p>

            <v-col cols="12" sm="6" md="12">
              <v-btn
                tile
                color="primary"
                class="mr-3 mt-2 mb-2 m-auto"
                type="submit"
              >
                <v-icon left small>mdi-login-variant</v-icon>
                ورود
              </v-btn>
            </v-col>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "auth",
  name: "Login",
  data() {
    return {
      loading: false,
      valid: false,
      show3: false,
      password: "",
      passwordRules: [(v) => !!v || "وارد کردن رمز عبور الزامیست."],
      email: "",
      emailRules: [
        (v) => !!v || "وارد کردن ایمیل الزامیست.",
        (v) => /.+@.+/.test(v) || "ایمیل معتبر نیست.",
      ],
      error: "",
    };
  },
  methods: {
    async validate() {
      this.$refs.form.validate();
      if (this.valid == true) {
        await this.$auth
          .loginWith("local", {
            data: {
              username: this.email,
              password: this.password,
            },
          })
          .then(() => this.$router.push("/"))
          .catch((e) => (this.error = "اطلاعات ورود اشتباه میباشد."));

          this.$axios.setHeader('Authorization', this.$auth.strategy.token.get())
          
      }
    },
  },
};
</script>