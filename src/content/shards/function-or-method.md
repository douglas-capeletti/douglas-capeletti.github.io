---
title: "Função ou método?"
pubDate: "2024-09-29"
tags: ["functions", "methods"]
---

## Mas qual a diferença?

A: É, existe uma diferença.<br>
B: Mas eu escrevo tudo com *func ou fun ou function*, então é tudo função, certo?<br>
A: Sim, e não.<br>

Sim, são todas funções, porém funções associadas a um objeto ou classe são chamadas de métodos, eles geralmente processam valores internos daquele objeto ou classe dado que estas funções não poderão ser utilizadas fora daquele objeto, o que chamamos de encapsulamento (um dos pilares da POO)

Exemplo:

``` java
class Person {
    String firstName;
    String lastName;

    // Este é um método, ele está associado ao objeto Person
    String getFullName(){
        return this.firstName + " " + this.lastName;
    }
}

class Main {
    public static void main(String...args){
        // Criando um objeto
        var person = new Person();
        // Chamando o método do objeto;
        var fullName = person.getFullName();
        // Chamando uma função
        var splittedString = Main.splitString(fullName);
    }

    // Esta é uma função, ela não está associada a nada
    // portanto pode ser executada com qualquer valor
    static String[] splitString(String source){
        return source.split(" ");
    }
}
```
