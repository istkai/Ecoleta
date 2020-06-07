let express = require("express")
let server = express()

//* configurar pasta publica *//
server.use(express.static("public"))

//* template engine *//
let nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//* configurar caminhos *//

// página inicial
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu Marketplace de Coleta de Resíduos" })
})

// página de cadastro de ponto
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

// página de resultados de busca
server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
})

// iniciar servidor
server.listen(3000)