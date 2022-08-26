import { Application, Router } from "https://deno.land/x/oak/mod.ts";

localStorage.clear();

const app = new Application();

const router = new Router();


router
  .get('/color', (ctx) => {
    const color = localStorage.getItem('color')
    const msj =  color ? `El color asignado es el ${color}` :'Todavia no se asignó ningun color'
    ctx.response.body = msj;
  })
  .get('/color/:color', (ctx) => {
    localStorage.setItem("color", ctx.params.color);
    ctx.response.body = `Se ha asignado el color: ${ctx.params.color}`;
  });



app.use(router.routes());
app.use(router.allowedMethods());

const env = Deno.env.toObject()
console.log(env)
const PORT = env.PORT || 4000
const HOST = env.HOST || '127.0.0.1'

console.log(`Server iniciado en el puerto ${PORT}...`)
await app.listen(`${HOST}:${PORT}`)
//instalar deno sobre powershell irm https://deno.land/install.ps1 | iex
//para correr: deno run --allow-net --allow-env app.ts
