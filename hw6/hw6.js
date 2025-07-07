// Task 1

const translations = {
	en: {
	greet: "Hello",
	intro: "Welcome to our website"
},
	fr: {
		greet: "Bonjour",
		intro: "Bienvenue sur notre site web"
	}
}

const language = "fr" // Change to "en" for English
const greeting = "greet"
const introduction = "intro"

const localizedGreeting = localize`${greeting}`
const localizedIntroduction = localize`${introduction}`

console.log(localizedGreeting) // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction) // Expected: "Bienvenue sur notre site web" (for language "fr")

function localize(_strings, tag) {
  return translations[language][tag]
}

// Task 2

const keywords = ["JavaScript", "template", "tagged"]
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation."

const highlighted = highlightKeywords(template, keywords)

console.log(highlighted)
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged
// templates to create custom <span class='highlight'>template</span> literals for
// <span class='highlight'>tagged</span> manipulation."

function highlightKeywords(template, keywords) {
  return template.replace(/\$\{(\d+)\}/g, (_match, index) => {
    const word = keywords[parseInt(index)]
    return `<span class='highlight'>${word}</span>`
  })
}

// Task 3

const code = multiline`
function add(a, b) {
return a + b
}`
console.log(code)
// Expected:
// "1 function add(a, b) {
//  2 return a + b
//  3 }"

function multiline(strings) {
  const code = strings[0]
  const lines = code.trim().split('\n')
  
  // Align the indentation of the numbers
  const maxDigits = String(lines.length).length

  for (let i = 0; i < lines.length; i++) {
    lines[i] = `${String(i + 1).padStart(maxDigits)} ${lines[i]}`
  }
  return lines.join('\n')
}

// Task 4

function debouncedSearch(query) {
	// Perform search operation with the query
	console.log("Searching for:", query)
}

function debounce(func, delay) {
  let timeoutId = 0

  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

const debouncedSearchHandler = debounce(debouncedSearch, 300)
debouncedSearchHandler('query')

// Task 5

function onScroll(event) {
	// Handle scroll event
	console.log("Scroll event:", event)
}

const throttledScrollHandler = throttle(onScroll, 1000)

function throttle(func, interval) {
  let lastExecution = 0
  
  return function(...args) {
    const currentExecution = Date.now()

    if (currentExecution - lastExecution > interval) {
      lastExecution = currentExecution
      func.apply(this, args)
    }
  }
}

throttledScrollHandler('scroll')

// Task 6

function multiply(a, b, c) {
	return a * b * c
}

const curriedMultiply = curry(multiply, 3)

const step1 = curriedMultiply(2)
const step2 = step1(3)
const result = step2(4)

console.log("Result:", result)

function curry(func, arity) {
  return function curried(...args) {
    if (args.length === arity) {
      return func(...args)
    } else {
      return function(...nextArgs) {
        return curried(...args, ...nextArgs)
      }
    }
  }
}
