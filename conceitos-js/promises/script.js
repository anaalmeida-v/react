//criacao de promessa/promise

const myPromise = new Promise((resolve, reject) => {

    const nome = "Aninha"

    if (nome === "Aninha") {
        resolve('Usuário Aninha encontrada')
    } else {
        reject('Usuária Aninha não foi encontrada')
    }

})

myPromise.then((data) => {
    console.log(data)
})
//argumento qualquer para significar oq estou esperando da promessa

//Encadeamento de then's

const myPromise2 = new Promise((resolve, reject) => {

    const nome = "Aninha"

    if (nome === "Aninha") {
        resolve('Usuário Aninha encontrada')
    } else {
        reject('Usuária Aninha não foi encontrada')
    }
})

myPromise2.then((data) => {
    return data.toLowerCase()//conversao para letra minúscula
})
    .then((stringModificada) => {
        console.log(stringModificada)
    })
//.then - esta função possui dois parâmetros para lidar com o sucesso ou rejeição da promessa
//podem ser encadeados diversos then's

//Retorno do catch
const myPromise3 = new Promise((resolve, reject) => {
    const nome = 'João'

    if (nome === 'Matheus') {
        resolve("Usuário Matheus encontrado!")
    } else {
        reject("O usuário Matheus encontrado não foi encontrado!")
    }
})

myPromise3.then((data) => {//resgata dado
    console.log(data)//imprime dado
}).catch((err) => {
    console.log('Aconteceu um erro: ' + err)
})//catch - trata de erros

//para processos geralmente utiliza-se .then e .catch juntos

//Resolver várias promessas com all
//all - recebe array de promessas e entrega resposta apenas quando todas estão resolvidas
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('P1 ok! Timeout')
    }, 2000)
})

const p2 = new Promise((resolve, reject) => {
    resolve("P2 ok!")
})

const p3 = new Promise((resolve, reject) => {
    resolve("P3 ok!")
})

const resolveAll = Promise.all([p1, p2, p3]).then((data) => {
    console.log(data)
})

console.log('Depois do all()')

//Várias promessas com race
//race - recebe array de promessa, retorna mensagem que deu fim na promessa para primeira promessar
const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('P4 ok! Timeout')
    }, 2000)
})

const p5 = new Promise((resolve, reject) => {
    resolve("P5 ok!")
})

const p6 = new Promise((resolve, reject) => {
    resolve("P6 ok!")
})

const resolveAllRace = Promise.race([p4, p5, p6]).then((data) => {
    console.log(data)
})
//a que vem primeiro ganha a corrida

//Fetch request na API do GitHub
//Fetch API

const userName = 'aninhaalmeidav'

//fetch - retorna uma promessa
fetch(`https://api.com/users/${userName}`, {
    method: 'GET',//retornando metodo get
    headers: {
        Accept: 'application/vnd.github.v3+json,'//receber corretamente dados do github
    },//resolve, para depois exibir:
}).then((response) => {//recebe resposta
    console.log(typeof response)//ver do que a resposta é composta
    console.log(response)
    return response.json()//feito isso para podermos trabalhar com os dados
}).then((data) => {
    console.log(`O nome do usuário é: ${data.name}`)
}).catch((err) => {
    console.log(`Houve algum erro: ${err}`)
})