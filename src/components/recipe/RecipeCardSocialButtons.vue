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
      curRecipe: this.recipe,
      userID: JSON.parse(window.localStorage.getItem("userData")).id,
      recipeBookmarked: false
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
        const { id: savedRecipeID } = item;
        let bookmarkItem;
        if (
          // fix this
          // run if the recipe isn't already in local
        !this.bookmarks.some(recipe => recipe.savedRecipeID === item.id)
         //this.bookmarks.findIndex(recipe => recipe.id === item.savedRecipeID) === -1
        ) {
          this.recipeBookmarked = true
          bookmarkItem = {
            savedRecipeID,
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
                savedRecipeID: savedRecipeID,
                savedRecipe: this.recipe,
                users_permissions_user: JSON.parse(
              window.localStorage.getItem("userData")
            ).id
              },
            }
          ); 
          const res = await this.axios.get(`${process.env.VUE_APP_STRAPI}api/users/${this.userID}?populate=bookmarks`)
                          const user  = res.data
                        window.localStorage.setItem('bookmarks', JSON.stringify(user.bookmarks))         
        } //else {
           //this.recipeBookmarked = false
            //const itemIndex = this.bookmarks.findIndex(bookmarkItem => bookmarkItem.savedRecipeID === item.savedRecipeID)
              //      this.bookmarks.splice(itemIndex, 1)
                //    window.localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))

                    //const response = await this.axios.get(`${process.env.VUE_APP_STRAPI}api/bookmarks?filters[savedRecipeID][$eq]=${item.id}`)
                  //  const test = response.data.data[0].id
                    //await this.axios.delete(`${process.env.VUE_APP_STRAPI}api/bookmarks/${test}`)
            
       // } 
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