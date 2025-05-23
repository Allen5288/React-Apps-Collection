# <center> Lecture01 HTML & CSS (Part 1) </center>

This note is based on Teacher Ally's Lecture 01 HTML & CSS (Part 1) framework, supplemented with common knowledge points and difficulties from W3School and MDN, aimed at assisting students in building a basic learning framework alongside the 26th Full Stack video.

For more practical operations and detailed content, please refer to the accompanying documents.

## <center> Table of Contents </center>

- [ Lecture01 HTML \& CSS (Part 1) ](#-lecture01-html--css-part-1-)
  - [ Table of Contents ](#-table-of-contents-)
  - [ HTML - Hypertext Markup Language ](#-html---hypertext-markup-language-)
    - [1. HTML Introduction](#1-html-introduction)
    - [2. HTML Basic Structure and Elements](#2-html-basic-structure-and-elements)
      - [2.1. HTML Basic Structure:](#21-html-basic-structure)
      - [2.2 Elements](#22-elements)
      - [2.3 Semantic tags](#23-semantic-tags)
    - [3.Comments and HTML Character Entities](#3comments-and-html-character-entities)
      - [3.1 Comments:](#31-comments)
      - [3.2 HTML Character Entities](#32-html-character-entities)
    - [4. Lists](#4-lists)
      - [4.1. ul - Unordered list:](#41-ul---unordered-list)
      - [4.2. ol - Ordered list:](#42-ol---ordered-list)
      - [4.3. dl - Description list:](#43-dl---description-list)
    - [5.Table](#5table)
    - [6.Form and Interaction](#6form-and-interaction)
    - [7.Block Elements and Inline Elements](#7block-elements-and-inline-elements)
    - [Homework: Create a Registration Form](#homework-create-a-registration-form)

## <center> HTML - Hypertext Markup Language </center>

### 1. HTML Introduction

Reference Document:
[W3School](https://w3schools.com/html),
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

Notes for writing HTML5 documents:

- Follow the relevant W3C standards
- W3C advocates the separation of content and structure
- HTML structure should have semantics
  - HTML structure is clear, readable, and maintainable, facilitating team development and maintenance
  - Accessibility-friendly
  - Search engine friendly, can determine context and weight based on tags, beneficial for SEO

> Although HTML and CSS are basic, they may also be asked about in interviews, but more JavaScript questions are common.

The three cornerstones of modern web apps — HTML, CSS, JavaScript

- HTML is used for building webpage structure
- CSS is used for styling webpages
- JavaScript is a scripting language used to make webpages interactive and dynamic

> VSCode is the most commonly used editor and can be installed with many plugins  
> But other editors can also be used

> [Common VScode plugins](https://hackr.io/blog/best-vscode-extensions)

### 2. HTML Basic Structure and Elements

#### 2.1. HTML Basic Structure:

```html
<!DOCTYPE html>
<!-- Declaration specifying that the document type is HTML5 -->
<html>
  <head>
    <title>My First Webpage</title>
    <!-- title is the text displayed on the browser tab, beneficial for SEO -->
  </head>

  <body>
    <h1>My First Webpage</h1>
    <p>Paragraph text</p>
  </body>
</html>

<!-- <head> <title> <body> tags must appear once and only once in a page -->
```

#### 2.2 Elements

In HTML, an element is defined by tag + content. For example:

```html
<tagname> Content goes here... </tagname>
```

Elements can be categorized by how they are displayed in a webpage:

- block elements
- inline elements

> The display method of elements can be modified through CSS

Tags can be categorized as:

- Paired tags: opening tag (start tag) + content + closing tag (end tag), such as: `<p>`content`</p>`
- Self-presenting tags (self-closing tags): such as: `<br>`

All HTML elements can have attributes:

- Attributes provide additional information about elements
- Attributes are always specified in the start tag
- Attributes usually come in name/value pairs, for example: name="value", but there are exceptions
- Attribute names are usually presented in lowercase
- Attribute values are usually enclosed in quotes

Example

```html
<html lang="en">
  <!-- lang attribute of html tag -->

  <p style="color:red;">This is a red paragraph.</p>
  <!-- style attribute of p and other tags -->

  <img src="img_girl.jpg" alt="Girl with a jacket" />
  <!-- src and alt attributes of img tag -->
</html>
```

Content that should generally be in the `<head>` tag:

```html
<head>
  <meta charset="UTF-8" />
  <!-- (Unicode Transformation Format - 8-bit) is a variable-length character encoding used to represent the Unicode character set. -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Setting the viewport to make your website look good on all devices: -->
  <meta name="keywords" content="test keywords" />
  <!-- Define keywords for search engines: -->
  <meta name="description" content="test keywords" />
  <!-- Define a description of your web page: -->
  <title>Document</title>
</head>
```

`<body>` tag:

- Body Layout:  
  ![HTML Layout](https://www.w3schools.com/html/img_sem_elements.gif)

- Common layout tags in Body:

```html
<header>
  - Defines a header for a document or a section
  <nav>
    - Defines a set of navigation links
    <section>
      - Defines a section in a document
      <article>
        - Defines an independent, self-contained content
        <aside>
          - Defines content aside from the content (like a sidebar)
          <footer>
            - Defines a footer for a document or a section
            <details>
              - Defines additional details that the user can open and close on
              demand
              <summary>
                - Defines a heading for the
                <details>element</details>
              </summary>
            </details>
          </footer>
        </aside>
      </article>
    </section>
  </nav>
</header>
```

Other Common Elements:

```html
<h1>...</h1>
First-level heading
<h2>...</h2>
Second-level heading
<h3>...</h3>
...
<h4>...</h4>
...
<h5>...</h5>
...
<h6>...</h6>
Sixth-level heading

<br />
Single tag, line break tag
<hr />
Single tag, horizontal line tag

<b></b> Bold <strong></strong> Bold, more semantic

<i></i> Italic <em></em> Italic, more semantic

<s></s> Delete <del></del> Delete, more semantic

<u></u> Underline <ins></ins> Underline, more semantic

<div></div>
No semantics, just a box <span></span> No semantics, just a box

<img
  src="path"
  alt="alternative text for image"
  title="mouse hover tooltip text"
  width="image width"
  height="image height, often use auto to automatically match image width"
/>
Image
<!-- It's better practice to use CSS to set the height and width of an image -->

<a href="path" target="target window position">Insert link text or image</a>
<!-- 
     - Functions of <a> tag:
        1. Page connection
        2. Anchor link, used to quickly locate to a specific position in the page, use target="#elementId" with element id
        3. Functional connections, such as email


     - alt attribute: Image description, tells what the image is for when the img can't be loaded


     - target attribute:
        _self: Opens the link in the current window (default behavior).
        _blank: Opens the link in a new window.
        _parent: Opens the link in the parent frame.
        _top: Opens the link in the entire window, ignoring all frames.


     - a tag can also be used for download
    -->
<a href="path/to/your/file.zip">Download File</a>
```

\*For more tags, see Document
[W3School](https://w3schools.com/html),
[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)

#### 2.3 Semantic tags

What are Semantic Elements?

- A semantic element clearly describes its meaning to both the browser and the developer.

Examples of non-semantic elements:

```html
<div>and <span> - Tells nothing about its content.</span></div>
```

Examples of semantic elements:

```html
<form>
  ,
  <table>
    , and
    <article>- Clearly defines its content.</article>
  </table>
</form>
```
Why is semantics important?
- Improves code readability: Using semantic tags makes the code more intuitive, helping developers and maintainers understand page structure and content more easily, thereby improving development efficiency.

- Enhances SEO optimization: Search engines analyze webpage content through crawler programs. Semantic HTML tags help search engines understand the structure and meaning of webpage content more accurately, thereby improving the webpage's ranking in search engines.

- Strengthens accessibility: Semantic tags enable screen readers and other assistive technologies to better parse webpage content, helping users with visual impairments understand and navigate webpages more easily, thereby enhancing webpage accessibility.

### 3.Comments and HTML Character Entities

#### 3.1 Comments:

```html
<!-- This is a comment -->
```

> Can be directly generated using shortcuts:
>
> - win: `ctrl + /`
> - mac: `command + /`

#### 3.2 HTML Character Entities

Reserved characters in HTML must be replaced with character entities. Here are commonly used Entities:

| HTML Entity        | Character | Description                        |
| ------------------ | --------- | ---------------------------------- |
| `<`                | `&lt;`    | less than                          |
| `>`                | `&gt;`    | greater than                       |
| `&`                | `&amp;`   | Ampersand                          |
| `"`                | `&quot;`  | Double quotation mark              |
| `'`                | `&apos;`  | Single quotation mark (apostrophe) |
| Non-breaking space | `&nbsp;`  | Non-breaking space                 |
| ©                  | `&copy;`  | Copyright symbol                   |
| ®                  | `&reg;`   | Registered trademark symbol        |
| ™                  | `&trade;` | Trademark symbol                   |
| ¢                  | `&cent;`  | Cent symbol                        |
| £                  | `&pound;` | Pound sterling symbol              |
| ¥                  | `&yen;`   | Yen symbol                         |
| €                  | `&euro;`  | Euro symbol                        |
| §                  | `&sect;`  | Section symbol                     |
| °                  | `&deg;`   | Degree symbol                      |

### 4. Lists

#### 4.1. ul - Unordered list:

Characteristics:

- No order, each `<li>` occupies a line, block element
- By default, the `<li>` tag has a solid dot in front, which can be removed using CSS
- Generally used for unordered lists such as navigation, sidebar, regular image and text combinations, etc.

Example:

```html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

#### 4.2. ol - Ordered list:

Characteristics:

- Has order, each `<li>` occupies a line, block element
- By default, the `<li>` tag has order markers in front, which can be removed using CSS
- Generally used for ordered lists

```html
<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
```

#### 4.3. dl - Description list:

Characteristics:

- No order, each `<dt>`, `<dd>` occupies a line, block element
- No markers by default

```html
<dl>
  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>
</dl>
```

### 5.Table

Basic structure:

```html
<table>
  <tr>
    <td>First row, first column</td>
    <td>First row, second column</td>
  </tr>
  <tr>
    <td>Second row, first column</td>
    <td>Second row, second column</td>
  </tr>
</table>
```

- It is recommended to use CSS to modify elements

- Tables are difficult to adjust for responsive design in web development

### 6.Form and Interaction

`form` is a block-level element, mainly used to collect and submit user information.
In actual web development, the `post` method is commonly used to submit form data.

Form attributes:

- method:
- action:

Basic form structure:

```html
<form method="post" action="result.html">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required />

  <label for="gender">Gender:</label>
  <input type="radio" id="male" name="gender" value="male" />
  <label for="male">Male</label>
  <input type="radio" id="female" name="gender" value="female" />
  <label for="female">Female</label>

  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="china" selected="selected">China</option>
    <option value="usa">USA</option>
    <option value="uk">UK</option>
  </select>

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <label for="subscribe">Subscribe to news emails:</label>
  <input type="checkbox" id="subscribe" name="subscribe" value="yes" />

  <input type="reset" id="reset" name="reset" value="Reset" />

  <button type="submit">Submit</button>
</form>
```

Common HTML Form Elements:

```html
<input>
<label>
<select>
<textarea>
<button>
<fieldset>
<legend>
<datalist>
<output>
<option>
<optgroup>
```

HTML Input Types

- type - Specifies the type of input field. Common values: "text", "password", "checkbox", "radio", "submit", "reset", "hidden", "image", and "button", etc. The default value is "text".

```html
<input type="button" />
<input type="checkbox" />
<input type="color" />
<input type="date" />
<input type="datetime-local" />
<input type="email" />
<input type="file" />
<input type="hidden" />
<input type="image" />
<input type="month" />
<input type="number" />
<input type="password" />
<input type="radio" />
<input type="range" />
<input type="reset" />
<input type="search" />
<input type="submit" />
<input type="tel" />
<input type="text" />
<input type="time" />
<input type="url" />
<input type="week" />
```

HTML Input Attributes
Common attributes in forms:

- name - Used to identify the form element's name, to associate data with field names when submitting the form.
- value - Used to set the initial value of the form element. A value must be specified when type is radio.
- size - Specifies the initial width of the form element. When type is text or password, the size of the editing element is in characters. For other types, the width is in pixels.
<!-- or the number of visible options (for dropdown boxes). -->
- maxlength - Maximum number of characters to enter when type is text or password.
- checked - Used to pre-select a checkbox or radio button when type is radio or checkbox.
- autocomplete
- disable
- readonly
- placeholder
- required

Examples:

```html
<input
  type="text"
  id="username"
  name="userName"
  value="username"
  size="30"
  maxlength="20"
  required
/>
<textarea></textarea>

Checkbox Radio button

<form action="" method="post" enctype="multipart/form-data">
  <p>
    <input type="file" name="files" />
    <input type="submit" name="upload" value="Upload" />
  </p>
</form>
```

Form submission:

- Usually done by writing a JavaScript function in the submit attribute to make an API call, thereby sending the form to the backend

### 7.Block Elements and Inline Elements

Block Elements:

- A block-level element always starts on a new line, and the browsers automatically add some space (a margin) before and after the element.
- A block-level element always takes up the full width available (stretches out to the left and right as far as it can).

```html
<address> <article> <aside> <blockquote> <canvas> <dd> <div> <dl> <dt> <fieldset> <figcaption> <figure> <footer> <form> <h1>-<h6> <header> <hr> <li> <main> <nav> <noscript> <ol> <p> <pre> <section> <table> <tfoot> <ul> <video>
```

Inline Elements:

- An inline element does not start on a new line.
- An inline element only takes up as much width as necessary.

```html
<a> <abbr> <b> <bdo> <br> <button> <cite> <code> <dfn> <em> <i> <img> <input> <kbd> <label> <map> <object> <output> <q> <samp> <script> <select> <small> <span> <strong> <sub> <sup> <textarea> <time> <tt> <var>
```

> Block Elements cannot be placed inside Inline Elements  
> Besides, there are also inline-block elements set through CSS, which will be discussed later

### Homework: Create a Registration Form
