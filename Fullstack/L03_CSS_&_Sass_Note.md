# Lecture03 CSS & Sass

This note is based on Teacher Ally's Lecture 03 CSS & Sass framework, supplemented with content from W3School and MDN, aimed at assisting students in building a basic learning framework alongside the 26th Full Stack video.

For more practical operations and detailed content, please refer to the documentation.

## Table of Contents

- [Lecture03 CSS \& Sass](#lecture03-css--sass)
  - [Table of Contents](#table-of-contents)
  - [1. CSS](#1-css)
    - [1.1 CSS Length Units](#11-css-length-units)
    - [1.2 Naming Convention in CSS](#12-naming-convention-in-css)
    - [1.3 Responsive Layout with Media Queries](#13-responsive-layout-with-media-queries)
    - [1.4 Position](#14-position)
    - [1.5 Transition](#15-transition)
    - [1.6 z-index](#16-z-index)
    - [1.7 Grid](#17-grid)
  - [2. Sass](#2-sass)
    - [2.1 Sass Introduction](#21-sass-introduction)
    - [2.2 Sass Variables](#22-sass-variables)
    - [2.3 Nesting](#23-nesting)
    - [2.4 Mixin and Include](#24-mixin-and-include)
    - [2.5 Extend and Inheritance](#25-extend-and-inheritance)
    - [2.6 Import and Partials](#26-import-and-partials)
    - [2.7 Function](#27-function)

## 1. CSS

### 1.1 CSS Length Units

`rem`, `em`, `px`, `vh`, `vw`, `%`

- `em` is a unit relative to the **parent element**, used to set element dimensions such as width, height, padding, margin. When applied to font-size, em is relative to the font-size of the parent element.
- `rem` (most commonly used) is a widely used relative unit that is always relative to the font-size of the **root element** (html). Therefore, rem remains consistent throughout the document.
- `px` is typically used for smaller dimensions like borders, or in specific cases for positioning elements.
- `vh` and `vw` represent viewport height and width percentage units respectively.
- `%` percentage units are relative to the **parent element** and can be used for setting width, height, and other properties as a percentage of the corresponding parent property.

### 1.2 Naming Convention in CSS

BEM (Block, Element, Modifier):

- BEM is a naming convention used to create clear and modular CSS.
- The naming pattern is block__element--modifier.
- `-` hyphen: used only as a connector between words in a block or element name.
- `__` double underscore: used to connect a block and its child element.
- `_` single underscore: used to describe a state of a block or block element.

  > In Vue and React, this may not be necessary for smaller components. For public or global modules, BEM is still recommended.

  For example:
  ![css bem](./assets/images/css_bem.jpg)

  > BEM is just one of many popular naming conventions  
  > Other naming conventions may be used at work, depending on company standards  
  > For instance, in styled-components (a popular CSS-in-JS library for React applications)
  > camelCase is often used.

### 1.3 Responsive Layout with Media Queries

When implementing responsive layouts, @media queries are a useful CSS feature that allows applying different styles based on the device's screen width or other characteristics. This helps adapt the design for phones, tablets, and PCs.

```css
body {
  background-color: green;
}

/* Styles applied for maximum width of 1200px and below */
@media screen and (max-width: 1200px) {
  body {
    background-color: purple;
  }
}

/* Styles applied for maximum width of 600px and below */
@media screen and (max-width: 600px) {
  body {
    background-color: yellow;
  }
}
```

- `screen` indicates that these styles are only applied on screen devices, not on printers or other media types. In addition to `screen`, here are some other common media types for reference:
  - `all`: Applies to all media devices.
  - `print`: Applies to printers and print previews.
  - `speech`: Applies to screen readers and other speech synthesizers.
  - `projection`: Applies to projectors.

> The importance of order: CSS is executed in the order it's written, so the order of @media queries is very important. Make sure more specific queries come before more general ones, so that the stylesheet overrides correctly. The range of later @media queries should not contain earlier ranges, otherwise later styles will be overridden.

### 1.4 Position

`position` 属性用于控制元素的定位方式：

- `static`： 默认值，元素按照标准流布局展示，即元素出现在文档流中的位置。
- `relative`： 相对于元素在标准流中的位置进行移动，但原来的标准流位置仍然占用。其特点为：

  1. 参照自己原来的位置来移动。
  2. 原来在标准留的位置继续占有，后面的盒子不会占有它原来的位置。

  ```css
  div {
    width: 100px;
    height: 100px;
    position: relative; /*开启相对定位*/
    top: 100px;
    left: 100px;
  }
  /*上述例子表示元素向下和向右移动了100px。*/
  ```

  属性：用于在相对定位的元素中进行位置微调，使元素相对于其在标准文档流中的位置进行移动。

  - `top: 100px;` 向下移动 100px
  - `top: -100px;` 向上移动 100px
  - `right: 100px;` 向左移动 100px
  - `right: -100px;` 向右移动 100px
  - `bottom: 100px;` 向上移动 100px
  - `bottom: -100px;` 向下移动 100px
  - `left: 100px;` 向右移动 100px
  - `left: -100px;` 向左移动 100px

- `absolute`：
  - 相对于最近的已定位（非 static 定位）祖先元素（absolute 并不是相对自己定位），如果没有已定位的祖先元素，则相对于文档根元素（root element）进行定位。
  - `absolute` 不会占有原先的位置。
    > 至少设置 left、top、right、bottom 中的一个，否则 absolute 不会生效。
- `fixed`： 相对于浏览器窗口进行定位，不占用原来的位置。常用于创建悬浮窗。

  ```css
  position: fixed;
  top: 0;
  left: 0;
  /*上述例子表示元素在向下滚动时，在距离父容器顶部20px的位置固定。*/
  ```

- `sticky`

  当元素在视口中满足给定的偏移位置——然后它“粘”在视口中。

  ```css
  position: sticky;
  top: 20px;
  /*上述例子表示元素在向下滚动时，在距离父容器顶部20px的位置固定。*/
  ```

  > 必须设置 top left right bottom 的其中一个， sticky 才生效。

  `fixed` _vs._ `sticky`

  > fixed 用于完全固定元素的位置，而 sticky 则用于在滚动到一定位置后固定元素的位置，但它们的使用场景有所重叠。

### 1.5 Transition

In CSS, transition is a property used to control the smooth transition of property values over a specified time period. It allows you to make the change process smoother and more gradual when element property values change, rather than changing suddenly.
![css transition](./assets/images/css_transition.png)
Syntax:

```css
selector {
  transition: property duration timing-function delay;
}
```

Example:

```css
.box {
  background-color: blue;
  transition: background-color 0.5s ease;
}

.box:hover {
  background-color: red;
}
```

- property: The name of the CSS property to transition, such as `color`, `opacity`, `transform`, etc.
- duration: The duration of the transition, can be in seconds(s) or milliseconds(ms). For example, 1s means a transition duration of 1 second.
- timing-function: The timing function of the transition effect, controlling the speed of the property value change during the transition. Common ones include ease, linear, ease-in, ease-out, etc.
- delay: The delay before starting the transition, also in seconds(s) or milliseconds(ms).

Transition: Besides using pseudo-classes, you can also control when transitions take effect by using JavaScript to add and remove classes.

### 1.6 z-index

z-index is a CSS property used to control the stacking order of elements on a page. In HTML documents, elements can use the z-index property to determine their order in the stacking context, i.e., which element is above or below another.

Important notes:

- Only effective on positioned elements: z-index only works on elements with a positioning property (position value of relative, absolute, or fixed). This is because only positioned elements create a stacking context.
- Comparison within the same stacking context: z-index only makes sense within the same stacking context. If two elements are not in the same stacking context, comparing their z-index values is meaningless.
- Parent-child relationship: A child element's z-index value does not affect the stacking order of the parent element or other sibling elements. The child's stacking order is relative to its parent.
- Stacking context: Certain properties and elements trigger new stacking contexts, affecting z-index behavior. For example, setting transform, opacity, filter, will-change properties, or using containers with certain CSS properties (such as flex, grid, etc.) can all create new stacking contexts.
- In practical work, if a z-index needs the highest priority, it's commonly set to 999.

### 1.7 Grid

CSS Grid is powerful.  
In professional work, flex is used more often than grid.

Flex is one-dimensional layout.  
Grid is two-dimensional layout.

- Containers and items

  ```html
  <body>
    <div class="wrapper">
      <div class="one item">One</div>
      <div class="two item">Two</div>
      <div class="three item">Three</div>
      <div class="four item">Four</div>
      <div class="five item">Five</div>
      <div class="six item">Six</div>
    </div>
  </body>
  ```

  - To enable grid layout for a container, use: `display: grid;`

- Rows and columns

  - Containers are divided into rows (horizontal) and columns (vertical)
  - Use the `grid-template-columns` and `grid-template-rows` properties to define row and column widths
    Example:

    ```css
    .wrapper {
      display: grid;
      grid-template-columns: 100px 100px 100px;
      grid-template-rows: 100px 100px 100px;
    }
    ```

    - The repeat() function is used to repeat grid patterns of rows or columns. It takes two parameters: the number of repetitions and the template, such as `grid-template-columns: repeat(3, 1fr);`
    - The `auto-fill` value can be used with repeat() to make the grid container automatically fill grid items to adapt to the container's width. This is very useful in responsive design.
    - The `fr` unit is used to specify equal distribution of remaining space in the grid container. For example: `grid-template-columns: 1fr 2fr 1fr;`
    - The `minmax()` function defines the minimum and maximum size of grid items.

    Example:

    ```css
    grid-template-columns: repeat(auto-fill, 200px);
    grid-template-columns: 200px 1fr 2fr;
    grid-template-columns: 1fr 1fr minmax(300px, 2fr);

    grid-gap: 20px;
    grid-row-gap: 20px;
    grid-column-gap: 20px;

    grid-template-rows: 100px 200px; /*row height*/
    ```

  - Use properties: `grid-row-gap`, `grid-column-gap`, `grid-gap` to set gaps
  - Learn about `justify-items`, `align-items`, `justify-self`, `align-self` and other properties, which can be used to control the alignment of grid containers and grid items.

Some flex properties can also be used with CSS Grid, such as justify-content

## 2. Sass

### 2.1 Sass Introduction

Sass is a CSS preprocessor.
Other preprocessing languages include Less, SCSS (Sass and SCSS are two syntax variants of the same project).

Why use Sass:

- Can reduce repetitive CSS writing, saving time.
- Provides simple logical calculation equations.
- Enables modularity.

HTML cannot process Scss directly, so it's only used in the development phase, and VS Code plugins or packages are used to compile Scss files into CSS files.

> Recommended plugin: **`Live Sass Compiler`**

The 5 features of Sass:

1. Variables
2. Nesting
3. Mixin
4. Partials
5. Extend/Inheritance

### 2.2 Sass Variables

Set variables for reuse and easy modification.
Syntax:

```scss
$myFont: Helvetica, sans-serif;
$myColor: red;
$myFontSize: 18px;
$myWidth: 680px;

p {
    color: $myColor;
    font-size: $myFontSize;
}
```

**Scope**: Sass variables are only available at the nesting level where they are defined.

### 2.3 Nesting

Sass lets you nest CSS selectors in the same way as HTML.

Example:
Rewriting the following CSS code in Sass:

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

Rewritten Sass code:

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

### 2.4 Mixin and Include

Use the @mixin directive to create reusable code blocks.  
Use the @include directive to insert previously created reusable code blocks.

Syntax:

```scss
@mixin customised-mixin-name {
  property: value;
  property: value;
}

div {
  @include customised-mixin-name;
}
```

Example:

```scss
@mixin style($size: 15px, $color: #999) {
  font-size: $size;
  color: $color;
  line-height: 1.5;
}

div {
  @include style(25px, black);
}
```

> In the example above, font size and color are redefined through passing parameters.

### 2.5 Extend and Inheritance

Selector inheritance allows a selector to inherit all the styles of another selector. To use selector inheritance, use `@extend` followed by the selector to be inherited.

> Must be used with the `%` placeholder selector

Example:

```scss
%button-style {
  background-color: blue;
  color: white;
  padding: 10px 20px;
}

.button {
  @extend %button-style;
}

.success-button {
  @extend %button-style;
  background-color: green;
}
```

In the example above, %button-style is a placeholder selector that defines a button's style. Then, the .button class selector inherits the same style from %button-style using `@extend %button-style;`. Similarly, the .success-button class selector also inherits the same style and overrides the background color to make it green.

In the generated CSS, .button and .success-button will both contain styles from %button-style, avoiding duplicate style definitions.

### 2.6 Import and Partials

`@import`  
The `@import` directive allows you to include the content of one file in another.

```scss
@import reset;
@import colors;
```

`Partials`

- By default, Sass directly compiles all .scss files. However, when you want to import a file, you don't need to compile that file directly.
- If your filename starts with an underscore, Sass will not compile it.

### 2.7 Function

Functions in Sass and SCSS allow you to perform calculations, manipulate data, and generate dynamic styles in your stylesheets. Sass functions can be used to generate values such as colors, numbers, strings, etc.:

1. Built-in functions: SCSS includes many built-in functions for handling colors, mathematical operations, strings, etc.
   Example: SCSS built-in darken and round functions

   ```scss
   $color: darken(#3498db, 10%);
   $result: round(5.7);
   ```

2. Custom functions: Use the @function keyword to create custom functions.  
   Example:

   ```scss
   // Define a custom function
   @function add-margin($value) {
     @return $value + 10px;
   }

   // Use the custom function
   .box {
     margin: add-margin(20px);
   }

   // margin will be 30px
   ```
