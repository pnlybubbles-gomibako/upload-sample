const Koa = require('koa')
const router = require('koa-route')
const serve = require('koa-static')
const body = require('koa-body')
const logger = require('koa-logger')
const path = require('path')

const app = new Koa()

app.use(body({
  multipart: true,
  formidable: {
    keepExtensions: true,
    uploadDir: path.resolve(__dirname, 'uploads')
  }
}))
app.use(serve(path.resolve(__dirname, 'static')))
app.use(logger())
app.use(router.post('/upload', ctx => {
  console.log(ctx.request.body.files)
  ctx.body = { status: 'success' }
}))

app.listen(4000)
