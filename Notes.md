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
   3. 右边的部分是一个小 form，新建一个 MealItemForm.js 给他
      1. 包含 input 和 button，input 可以单独在 UI 中生成一个套壳（reusable pre-styled input component)
      2. 表单相关的 label 需要加 for 属性（React 中是 htmlFor）规定 label 与哪个表单元素绑定，一般使用 input 的 id
      3. input 中使用{…props.input}就可以一次性拿到父组件传过来的所有 input 属性，父组件传递的时候用 input={{}}的形式用 obj 写所有属性
      4. 传给 Input 的 ID 应该是不同的，不然无法绑定或追踪每一个 input。由于 list 里面每个 meal 是有 id 的，只差 2 级，可以逐层传递过来，使用 list 里 dummydata 的 id
         **Adding Card-UI and MealItem (inc Input-UI)**

## Adding a Modal via a React Portal - 添加 backdrop

1. 点击 Cart 后需要黑色 div 覆盖掉整个页面，然后把 Cart 内容突出展示
2. html 增加一个 root，id=overlay
3. 把 backdrop 和 ModalOverlay 都作为 component 写在 Modal 组件中
4. Backdrop（黑幕）就是一个 div+黑色 css - 固定写法
5. ModalOverlay 用 div 套壳，把之后引入包裹的作为{props.children}包在里面实现样式加成
6. 因为要在 Modal 里使用 createPortal，所以需要引入 ReactDom。
   1. 然后在 return 里面先把黑幕插入之前准备好的 overlay root。
   2. 再把 ModalOverlay 插入 overlay root，要把 props.children 包裹进去。
7. 最后用做好的 Modal 组件把 Cart 组件整体包裹起来，就可以让 Cart 被丢进 overlay 的 root，有黑底+突出的效果了。
8. 最后的最后，把 Cart 引入 App.js 中 return 里就可以渲染出来了。
   **All components display done**

## Managing Cart & Modal State

问题：是否展示 Cart - 需要 manage Cart 的 state，由于 Cart 源头是在 App.js 使用，因此 state 要写在 App 里

1. Cart 设置 state：cartIsShown，默认值 false
2. const 两个 Handler fn，一个 show 一个 hide，show 的话就更新 state 为 true，hide 的话就更新 state 为 false。
3. 在 return 里显示 Cart 组件的地方加个判断，如果 state 为 true 才 render 组件（使用&&）
4. 控制按钮
   1. 决定 show 的按钮在 Header 组件里的 Button 组件里的 button tag 上。因此需要 pass down a pointer at showCartHandler (App.js) to HeaderCartButton.(two levels of components through)
   2. 决定 hide 有两种方式：1.点击 Cart 组件中的第一个 button。2.点击 Modal 组件中的黑幕。因此需要把 hide Handler 传到这两个地方.
   3. Modal UI 这里 pass a value through multiple levels, down to the backdrop.不用 Context 传输的原因是：if you are using context and you always bind a click on the backdrop to hiding the Cart, then you would make the spectrum very specific and you would not be able to use the Modal for other kinds of content, because clicking the backdrop would always hide the Cart, so if you had other content in Modals as well then you would be too specific. Here using multiple levels of props would be better because it makes the Modal more reusable and doesn't tie it to one specific use case.

## Cart Context

问题：点击 MealItemForm 里面的 Add 按钮，可以把当条 Item 显示到 Cart 组件的 list 里面去。

1. 建立传声筒：(注意传声筒不是组件)
   1. 单独建立一个 store folder 放置传声筒 cart-context.js
   2. 使用 React.createContext 建立 cart 的传声筒，把需要传递的 value 和 fn 的模板格式记录进去。
2. 给传声筒单独建一个 provider 套壳组件 CartProvider，把传声筒引入并加上 Provider 套壳，这样就可以 wrap all components that need access to the cart。
   1. 注意需要把传递的数据单独 const 一下，以 value 形式整体传给套壳，数据格式应与传声筒格式一致(因为传声筒需要接受这些信息传给 children)，不过这些都是 concrete context value, which will be updated over time.
   2. 其中需要用到的 addItem 和 removeItem 两个 fn 的具体函数也可以写在这个 Provider 里
