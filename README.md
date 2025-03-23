[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/nao75Rei)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18539287)

# <span style="color: #8b0fb6;">PRÁCTICA 7 - THE WITCHER</span>
## DESARROLLO EN SISTEMAS INFORMÁTICOS 
### INÉS CABRERA BETANCOR
### ESTELA FERNÁNDEZ TRUJILLO
### MARTA ROSA CORDERO

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupi/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupi/actions/workflows/ci.yml)

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupi/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2425/prct07-witcher-datamodel-groupi?branch=main)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupi&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2425_prct07-witcher-datamodel-groupi)

[! Link al libro](https://puntoq.ull.es/permalink/34ULL_INST/kkpv9/alma991000487140308901)

# Informe de la práctica
En este informe se detallarán una serie de problemas que hemos tenido a la hora de resolver la práctica.

### LOWDB
Hemos encontrado numerosos problemas a la hora de poder leer de ficheros para instanciar los gestores a partir de un fichero json. Es por ello que hemos intentado implementarlo a todo costa. Dichos intentos se ven reflejado en los ficheros DataBaseGestor.ts y main.ts en los cuales no hemos podido encontrar los errores de cargar de la base de datos.

Por otro lado, no queríamos dejar de presentar un trabajo bien hecho donde se demuestre el correcto funcionamiento del inquirer junto a la estructura del juego The Witcher. Por tanto, hemos aportado un index.ts donde la "base de datos" se carga a mano, junto al fichero tools.ts donde hemos implementado funciones con lowdb para generar los ficheros que se piden en al práctica.

En resumen:
main.ts + DataBaseGestor -> compila pero da errores de ejecución pero es una aproximación a nuestra base de datos.
index.ts + tools.ts -> compila y ejecuta pero la base de datos es hecha a mano.
