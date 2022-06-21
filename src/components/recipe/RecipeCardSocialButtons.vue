<template>
  <div class="social-btns">
    <button @click="handleLike()" class="like">
      <span class="material-icons-round" v-if="recipeLiked">favorite</span>
      <span class="material-icons-round" v-else>favorite_border</span>
    </button>
    <button class="bookmark" @click="addItemToBookmark(this.recipe)">
      <span class="material-icons-round">bookmark_border</span>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["recipe"],
  data() {
    return {
      loggedInUser: JSON.parse(localStorage.getItem("userData")),
      recipeLiked: false,
      recipeLikes: this.recipe.attributes.likes.data,
      bookmarks: JSON.parse(window.localStorage.getItem("bookmarks")),
      curRecipe: this.recipe
    };
  },
  methods: {
    handleLike() {
      if (this.recipeLiked) {
        // TODO: Remove like entry from database
        console.log("Already liked");
        const index = this.recipeLikes
          .map((x) => x.id)
          .indexOf(this.loggedInUser.id);
        this.recipeLikes.splice(index, 1);

        const response = axios.put(
          `${process.env.VUE_APP_STRAPI}api/recipes/${this.recipe.id}?populate=likes`,
          {
            data: {
              likes: this.recipeLikes,
            },
          }
        );

        this.recipeLiked = false;
        console.log(response);
      } else {
        const response = axios.put(
          `${process.env.VUE_APP_STRAPI}api/recipes/${this.recipe.id}?populate=likes`,
          // const response = axios.put(`http://localhost:1337/api/recipes/${this.recipe.id}?populate=likes`,
          {
            data: {
              likes: this.loggedInUser.id,
            },
          }
        );
        this.recipeLiked = true;
        console.log(response);
        // console.log(this.recipe.attributes.likes.data.map((x) => x.id = 1) > 0)
      }
    },
    async addItemToBookmark(item) {
      if (window.localStorage.getItem("userData")) {
        const { id: label } = item;
        let bookmarkItem;
        if (
          this.bookmarks.findIndex((recipe) => recipe.id === item.label) === -1
        ) {
          bookmarkItem = {
            label,
            savedRecipe: this.curRecipe,
            users_permissions_user: JSON.parse(
              window.localStorage.getItem("userData")
            ).id,
          };
          this.bookmarks.push(bookmarkItem);
          //set to localstorage
          window.localStorage.setItem(
            "bookmarks",
            JSON.stringify(this.bookmarks)
          );
          console.log(bookmarkItem);
          await this.axios.post(
            `${process.env.VUE_APP_STRAPI}api/bookmarks`,
            {
              data: {
                label: JSON.parse(label),
                savedRecipe: this.recipe,
                users_permissions_user: JSON.parse(
              window.localStorage.getItem("userData")
            ).id
              },
            }
          );
          const res = await this.axios.get(
            `${process.env.VUE_APP_STRAPI}api/users/${bookmarkItem.users_permissions_user}`,
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
              },
            }
          );
          const user = res.data;
          window.localStorage.setItem("userData", JSON.stringify(user));
          window.localStorage.setItem(
            "bookmarks",
            JSON.stringify(user.bookmarks)
          );
        }
      }
    },
  },
  computed: {},

  mounted() {
    //console.log(this.recipe.id)
    //if(window.localStorage.bookmarks) {
    //               this.bookmarks = JSON.parse(window.localStorage.getItem('bookmarks'))
    //             }
  },
};
</script>

<style lang="scss">
</style>