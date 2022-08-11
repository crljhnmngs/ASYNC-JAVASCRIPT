/*
--------ASYNCHRONOUS JAVASCRIPT--------

    -Timeouts and Intervals
    -Callbacks
    -Promises
    -async await
    -event loop
*/

/*
----------- Timeouts and Intervals---------


--Timeouts--
setTimeout(function, duration, param1, param2)

function greet() {
    console.log('Hello');
}
setTimeout(greet, 1000);


function greet1(name) {
    console.log(`Hello ${name}`);
}
setTimeout(greet1, 2000, 'Carl');

function greet2(name) {
    console.log(`Hi ${name}`);
}
const timeoutid = setTimeout(greet2, 2000, 'Carl');
clearTimeout(timeoutid);

//A more practical scenario is clearing timeouts when the components is unmounting to free up the resources and also prevent code from incorrectly executing on an anmounted component.

--Intervals--

-Intervals keep running a task forever so you should clear the interval when appropriate

setInterval(fucntion, duration, param1, param2,...)

function greet() {
    console.log('Hello');f
}

setInterval(greet, 2000);


function greet() {
    console.log('Hello');
}
const clearIntervalid = setInterval(greet, 2000);
clearInterval(clearIntervalid);

//1. Timers and intervals are not part of JavaScript itself. They are implemented by the browser and setTimeout and setInterval are basically names given to that fucntionality in javascript.

//2. Duration parameter is the minimum delay. not guaranteed delay

//3. It is posible to achieve the same effect as setInterval with a recursive setTimeout

setTimeout(function run() {
    console.log('hello');
    setTimeout(run, 100);
}, 100);


setInterval(function run() {
    console.log('hello');
}, 100);

*/

/*
-------CALLBACKS---------
    in javascript functions are first class objects
        -Just like and object, a function can be passed as an argument to a function
        -A function can also be returned as values from other functions 


function greet(name) {
    console.log(`Hello ${name}`);
}
function greetCJ(greetName) {
    const name = 'CJ';
    greetName(name);
}
greetCJ(greet);

// Any function that is passed as an argument to another function is called a callback function in javascript.

// The function which accepts a function as an argument or returns a function is called a higher order function



function greet(name) {
    console.log(`Hello ${name}`);
}
function higherOrderFunction(callback) {
    const name = 'CJ';
    callback(name);
}
higherOrderFunction(greet);

//Why callbacks ?

// Synchronous callbacks
    -A callback which is executed immediately is called a synchronous callback
    
    example: 

    function greet(name) {
    console.log(`Hello ${name}`);
}
function higherOrderFunction(callback) {
    const name = 'CJ';
    callback(name);
}
higherOrderFunction(greet);


let numbers = [1, 2, 4, 7, 3, 5, 6];
numbers.sort((a, b) => a - b);
numbers.map((n) => n * 2);
numbers.filter((n) => n % 2 === 0);
console.log(numbers);



// Asynchronous callback

    -An asynchronous callback is a callback that is often used to continue or resume code execution after an aysnchronous operation has completed.
    -Callbacks are use to delay the execution of a function until a particular time or event has occured.
    -Data fetching takes time and we can only run the function we want to after the data has been fetched and not immediately

    Examples:
    

function greet(name) {
    console.log(`Hello ${name}`);
}
setTimeout(greet, 2000, 'Carl');


function callback() {
    document.getElementById('Demo').innerHTML = 'Hello World';
}
document.getElementById('btn').addEventListener('click', callback);


//Callback function allows you to delay the execution of a function
*/
/*
------------PROMISE-------------

    -Promise in layman terms - Dinner Scenario

    Dinner Scenario
    1. Your friend ---- Promise
    2. While your friend is on his way to the food truck, you know that in could take a while and you dont want to sit idle. So you start preparing soup in the meantime. ---- Asynchronous operation in javascript(fetchTacos)
    3. When your friend text's you with "Can get tacos/Can't get tacos", it answer your question on whether he is getting the taco or not ---- Promise retun value
    4.Can get tacos ---- Promise is said to be fullfilled 
    5. Cannot get tacos ---- Promise is said to be rejected
    6.Set up the table ---- Success callback
    7. Cook pasta instead ---- Failure callback

    Promise - MDN definition

    A promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

    What ? 
    A promise is simply an object in javascript

    A promise is always in one of the three states

        -Pending: Which is initial state, neiter fullfilled nor rejected.
        -Fullfilled: meaning that the operation completed successfully
        -Rejected: meaning that the operation failed.

        

//Revolve
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //food trucj found.
        //Change status from 'pending' to fullfilled.
        resolve('Bringing tacos');
    }, 5000);
});

//Reject
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        //Food truck not found
        //Chnage status from pending to
        reject('Not bringing tacos');
    }, 5000);
});

//Callback functions
const onFulfillment = (result) => {
    console.log(result);
    console.log('Set up the table to eat tacos');
};
const onRejection = (error) => {
    console.log(error);
    console.log('Start cooking pasta');
};

promise.then(onFulfillment);
promise.catch(onRejection);

//1. Then function

const promise = new Promise((resolve, reject) => {
    resolve(), reject();
});
//Encouraged approach
// Even if your onFulfillement callback throws an excention, it is caught and the you can handle that exception gracefully

const promise1 = new Promise((resolve, reject) => {
    resolve(), reject();
});
//onRejection callback handles error from only the promise.
//If yout callback function itself throws an error or exception, there is no code to handle that.


//2. Chaining Promises
//Both then and catch method return promises
//Then() and catch() methods can be chained nin javascript

const promise = new Promise((resolve, reject) => {
    resolve(), reject();
});
promise.then(onFulfillment).catch(onRejection);

//3. Promise - static methods
    3.1 Promise.all()
    Query multiple APIs and perform some action but only after all the APIs have finished loading

    -The Promise.all() method takes and iterable of promise as an input and returns a single Promise that resolves to an array of the results of the input promises.
    -Returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises.
    -It rejects immediately if any of the input promises rejected or the non-promises throw an error, and will reject with this first rejection message / error

    3.2 Promise.allSettled()
    
        -Promise.allSettled() waits for all input promises to complete regardless of whether or not one of them is rejected

    3.3 Promise.race()

        -The Promise.race() method returns a promise that fullfills or reject as soon as one of the input promises fulfills or reject, with the value or reason for that promise
 */

