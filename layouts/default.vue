<template>
  <no-ssr placeholder="درحال پردازش ..." style="text-align: center">
    <v-app class="application">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
        right
        class="deep-purple accent-4"
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
              <v-list-item-subtitle>فعال</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list>
          <template v-for="item in items">
            <v-list-item v-if="item.items.length == 0" :to="item.to">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>

            <v-list-group :value="false" prepend-icon="mdi-package" v-else>
              <template v-slot:activator>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </template>

              <v-list-item v-for="subItem in item.items" :to="subItem.to">
                <v-list-item-icon>
                  <v-icon>{{ subItem.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{ subItem.title }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </template>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout()"> خروج </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-app-bar :color="appBarColor" :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />
        <v-spacer />
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </no-ssr>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      navigationColor: "#B2FFE0",
      appBarColor: "#00dc82",
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: "mdi-apps",
          title: "داشبورد",
          to: "/",
          items: [],
        },
        {
          icon: "mdi-package",
          title: "محصولات",
          items: [
            {
              icon: "mdi-apps",
              title: "لیست محصولات",
              to: "/product/list",
            },
            {
              icon: "mdi-apps",
              title: "اضافه کردن محصول",
              to: "/product/create",
            },
          ],
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "پنل مدیریت",
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>
