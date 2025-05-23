# <center> Lecture02 HTML & CSS (Part 2) </center>

This note is based on Teacher Ally's Lecture 02 HTML & CSS (Part 2) framework, supplemented with content from W3School and MDN, aimed at assisting students in building a basic learning framework alongside the 26th Full Stack video.

For more practical operations and detailed content, please refer to the accompanying documents.

## <center>Table of Contents</center>

[CSS - Cascading Style Sheets](#css-cascading-style-sheets)

- [CSS Introduction](#css-introduction)
- [How to Add CSS into HTML](#how-to-add-css-into-html)
- [CSS Selectors](#css-selectors)
- [CSS Selectors Advanced Skills](#css-selectors-advanced-skills)
- [Font and Text Style](#font-and-text-style)
- [Inline and Block](#inline-and-block)
- [Background Property](#background-property)
- [CSS's Three Main Features](#csss-three-main-features)
- [CSS Box Model](#css-box-model)
- [Flex Layout](#flex-layout)

---

## <center>CSS - Cascading Style Sheets</center><br>

Reference Document: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS),
[W3school](https://www.w3schools.com/css/)

### CSS Introduction

Basic Concepts

- Definition: CSS (Cascading Style Sheets) is a language used to style and layout web pages, describing how HTML elements are displayed on screens, paper, or other media.

- Purpose: To make web content more visually appealing by setting styles for HTML elements.
- Syntax:<br><br>
  &emsp;&emsp;![css syntax](./assets/images/css_syntax.gif)
  - Use selectors to find the HTML elements you want to style.
  - The declaration block contains one or more declarations separated by semicolons.
  - Each declaration includes a CSS property name and a value (key-value pair), separated by a colon.
  - Multiple CSS declarations are separated by semicolons, and declaration blocks are enclosed in curly braces.

CSS Comments:

```css
/* This is a single-line comment */

/* This is
a multi-line
comment */
```

Emmet

> [Emmet](https://code.visualstudio.com/docs/editor/emmet): An efficient coding shortcut tool that helps to quickly write HTML/CSS.  
> Example: Typing `ul>li*5` will quickly expand into an unordered list with 5 list items.  
> Reference Document: [Emmet](https://code.visualstudio.com/docs/editor/emmet)

### How to Add CSS into HTML

Three Ways to Insert CSS

- Internal CSS: Directly use the `<style>` tag in the `<head>` of the HTML file.

  ```html
  <!DOCTYPE html>
  <html>
    <body>
      <h1 style="color:blue;text-align:center;">This is a heading</h1>
      <p style="color:red;">This is a paragraph.</p>
    </body>
  </html>
  ```

  > Note: Inline styles lose many of the advantages of style sheets (by mixing content with presentation). Use this method with caution.
- Inline CSS: Use the style attribute directly on HTML elements.

  ```html
  <h1 style="color:red;">Heading</h1>
  ```

- External CSS (**Best Practice**): Link to a .css file from HTML, separating style from content. This is the best practice.

  ```html
  <html>
    <head>
      <link rel="stylesheet" href="mystyle.css" />
    </head>
    <body></body>
  </html>
  ```

### CSS Selectors

- Element Selector: Applies styles to specific HTML tags, such as:

  ```css
  h1 {
    /*selects all h1 tags*/
    text-align: center;
    color: red;
  }
  ```

- Class Selector: `.classname` for custom styles for one or more HTML elements
  - An element can have multiple class names, e.g., `<div class="class1 class2">`
  - HTML elements can also reference multiple classes, such as:

    ```html
    <div class="class1">
      <div class="class1"></div>
    </div>
    ```

    > Note: Class names cannot start with a number!
- ID Selector: Applies styles to an HTML element with a specific id. This is unique.  
  Example:

  ```css
  #idname {
    text-align: center;
    color: red;
  }
  ```

- Universal Selector: Selects all elements to apply a uniform style.

  ```css
  * {
    margin: 0;
    padding: 0;
  }
  ```

  > In CSS, `.class` is used more often than `#id`

### CSS Selectors Advanced Skills

- Descendant Selector, such as:

  ```css
  /*selects all p descendant elements within div*/
  div p {
    ...;
  }
  ```

- Child Selector, such as:

  ```css
  /*only selects direct p child elements of div*/
  div > p {
    ...;
  }
  ```

- Grouping Selector, such as:

  ```css
  /*can set styles for multiple tags simultaneously*/
  h1,
  h2,
  h3 {
    ...;
  }
  ```

- Intersection Selector, such as:

  ```css
  /* selects: elements with both card and card1 class names */
  .card.card1 {
    color: green;
  }
  ```

- Link Pseudo-class Selector, used to define styles for links or other elements in different states  
   Example:

  ```css
  <style>
      /* unvisited link a:link */
     a:link {
      color:red
     }
      /* visited link a:visited */
     a:visited {
      color: orange;
     }
      /* mouse over link a:hover */
     a:hover {
      color:skyblue
     }
      /* active link (when mouse button is pressed but not released) a:active */
    a:active{
      color:green;
    }
  </style>
  ```

- Structural Pseudo-class Selector:  
  ![css selector](./assets/images/css_selector.jpg)

### CSS Font and Text Style

- Font properties: Such as `font-family`, `font-style`, `font-size`, `font-weight`, etc.

  - The `font-family` property sets the font type, common property values:
    - Serif fonts
    - Sans-serif fonts
    - Monospace fonts
  - The `font-style` property sets the font style, common property values:
    - normal
    - italic
    - oblique
  - The `font-weight` property sets the weight (boldness) of the text, common values:
    - lighter
    - normal
    - bold
    - bolder (most fonts don't support this)
  - The `font-size` property sets the size of the text.
  - Note: `font-family`, `font-size` are required.

- Text style properties: Common properties used to control text display effects:
  - `text-align`: Sets text alignment (center, left, right, justify)
  - `vertical-align`: Used to specify vertical alignment between elements in the same line or text within table cells
  - `text-decoration`: Sets all the text-decoration properties in one declaration
  - `text-decoration-line`: Specifies the kind of text decoration to be used (underline, overline, etc.)
  - `text-decoration-color`: Specifies the color of the text-decoration
  - `text-decoration-style`: Specifies the style of the text decoration (solid, dotted, etc.)
  - `text-decoration-thickness`: Specifies the thickness of the text decoration line
  - `text-transform`: Controls the capitalization of text
  - `letter-spacing`: Specifies the space between characters in a text
  - `line-height`: Specifies the line height
  - `text-indent`: Specifies the indentation of the first line in a text-block
  - `white-space`: Specifies how to handle white-space inside an element
  - `word-spacing`: Specifies the space between words in a text
  - `text-shadow`: Specifies the shadow effect added to text

> Many CSS properties can be set as compound properties: for example, `font: 12px Arial, sans-serif;` can set multiple font-related properties at once.

### Inline and Block

- Block elements: Such as `div`, take up a full line. Can have width and height set via CSS.
- Inline elements: Such as `span`, don't take up a full line. Cannot have width and height set via CSS.
- Inline-block elements: Can have width and height set via CSS.
  ![inline and block](./assets/images/css_inline_and_block.jpg)

Element mode conversion: Use the display property, such as
`display: block;`, `display: inline;`, `display: inline-block;`

### Setting Single Line Text Vertically and Horizontally Centered in Two Ways

- Using `line-height` = `height`

  ```css
  div {
    width: 200px;
    height: 40px:
    /* text-align: center for horizontal centering */
    text-align: center;
    /* line-height equal to height for vertical centering */
    line-height: 40px;
  }
  ```

- Using Flex

  ```css
  div {
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```

### Background Property

- `background-color: red` sets the background color
- `background-image: url("paper.gif");` sets a background image
- `background-repeat` sets how the background image will repeat, common values:
  - repeat
  - repeat-x
  - repeat-y
  - no-repeat
- `background-position` sets the position of the background image

> The `background` property can also be used as a shorthand property

### CSS's Three Main Features

1. Cascading: When multiple conflicting styles are applied, they cascade according to certain rules.
   - If styles conflict, they cascade according to specificity rules.
2. Inheritance: Some styles are inherited by child elements.
3. Specificity & Weight Addition:

   - Inline style > Internal style sheets > External style sheets
   - !important (use with caution) > inline style > ID selector > class selector > element selector > universal selector.
   - Calculating specificity (Number of ID selectors, number of class/pseudo-class/attribute selectors, number of element/pseudo-element selectors). Then compare from left to right. For example:

   ```css
   #example {
     color: green; /* 1-0-0 - WINS!! */
   }

   .bodyClass .sectionClass .parentClass [id="myElement"] {
     color: yellow; /* 0-4-0 */
   }
   ```

### CSS Box Model

![CSS Box Model](./assets/images/css_box_model.png)

Content: The internal content of the box

Padding:

- You can modify padding style through various properties: `padding-top: 10px`, `padding-right: 20px`, `padding-bottom: 30px`, `padding-left: 40px`
- You can also use the shorthand property: `padding: 10px 20px 30px 40px;`

Border:

- You can modify border style, width, and color using various properties: such as `border-style: solid;`, `border-width: 1px;`, `border-color: black;`
- You can also use the shorthand property: `border: 1px solid black;`

- Circular border:

  ```css
  div {
    width: 200px;
    height: 200px;
    background-color: red;
    /* Set border-radius to half of width/height */
    border-radius: 100px;
  }
  ```

Margin:

- CSS has properties for specifying the margin for each side of an element:
  - margin-top
  - margin-right
  - margin-bottom
  - margin-left
- All margin properties can have the following values:
  - auto - the browser calculates the margin
  - length - specifies a margin in px, pt, cm, etc.
  - % - specifies a margin in % of the width of the containing element
  - inherit - specifies that the margin should be inherited from the parent element
- Note: Negative values are allowed.

```css
#example {
  margin-top: 100px;
  margin-bottom: 100px;
  margin-right: 150px;
  margin-left: 80px;
}

#example {
  /* You can also use the shorthand property */
  margin: 25px 50px 75px 100px;
}
```

- Margin can be used for horizontal centering: such as `margin: 0 auto;`
- Another method is to use flex
- Two margin issues:
  - Margin collapse
  - Margin merging
  
`box-sizing`

- `content-box` width and height set the size of the content area of the box.
- `border-box` width and height set the total size of the box.

- `box-shadow`

  Syntax: `box-shadow: h-shadow v-shadow blur spread color inset;`

### Flex Layout

> A model designed for complex layouts, primarily used to adjust how elements display on different devices and screen sizes.  
> Very useful for responsive layouts.

Reference Document:

- [Flexbox Playground](https://codepen.io/enxaneta/full/adLPwv/)
- [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)

Flex syntax:
Set `display:flex;` on the parent element

![flex container](./assets/images/css_flex_container.svg)
![flex items](./assets/images/css_flex_items.svg)

Main Axis and Cross Axis

- Main Axis: The main axis is horizontal by default.
- Cross Axis: The cross axis is vertical by default.
- You can adjust the direction of the main axis using the `flex-direction` property, which includes values: `row`, `row-reverse`, `column`, `column-reverse`
  ![flex direction](./assets/images/css_flex_direction.svg)

Whether the main axis wraps automatically

- Use the `flex-wrap` property to determine if the main axis automatically wraps, with values including: `nowrap`, `wrap`, `wrap-reverse`.
  ![flex wrap](./assets/images/css_flex_wrap.svg)
  
Main axis flex item distribution

- Adjust using `justify-content`, such as: `center`, `space-between`, `space-around`, etc.
  ![justify content](./assets/images/css_justify_content.svg)

Cross axis alignment

- The `align-items` property common values: `flex-start`, `flex-end`, `center`, `baseline` (align with the text baseline), `stretch`

Box flexibility

- `flex-grow`: Defines the growth factor of flex items, default is 0
- `flex-shrink`: Defines the shrink factor of flex items, default is 1
- `flex-basis`: Sets the base size in the direction of the main axis, default value is auto.
- Can be written as a shorthand property

### Homework: Create Card UI Design

Create a card UI design using the CSS techniques learned in this lecture, implementing proper HTML structure, CSS styling, and responsive layout.
