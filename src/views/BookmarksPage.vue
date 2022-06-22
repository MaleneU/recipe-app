<template>
  <div v-if="bookmarks.length > 0">

      <div v-for="(item, i) in bookmarks" :key="i">
        <h2> {{item.savedRecipe.attributes.Title}} </h2>
        <button @click="removeItemFromBookmarks(item)">Delete bookmark</button>
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

            methods: {
                async removeItemFromBookmarks(item) {
                    const itemIndex = this.bookmarks.findIndex(bookmarkItem => bookmarkItem.id === item.id)
                    this.bookmarks.splice(itemIndex, 1)
                    window.localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
                    await this.axios.delete(`${process.env.VUE_APP_STRAPI}api/bookmarks/${item.id}`)
                }
            },


  created() {
                this.bookmarks = JSON.parse(window.localStorage.getItem('bookmarks'))
            }

}
</script>

<style>

</style>