# Consideraciones

Se intento desplegar desde el repo actual pero no fue posible pues toma todas las carpetas por lo que se tuvo que generar uno nuevo

# Ejecucion

Se disponibilizan por proyecto anterior tanto info como rando. Para esta segunda esta pendiente la configuracion desde google apps para que autorice el dominio herokuapp como url-callback.
https://c0ntigosalud.herokuapp.com/info
https://c0ntigosalud.herokuapp.com/random

# Analisis

Como se solicita en la consigna, se debe demostrar el log del server. En este ejemplo al fina se imprime en la consola la uri a la cual se intenta acceder (/hola)

```
2021-07-20T04:18:24.340950+00:00 heroku[web.1]: Starting process with command `npm start`
2021-07-20T04:18:27.035813+00:00 app[web.1]:
2021-07-20T04:18:27.035832+00:00 app[web.1]: > commonjs@1.0.0 start /app
2021-07-20T04:18:27.035833+00:00 app[web.1]: > node .
2021-07-20T04:18:27.035833+00:00 app[web.1]:
2021-07-20T04:18:27.253095+00:00 app[web.1]: Warning: connect.session() MemoryStore is not
2021-07-20T04:18:27.253096+00:00 app[web.1]: designed for a production environment, as it will leak
2021-07-20T04:18:27.253097+00:00 app[web.1]: memory, and will not scale past a single process.
2021-07-20T04:18:27.259649+00:00 app[web.1]: Application is listening at port 18905
2021-07-20T04:18:28.579266+00:00 heroku[web.1]: State changed from starting to up
2021-07-20T04:21:00.000000+00:00 app[api]: Build started by user rafael@contigosalud.cl
2021-07-20T04:21:17.398343+00:00 app[api]: Deploy 28c2ea71 by user rafael@contigosalud.cl
2021-07-20T04:21:17.398343+00:00 app[api]: Release v5 created by user rafael@contigosalud.cl
2021-07-20T04:21:18.178530+00:00 heroku[web.1]: Restarting
2021-07-20T04:21:18.194320+00:00 heroku[web.1]: State changed from up to starting
2021-07-20T04:21:17.000000+00:00 app[api]: Build succeeded
2021-07-20T04:21:19.204116+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2021-07-20T04:21:19.313959+00:00 heroku[web.1]: Process exited with status 143
2021-07-20T04:21:21.192783+00:00 heroku[web.1]: Starting process with command `npm start`
2021-07-20T04:21:24.555336+00:00 app[web.1]:
2021-07-20T04:21:24.555362+00:00 app[web.1]: > commonjs@1.0.0 start /app
2021-07-20T04:21:24.555363+00:00 app[web.1]: > node .
2021-07-20T04:21:24.555363+00:00 app[web.1]:
2021-07-20T04:21:24.895775+00:00 app[web.1]: Warning: connect.session() MemoryStore is not
2021-07-20T04:21:24.896755+00:00 app[web.1]: designed for a production environment, as it will leak
2021-07-20T04:21:24.896756+00:00 app[web.1]: memory, and will not scale past a single process.
2021-07-20T04:21:24.906281+00:00 app[web.1]: Application is listening at port 55730
2021-07-20T04:21:25.425310+00:00 heroku[web.1]: State changed from starting to up
2021-07-20T04:21:45.812518+00:00 app[web.1]: /favicon.ico
2021-07-20T04:21:45.828004+00:00 heroku[router]: at=info method=GET path="/favicon.ico" host=c0ntigosalud.herokuapp.com request_id=fbf73b30-b0c6-432d-8542-834524c09615 fwd="190.20.163.28" dyno=web.1 connect=1ms service=42ms status=200 bytes=354 protocol=https
2021-07-20T04:21:49.930496+00:00 app[web.1]: /hola
2021-07-20T04:21:49.934989+00:00 heroku[router]: at=info method=GET path="/hola" host=c0ntigosalud.herokuapp.com request_id=faac37a0-53b8-4355-8c79-f5f552f17f36 fwd="190.20.163.28" dyno=web.1 connect=1ms service=12ms status=200 bytes=228 protocol=https
2021-07-20T04:21:50.382008+00:00 app[web.1]: /favicon.ico
2021-07-20T04:21:50.383806+00:00 heroku[router]: at=info method=GET path="/favicon.ico" host=c0ntigosalud.herokuapp.com request_id=35aeeec2-c803-4727-811f-0e9ab4483d9d fwd="190.20.163.28" dyno=web.1 connect=1ms service=4ms status=304 bytes=150 protocol=https
2021-07-20T04:21:52.094371+00:00 heroku[router]: at=info method=GET path="/hola" host=c0ntigosalud.herokuapp.com request_id=95624ec7-ff3c-4b79-8fcb-885bfa28515f fwd="190.208.14.8" dyno=web.1 connect=1ms service=5ms status=200 bytes=356 protocol=https
2021-07-20T04:21:52.092270+00:00 app[web.1]: /hola
```
