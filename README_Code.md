# 1. Array / String

## 1.1 Array Creation
1. Create array with default value
```javascript
let prefixXOR = new Array(arr.length + 1).fill(0);
```

## 1.2 Array Operation
1. Cut arr
Get previous index arr to a new
```javascript
return arr.slice(0, index);
return arr.splice(0, index);

s.substring(0, prefLen); //  extract parts of a string and return the extracted part in a new string. In length prefLen; from index 0;

events.push([times[i][0], i, true]); // arrival event

```
2. Split

The trim() function in JavaScript is used to remove leading and trailing whitespace from a string. It does not affect spaces between words.

split is used to seperate string by content input in the ();
```js
let words = s.trim().split(' ');
```

2. Insert Value to index of array
```javascript
arr.splice(index, 0, num);
```

## 1.3 Sort
```js
events.sort((a, b) => a[0] - b[0] || a[2] - b[2]); // sort by arrival time, then by leaving event
```

# 2. Two Pointers



# 3. Sliding Window



# 4. Matrix



# 5. Hashmap

## 5.1 Using set
```javascript
const allowedSet = new Set(allowed);

if (!allowedSet.has(char))
```

## 5.2 using Map 
```js
let occupiedChairs = new Map();
if (occupiedChairs.has(person)) {
    occupiedChairs.delete(person);
}
let chair = (occupiedChairs.get(person) || nextChair++);
occupiedChairs.set(person, chair);
```

# 6. Intervals



# 7. Stack

```js
let top = stack.pop();  // Pop the top of the stack
stack.push(current);  // Push the current index to the stack
```

# 8. Linked List



# 9. Binary Tree



## 9.1 Binary Tree General



## 9.2 Binary Tree BFS



## 9.3 Binary Search Tree



# 10. Graph 



# 10.1 General



# 10.2 Graph BFS



# 11. Trie

## 11.1 Trie Prefix Tree
```js
/**
 * @param {string[]} words
 * @return {number[]}
 */
class TrieNode {
    constructor() {
        this.children = {};  // Child nodes for each character
        this.count = 0;      // Count of words that pass through this node
    }
}

var sumPrefixScores = function(words) {
    const root = new TrieNode();  // Root of the Trie
    
    // Helper function to insert a word into the Trie and update prefix counts
    const insert = (word) => {
        let node = root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();  // Create new node if it doesn't exist
            }
            node = node.children[char];
            node.count++;  // Increment the count for this prefix
        }
    };

    // Insert all words into the Trie
    for (let word of words) {
        insert(word);
    }

    // Helper function to compute the sum of prefix scores for a given word
    const computeScore = (word) => {
        let node = root;
        let score = 0;
        for (let char of word) {
            node = node.children[char];
            score += node.count;  // Add the count for this prefix
        }
        return score;
    };

    // Compute the prefix scores for each word
    const result = [];
    for (let word of words) {
        result.push(computeScore(word));
    }

    return result;
};
```


# 12. Backtracking



# 13. Divide & Conquer



# 14. Kadane's Algorithm



# 15. Binary Search



# 16. Heap



# 17. Bit Manipulation
1. Prefix Usage
```javascript
for (let i = 0; i < arr.length; i++) {
    prefixXOR[i + 1] = prefixXOR[i] ^ arr[i];
}


# 18. Math

```


# 19. DP



## 19.1 1D DP


## 19.2 Multidimensional DP

