<template>
  <div
    class="text-h4 transition-swing mb-10 mt-5 custom-headline"
    style="font-family: Vazir !important"
  >
    {{ headLine }}
    <v-icon large color="green">
      {{ headLineIcon }}
    </v-icon>
  </div>
</template>
<script>
export default {
  name: "Headline",
  props: ["headLine", "headLineIcon"],
};
</script>