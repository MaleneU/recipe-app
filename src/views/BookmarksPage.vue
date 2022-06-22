<template>
    <h2>My Bookmarks</h2>
  <div>
    <div class="bookmarks" v-if="bookmarks.length > 0">
      <div class="bookmarks__item" v-for="(item, i) in bookmarks" :key="i">
        <RecipeCard :recipe="item.savedRecipe" slide-width="small" />
        <router-link :to="`/bookmarks/${item.id}`">
          <button class="button button--small button--green">Cook <i class="icofont-arrow-right"></i></button>
        </router-link>
        <button
          class="button button--small button--red"
          @click="removeItemFromBookmarks(item)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from "@/components/recipe/RecipeCard.vue";

export default {
  components: {
    RecipeCard,
  },
  data() {
    return {
      bookmarks: [],
    };
  },

  methods: {
    async removeItemFromBookmarks(item) {
      const itemIndex = this.bookmarks.findIndex(
        (bookmarkItem) => bookmarkItem.id === item.id
      );
      this.bookmarks.splice(itemIndex, 1);
      window.localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
      await this.axios.delete(
        `${process.env.VUE_APP_STRAPI}api/bookmarks/${item.id}`
      );
      this.$router.go()
    },
  },

  created() {
    this.bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
  },
};
</script>

<style scoped>

.bookmarks {
    display: flex;
    gap: 17px;
}
.bookmarks__item {
  max-width: 275px;
}

button {
    margin-right: 17px;
    margin-top: 10px;
}
</style>