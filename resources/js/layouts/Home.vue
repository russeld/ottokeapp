<template>
  <SheetMain />
</template>

<script>
import SheetMain from "../components/Sheets/SheetMain"

export default {
  name: "Home",
  components: { SheetMain }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.sheet-container {
  cursor: pointer;
}
</style>