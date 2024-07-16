const questions = [
    {
        id: 1,
        question: "JavaScript is an _______ language",
        options: [
            'Object-Oriented',
            'Object-Based',
            'Procedural',
        ],
        answer: 1 // Object-Based
    },
    {
        id: 2,
        question: "Following methods can be used to display data in some form using Javascript",
        options: [
            'document.write()',
            'console.log()',
            'window.alert()',
        ],
        answer: 0 // document.write()
    },
    {
        id: 3,
        question: "When an operator value is NULL, the typeof returned by the unary operator is:",
        options: [
            'Boolean',
            'Undefined',
            'Object',
        ],
        answer: 1 // Undefined
    },
    {
        id: 4,
        question: "What does the toString() method return?",
        options: [
            'Return Object',
            'Return String',
            'Return Integer'
        ],
        answer: 1 // Return String
    },
    {
        id: 5,
        question: "Which function is used to serialize an object into a JSON string?",
        options: [
            'stringify()',
            'parse()',
            'convert()',
        ],
        answer: 0 // stringify()
    },
    {
        id: 6,
        question: "Which HTML attribute is used to define inline styles?",
        options: [
            'class',
            'style',
            'font',
        ],
        answer: 1 // style
    },
    {
        id: 7,
        question: "Which built-in method calls a function for each element in the array?",
        options: [
            'while()',
            'loop()',
            'forEach()',
        ],
        answer: 2 // forEach()
    },
    {
        id: 8,
        question: "Which built-in method sorts the elements of an array?",
        options: [
            'changeOrder(order)',
            'order()',
            'sort()',
        ],
        answer: 2 // sort()
    },
    {
        id: 9,
        question: "Which of the following is not a reserved word in JavaScript?",
        options: [
            'interface',
            'throws',
            'program',
        ],
        answer: 2 // program
    },
    {
        id: 10,
        question: "Which of the following is correct about JavaScript?",
        options: [
            'JavaScript is a lightweight, interpreted programming language.',
            'JavaScript is designed for creating network-centric applications.',
            'Both of the above.',
        ],
        answer: 2 // Both of the above.
    },
    {
        id: 11,
        question: "Which of the following function of String object returns the calling string value converted to lower case?",
        options: [
            'toLocaleLowerCase()',
            'toLowerCase()',
            'toString()',
        ],
        answer: 1 // toLowerCase()
    },
    {
        id: 12,
        question: "Which of the following function of Array object adds and/or removes elements from an array?",
        options: [
            'reverse()',
            'shift()',
            'splice()',
        ],
        answer: 2 // splice()
    },
    {
        id: 13,
        question: "Which of the following is the correct syntax to redirect a url using JavaScript?",
        options: [
            'document.location="http://www.newlocation.com";',
            'browser.location="http://www.newlocation.com";',
            'navigator.location="http://www.newlocation.com";',
        ],
        answer: 0 // document.location="http://www.newlocation.com";
    },
    {
        id: 14,
        question: "Which of the following is true about cookie handling in JavaScript?",
        options: [
            'JavaScript can manipulate cookies using the cookie property of the Document object.',
            'JavaScript can read, create, modify, and delete the cookie or cookies that apply to the current web page.',
            'Both of the above.',
        ],
        answer: 2 // Both of the above.
    },
    {
        id: 15,
        question: "Which of the following is not a JavaScript framework?",
        options: [
            'Python Script',
            'JQuery',
            'Django',
        ],
        answer: 0 // Python Script
    },
    {
        id: 16,
        question: "Which of the following is used to parse a string to an integer?",
        options: [
            'Integer.parse',
            'Int.parse',
            'parseInt',
        ],
        answer: 2 // parseInt
    },
    {
        id: 17,
        question: "JavaScript is a ________ Side Scripting Language.",
        options: [
            'Server',
            'Browser',
            'Client',
        ],
        answer: 1 // Browser
    },
    {
        id: 18,
        question: "The function and var are known as:",
        options: [
            'Keywords',
            'Data types',
            'Declaration statements',
        ],
        answer: 0 // Keywords
    },
    {
        id: 19,
        question: "Which of the following is a disadvantage of using JavaScript?",
        options: [
            'Client-side JavaScript does not allow the reading or writing of files.',
            'JavaScript can not be used for Networking applications because there is no such support available.',
            'All of the above.',
        ],
        answer: 2 // All of the above.
    },
    {
        id: 20,
        question: "Which of the following is correct about features of JavaScript?",
        options: [
            'JavaScript is a lightweight, interpreted programming language.',
            'JavaScript is designed for creating network-centric applications.',
            'All of the above.',
        ],
        answer: 2 // All of the above.
    },
    {
        id: 21,
        question: "JavaScript code can be called by using",
        options: [
            'RMI',
            'Triggering Event',
            'Preprocessor',
        ],
        answer: 1 // Triggering Event
    },
    {
        id: 22,
        question: "Which of the following is the correct syntax to print a page using JavaScript?",
        options: [
            'window.print();',
            'browser.print();',
            'navigator.print();',
        ],
        answer: 0 // window.print();
    },
    {
        id: 23,
        question: "Which of the following function of Array object returns a string representing the array and its elements?",
        options: [
            'toSource()',
            'splice()',
            'toString()',
        ],
        answer: 2 // toString()
    },
    {
        id: 24,
        question: "Which of the following function of Array object removes the first element from an array and returns that element?",
        options: [
            'deleteFirst()',
            'delete()',
            'shift()',
        ],
        answer: 2 // shift()
    },
    {
        id: 25,
        question: "Which of the following function of String object returns the primitive value of the specified object?",
        options: [
            'toPrimitive()',
            'valueOf()',
            'toValue()',
        ],
        answer: 1 // valueOf()
    },
    {
        id: 26,
        question: "The JavaScript date is measured in:",
        options: [
            'Seconds',
            'Milliseconds',
            'Minutes',
        ],
        answer: 1 // Milliseconds
    },
    {
        id: 27,
        question: "JavaScript can be written:",
        options: [
            'Only client-side',
            'Only server-side',
            'Directly into HTML pages',
        ],
        answer: 2 // Directly into HTML pages
    },
    {
        id: 28,
        question: "The external JavaScript file must contain the <script> tag. True or False?",
        options: [
            'True',
            'False',
            'Not always required',
        ],
        answer: 0 // True
    },
    {
        id: 29,
        question: "JavaScript is interpreted by:",
        options: [
            'Server',
            'Client',
            'Both',
        ],
        answer: 1 // Client
    },
    {
        id: 30,
        question: "Which of the following is a JavaScript framework?",
        options: [
            'Angular',
            'React',
            'Vue',
        ],
        answer: 0 // Angular
    },
    {
        id: 31,
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            '//',
            '/* */',
            '#',
        ],
        answer: 1 // /* */
    },
    {
        id: 32,
        question: "What is the correct JavaScript syntax to write 'Hello World'?",
        options: [
            'echo("Hello World");',
            'console.log("Hello World");',
            'document.write("Hello World");',
        ],
        answer: 2 // document.write("Hello World");
    },
    {
        id: 33,
        question: "What is the JavaScript syntax for printing values in Console?",
        options: [
            'print(5);',
            'console.log(5);',
            'printf(5);',
        ],
        answer: 1 // console.log(5);
    },
    {
        id: 34,
        question: "Which built-in method returns the calling string value converted to upper case?",
        options: [
            'toUpperCase()',
            'toUpper()',
            'upperCase()',
        ],
        answer: 0 // toUpperCase()
    },
]

export default questions;
