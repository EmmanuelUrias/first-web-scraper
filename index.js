const PORT = 3005
const cheerio = require('cheerio')
const axios = require('axios')
const express = require('express')
const methodOverride = require('method-override')


const app = express()

//Express Settings/ Middleware
app.set('views', __dirname + '/views')

app.set('view engine', 'jsx')

//
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

const url = 'https://www.theguardian.com/uk'

axios(url)
    .then(res => {
        const html = res.data
        const $ = cheerio.load(html)

        const articles = []

        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })

             articlesJSON = JSON.stringify(articles)
            return(articlesJSON)

        })
    }).catch(err => console.log(err))

    app.get('/', (req, res) => {
        res.json(articlesJSON)
    })


app.listen(PORT, () => console.log(`server rockin on port ${PORT}`))

