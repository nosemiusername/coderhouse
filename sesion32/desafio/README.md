# Consideraciones

El metodo desarrollado en el desafio anterior de division, se desarrollan una version con seccion bloqueante y otro no bloquante

# Ejecucion

## Profiler

### Detalle de la ejecución

Se ejecuto 50 conexiones con 50 request de modo de marcar mayor diferencias

### Resultados

Bloquente Mean response/sec: 222.42
No Bloqueante Mean response/sec: 282.81

```
[Summary Bloquente]:
ticks total nonlib name
156 2.3% 2.3% JavaScript
6587 97.0% 97.5% C++
84 1.2% 1.2% GC
33 0.5% Shared libraries
12 0.2% Unaccounted
```

```
[Summary No Bloquente]:
ticks total nonlib name
107 2.0% 2.0% JavaScript
5267 97.1% 97.9% C++
118 2.2% 2.2% GC
43 0.8% Shared libraries
8 0.1% Unaccounted
```

### Conclusion

El no bloqueante ejecuta un 20% de transacciones mas por segundo.

Por otro lado, si bien realiza el codigo bloqueante menos ticks que el no bloqueante en librerias compartidas, en la ejecucion de codigo nativo Js o C++ la diferencia es significativa siendo mucho menor la del codigo no bloqueante.

## Autocannon y flamechart

### Resultados

**No bloqueante**

Stat | 2.5% | 50% | 97.5% | 99% | Avg | Stdev | Max
---- | ---- | --- | ----- | --- | --- | ----- | --- 
Latency | 3 ms | 3 ms | 15 ms | 20 ms | 4.78 ms | 3.93 ms | 66 ms

Stat | 1% | 2.5% | 50% | 97.5% | Avg | Stdev | Min
---- | ---- | --- | ----- | --- | --- | ----- | --- 
Req/Sec | 819 | 819 | 2129 | 2249 | 1906 | 446.14 | 819
Bytes/Sec | 221 kB | 221 kB | 575 kB | 607 kB | 515 kB | 120 kB | 221 kB

**Bloqueante**

Stat | 2.5% | 50% | 97.5% | 99% | Avg | Stdev | Max
---- | ---- | --- | ----- | --- | --- | ----- | --- 
Latency | 4 ms | 6 ms | 22 ms | 27 ms | 8.35 ms | 5.28 ms | 80 ms

Stat | 1% | 2.5% | 50% | 97.5% | Avg | Stdev | Min
---- | ---- | --- | ----- | --- | --- | ----- | --- 
Req/Sec | 687 | 687 | 1199 | 1300 | 1128.55 | 180.76 | 687
Bytes/Sec | 186 kB | 186 kB | 324 kB | 351 kB | 305 kB | 48.8 kB | 185 kB

```
Socket.\_writeGeneric node:net:747:42
Top of Stack: 4.7% (2446 of 52144 samples)
On Stack: 5.6% (2919 of 52144 samples)
```

### Conclusion

De la inspeccion del famechart, sobre la representacion donde era mas intesiva en usos de cpu, y con mayor prevalencia de casos se observa que en el stack-trace lo mas recurrente es la llamada a Socket.\_writeGeneric. Si bien no fue posible determinar con precision que se debia al console.log si se identifico que esta relaccionada.

## Inspect

Se realiza el analisis del inspect de chrome, y se obtiene como resultado que las lineas de codigo menos performantes son

**7ms**

```
    console.log(req.query);
```

y

**21ms**

```
    } else error("Not numeric values")
```

Hasta los analisis anteriores no se habia abordado el error("Not numeric values") dado que no se habia probado el caso de error. Es por ello que representa un hatllazgo lo anterior, se deberia evaluar cambiar el error por ser una instruccion bloqueante.
