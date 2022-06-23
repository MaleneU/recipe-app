<template>
  <div>
    <div class="recipe">
      <section class="recipe__section recipe__section--info">
        <h1>{{ curRecipe.Title }}</h1>
        <p class="recipe__description">{{ curRecipe.Description }}</p>
      </section>

      <section class="recipe__section recipe__section--ingredients">
        <h3>Ingredients</h3>
        <RecipeIngredient
          v-for="ingredient in curRecipe.recipe_ingredients.data"
          :key="ingredient.id"
          :amount="ingredient.attributes.Amount"
          :unit="ingredient.attributes.unit.data.attributes.ShortName"
          :name="ingredient.attributes.ingredient.data.attributes.Name"
        ></RecipeIngredient>
      </section>
      <section class="recipe__section recipe__section--equipment">
        <h3>Equipment</h3>
        <div class="recipe__equipment">
          <RecipeEquipment
            v-for="equipment in curRecipe.equipment.data"
            :key="equipment.id"
            :name="equipment.attributes.Name"
          />
        </div>
      </section>
      <section class="recipe__section">
        <h3>Instructions</h3>
        <div class="recipe__instructions">
          <RecipeStep
            v-for="(step, index) in curRecipe.steps.data"
            :key="step.id"
            :number="index"
            :title="step.attributes.Title"
            :instruction="step.attributes.Instruction"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import RecipeIngredient from "../components/recipe/RecipeIngredient.vue";
import RecipeEquipment from "../components/recipe/RecipeEquipment.vue";
import RecipeStep from "../components/recipe/RecipeStep.vue";

export default {
  components: {
    RecipeIngredient,
    RecipeEquipment,
    RecipeStep
  },
  data() {
    return {
      name: this.$route.params.id,
      curRecipe: [],
      bookmarks: JSON.parse(window.localStorage.getItem("bookmarks"))
    };
  },
  created() {
    const name = parseInt(this.name);
    const recipeItem = this.bookmarks.find((x) => x.id === name);
    this.curRecipe = recipeItem.savedRecipe.attributes;
  },
};
</script>

<style>
</style>