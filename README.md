# Like Food


<h1 align="center">
    <img src=".github/icone.png" width="220px" />
</h1>

- [Like Food](#like-food)
- [Descrição](#descrição)
- [O que é](#o-que-é)
- [Tecnologias](#tecnologias)
	- [Front-end](#front-end)
	- [Back-end](#back-end)
- [Como Compilar e Rodar](#como-compilar-e-rodar)
- [Dependencias](#dependencias)

# Descrição

Projeto para avaliação de restaurantes e lanchonetes criado durante a matérias CE-288 (Sistemas Lógicos) do ITA (Instituto Tecnológico de Aeronáutica)

# O que é

Aplicativo como o Tinder, mas para procura companhia para ir a restaurantes e lanchonetes.

O aplicativo mostraria as opções de pratos e o usuário daria o like ou dislike conforme queira ou não ir experimentar.
Quando alguns usuários derem like no mesmo prato, o aplicativo avisa os usuários e eles podem combinar quando irem ao restaurante.
As preferências do usuário poderiam ser pela distância máxima de onde ele está, quantidade máxima e mínima de pessoas, e outras coisas.

A ideia inicial é colocar pratos por tipo, por exemplo "hambúrguer de panceta". Os usuários que derem like, iriam conversar, ver onde existe essa opção é combinarem de ir. Posteriormente seria possível vender para os restaurantes, que colocariam especificamente: "hambúrguer de panceta com creme de cebolas, provolone e batatas no restaurante X por tantos reais. Endereço tal". Mas essa ideia seria para uma versão posterior.

# Tecnologias

## Front-end
- Ionic (Cordova)

## Back-end
- NodeJs
- MongoDB

# Como Compilar e Rodar

- Instalar o NodeJs: http://nodejs.org
- Abrir o prompt na pasta "\frontend\like-food-app"
- Executar os comandos abaixo

# Dependencias
``` console
npm install -g cordova ionic
npm install mongoose --save
ionic serve
```