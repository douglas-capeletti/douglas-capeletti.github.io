---
title: "Golang - Guia básico"
pubDate: "2024-09-16"
hero: "/images/golang.webp"
tags: ["golang", "programming languages"]
---

# o que veremos aqui:
- [o que veremos aqui:](#o-que-veremos-aqui)
  - [Características básicas](#características-básicas)
    - [Padrões de uso](#padrões-de-uso)
  - [Módulos \& Pacotes](#módulos--pacotes)
    - [Entrypoint](#entrypoint)
  - [Tipos de dados](#tipos-de-dados)
    - [Declarando Valores](#declarando-valores)
    - [Tipos básicos](#tipos-básicos)
    - [STRINGS, RUNES \& BYTES](#strings-runes--bytes)
    - [Operações matemáticas básicas](#operações-matemáticas-básicas)
  - [Estruturas de controle](#estruturas-de-controle)
    - [IF](#if)
    - [Switch-case](#switch-case)
    - [For](#for)
  - [Funções](#funções)
    - [Métodos](#métodos)
  - [Estruturas de dados](#estruturas-de-dados)
    - [ARRAYS](#arrays)
    - [SLICES](#slices)
    - [MAPS](#maps)
  - [Structs \& Interfaces](#structs--interfaces)
  - [Pointers](#pointers)
  - [Goroutines](#goroutines)
  - [Channels](#channels)
  - [Generics](#generics)

---

## Características básicas
- Linguagem compilada direto para binário
- Compilação rápida (porém, binário grande)
- Linguagem pensada para ser simples em sua estrutura
- Projetada para concorrência
- [É possível instalar em qualquer plataforma](http://go.dev/doc/install)

### Padrões de uso
- Letra inicial maiúscula em uma função determina que ela será publica ou não
- Não há getters nem setters, porém caso necessário: 
  - Declare o campo com letra minuscula
  - Crie um método com o mesmo nome do campo porém com letra maiúscula
  - Desta forma a função será exportada e quem utilizar não verá diferença
  - Para o setter, utilize o padrão SetCampo para alterar o valor do campo caso necessário
- Ao nomear interfaces utilize verbos, Reader, Writer..., assim o método será o substantivo daquele verbo (Read, Write)
- Caso implemente uma conversão para um tipo conhecido, utilize o nome do tipo diretamente exemplo: String() e não ToString()
- Nomes de pacotes dever ser pequenos
- Utilize MixedCaps como padrão, iniciando ou não com maiúscula conforme visibilidade do método ou variável
- estrutura de projeto

---

## Módulos & Pacotes

Em go cada pasta é um pacote e um conjunto de pacotes é um módulo, além disso um módulo deve conter mais 2 arquivos, *go.mod* e *go.sum*

``` yaml
Modulo: Coleção de pacotes
  - Pacote:
    - file.go
  - Pacote:
    - file.go
    - file.go
```

Para criar um módulo utilizamos o comando *go mod init*

```sh
go mod init myModule # ou github.com/<user>/<repo_do_modulo>
```

E para adicionar dependências no nosso projeto, utilizamos o *go get*

``` sh
go get -u github.com/go-chi/chi/v5
```

Como resultado teremos o arquivo *go.mod* com a declaração das dependências

``` sh
module myModule

go 1.23.1 # active version

require github.com/go-chi/chi/v5 v5.1.0 # indirect
```

E também um arquivo *go.sum* com os checksums das dependências para validação das versões.

### Entrypoint
Uma aplicação go pode ter mais de um entrypoint identificado pelo arquivo *main.go*, este arquivo deve conter uma função *main()*, caso contrário teremos um erro de compilação. 

Uma estrutura comum de ser utilizada em projetos go é ter uma pasta chamada *cmd* e dentro dela subpastas distintas para cara entrypoint diferente da aplicação, pois quando evocado o pacote depois ele terá o nome da pasta e não do arquivo no caso do *main.go*

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

Executar um programa go

``` sh
# somente compilação (vai gerar o binário)
go build cmd/main.go
# execução do binário
./main
# ou compilar e executar consecutivamente com o comando run
go run cmd/main.go
```
<br>

---

## Tipos de dados

Go comporta tipos de dados comuns entre várias linguagens porém para quem olha pela primeira vez estranha o fato de existirem tipos específicos para determinadas quantidades de bits como: 8, 16, 32, 64. Porém em casos como o do *int* ou *uint* o tamanho depende da arquitetura do sistema, 32 ou 64 bits.

Outro ponto que pode ser novo para alguns é termos tipos *unassigned* que são valores sem atribuição de sinal, portanto serão tipos com número sempre positivos,

### Declarando Valores

Pontos importantes, go é uma linguagem fortemente tipada, que suporta dinâmica, logo, não precisamos definir explicitamente o tipo de dado de uma variável, e nem tanto podemos muda-lo

``` go
const myConst // imutável ou constante
var myVar  // mutável porém de tipagem forte e estática

myVar = "some value" // tipo inferido (string)
myVar = 10 // erro, não podemos sobrescrever o tipo

var intNum int
anotherInt := 0 // inferência do tipo pelo operador ":="

var some, other = 1, 2
look, again := 3, 4 // look = 3, again = 4
```

### Tipos básicos
``` yaml
Boolean: 
  Default: false
  - bool: true ou false
Ponto Flutuante:
  Default: 0.0
  - float32: 32 bits = -3.4e+38 to 3.4e+38
  - float64: 64 bits = -1.7e+308 to +1.7e+308
Carácter:
  Default: 0
  - byte: alias for uint8
  - rune: alias for int32
Texto:
  Default: ''
  - string: coleção de bytes UTF-8
Inteiro:
  Default: 0
  - int: tamanho depende da arquitetura do sistema 32 ou 64 bits
  - int8: min -128 | max = -127
  - int16: min = -32768 | max = -32767
  - int32: min = -2147483648 | max = -2147483647
  - int64: min = -9223372036854775808 | max = -9223372036854775807
  - uint: 'u' vem de unassigned (sem atribuição de sinal) 
  - uint8: min = 0 | max = -255
  - uint16: min = 0 | max = -65535
  - uint32: min = 0 | max = -4294967295
  - uint64: min = 0 | max = -18446744073709551615
```

### STRINGS, RUNES & BYTES
Strings em go são imutáveis e naturalmente UTF-8, e ocupam 7 bits + 1 bit de sinal, porém UTF-8 tem um encoding dinâmico que pode se extender até 32 bits, cobrindo UTF-32, e assim podendo armazenar caracteres chineses, emojis e outros símbolos.

``` go
// Quebrando linhas com \n
var simpleString string = "Hello \nworld!"
// Ou com string templates
var stringBlock string = `Hello
world!`

// Ambos com o mesmo resultado
fmt.Println(simpleString)
fmt.Println(stringBlock)

// Aqui a coisa começa a ficar estranha
fmt.Println(len("atenção")) // 9 | número de bytes em ASCII 256
fmt.Println(len("atencao")) // 7 | parece estar certo, mas não funciona sempre

// A forma mais assertiva é utilizando o pacote "unicode/utf8"
fmt.Println(utf8.RuneCountInString("atenção")) // resultado correto sempre

// Outro exemplo
var myString = "atenção"

// Ao buscar o 'a' teremos o valor correto dele na tabela ascii
var stringIndex uint8 = myString[0]
fmt.Println(stringIndex) // 97

// Ao buscar o 'ç' teremos o valor do primeiro byte
// porém como 'ç' precisa de mais de um byte, o valor correto seria 231
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
  4 231 <- 'ç' | ocupa o espaço do 4 e do 5
  6 227 <- 'ã' | ocupa o 6 e o 7
  8 111 <- 'o' | ocupa um espaço só
*/
```

Strings em go são uma coleção de Runas devido o encoding, ou uma coleção de uint8 se não preservarmos o encoding (caracteres como: ã ficam quebrados se analisarmos desta forma).

``` go
var myRune rune = 'a'
fmt.Println(myRune) // 97 | int32 ele imprime o valor numérico

// Manipulando Strings
var strSlice = []string{"H", "e", "l", "l", "o"}
var concatStr = ""
for i := range strSlice {
  // podemos fazer uma concatenação básica
  // a cada iteração uma nova string será gerada
  concatStr += strSlice[i]
}

var strBuilder strings.Builder
for i := range strSlice {
  // ou usando um string builder, melhor alternativa
  strBuilder.WriteString(strSlice[i])
}
fmt.Println(strBuilder.String())
```

### Operações matemáticas básicas

Para cálculos básico nosso principal problema será o overflow de variáveis, escolher devemos escolher os tipos de dados tendo em mente o tamanho do resultado para não termos surpresas inesperadas.

``` go
// cast é necessário para fazer os cálculo
var numFloat32 float32 = 10.1
var numInt32 int32 = 2
var result float32 = numFloat32 + float32(numInt32)
fmt.Println(result)

var numInt1 int = 3
var numInt2 int = 2
fmt.Println(numInt1 / numInt2) // 1 | arredondamento para int
fmt.Println(numInt1 % numInt2) // 1 | operação com resto de divisão

var myBoolean bool = false // como qualquer linguagem, simples
```
<br>

---

## Estruturas de controle

Em go teremos estruturas como 'if', 'switch-case', 'for', (não tem 'while'), e select (veremos em [channels](#channels))

### IF
``` go
// if, switch, for, não tem parêntesis
value := "something"

if value == "Hi" {
  fmt.Println("It's hi")

  // else if e else, tem que estar na mesma linha das chaves
} else if value != "something" {
  fmt.Println("it's not something")

} else {
  fmt.Println("it's " + value)
}
```

### Switch-case
``` go
// no switch, o break é implícito sobre cada condição
switch {
case value == "Hi":
  fmt.Println("It's hi")

case value != "something":
  fmt.Println("it's not something")

default:
  fmt.Println("it's " + value)
}

// ele também pode ser condicional, atribuindo uma variável diretamente
switch value {
case "Hi":
  fmt.Println("It's hi")

// podendo validar mais de um valor para cada cenário
case "another thing", "anything":
  fmt.Println("it's not something")

default:
  fmt.Println("it's " + value)
}
```

### For
``` go
// Loop básico 'while'
var i int = 0
for i<10 {
  fmt.Println(i)
  i += 1
}

// Loop sem condição 
i=0 // reset
for {
  // removendo esse if interno, loop infinito
  if i>=10{
    break
  }
  fmt.Println(i)
  i += 1
}

// for clássico
for i=0; i<10; i++ {
  fmt.Println(i)
  i += 1
}

// for range (ou foreach in range)
intSlice := []int32{1, 2, 3}
for index, value := range intSlice {
  fmt.Println("Index: " + index + " Value: " + value)
}

// podemos ignorar o índice também
for _, value := range intSlice {
  fmt.Println("Index: " + index + " Value: " + value)
}
```
<br>

---

## Funções

``` go
// Forma comum vista em outras linguagens
func functionName(param1 string, param2 int) string {
  return "result"
}

// retornando mais de um resultado
func multipleReturns(param1 string, param2 int) (string, int) {
  return "result", 10
}

// ao chamar a função devemos receber os dois dados
var first, second = multipleReturns("something", 1)

func namedReturn(param1 int, param2 int) (sum int) { 
  // sum foi declarado na assinatura do método
  sum = param1 + param2
  return // o retorno vai ser sempre sum 
}

import "errors" // pacote de error da biblioteca padrão
// golang não tem try-catch 
// então todos os erros são tratados no retorno da função
func withError(wrong bool) bool, error {
  var err error // default: nil
  if wrong {
    err = errors.New("Something went wrong")
  }
  return err, wrong
}
// devemos receber este erro e verificar se ele tem algo
err, response := withError(true)
// forma padrão de lidar com erros
if err!=nil {
  fmt.Printf(err.Error())
}

// ou podemos ignorar este erro explicitamente usando '_' 
// por padrão devemos retornar primeiro o erro 
// para que ele não seja ignorado acidentalmente
_, response2 := withError(false)
```
### Métodos 

métodos são funções atribuídas a um tipo de dado (ou objeto) específico.
veja também: [Função ou Método?](/shards/function-or-method)

``` go
// funções também podem ser atribuídas a objetos
func (b ball) roll() {
  b.position++
}
// assim quando declaramos uma nova bola
newBall := ball.New()
// temos o método novo acessivel a ele
// este design permite estender estruturas de bibliotecas externas
// ou até mesmo da biblioteca padrão
// podemos atribuir métodos novos para o tipo string por exemplo
newBall.roll()
```
<br>

---

## Estruturas de dados

Assim também como outras linguagens, temos algumas estruturas pré existentes na linguagem como 'Arrays' e 'Maps', porém em go ainda temos os 'slices', que veremos aqui.

### ARRAYS
- características: 
  - Tamanho fixo
  - mesmo tipo de dados
  - indexável
  - contínuo na memória

``` go
var intArr[3]int32
intArr[1] = 123 // atribuindo no index
fmt.Println(intArr[0]) // imprimindo posição 0
fmt.Println(intArr[1:3]) // imprimindo de 1 até 2 (intervalo aberto no 3)

fmt.Println(&intArr[0]) // imprimindo o endereço de memória
fmt.Println(&intArr[1]) // assim temos como ver que eles ficam
fmt.Println(&intArr[2]) // um do lado do outro

// poderíamos ter inicializado o array assim também
anotherIntArr := [3]int32{3, 2, 1}
fmt.Println(anotherIntArr[0:3])
```

### SLICES
- características: 
  - wrapper para array
  - geração pode ser dinâmica

``` go
// se omitir o tamanho, temos um slice de tamanho dinâmico
intSlice := []int32{1, 2, 3}

// tamanho do slice, é a quantidade de items, capacidade, é a memória alocada
fmt.Printf("O tamanho do array interno é %v porém a capacidade é %v = ", len(intSlice), cap(intSlice)) // 3 & 3
fmt.Println(intSlice)

// podemos adicionar valores extras
intSlice = append(intSlice, 7)
// ao exceder a capacidade do array original, a capacidade é DOBRADA
// porém não podemos acessar estes valores que estão fora do array
fmt.Printf("O tamanho do array é %v porém a capacidade é %v = ", len(intSlice), cap(intSlice)) // 4 & 6
fmt.Println(intSlice)

// poderíamos criar um novo array especificando tamanho e capacidade
// make é uma função 'fábrica' para os tipos básicos
// int[] é o tipo, 3 o tamanho, 8 a capacidade
var intSlice2 []int32 = make([]int32, 3, 8)

// podemos inserir os dados no FIM de outro array via função append com o operador spread (...)
intSlice2[0] = 10
intSlice2 = append(intSlice, intSlice2...) // [10, 0, 0, 1, 2, 3, 7]
fmt.Println(intSlice2)

// iterando...
for index, value := range intSlice2 {
  fmt.Println("Index: " + index + " Value: " + value)
}
```

### MAPS
``` go
// podemos criar um mapa desta forma
var myMap map[string]uint8 = make(map[string]uint8)
fmt.Println(myMap)

// ou diretamente atribuindo valores
MyMap2 := map[string]uint8}{"James":5 "Tiberius":8 "Kirk":4 }
fmt.Println(myMap2["James"]) // 7

// nesse caso, ele retorna o valor padrão do tipo, nesse caso do uint8 é 0
fmt.Println(myMap2["Spock"])
// podemos deletar um valor usando a função delete
delete(myMap2, "Tiberius")

// para saber se o valor estava no mapa ou ele era realmente 0
// temos um segundo no mapa
var nameLen, found = myMap2["Spock"] // 0 & false
if  found {
  fmt.Println("The name length is " + nameLen)
}

// iterando...
for key, value := range myMap2 {
  fmt.Println("Name: " + key + " Name length: " + value)
}
```
<br>

---

## Structs & Interfaces
Structs em go nada mais são do que objeto, que por sua vez, podem conter métodos.
Mas go é orientado a objetos? Não necessariamente, em go não existe herança por exemplo.

``` go
// structs podem ser declaradas de forma anonima
// porém assim não podem ser reutilizadas
var person = struct{
  name string
  age uint8
}{"Spock", 83}

// desta forma podemos reutilizar esta interface
type person struct{
  name string
  age uint8
}

```

Interfaces por sua vez tem um comportamento mais 'passivo'. 

Ao definir as funções de uma interface, toda struct que conter estas funções será considerada compatível com a interface. Desta forma não precisaremos explicitamente atribuir a interface para aquela struct, desta forma podemos trabalhar melhor com bibliotecas externas definindo interfaces que sejam compatíveis com structs já existentes nestas bibliotecas.

``` go 
type owner struct {
  name string
}

type gasCar struct {
  kml     uint8
  tankCap uint8
  owner   // caso tipo e variável tenham o mesmo nome, podemos omitir
}

// desta forma atribuímos uma função para a struct gasEngine
func (e gasCar) kmLeft() uint {
  return uint(e.tankCap) * uint(e.kml)
}

type electricCar struct {
  kpkwh      uint8
  batteryCap uint8
  owner      owner // podemos por ambos sem problemas também
}

// desta forma atribuímos uma função para a struct gasEngine
func (e electricCar) kmLeft() uint {
  return uint(e.batteryCap) * uint(e.kpkwh)
}

// ao declarar a interface, tanto o carro a gasolina quanto o elétrico
// poderão satisfazer este requisito e serem considerados somente carros
type car interface {
  kmLeft() uint
}

func willReachDestination(c car, distance uint) bool {
  return c.kmLeft() >= distance
}

func main() {
  // uma struct pode ser inicializada desta forma
  var myCar gasCar = gasCar{kml: 15, tankCap: 40, owner: owner{"Someone"}}
  // e ser alterada desta forma (pegando estrada né)
  myCar.kml = 20
  fmt.Println(myCar.kmLeft())

  // nomes de variáveis podem ser omitidos, enviando os parâmetros em ordem
  var myOtherCar electricCar = electricCar{4, 100, owner{"Someone"}}
  fmt.Println(myOtherCar.kmLeft())

  // ao usar a função podemos utilizar ambos os carros
  // pois ambos satisfazem os requisitos da interface
  var distance uint = 500
  fmt.Println("Gas Car: ", willReachDestination(myCar, distance))
  fmt.Println("Electric car: ", willReachDestination(myOtherCar, distance))
}
```
<br>

---

## Pointers
Ponteiros são um tipo especial de dados que armazena (ou 'aponta') um endereço de memória.
Ponteiros são identificados por um `*` na declaração da variável.

Veja também: [Ponteiros](/shards/pointers)

``` go
var x int32 = 10
// ao inicializar um ponteiro desta forma, estamos criando um novo valor na memória
// neste caso 0 (default do int32) e armazenando uma referencia para ele em 'a'
var a *int32 = new(int32)

// com o '*' antes do ponteiro, estamos de-referenciando
// indo até o espaço de memória que é apontado
fmt.Printf("'a' point to the value: %v \n", *a)
fmt.Printf("'x' value is: %v \n", x)

// caso queira atualizar o valor de 'a' use '*'
// caso contrário, estará atualizando o endereço de memória
*a = 5

var y int32 = 70
// '&' é usado para capturar o endereço de memória de uma variável
// neste caso, estamos referenciando a variável 'y'
var b *int32 = &y
fmt.Printf("'b' point to the value: %v \n", *b)
fmt.Printf("'y' value is: %v \n", y)

// agora como 'b' e 'y' apontam para o mesmo local na memória
// qualquer mudança em no valor de um deles, causa um efeito no outro
*b = 80
fmt.Println("updating by reference...")
fmt.Printf("'b' point to the value: %v \n", *b)
fmt.Printf("'y' value is: %v \n", y)

//e se nao fosse um ponteiro?
c := 2
d := c
fmt.Printf("'c' value is: %v \n", c)
fmt.Printf("'d' value is: %v \n", d)

d = 5
fmt.Println("updating by value...")
fmt.Printf("'c' value is: %v \n", c)
fmt.Printf("'d' value is: %v \n", d)
```
| Variável | Valor    | Endereço |
| -------- | -------- | -------- |
| a        | *0x1b05* | 0x1b00   |
| b        | *0x1b04* | 0x1b01   |
|          |          | 0x1b03   |
| x        | 10       | 0x1b02   |
| y        | 70 -> 80 | *0x1b04* |
|          | 0  ->  5 | *0x1b05* |

Porém... nem tudo é tão 'simples' assim, no caso de estruturas de dados complexas como *slices* qualquer cópia será por referência dado que  um *slice* nada mais é que um conjunto de ponteiros para um *array*

``` go
var slice = []int32{1, 2, 3}
var sliceCopy = slice
// ao atualizar um, atualizamos o outro
sliceCopy[2] = 4
fmt.Println(slice)
fmt.Println(sliceCopy)
```

Voltando no ponto sobre atualizar por referência ou por valor, todo parâmetro de função será implicitamente passado por valor, ou seja, ao passarmos um *array* por parâmetro, a função criará uma cópia do *array* original, desta forma DUPLICANDO a memória, o que pode fazer sentido para alguns casos de uso, mas não para todos. 

Sendo assim podemos enviar um ponteiro, quando quisermos evitar este tipo de cenário porém tendo em mente que o array possivelmente será modificado, causando efeitos colaterais, desejados ou não.

Neste exemplo temos duas funções que calculam o valor quadrado, uma recebendo um array/slice por parâmetro e outra um ponteiro para este array/slice.
``` go
func square(thing2 [5]int32) [5]int32 {
	fmt.Printf("Memory location of thing2: %p \n", &thing2)
	for i := range thing2 {
		thing2[i] = thing2[i] * thing2[i]
	}
	return thing2
}

func squareRef(thing3 *[5]int32) [5]int32 {
	// aqui nao precisa do '&' esta variável já é um ponteiro
	// usando '&' o resultado será o endereço do ponteiro (ponteiro do ponteiro)
	fmt.Printf("Memory location of thing3: %p \n", thing3)
	for i := range thing3 {
		thing3[i] = thing3[i] * thing3[i]
	}
	return *thing3
}
```

Ao executarmos ambas as funções podemos ver na prática esta diferença na memória

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

Primeira coisa a ser comentada sobre Goroutines é, Goroutine é uma ferramenta de concorrência e não paralelismo. Caso este assunto cause alguma confusão ainda na sua cabeça, tente [dar uma olhada aqui antes](/shards/concurrency-is-not-parallelism).


Alguns pontos sobre Goroutines
- Não são threads, são bem mais leves 
- São gerenciadas pelo scheduler interno do go e não pelo Sistema operacional
- É um modelo concorrente, podendo também ser paralelo (mas não necessariamente)

Goroutines são disparadas/agendadas em background através da palavra chave *go* antes da chamada,
no exemplo abaixo utilizamos o *go* antes da chamada à função *dbCall(i)*, desta forma a execução da função vai acontecer de forma concorrente.

Porém ao analisar o código você também notará algo a mais de novo: O *WaitGroup*, nada mais é do que uma ferramenta de sincronização de Goroutines. Adicionamos ao contador do WaitGroup o número de Goroutines que estamos esperando ser concluídas, e chamamos o *Done()* para decrementar este valor que deve resultar em zero (se não der zero, teremos problemas), Assim garantimos que o programa irá aguardar que todas as Goroutines agendadas terminem

``` go
var wg = sync.WaitGroup{}
var dbData = []string{"ID[1]", "ID[2]", "ID[3]", "ID[4]", "ID[5]"}

func main() {
	t0 := time.Now()
	for i := 0; i < len(dbData); i++ {
		// adiciona 1 ao contador
		wg.Add(1)
		go dbCall(i)
	}
	wg.Wait()
	fmt.Printf("Total execution time: %v \n", time.Since(t0))
}

// simulando delay da chamada ao banco
func dbCall(i int) {
	var delay float32 = rand.Float32() * 2000
	time.Sleep(time.Duration(delay) * time.Millisecond)
	fmt.Println("Result from DB:", dbData[i])
	// remove 1 do contador
	wg.Done()
}
```

Ok, legal!

Mas se eu precisar armazenar esse resultado em algum lugar? Preciso saber a ordem com que os processos terminaram de executar, Como lidar com a condição de corrida?

Go assim como grande parte das linguagens de programação, implementa tanto o *Mutex* quanto o *Semaphore* para estes casos.

``` go
var m = sync.Mutex{}
var wg = sync.WaitGroup{}
var dbData = []string{"ID[1]", "ID[2]", "ID[3]", "ID[4]", "ID[5]"}
var results = []string{}

func main() {
	t0 := time.Now()
	for i := 0; i < len(dbData); i++ {
		// adiciona 1 ao contador
		wg.Add(1)
		go dbCall(i)
	}
	wg.Wait()
	fmt.Printf("Total execution time: %v \n", time.Since(t0))
	fmt.Printf("The results are: %v \n", results)
}

// simulando delay da chamada ao banco
func dbCall(i int) {
	// fixando o tempo para forçar cenários concorrentes
	var delay float32 = 2000
	time.Sleep(time.Duration(delay) * time.Millisecond)
	fmt.Println("Result from DB:", dbData[i])
	save(dbData[i])
	// remove 1 do contador
	wg.Done()
}

func save(result string) {
	// bloqueando a escrita para evitar condição de corrida
	m.Lock()
	results = append(results, result)
	// liberando o acesso para outras Goroutines
	m.Unlock()
}
```

Agora sim, funcionando bem, mas... e se eu quiser ir logando conforme os valores são inseridos? 

O *Mutex* em go tem uma funcionalidade a mais, utilizando um *RWMutex* mutex de leitura e escrita, podemos especificar se nosso lock será somente de leitura ou não

``` go
var m = sync.RWMutex{}
var wg = sync.WaitGroup{}
var dbData = []string{"ID[1]", "ID[2]", "ID[3]", "ID[4]", "ID[5]"}
var results = []string{}

func main() {
	t0 := time.Now()
	for i := 0; i < len(dbData); i++ {
		// adiciona 1 ao contador
		wg.Add(1)
		go dbCall(i)
	}
	wg.Wait()
	fmt.Printf("Total execution time: %v \n", time.Since(t0))
}

// simulate DB call delay
func dbCall(i int) {
	// fixando o tempo para forçar cenários concorrentes
	var delay float32 = 2000
	time.Sleep(time.Duration(delay) * time.Millisecond)
	save(dbData[i])
	log()
	// remove 1 do contador
	wg.Done()
}

func save(result string) {
	// bloqueando a escrita para evitar condição de corrida
	m.Lock()
	results = append(results, result)
	// liberando o acesso para outras Goroutines
	m.Unlock()
}

func log() {
	// bloqueia somente a leitura
	m.RLock()
	fmt.Printf("Current results: %v \n", results)
	// desbloqueia a leitura
	m.RUnlock()
}
```

Bom, isso é o básico para mexer com Goroutines, para fazer mais que isso precisamos dar uma olhada em *Channels*

---

## Channels

O que é isso? São canais de comunicação, desenhados para trabalhar com Goroutines.

O que isso faz?
- Escuta/espera por dados
- Armazena dados
- Formato FIFO (fila)
- Thread safe

Vamos ver como declarar e utilizar os channels

``` go
// Declarando um channel de tamanho 1
var ch1 = make(chan int)
// adicionando o valor 1 no channel ch1=[1]
// Exatamente aqui, teremos um lock
ch1 <- 1
// removendo o primeiro valor do channel e armazenando na variável
var i = <-ch1
// criando um channel com um valor inicial pré determinado
var ch2 = make(chan int, 10)
ch2 <- i
// ERRO
fmt.Println("Valor processado:", <-ch2)
```

Como channels foram desenhadas para trabalhar junto com Goroutines, no momento em que um valor é inserido no canal, o processo irá parar, resultando em um DeadLock, para corrigir isto, teremos que fazer da seguinte forma:

``` go
func main() {
	var c = make(chan int)
	go process(c)
	fmt.Println("Valor processado:", <-c)
}

func process(c chan int) {
	c <- 1
}
```

OK, mas... e se eu não souber quantos valores vão estar no meu channel e quiser ficar escutando ele até que ele termine?

Podemos utilizar os channels dentro de *for-range*, porém caso o channel não for fechado corretamente, teremos novamente um Deadlock, então não esqueça de usar o *close* no channel

``` go
func main() {
  // Inicializando o chan com 5 irá liberar espaço para a execução toda neste caso
  // teste removendo o 5 e veja o que muda
	var c = make(chan int, 5)
	go process(c)
	for i := range c {
		fmt.Println("Valor processado:", i)
	}
	fmt.Println("Fim do processamento")
}

func process(c chan int) {
  // defer??? é uma palavra reservada
  // uma expressão que será executada no momento antes da função terminar
	defer close(c)
	for i := 0; i < 5; i++ {
		c <- i
	}
}
```

Outra ferramenta útil é o *select*, que funciona como um *switch* para channels

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
		fmt.Println("Valor ímpar encontrado:", value)
	case value := <-pairChan:
		fmt.Println("Valor Par encontrado:", value)
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

Tipos genéricos demoraram um pouco para entrar na linguagem devido o uso de interfaces em go, porém o uso de tipos genéricos dão muito mais flexibilidade para o código

``` go
func main() {
	intSlice := []int{1, 3, 6, 8, 9, 10}
	intSum := processNumbers(intSlice)
	fmt.Println("Sum of Integers:", intSum)

	floatSlice := []float32{1.2, 3.1, 6.4, 8.3, 9.2, 10.8}
	floatSum := processNumbers(floatSlice)
	fmt.Println("Sum of Floats:", floatSum)
}

// Aqui definimos que o tipo T pode ser [int | float32 | float64]
// podemos utilizar o any também assim como outras linguagens como Typescript
// outro detalhe any nada mais é do que um alias para uma interface vazia :P
func processNumbers[T int | float32 | float64](slice []T) T {
  sum:= 0
	for _, v := range slice {
		sum += v
	}
	return sum
}
```

Lembra do exemplo de interfaces com structs? vamos adapta-lo para utilizar tipos genéricos, porém fica um pouco mais complicado.

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
	// uma struct pode ser inicializada desta forma
	var myCar car[gasCar] = car[gasCar]{owner: owner{"Someone"}, engine: gasCar{kml: 15, tankCap: 40}}
	// e ser alterada desta forma
	myCar.engine.kml = 20
	fmt.Println(myCar.engine.kmLeft())

	// nomes de variáveis podem ser omitidos, enviando os parâmetros em ordem
	var myOtherCar car[electricCar] = car[electricCar]{owner{"Someone"}, electricCar{4, 100}}
	fmt.Println(myOtherCar.engine.kmLeft())

	// ao usar a função podemos utilizar ambos os carros
	// pois ambos satisfazem os requisitos da interface
	var distance uint = 500
	fmt.Println("Gas Car: ", willReachDestination(myCar.engine, distance))
	fmt.Println("Electric car: ", willReachDestination(myOtherCar.engine, distance))
}
```
<br>

Fim✨, do básico até o não tão básico, cobrindo grande parte das estruturas da linguagem. Espero ter ajudado pelo menos um pouco no entendimento de como utilizar Golang
