# Story: Renting a car

## Use Case 01

As a system user
In order to get an available car in a specific category
Given a car category containing 3 different cars
When I check if there's a car available
Then it should choose randomly a car from the category chosen

## Use Case 02

As a system user
In order to calculate the final renting price
Given a customer who wants to rent a car for 5 days
And he is 50 years old
When he chooses a car category that costs $37.6 per day
Then I must add the Tax of his age which is 30% to the car category price
Then the final formula will be `((price per day * Tax) * number of days)`
And the final result will be `((37.6 * 1.3) * 5)= 244.4`
And the final price will be printed in Brazilian Portuguese format as "R$ 244,40"

## Use Case 03

As a system user
In order to register a renting transaction
Given a registered customer who is 50 years old
And a car model that costs $37.6 per day
And a delivery date that is for 05 days behind
And given an actual date 05/11/2020
When I rent a car I should see the customer data
And the car selected
And the final price which will be R$ 244,40
And DueDate which will be printed in Brazilian Portuguese format "10 de Novembro de 2020"

# História: Alugar um carro

## Caso de Uso 01

Como um usuário do sistema
Para obter um carro disponível em uma categoria específica
Dada uma categoria de carro contendo 3 carros diferentes
Quando eu verificar se há um carro disponível
Então ele deve escolher aleatoriamente um carro da categoria escolhida

## Caso de Uso 02

Como um usuário do sistema
Para calcular o preço final do aluguel
Dado um cliente que deseja alugar um carro por 5 dias
E ele tem 50 anos
Quando ele escolher uma categoria de carro que custa $37,6 por dia
Então devo adicionar o imposto da idade dele que é 30% ao preço da categoria do carro
Então a fórmula final será `((preço por dia * Imposto) * número de dias)`
E o resultado final será `((37,6 * 1,3) * 5) = 244,4`
E o preço final será impresso no formato brasileiro como "R$ 244,40"

## Caso de Uso 03

Como um usuário do sistema
Para registrar uma transação de aluguel
Dado um cliente registrado que tem 50 anos
E um modelo de carro que custa $37,6 por dia
E uma data de entrega que é para 05 dias atrás
E dada uma data atual 05/11/2020
Quando eu alugar um carro, devo ver os dados do cliente
E o carro selecionado
E o preço final que será R$ 244,40
E a data de vencimento que será impressa no formato brasileiro "10 de Novembro de 2020"
