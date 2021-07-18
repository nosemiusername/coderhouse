# Consideraciones

El metodo desarrollado en el desafio anterior de division, se desarrollan una version con seccion bloqueante y otro no bloquante

# Ejecucion

1. Profiler

Detalle de la ejecución

Se ejecuto 50 conexiones con 50 request de modo de marcar mayor diferencias

Resultados

Bloquente Mean response/sec: 222.42
No Bloqueante Mean response/sec: 282.81

[Summary Bloquente]:
ticks total nonlib name
156 2.3% 2.3% JavaScript
6587 97.0% 97.5% C++
84 1.2% 1.2% GC
33 0.5% Shared libraries
12 0.2% Unaccounted

[Summary No Bloquente]:
ticks total nonlib name
107 2.0% 2.0% JavaScript
5267 97.1% 97.9% C++
118 2.2% 2.2% GC
43 0.8% Shared libraries
8 0.1% Unaccounted

Analisis

El no bloqueante ejecuta un 20% de transacciones mas por segundo.

Por otro lado, si bien realiza el codigo bloqueante menos ticks que el no bloqueante en librerias compartidas, en la ejecucion de codigo nativo Js o C++ la diferencia es significativa siendo mucho menor la del codigo no bloqueante.
