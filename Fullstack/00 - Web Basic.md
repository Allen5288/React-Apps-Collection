
# 1. Render Related:

## 1.1 critical rendering path (CRP)

There are 6 stages to the CRP
- Constructing the DOM Tree
- Constructing the CSSOM Tree
- Running JavaScript
- Creating the Render Tree
- Generating the Layout
- Painting

## 1.2 Script Loading
- `<script>` - HTML parsing is blocked, the script is fetched and executed immediately, HTML parsing resumes after the script is executed.
- `<script async>` - The script will be fetched in parallel to HTML parsing and executed as soon as it is available (potentially before HTML parsing completes). 
- `<script defer>` - The script will be fetched in parallel to HTML parsing and executed when the page has finished parsing. 


# 2. Package related

## 2.1 Ways to decrease page load 

- Use minifier and gzip to decrease the page size - actual
- Show spinner or progress bar - perceived
- Preload the page before actually loading it using libraries like InstantClick - both actual and perceived
- Minimize HTTP requests
    - Combine CSS, JS scripts and HTML files together.
    - Use CSS instead of images whenever possible.
    - Reduce the number of elements on every web page.
    - Install a caching plugin.
    - Reduce redirects, which create additional HTTP requests to your server and increase your page load time.
- Use a CDN
- Enable Browser Caching
- Optimize Your Images
- Disable Hotlinking
- Optimize Your Database


# 3. DOM

Some point:
- pseudo-elements cannot be targetted by Javascript, because they are not part of the DOM.
- DOM is built from the source HTML document alone, not including the styles applied to the element.