3. 谁需要 access to the cart: Cart, Header 里的 HeaderCartButton, Meals 里的 MealItemForm 的 button。所以全包裹。by using a separate CartProvider component, we keep the app component lean and don't have to put all the cart management logic in there.
4. 使用 useContext 从传声筒（注意不是 Provider 组件）中收取 items 数据并在 HeaderCartButton 中使用
   1. 收取后代号 cartCtx
   2. 需求：badge 里应该显示所有选中 item 里面 amount 的总和。如果使用 length 则是 item 的数量，是不对的。使用原生 reduce 就可以根据遍历元素的某个属性内容做统计。
   3. 把传声筒（代号）里面传过来的所有 item 进行 reduce 遍历，return 的是每一个 item 里面 amount 属性的总和。这样形成的 number 是我们需要展示的 number。
      **cart component showing & cart-context setup**
5. 管理 Items 状态。CarProvider 里面的 addItemToCartHandler 一旦被调用，就会增加一个新的 item 到 items array 中（已存在-update state，新的-add state）。所以需要使用 useReducer 来管理所有 state
   1. 在 component 外面 const 一个 cartReducer，在外面因为 this reducer function won't need anything from the component, and shouldn't be recreated when the component is reevaluated.
   2. cartReducer 是总的 Reducer 里面管理所有的 state，return 一个总 defaultCartState
   3. 在 cartReducer 这个组件中，我们可以 call useReducer，把里面 state1 号 cartState 和 action1 号 dispatchCartAction 拿出来
   4. 把传出去的内容里的 items 和 amount 都改成目前的 state
   5. 把 action1 号连接到 addHandler 上（在里面调 action1 号），并起一个 type 暗号”ADD“，和需要传递的内容 item
   6. 把 add 这个逻辑写在总的 Reducer 里面，逻辑就是更新所有 state。把 items 和 totalAmount 分开加工好，然后 return 一个新的总 state obj
      **basic cartReducer finished**
6. 给终端 MealItemForm 的 input 框打标签，保证拿到 input 相关内容
   1. 用 useRef 创建一个标签容器记录 input 里的 amount
   2. 给 form 添加 onSubmit 事件触发 submitHandler 处理函数。
   3. 由于 Input 这里是直接用的自定义组件，所以打标签需要到组件中设置一下
      1. 使用 React.forwardRef 把 Input UI 内容全部包裹，这样就可以增加一个 ref 参数
      2. 把 ref 参数传递给里面的 input
   4. 回到 form 中，可以再 Input 组件里增加一个 ref 属性指向标签容器
   5. submitHandler 处理函数就可以拿到用户 entered 数据，const 处理一下，交出去。
      1. 用户输入字符串使用+变数字
      2. 测试数字如果<1 或>5 直接 return 结束不传输
      3. 设置一个 state 判断用户输入内容是否 valid。在刚才测试 return 的前面增加一个更新 state 为 false，并在最下面新建一个窗口判断，如果 state 为 false，则展示一条提示信息 p 标签即可。
   6. 把拿到的 number 传给父组件 MealItem,由父组件举手，引入传声筒，调用 CartProvider 中的 addItem fn 把他们需要的内容传过去
      **add Item number finished**

## 编辑 Cart 界面及功能逻辑

1. 在 Cart 组件中展示最新的 items array
   1. connect to Context
   2. 之前的 dummyMeal 可以被真正的拿过来的 items array 替换掉，对这些最新数据进行 map
   3. map 出的格式是新组建 CardItem
   4. 把 context 里的 totalAmount 拿出来展示 Cart 的相应位置（需要处理一下$和小数点）
   5. 如果有 items 过来才显示 Order btn 不然隐藏，逻辑写上
   6. 引入 CartItem 1. 看看 CartItem 都需要哪些 value 展示，直接全部传过去 2. 由于 Item 中有两个按钮分别增加(媒介 item)和减少（媒介 id）的方法，因此父组件需要传两个 fn 过去接收。先在父组件建立两个 Handler 传过去。这里注意要 bind(null, item.id / item) 确认一定有媒介。
      **Outputting Cart Items**
