const express = require('express')
const app= express()
const path= require('path')
const port = 8080
const appCadastro= 'cadastro-de-motociclistas'
app.use(express.static('./dist/'+ appCadastro))
app.set('port', port)

app.get('/*', (req, res, next) => {
    return res.sendFile(path.join(__dirname,'/dist/'+ appCadastro + '/index.html'))

})


app.listen(app.get('port'), () => {
    console.log('Servidor tá ok')
})
