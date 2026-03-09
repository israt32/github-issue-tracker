1. What is the difference between var, let, and const?
Ans: Var, let, and const are ways to declare variables in JavaScript with different behaviors. Var has function scope, can be redeclared, and is hoisted, which can lead to unexpected results. Let has block scope, cannot be redeclared in the same block, and is also hoisted but not initialized, making it safer than var. Const also has block scope and cannot be redeclared or reassigned, which is useful for values that should not change, though objects and arrays declared with const can still be modified.

2. What is the spread operator (...)?
Ans: The spread operator (...) in JavaScript is used to expand elements of an array, object, or iterable into individual elements. It allows you to copy arrays or objects, merge them, or pass multiple values as separate arguments to functions, making code shorter and more flexible.

3. What is the difference between map(), filter(), and forEach()?
Ans: Map(), filter(), and forEach() are array methods in JavaScript that handle elements differently. Map() creates a new array by applying a function to each element. Filter() creates a new array containing only the elements that meet a condition. ForEach() simply executes a function on each element but does not return a new array.

4. What is an arrow function?
Ans: An arrow function is a shorter way to write a function in JavaScript using the => syntax. It has a concise syntax, does not have its own this, arguments, or super, and is often used for simple functions or callbacks.

5.  What are template literals?
Ans: Template literals are a way to create strings in JavaScript using backticks () instead of quotes. They allow embedding variables or expressions directly inside the string using ${}` and also support multi-line strings without needing special characters.