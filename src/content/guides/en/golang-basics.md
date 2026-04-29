---
title: "Golang - Basic Guide"
pubDate: "2024-12-12T00:00:00Z"
hero: "/images/golang.webp"
tags: ["golang", "programming languages"]
---

## What we will cover here

- [What we will cover here](#what-we-will-cover-here)
- [Basic characteristics](#basic-characteristics)
  - [Usage patterns](#usage-patterns)
- [Modules \& Packages](#modules--packages)
  - [Entrypoint](#entrypoint)
- [Data types](#data-types)
  - [Declaring Values](#declaring-values)
  - [Basic types](#basic-types)
  - [STRINGS, RUNES \& BYTES](#strings-runes--bytes)
  - [Basic mathematical operations](#basic-mathematical-operations)
- [Control structures](#control-structures)
  - [IF](#if)
  - [Switch-case](#switch-case)
  - [For](#for)
- [Functions](#functions)
  - [Methods](#methods)
- [Data structures](#data-structures)
  - [ARRAYS](#arrays)
  - [SLICES](#slices)
  - [MAPS](#maps)
- [Structs \& Interfaces](#structs--interfaces)
- [Pointers](#pointers)
- [Goroutines](#goroutines)
- [Channels](#channels)
- [Generics](#generics)

---

## Basic characteristics

- Compiled language straight to binary
- Fast compilation (however, large binary)
- Language designed to be simple in its structure
- Designed for concurrency
- It is possible to install on any platform

### Usage patterns

- Capital initial letter in a function determines whether it will be public or not
- There are no getters or setters, but if necessary:
  - Declare the field with a lowercase letter
  - Create a method with the same name as the field but with an uppercase letter
  - This way the function will be exported and whoever uses it will see no difference
  - For the setter, use the SetField pattern to alter the field's value if necessary
- When naming interfaces, use verbs, Reader, Writer..., so the method will be the noun of that verb (Read, Write)
- If you implement a conversion to a known type, use the type name directly for example: String() and not ToString()
- Package names should be small
- Use MixedCaps as standard, starting with an uppercase or not depending on the method or variable visibility
- project structure

---

## Modules & Packages

In Go each folder is a package and a set of packages is a module, in addition a module must contain 2 more files, *go.mod* and *go.sum*

``` yaml
Module: Collection of packages
  - Package:
    - file.go
  - Package:
    - file.go
    - file.go
```

To create a module we use the *go mod init* command

```sh
go mod init myModule # or github.com/<user>/<module_repo>
```

And to add dependencies to our project, we use *go get*

``` sh
go get -u github.com/go-chi/chi/v5
```

As a result we will have the *go.mod* file with the dependency declarations

``` sh
module myModule

go 1.23.1 # active version

require github.com/go-chi/chi/v5 v5.1.0 # indirect
```

And also a *go.sum* file with dependency checksums for version validation.

### Entrypoint

A go application can have more than one entrypoint identified by the *main.go* file, this file must contain a *main()* function, otherwise we will have a compilation error.

A common structure used in Go projects is to have a folder called *cmd* and inside it distinct subfolders for each different entrypoint of the application, because when the package is invoked later it will have the name of the folder and not the file in the case of *main.go*

``` yaml
moduleFolder:
  cmd:
    - api:
      - main.go       
    - cli:
      - main.go       
    - client:
      - main.go
    - scripts:
      - main.go
  otherPackages:
    - something.go
```

main.go

``` go
package main

import "fmt"

func main(){
  fmt.Println("Hello World!")
}
```

Running a Go program

``` sh
# compilation only (will generate the binary)
go build cmd/main.go
# executing the binary
./main
# or compiling and executing consecutively with the run command
go run cmd/main.go
```

<br>

---

## Data types

Go supports data types common across various languages, but for someone looking for the first time it might seem strange that there are specific types for certain bit quantities like: 8, 16, 32, 64. But in cases like *int* or *uint*, the size depends on the system architecture, 32 or 64 bits.

Another point that might be new for some is having *unsigned* types, which are values without sign assignment, therefore they will be types with always positive numbers.

### Declaring Values

Important points: Go is a strongly typed language that supports inference. Therefore, we don't explicitly need to define the data type of a variable, and neither can we change it.

``` go
const myConst // immutable or constant
var myVar  // mutable but strongly and statically typed

myVar = "some value" // inferred type (string)
myVar = 10 // error, we cannot overwrite the type

var intNum int
anotherInt := 0 // type inference by the operator ":="

var some, other = 1, 2
look, again := 3, 4 // look = 3, again = 4
```

### Basic types

``` yaml
Boolean: 
  Default: false
  - bool: true or false
Floating Point:
  Default: 0.0
  - float32: 32 bits = -3.4e+38 to 3.4e+38
  - float64: 64 bits = -1.7e+308 to +1.7e+308
Character:
  Default: 0
  - byte: alias for uint8
  - rune: alias for int32
Text:
  Default: ''
  - string: collection of UTF-8 bytes
Integer:
  Default: 0
  - int: size depends on the system architecture 32 or 64 bits
  - int8: min -128 | max = -127
  - int16: min = -32768 | max = -32767
  - int32: min = -2147483648 | max = -2147483647
  - int64: min = -9223372036854775808 | max = -9223372036854775807
  - uint: 'u' comes from unsigned (no sign assignment) 
  - uint8: min = 0 | max = -255
  - uint16: min = 0 | max = -65535
  - uint32: min = 0 | max = -4294967295
  - uint64: min = 0 | max = -18446744073709551615
```

### STRINGS, RUNES & BYTES

Strings in Go are immutable and natively UTF-8, taking up 7 bits + 1 sign bit. However, UTF-8 has dynamic encoding that can extend up to 32 bits, covering UTF-32, thus being able to store Chinese characters, emojis, and other symbols.

``` go
// Breaking lines with \n
var simpleString string = "Hello \nworld!"
// Or with string templates
var stringBlock string = `Hello
world!`

// Both yield the same result
fmt.Println(simpleString)
fmt.Println(stringBlock)

// Here things start getting weird
fmt.Println(len("atenção")) // 9 | number of bytes in ASCII 256
fmt.Println(len("atencao")) // 7 | seems right, but doesn't always work

// The most assertive way is using the "unicode/utf8" package
fmt.Println(utf8.RuneCountInString("atenção")) // correct result always

// Another example
var myString = "atenção"

// Searching for 'a' gives us its correct ascii table value
var stringIndex uint8 = myString[0]
fmt.Println(stringIndex) // 97

// Searching for 'ç' gives us the value of the first byte
// but since 'ç' needs more than one byte, the correct value would be 231
var stringIndex4 uint8 = myString[4]
fmt.Println(stringIndex4) // 167
for i, v := range myString {
  fmt.Println(i, v)
}
/*
  0 97 
  1 116
  2 101
  3 110 
  4 231 <- 'ç' | occupies space 4 and 5
  6 227 <- 'ã' | occupies 6 and 7
  8 111 <- 'o' | takes only one space
*/
```

Strings in Go are a collection of Runes due to encoding, or a collection of uint8 if we don't preserve the encoding (characters like: ã end up broken if we analyze them this way).

``` go
var myRune rune = 'a'
fmt.Println(myRune) // 97 | int32 it prints the numerical value

// Manipulating Strings
var strSlice = []string{"H", "e", "l", "l", "o"}
var concatStr = ""
for i := range strSlice {
  // we can do basic concatenation
  // at each iteration a new string will be generated
  concatStr += strSlice[i]
}

var strBuilder strings.Builder
for i := range strSlice {
  // or using a string builder, better alternative
  strBuilder.WriteString(strSlice[i])
}
fmt.Println(strBuilder.String())
```

### Basic mathematical operations

For basic calculations, our main problem will be variable overflow. We should choose data types keeping the result size in mind to avoid unexpected surprises.

``` go
// cast is necessary to do the calculations
var numFloat32 float32 = 10.1
var numInt32 int32 = 2
var result float32 = numFloat32 + float32(numInt32)
fmt.Println(result)

var numInt1 int = 3
var numInt2 int = 2
fmt.Println(numInt1 / numInt2) // 1 | rounding to int
fmt.Println(numInt1 % numInt2) // 1 | operation with division remainder

var myBoolean bool = false // like any language, simple
```

<br>

---

## Control structures

In Go we have structures like 'if', 'switch-case', 'for', (no 'while'), and select (which we will see in [channels](#channels))

### IF

``` go
// if, switch, for, no parenthesis
value := "something"

if value == "Hi" {
  fmt.Println("It's hi")

  // else if and else, must be on the same line as the braces
} else if value != "something" {
  fmt.Println("it's not something")

} else {
  fmt.Println("it's " + value)
}
```

### Switch-case

``` go
// in switch, break is implicit for each condition
switch {
case value == "Hi":
  fmt.Println("It's hi")

case value != "something":
  fmt.Println("it's not something")

default:
  fmt.Println("it's " + value)
}

// it can also be conditional, assigning a variable directly
switch value {
case "Hi":
  fmt.Println("It's hi")

// we can validate more than one value per scenario
case "another thing", "anything":
  fmt.Println("it's not something")

default:
  fmt.Println("it's " + value)
}
```

### For

``` go
// Basic 'while' loop
var i int = 0
for i<10 {
  fmt.Println(i)
  i += 1
}

// Loop without condition 
i=0 // reset
for {
  // removing this internal if causes an infinite loop
  if i>=10{
    break
  }
  fmt.Println(i)
  i += 1
}

// classic for
for i=0; i<10; i++ {
  fmt.Println(i)
  i += 1
}

// for range (or foreach in range)
intSlice := []int32{1, 2, 3}
for index, value := range intSlice {
  fmt.Println("Index: " + index + " Value: " + value)
}

// we can also ignore the index
for _, value := range intSlice {
  fmt.Println("Index: " + index + " Value: " + value)
}
```

<br>

---

## Functions

``` go
// Common form seen in other languages
func functionName(param1 string, param2 int) string {
  return "result"
}

// returning more than one result
func multipleReturns(param1 string, param2 int) (string, int) {
  return "result", 10
}

// when calling the function we must receive both data
var first, second = multipleReturns("something", 1)

func namedReturn(param1 int, param2 int) (sum int) { 
  // sum was declared in the method signature
  sum = param1 + param2
  return // the return will always be sum 
}

import "errors" // error package from the standard library
// golang doesn't have try-catch 
// so all errors are handled in the function's return
func withError(wrong bool) bool, error {
  var err error // default: nil
  if wrong {
    err = errors.New("Something went wrong")
  }
  return err, wrong
}
// we must receive this error and check if it has anything
err, response := withError(true)
// standard way to handle errors
if err!=nil {
  fmt.Printf(err.Error())
}

// or we can ignore this error explicitly using '_' 
// by default we must return the error first 
// so it doesn't get ignored accidentally
_, response2 := withError(false)
```

### Methods

Methods are functions assigned to a specific data type (or object).
See also: [Function or Method?](/shards/function-or-method)

``` go
// functions can also be assigned to objects
func (b ball) roll() {
  b.position++
}
// this way when we declare a new ball
newBall := ball.New()
// we have the new method accessible to it
// this design allows extending external library structures
// or even the standard library
// we can assign new methods to the string type for example
newBall.roll()
```

<br>

---

## Data structures

Just like other languages, we have some pre-existing structures in the language like 'Arrays' and 'Maps', but in Go we also have 'slices', which we will see here.

### ARRAYS

- characteristics:
  - Fixed size
  - Same data type
  - Indexable
  - Contiguous in memory

``` go
var intArr[3]int32
intArr[1] = 123 // assigning to the index
fmt.Println(intArr[0]) // printing position 0
fmt.Println(intArr[1:3]) // printing from 1 to 2 (open interval at 3)

fmt.Println(&intArr[0]) // printing the memory address
fmt.Println(&intArr[1]) // this way we can see they are placed
fmt.Println(&intArr[2]) // right next to each other

// we could have initialized the array like this as well
anotherIntArr := [3]int32{3, 2, 1}
fmt.Println(anotherIntArr[0:3])
```

### SLICES

- characteristics:
  - Wrapper for an array
  - Generation can be dynamic

``` go
// if you omit the size, we get a slice of dynamic size
intSlice := []int32{1, 2, 3}

// slice length is the item count, capacity is the allocated memory
fmt.Printf("The internal array size is %v but the capacity is %v = ", len(intSlice), cap(intSlice)) // 3 & 3
fmt.Println(intSlice)

// we can append extra values
intSlice = append(intSlice, 7)
// upon exceeding the original array's capacity, the capacity is DOUBLED
// however we cannot access values that are outside the array
fmt.Printf("The array size is %v but the capacity is %v = ", len(intSlice), cap(intSlice)) // 4 & 6
fmt.Println(intSlice)

// we could create a new array specifying size and capacity
// make is a 'factory' function for basic types
// int[] is the type, 3 the size, 8 the capacity
var intSlice2 []int32 = make([]int32, 3, 8)

// we can insert data at the END of another array via the append function with the spread operator (...)
intSlice2[0] = 10
intSlice2 = append(intSlice, intSlice2...) // [10, 0, 0, 1, 2, 3, 7]
fmt.Println(intSlice2)

// iterating...
for index, value := range intSlice2 {
  fmt.Println("Index: " + index + " Value: " + value)
}
```

### MAPS

``` go
// we can create a map this way
var myMap map[string]uint8 = make(map[string]uint8)
fmt.Println(myMap)

// or by directly assigning values
MyMap2 := map[string]uint8}{"James":5 "Tiberius":8 "Kirk":4 }
fmt.Println(myMap2["James"]) // 7

// in this case, it returns the type's default value, in this case for uint8 it's 0
fmt.Println(myMap2["Spock"])
// we can delete a value using the delete function
delete(myMap2, "Tiberius")

// to know if the value was in the map or if it was really 0
// we have a second return in the map
var nameLen, found = myMap2["Spock"] // 0 & false
if  found {
  fmt.Println("The name length is " + nameLen)
}

// iterating...
for key, value := range myMap2 {
  fmt.Println("Name: " + key + " Name length: " + value)
}
```

<br>

---

## Structs & Interfaces

Structs in Go are nothing more than objects, which in turn can contain methods.
But is Go object-oriented? Not necessarily, in Go there is no inheritance for example.

``` go
// structs can be declared anonymously
// however this way they cannot be reused
var person = struct{
  name string
  age uint8
}{"Spock", 83}

// this way we can reuse this interface
type person struct{
  name string
  age uint8
}

```

Interfaces, on the other hand, have a more 'passive' behavior.

When defining the functions of an interface, any struct containing these functions will be considered compatible with the interface. This way we won't need to explicitly assign the interface to that struct, and we can work better with external libraries by defining interfaces that are compatible with structs already existing in those libraries.

``` go
type owner struct {
  name string
}

type gasCar struct {
  kml     uint8
  tankCap uint8
  owner   // if type and variable share the same name, we can omit it
}

// this way we assign a function to the gasEngine struct
func (e gasCar) kmLeft() uint {
  return uint(e.tankCap) * uint(e.kml)
}

type electricCar struct {
  kpkwh      uint8
  batteryCap uint8
  owner      owner // we can put both without problems as well
}

// this way we assign a function to the gasEngine struct
func (e electricCar) kmLeft() uint {
  return uint(e.batteryCap) * uint(e.kpkwh)
}

// when declaring the interface, both the gas car and the electric
// will be able to satisfy this requirement and be considered just cars
type car interface {
  kmLeft() uint
}

func willReachDestination(c car, distance uint) bool {
  return c.kmLeft() >= distance
}

func main() {
  // a struct can be initialized this way
  var myCar gasCar = gasCar{kml: 15, tankCap: 40, owner: owner{"Someone"}}
  // and be changed this way (hitting the road right)
  myCar.kml = 20
  fmt.Println(myCar.kmLeft())

  // variable names can be omitted, sending parameters in order
  var myOtherCar electricCar = electricCar{4, 100, owner{"Someone"}}
  fmt.Println(myOtherCar.kmLeft())

  // when using the function we can utilize both cars
  // because both satisfy the interface's requirements
  var distance uint = 500
  fmt.Println("Gas Car: ", willReachDestination(myCar, distance))
  fmt.Println("Electric car: ", willReachDestination(myOtherCar, distance))
}
```

<br>

---

## Pointers

Pointers are a special type of data that stores (or 'points to') a memory address.
Pointers are identified by a `*` in the variable declaration.

See also: Pointers

``` go
var x int32 = 10
// when initializing a pointer this way, we are creating a new value in memory
// in this case 0 (default for int32) and storing a reference to it in 'a'
var a *int32 = new(int32)

// with the '*' before the pointer, we are dereferencing
// going to the memory space being pointed to
fmt.Printf("'a' point to the value: %v \n", *a)
fmt.Printf("'x' value is: %v \n", x)

// if you wish to update 'a's value, use '*'
// otherwise, you'll be updating the memory address
*a = 5

var y int32 = 70
// '&' is used to capture the memory address of a variable
// in this case, we are referencing the 'y' variable
var b *int32 = &y
fmt.Printf("'b' point to the value: %v \n", *b)
fmt.Printf("'y' value is: %v \n", y)

// now since 'b' and 'y' point to the same memory location
// any change in the value of one, causes an effect on the other
*b = 80
fmt.Println("updating by reference...")
fmt.Printf("'b' point to the value: %v \n", *b)
fmt.Printf("'y' value is: %v \n", y)

// and what if it wasn't a pointer?
c := 2
d := c
fmt.Printf("'c' value is: %v \n", c)
fmt.Printf("'d' value is: %v \n", d)

d = 5
fmt.Println("updating by value...")
fmt.Printf("'c' value is: %v \n", c)
fmt.Printf("'d' value is: %v \n", d)
```

| Variable | Value    | Address  |
| -------- | -------- | -------- |
| a        | *0x1b05* | 0x1b00   |
| b        | *0x1b04* | 0x1b01   |
|          |          | 0x1b03   |
| x        | 10       | 0x1b02   |
| y        | 70 -> 80 | *0x1b04* |
|          | 0  ->  5 | *0x1b05* |

However... not everything is quite so 'simple'. In the case of complex data structures like *slices*, any copy will be by reference since a *slice* is nothing more than a set of pointers to an *array*

``` go
var slice = []int32{1, 2, 3}
var sliceCopy = slice
// updating one, updates the other
sliceCopy[2] = 4
fmt.Println(slice)
fmt.Println(sliceCopy)
```

Going back to the point about updating by reference or by value, every function parameter is implicitly passed by value. That is, when we pass an *array* as a parameter, the function will create a copy of the original *array*, thereby DOUBLING the memory. This might make sense for some use cases, but not all.

Therefore, we can pass a pointer when we want to avoid this kind of scenario, keeping in mind that the array will possibly be modified, causing side effects, desired or not.

In this example we have two functions that calculate the squared value, one receiving an array/slice as a parameter and another a pointer to this array/slice.

``` go
func square(thing2 [5]int32) [5]int32 {
 fmt.Printf("Memory location of thing2: %p \n", &thing2)
 for i := range thing2 {
  thing2[i] = thing2[i] * thing2[i]
 }
 return thing2
}

func squareRef(thing3 *[5]int32) [5]int32 {
 // no '&' needed here as this variable is already a pointer
 // using '&' the result will be the pointer's address (pointer to pointer)
 fmt.Printf("Memory location of thing3: %p \n", thing3)
 for i := range thing3 {
  thing3[i] = thing3[i] * thing3[i]
 }
 return *thing3
}
```

When we run both functions we can see this memory difference in practice

``` go
var thing1 = [5]int32{1, 2, 3, 4, 5}
fmt.Printf("Memory location of thing1: %p \n", &thing1)

var resultSquare [5]int32 = square(thing1)
fmt.Printf("Result value: %v \n", resultSquare)
fmt.Printf("thing1 value: %v \n", thing1)

var resultSquareRef [5]int32 = squareRef(&thing1)
fmt.Printf("Result ref value: %v \n", resultSquareRef)
fmt.Printf("thing1 new value: %v \n", thing1)

\*
Memory location of thing1: 0xc0000200c0 
Memory location of thing2: 0xc0000200d8 
Result value: [1 4 9 16 25] 
thing1 value: [1 2 3 4 5]

Memory location of thing3: 0xc0000200c0 
Result ref value: [1 4 9 16 25] 
thing1 new value: [1 4 9 16 25] 
*\
```

<br>

---

## Goroutines

First thing to note about Goroutines is, Goroutine is a concurrency tool and not parallelism. If this topic still causes some confusion in your head, try taking a look here first.

Some points about Goroutines

- They are not threads, they are much lighter
- They are managed by Go's internal scheduler, not by the Operating System
- It's a concurrent model, and can also be parallel (but not necessarily)

Goroutines are fired/scheduled in the background through the *go* keyword before the call.
In the example below we use *go* before calling the *dbCall(i)* function, this way the function's execution will happen concurrently.

But analyzing the code you'll also notice something else new: The *WaitGroup*, which is nothing more than a Goroutine synchronization tool. We add to the WaitGroup counter the number of Goroutines we are waiting to finish, and call *Done()* to decrement this value which should result in zero (if it doesn't yield zero, we'll have problems). This way we guarantee that the program will wait for all scheduled Goroutines to finish.

``` go
var wg = sync.WaitGroup{}
var dbData = []string{"ID[1]", "ID[2]", "ID[3]", "ID[4]", "ID[5]"}

func main() {
 t0 := time.Now()
 for i := 0; i < len(dbData); i++ {
  // adds 1 to the counter
  wg.Add(1)
  go dbCall(i)
 }
 wg.Wait()
 fmt.Printf("Total execution time: %v \n", time.Since(t0))
}

// simulating database call delay
func dbCall(i int) {
 var delay float32 = rand.Float32() * 2000
 time.Sleep(time.Duration(delay) * time.Millisecond)
 fmt.Println("Result from DB:", dbData[i])
 // removes 1 from the counter
 wg.Done()
}
```

Ok, cool!

But what if I need to store this result somewhere? I need to know the order in which the processes finished executing. How to handle race conditions?

Go, like most programming languages, implements both *Mutex* and *Semaphore* for these cases.

``` go
var m = sync.Mutex{}
var wg = sync.WaitGroup{}
var dbData = []string{"ID[1]", "ID[2]", "ID[3]", "ID[4]", "ID[5]"}
var results = []string{}

func main() {
 t0 := time.Now()
 for i := 0; i < len(dbData); i++ {
  // adds 1 to the counter
  wg.Add(1)
  go dbCall(i)
 }
 wg.Wait()
 fmt.Printf("Total execution time: %v \n", time.Since(t0))
 fmt.Printf("The results are: %v \n", results)
}

// simulating database call delay
func dbCall(i int) {
 // fixing the time to force concurrent scenarios
 var delay float32 = 2000
 time.Sleep(time.Duration(delay) * time.Millisecond)
 fmt.Println("Result from DB:", dbData[i])
 save(dbData[i])
 // removes 1 from the counter
 wg.Done()
}

func save(result string) {
 // blocking the write to avoid race condition
 m.Lock()
 results = append(results, result)
 // freeing up access for other Goroutines
 m.Unlock()
}
```

Now we're talking, working well, but... what if I want to log as values are inserted?

The *Mutex* in Go has an extra feature, using an *RWMutex* (read-write mutex), we can specify whether our lock will be strictly read-only or not.

``` go
var m = sync.RWMutex{}
var wg = sync.WaitGroup{}
var dbData = []string{"ID[1]", "ID[2]", "ID[3]", "ID[4]", "ID[5]"}
var results = []string{}

func main() {
 t0 := time.Now()
 for i := 0; i < len(dbData); i++ {
  // adds 1 to the counter
  wg.Add(1)
  go dbCall(i)
 }
 wg.Wait()
 fmt.Printf("Total execution time: %v \n", time.Since(t0))
}

// simulate DB call delay
func dbCall(i int) {
 // fixing the time to force concurrent scenarios
 var delay float32 = 2000
 time.Sleep(time.Duration(delay) * time.Millisecond)
 save(dbData[i])
 log()
 // removes 1 from the counter
 wg.Done()
}

func save(result string) {
 // blocking the write to avoid race condition
 m.Lock()
 results = append(results, result)
 // freeing up access for other Goroutines
 m.Unlock()
}

func log() {
 // blocks reading only
 m.RLock()
 fmt.Printf("Current results: %v \n", results)
 // unlocks reading
 m.RUnlock()
}
```

Well, this is the basics of playing with Goroutines. To do more than this, we need to take a look at *Channels*.

---

## Channels

What is this? They are communication channels, designed to work with Goroutines.

What does it do?

- Listens/waits for data
- Stores data
- FIFO format (queue)
- Thread safe

Let's see how to declare and use channels:

``` go
// Declaring a channel of size 1
var ch1 = make(chan int)
// adding the value 1 to channel ch1=[1]
// Right here, we will hit a lock
ch1 <- 1
// removing the first value from the channel and storing it in the variable
var i = <-ch1
// creating a channel with a predetermined initial value
var ch2 = make(chan int, 10)
ch2 <- i
// ERROR
fmt.Println("Processed value:", <-ch2)
```

Since channels were designed to work alongside Goroutines, the moment a value is inserted into the channel, the process will halt, resulting in a DeadLock. To fix this, we'll have to do the following:

``` go
func main() {
 var c = make(chan int)
 go process(c)
 fmt.Println("Processed value:", <-c)
}

func process(c chan int) {
 c <- 1
}
```

OK, but... what if I don't know how many values will be in my channel and I want to keep listening to it until it finishes?

We can use channels inside a *for-range*, but if the channel is not properly closed, we'll get a Deadlock again, so don't forget to use *close* on the channel

``` go
func main() {
  // Initializing the chan with 5 will free up space for the whole execution in this case
  // try removing the 5 and see what changes
 var c = make(chan int, 5)
 go process(c)
 for i := range c {
  fmt.Println("Processed value:", i)
 }
 fmt.Println("End of processing")
}

func process(c chan int) {
  // defer??? is a reserved word
  // an expression that will be executed right before the function finishes
 defer close(c)
 for i := 0; i < 5; i++ {
  c <- i
 }
}
```

Another useful tool is *select*, which acts like a *switch* for channels

``` go
func main() {
 oddChan := make(chan int)
 pairChan := make(chan int)
 numbers := []int{1, 3, 6, 8, 9, 10}

 for i := range numbers {
  go processNumber(numbers[i], oddChan, pairChan)
 }
 for range numbers {
  results(oddChan, pairChan)
 }

}

func results(oddChan chan int, pairChan chan int) {
 select {
 case value := <-oddChan:
  fmt.Println("Odd value found:", value)
 case value := <-pairChan:
  fmt.Println("Even value found:", value)
 }
}

func processNumber(number int, oddChan chan int, pairChan chan int) {
 if number%2 > 0 {
  oddChan <- number
 } else {
  pairChan <- number
 }
}
```

<br>

---

## Generics

Generic types took a while to enter the language due to the use of interfaces in Go, but using generic types gives the code much more flexibility.

``` go
func main() {
 intSlice := []int{1, 3, 6, 8, 9, 10}
 intSum := processNumbers(intSlice)
 fmt.Println("Sum of Integers:", intSum)

 floatSlice := []float32{1.2, 3.1, 6.4, 8.3, 9.2, 10.8}
 floatSum := processNumbers(floatSlice)
 fmt.Println("Sum of Floats:", floatSum)
}

// Here we define that type T can be [int | float32 | float64]
// we can also use any just like other languages such as Typescript
// another detail, any is simply an alias for an empty interface :P
func processNumbers[T int | float32 | float64](slice []T) T {
  sum:= 0
 for _, v := range slice {
  sum += v
 }
 return sum
}
```

Remember the example of interfaces with structs? Let's adapt it to use generic types, but it gets a bit more complicated.

``` go
type electricCar struct {
 kpkwh      uint8
 batteryCap uint8
}

func (e electricCar) kmLeft() uint {
 return uint(e.batteryCap) * uint(e.kpkwh)
}

type car[T gasCar | electricCar] struct {
 owner
 engine T
}

type engine interface {
 kmLeft() uint
}

func willReachDestination(e engine, distance uint) bool {
 return e.kmLeft() >= distance
}

func main() {
 // a struct can be initialized this way
 var myCar car[gasCar] = car[gasCar]{owner: owner{"Someone"}, engine: gasCar{kml: 15, tankCap: 40}}
 // and be altered this way
 myCar.engine.kml = 20
 fmt.Println(myCar.engine.kmLeft())

 // variable names can be omitted, sending parameters in order
 var myOtherCar car[electricCar] = car[electricCar]{owner{"Someone"}, electricCar{4, 100}}
 fmt.Println(myOtherCar.engine.kmLeft())

 // when using the function we can utilize both cars
 // because both satisfy the interface's requirements
 var distance uint = 500
 fmt.Println("Gas Car: ", willReachDestination(myCar.engine, distance))
 fmt.Println("Electric car: ", willReachDestination(myOtherCar.engine, distance))
}
```

<br>

End✨, from the basics to the not-so-basic, covering a large part of the language's structures. I hope this helped at least a bit in understanding how to use Golang