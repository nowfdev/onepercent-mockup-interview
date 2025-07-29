// ✅ 1. Reverse a String
// Write a function that takes a string and returns it reversed.
reverseString("hello"); // "olleh"
const reverseString = (string) => {
  return string.split("").reverse().join("");
};

// ✅ 2. FizzBuzz
// Print numbers from 1 to 100. For multiples of 3, print "Fizz", for multiples of 5 print "Buzz", and for both print "FizzBuzz".
for (let i = 0; i <= 100; i++) {
  if (i % 3 == 0 && i % 5 == 0) {
    console.log(`${i}: FizzBuzz`);
  } else if (i % 3 == 0) {
    console.log(`${i}: Fizz`);
  } else if (i % 5 == 0) {
    console.log(`${i}: Buzz`);
  }
}

// ✅ 3. Palindrome Checker
// Check if a given string is a palindrome (same forwards and backwards).

const isPalindrome = (string) => {
 let reverse = string.split("").reverse().join("");
 if(reverse == string) return true
 return false
}

isPalindrome("lol"); // true

// ✅ 4. Find the Largest Number in an Array
// Write a function that returns the largest number.
const maxNumber = (arr) => {
    return arr.reduce((acc, value) => {
     if(value > acc){
        acc = value
     };
     return acc
    },-Infinity)
}

maxNumber([1, 99, 100, 34, 65]); 

// ✅ 5. Count the Vowels in a String
const countVowels = (string) => {
    let total = 0;
    let split = string.split(''); 
    for(let i = 0; i < split.length; i++){
        if(split[i] == 'a' || split[i] == 'e' || split[i] == 'i' || split[i] == 'o' || split[i] == 'u' || split[i] == 'y') total += 1
    }
    return total;
    
}
countVowels("nguyen hao"); // 3

// ✅ 6. Remove Duplicates from an Array

removeDuplicates([1, 2, 2, 3, 4, 4]); // [1, 2, 3, 4]

✅ 7. Flatten a Nested Array

Convert [[1, 2], [3, [4, 5]]] into [1, 2, 3, 4, 5].
✅ 8. Debounce Function (Conceptual + Code)

Implement a debounce(fn, delay) utility that delays function execution.

✅ 9. Anagram Checker

Check if two strings are anagrams of each other (same letters, different order).

areAnagrams("listen", "silent"); // true

