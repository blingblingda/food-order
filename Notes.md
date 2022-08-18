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
4. 希望 List 显示在一个统一的白色背景卡片上，UI 新建 Card 套壳，加上 css
5. 建一个 folder 存放 Item 相关
   1. MealItem 专门写一个 li 用来展示每一个 Item
   2. 注意，price 需要在外面加工一下再放进来展示（$+两位小数）
   3. 右边的部分是一个小 form，新建一个 MealItemForm.js 给他 1. 包含 input 和 button，input 可以单独在 UI 中生成一个套壳（reusable pre-styled input component) 2. 表单相关的 label 需要加 for 属性（React 中是 htmlFor）规定 label 与哪个表单元素绑定，一般使用 input 的 id 3. input 中使用{…props.input}就可以一次性拿到父组件传过来的所有 input 属性，父组件传递的时候用 input={{}}的形式用 obj 写所有属性 4. 传给 Input 的 ID 应该是不同的，不然无法绑定或追踪每一个 input。由于 list 里面每个 meal 是有 id 的，只差 2 级，可以逐层传递过来，使用 list 里 dummydata 的 id
      **Adding Card-UI and MealItem (inc Input-UI)**

## Adding a Modal via a React Portal - 添加 backdrop

1. 点击 Cart 后需要黑色 div 覆盖掉整个页面，然后把 Cart 内容突出展示
2. html 增加一个 root，id=overlay
3. 把 backdrop 和 ModalOverlay 都作为 component 写在 Modal 组件中
4. Backdrop（黑幕）就是一个 div+黑色 css - 固定写法
5. ModalOverlay 用 div 套壳，把之后引入包裹的作为{props.children}包在里面实现样式加成
6. 因为要在 Modal 里使用 createPortal，所以需要引入 ReactDom。
   1. 然后在 return 里面先把黑幕插入之前准备好的 overlay root。
   2. ModalOverlay 不需要插入，但是也要创建 Portal 把 props.children 包裹进去。
7. 最后用做好的 Modal 组件把 Cart 组件整体包裹起来，就可以让 Cart 有黑底+突出的效果了。
8. 最后的最后，把 Cart 引入 App.js 中 return 里就可以渲染出来了。
   ** finished all display**