/*
-----------ASYNC AWAIT---------

    async
        -The async keyword is used to declare async functions
        -Async functions are fucntions that are instances of the AsyncFunction constructor
        - Unlike normal functions, async functios always return a promise.



//Normal Function

function greet() {
    return 'hello';
}
greet();


//async function
async function greet() {
    return 'Hi';
}
greet();

async function greet() {
    return Promise.resolve('Hello');
}
greet().then((value) => console.log(value));


    await
        -await keyword can be put infront of any async promise based function to pause your code until that promise settles and returns its result
        -await only workds inside async function. connot use await in normal functions.

async function greet() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Hello'), 3000);
    });
    let result = await promise; // Wait until the promise resolves
    console.log(result);
}

greet();

//CHAINING PROMISES VS ASYNC-AWAIT

const promise = fetchCurrentUser(`api/user`);
promise
    .then((result) => fetchFollowersByUserId(`api/followers/${result.userID}`))
    .then((result) =>
        fetchFollowerInterests(`api/interests/${result.followerId}`)
    )
    .then((result) => fetchInterestTags(`api/tags/${result.InterestId}`))
    .then((result) => fetchTagDescription(`api/description/${result.tagId}`))
    .then((result) => console.log('Display the data', result));


async function fetchData()
{
const user = await fetchCurrentUser(`api/user`)
const follower = await fetchFollowersByUserId(`api/followers/${result.userID}`)
const interest = await fetchFollowerInterests(`api/interests/${result.followerId}`)
const tag = await fetchInterestTags(`api/tags/${result.InterestId}`)
const description = await = fetchTagDescription(`api/description/${result.tagId}`)
console.log('Display the data', result)
}



//Sequential Execution

function resolveHello() {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve('Hello');
        }, 2000);
    });
}
function resolveWorld() {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve('World');
        }, 1000);
    });
}
/*
async function sequentialStart() {
    const hello = await resolveHello();
    console.log(hello); //Logs after 2 seconds

    const world = await resolveWorld();
    console.log(world); //Logs after 2 + 1 = 3 seconds
}
sequentialStart();
*/
/*
//Concurrent Execution
async function concurrentStart() {
    const hello = resolveHello();
    const world = resolveWorld();

    console.log(await hello); //Logs after 2 seconds
    console.log(await world); //Logs after 2 seconds
}
concurrentStart();

//Parallel Execution

function parallel() {
    Promise.all([
        (async () => console.log(await resolveHello()))(),
        (async () => console.log(await resolveWorld()))(),
    ]);
}
parallel();

async function parallel() {
    await Promise.all([
        (async () => console.log(await resolveHello()))(),
        (async () => console.log(await resolveWorld()))(),
    ]);
    console.log('Finally')
}
parallel();

*/
/*
---------EVENT LOOP-----------

    
*/
