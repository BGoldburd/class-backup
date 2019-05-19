/*global $*/
(function () {
    'use strict';

    const recipeImage = $('#recipe img');
    const recipeTitle = $('#recipe h2');
    const ingredientsUl = $('#recipe ul');

    $('input[name="recipe"]').change(event => {
        $.getJSON(`${event.target.value}.pretendPHP`, recipe => {
            recipeImage.attr('src', recipe.picture);
            recipeTitle.text(recipe.name);

            ingredientsUl.empty();
            recipe.ingredients.forEach(ingredient => {
                ingredientsUl.append(`<li>${ingredient}</li>`);
            });
        });
    });
}());