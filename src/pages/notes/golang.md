---
title: "Golang - Resumo Rápido (wip)"
pubDate: "2024-09-16:00:00"
slug: "golang-quick-overview"
hero: "/images/golang.jpg"
tags: ["golang", "programming languages"]
layout: "../../layouts/PostLayout.astro"
---

## Caracteristicas
- linguagem compilada direto para binário
- binário grande
- linguagem simples 
- projetada para concorrencia
- variáveis ou métodos criados PRECISAM ser utilizados ou não irá compilar 
- [como instalar em qualquer plataforma](http://go.dev/doc/install)

### Padrões de uso da linguagem
- letra inicial maiúscula em uma função determina que ela será publica
- não há getters nem setters, caso necessário uso de um get, utilize a declaracao do campo com letra minuscula e crie um método com o mesmo nome do campo porém com letra maiúscula, desta forma a função será exportado e quem utilizar não verá diferença, para o setter, utilize o padrão SetCampo para alterar o valor do campo caso necessário
- ao nomear interfaces utilize verbos, Reader, Writter..., assim o método será o substantivo daquele verbo (Read, Write)
- caso implemente uma conversão para um tipo conhecido, utilize o nome do tipo diretamente exemplo: String() e não ToString()
- nomes de pacotes dever ser pequenos
- utilize MixedCaps como padrão, iniciando ou não com maiúscula conforme visibilidade do médoto ou variável
- estrutura de projeto
``` yaml
  moduleFolder:
    cmd:
      # como os pacotes são exportados individualmente
      # o main fica separado para quem importar poder executar seu próprio main
      - main.go       
      
```

### Módulos & Pacotes
``` yaml
  Modulo: Coleção de pacotes
    - Pacote:
      - file.go
    - Pacote:
      - file.go
      - file.go
```
Como criar um módulo
```sh
  go mod init myModule # ou github.com/<user>/<repo_do_modulo>
```
output
``` sh
  module myModule

  go 1.23 # active version
```


Pacote Main <br>
todo pacote main precisa ter uma funcao chamada main, caso contrato terá um erro de compilação

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

### Tipos

#### Tipos de variáveis
``` go
  const myConst // imutável ou constante
  var myVar  // mutável porém de tipagem forte e estática

  myVar = "some value" // tipo inferido (string)
  myVar = 10 // erro 
```

### Tipos da dados básicos
``` yaml
  Booleano: 
    Default: false
    - bool: true ou false
  Ponto Flutuante:
    Dafault: 0.0
    - float32: 32 bits = -3.4e+38 to 3.4e+38
    - float64: 64 bits = -1.7e+308 to +1.7e+308
  Caracter:
    Default: 0
    - byte: alias for uint8
    - rune: alias for int32
  Texto:
    Default: ''
    - string
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

### Declaração de variáveis
``` go
  var intNum int
  anotherInt := 0
  var some, other = 1, 2
  look, again := 3, 4
  // only one way for constants, sorry
```

### Cálculos básicos
``` go
  // cast é necessário para fazer os cálculo
  var numFloat32 float32 = 10.1
  var numInt32 int32 = 2
  var result float32 = numFloat32 + float32(numInt32)
  fmt.Println(result)

  var numInt1 int = 3
  var numInt2 int = 2
  fmt.Println(numInt1/numInt2) // 1 | arredondamento para int
  fmt.Println(numInt1%numInt2) // 1 | operação com resto de divisão

  var simpleString string = "Hello \nworld!"
  var stringBlock string = `Hello
  world!`

  fmt.Println(simpleString) // mesmo resultado
  fmt.Println(stringBlock) // nos dois

  fmt.Println(len("atenção")) // 9 | número de bytes em ASCII 256
  fmt.Println(len("atencao")) // 7 | parece estar certo, mas não funciona sempre

  import "unicode/utf8"
  fmt.Println(utf8.RuneCountInString("atenção")) // resultado correto sempre

  var myRune rune = 'a'
  fmt.Println(myRune) // 97 | int32 ele imprime o valor numérico

  var myBoolean bool = false // como alquer linguagem, simples
```

### Declarando Funções

``` go
  // Forma comum vista em outras linguagens
  func functionName(param1 string, param2 int) string {
    return "result"
  }

  // returnando mais de um resultado
  func multipleReturns(param1 string, param2 int) (string, int) {
    return "result", 10
  }

  // ao chamar a funcao devemos receber os dois dados
  var first, second = multipleReturns("something", 1)

  import "errors" // pacote de error da biblioteca padrão
  // golang não tem try-catch então todos os errors são tratados no retorno da função
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
  // por padrão devemos retornar primeiro o erro para que ele não seja ignorado acidentalmente
  _, response2 := withError(false)

  // funcoes também podem ser atribuídas a objetos
  func (ball) roll() {
    ball.position++
  }
  // assim quando declaramos uma nova bola
  newBall := ball.New()
  // temos o método novo acessivel a ele
  // isso permite estender estruturas de bibliotecas externas, ou até mesmo internas
  // podemos atribuir métodos novos para o tipo string por exemplo
  newBall.roll()
```

### Outras estruturas de controle
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

	// no switch, o break é inplicito sobre cada condição
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

### Estruturas de dados
``` go
  // ARRAYS
  // Tamanho fixo | mesmo tipo de dados | indexável | contínuo na memória
  var intArr[3]int32
  intArr[1] = 123 // atribuindo no index
  fmt.Println(intArr[0]) // imprimindo posicao 0
  fmt.Println(intArr[1:3]) // imprimindo de 1 até 2 (intervalo aberto no 3)

  fmt.Println(&intArr[0]) // imprimindo o endereço de memória
  fmt.Println(&intArr[1]) // assim temos como ver que eles ficam
  fmt.Println(&intArr[2]) // um do lado do outro

  // poderiamos ter inicializado o array assim também
  anotherIntArr := [3]int32{3, 2, 1}
  fmt.Println(anotherIntArr[0:3])
```
``` go
  // SLICES
  // Wrapper para array, ou um array com funcionalidades extras
  // ao omitir o tamanho, temos um slice, que será gerado dinamicamente
  intSlice := []int32{1, 2, 3}
  // tamanho do array, é a quantidade de items, capacidade, é a memória alocada para o array
  fmt.Printf("O tamanho do array é %v porém a capacidade é %v = ", len(intSlice), cap(intSlice)) // 3 & 3
  fmt.Println(intSlice)

  // podemos adicionar valores extras
  intSlice = append(intSlice, 7)
  // porém ao exceder a capacidade do array original, a capacidade é DOBRADA
  // porém não podemos acessar estes valores que estão fora do array
  fmt.Printf("O tamanho do array é %v porém a capacidade é %v = ", len(intSlice), cap(intSlice)) // 4 & 6
  fmt.Println(intSlice)

  // poderiamos criar um novo array especificando tamanho e capacidade
  // make é uma função 'fábrica' para os tipos básicos
  // int[] é o tipo, 3 o tamanho, 8 a capacidade
  var intSlice2 []int32 = make([]int32, 3, 8)

  // podemos inserir os dados no FIM de outro array via funcao append com o operador spread (...)
  intSlice2[0] = 10
  intSlice2 = append(intSlice, intSlice2...) // [10, 0, 0, 1, 2, 3, 7]
  fmt.Println(intSlice2)

  // iterando...
  for index, value := range intSlice2 {
    fmt.Println("Index: " + index + " Value: " + value)
  }
```
``` go
  // MAPS
  
  // podemos criar um mapa desta forma
  var myMap map[string]uint8 = make(map[string]uint8)
  fmt.Println(myMap)

  // ou diretamente atribuindo valores
  MyMap2 := map[string]uint8}{"James":5 "Tiberius":8 "Kirk":4 }
  fmt.Println(myMap2["James"]) // 7
  
  // nesse caso, ele retorna o valor padrão do tipo, nesse caso do uint8 é 0
  fmt.Println(myMap2["Spock"])
  // podemos deletar um valor usando a funcao delete
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

### Iterando
ponto importante, golang não tem 'while', então existem variações no for para lidar com todos os cenários necessários
``` go
  // Loop basico 'while'
  var i int = 0
  for i<10 {
    fmt.Println(i)
    i += 1
  }

  // Loop sem condição 
  i=0 // resetando
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

  // for range (ou foreach)
  intSlice := []int32{1, 2, 3}
  for index, value := range intSlice {
    fmt.Println("Index: " + index + " Value: " + value)
  }

  // podemos ignorar o indice também
  for _, value := range intSlice {
    fmt.Println("Index: " + index + " Value: " + value)
  }
```

### Tomorrow, will see STRINGS, RUNES & BYTES


