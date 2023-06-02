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
    return data.toLowerCase()
})
.then((stringModificada) => {
    console.log(stringModificada)
})