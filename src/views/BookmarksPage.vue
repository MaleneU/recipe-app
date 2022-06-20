<template>
  <div v-if="bookmarks.length > 0">

      <div v-for="(item, i) in bookmarks" :key="i">
        <h2> {{item.savedRecipe.attributes.Title}} </h2>
        </div>

    </div>
</template>

<script>
export default {
   data() {
                return {
                    bookmarks: []
                }
            },

  created() {
                this.bookmarks = JSON.parse(window.localStorage.getItem('bookmarks'))
            }

}
</script>

<style>

</style>