2. 多个相同的合并成一个：本质上是在 update 增加 item array 的时候使用 findIndex 判断是否存在，如果存在则找到那个 item 增加 totalAmount，不存在的话就正常新增 item+新增 totalAmount
   1. 在目前的 item 的 state 里面找，看是否有 id 和要加进来的 item 的 id 相同的，如果有，则把这个 id 保存为 existingCartItemIndex
   2. 从 state.items 中按照保存的 Index 把这个 Item 找出来保存为 existingCartItem
   3. 设置两个变量：updatedItem 和 updatedItems
      1. 如果 existingCartItem 为 true，就直接把已经存在的这个 Item 的 amount 更新为他目前的 amount+新增 item 的 amount，存在 updatedItem 中。
      2. 然后把之前的 array 打开，然后让 array 里面的第 Index 个 item 更新为 updatedItem
      3. 如果 existingCartItem 为 false，那我的 updatedItem 就是 action 传过来的 item，然后像之前一样直接加进去就可以了
         **Combine same kind of course amount display**
3. 在 CartItem 中，利用+ -符号修改显示内容，以及删除 item
   1. 由于 CartItem 已经把这个状态上传给了父组件 Cart，所以按钮通过 onAdd 后会触发 Cart 组件中的 cartItemAddHandler 函数。该函数会调取 cartCtx 里面 addItem 的方法，并把 item 传过去。通过 addItem 作为媒介，会触发 CartProvider 里面的 addItemToCartHandler 函数，然后执行"ADD"对应逻辑。
   2. 按钮 onRemove 后同样一套流程到 Provider 的 action type 为“REMOVE"逻辑这里，需要增加逻辑:如果 state 里面这个 item 的 amount>1，那么就 amount-1，如果 amount=1，那么把 item 整个 remove 掉 1. 从目前的 state 中寻找 id 和 action 过来的 id 相等的 item 的 Index 2. 把这个 id 对应的 Item 拿出来 3. 定义一下 updatedItems 更新过的 array 4. 如果目前存在这个 existingItem 的 amount 为 1，那么新的 array 需要用 filter 把 item.id 不等于 action.id 的所有 item 挑出来单独组成新 array（其实也就是删除了那个 id 对应的 item） 5. 否则（剩余数量>1)就把那个 item 做一个加工，展开，amount 数量-1，定义为 updatedItem，然后把 array updatedItems 展开，把第 Index 个 Item 更新为 updatedItem 6. totalAmount 的状态-最新的 existingItem.price 就是最新的 totalAmount 7. 最后把最新的 items 和 totalAmount 赋值并 return 出去 8. 回到 Cart 中，把 id 传给 removeItem
      **using + - in CarItem to control number of each item, and remove item**

## 右上角购物车只要变化，按钮就会有一个 bump 动画效果

1. 把 btn 的 classes 加工一下，增加一个 bump 里面的效果，生成一个新的 class
2. 把展示的 button 换成这个新 class，这样就有 bump 效果了。
3. 但是不是每次都需要效果的，设置一个 btn 是否被 highlight 的 state，如果是 true 则增加 bump class，否则不增加+""
4. highlight 状态是根据 items 的变化来变化的，因此需要使用 useEffect 来控制什么时候更新 highlight 的 state
   1. 如果传声筒里没有 items 则不触发 useEffect（直接 return）
   2. 因为 effect 是根据 items 的变化而不是整个 cartCtx 的变化来变化，因此应该先把 items 从 cartCtx 里 destructure 出来。
5. 问题：只有第一次添加进去的时候会触发 class
   1. 每次结束时都要 remove class： 可以设置一个定时器，等 300ms 后（也就是一个 animation 的时长），立刻更新 highlight 的 state 为 false，这样 class 就被移除了。
   2. 自己设置的 timer 自己要移除，不然每次 render 都会叠加新的 timer 上去.在 useEffect 最后 return 一个 cleanup fn

## Adding a Checkout/Order Form

1. moving "meals" data to the backend (215)
2. Fetching Meals via Http (follow previous lecture)
   **fetched meals data**

## Submitting Orders to a Backend Server (Http)

## Fetching Meals Data
