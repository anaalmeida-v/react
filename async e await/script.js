/*
function primeiraFuncao() {

    return new Promise((resolve) => {

        setTimeout(() => {
            console.log("Eperou isso aqui!")
            resolve()
        }, 1000)
    })
}

async function segundaFuncao() {

    console.log(iniciou)

    await primeiraFuncao()
    //utilizado para basicamente esperar para algum retorno ser feito
    console.log(terminou)
}

segundaFuncao()
*/
//Um exemplo: uma inserção de dados no banco pode demorar um pouco, então para receber uma resposta positiva antes de tomar outra ação condicionamos a inserção em uma função assíncrona

//prático 
function getUser(id) {

    return fetch(`http://regres.in/api/user?id=${id}`)
        .then(data => data.json())
        .catch((err) => console.log(err))
}

async function showUserName(id) {


    try{

    }catch(err){
        console.log(`Erro: ${err}`)
    }
    const user = await getUser(id)
    console.log(`O nome do usuário é: ${user.data.first_name}`)
}

showUserName(3)