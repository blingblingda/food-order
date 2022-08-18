## Structure

1. components folder 下有 4 个功能性 folder
   1. UI: place general UI components (input, card, model), which are not tied to a specific feature of this application, but instead could be used in multiple places in any project.
   2. Layout: Header and relatives
   3. Meals: List, Item
   4. Cart
2. assets folder 放图片等

## Layout folder

1. Header component
   1. 包含：title, img, cart-button
   2. local img：在外面引入，属性直接使用。http img：属性中直接引入 URL。都记得 alt
   3. css 中可以使用 transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem) 调整图片角度和位置。
2. Cart Button component
   1. 包含：icon，words，number。用 span 分开
   2. icon 单独做一个 components 放在 Cart folder 里，这里引用即可。
      **Header component finished**

## Meals folder

1. Meals 包含 MealsSummary 和 AvailableMeals(List)
2. AvailableMeals，dummyData 放在这里，然后以 list 展示
3. 最终将 Meals 整体放进 App，外面包一层 main element
   **Adding Meal component : summary and list**
