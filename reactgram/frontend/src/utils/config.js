export const api = "http://localhost:5000/api"
export const uploads = "http://localhost:5000/uploads"

export const requestConfig = (method, data, token = null, image = null) => {
    //método da reqisição/dados que serão ou foram enviados/token para ver se há autenticação ou não/null-prevendo que user não está autenticado

    let config//muda baseada na requisição

    if (image) {
        config = {//se existir imagem, objeto será retornado
            method, //enviado pelo argumento
            body: data,//vem do argumento data
            headers: {}//precisam existir, mas estarão vazios 
        }
    } else if (method === "DELETE" || data === null) {//verificando se método é delete ou não há dados, um exemplo de se utilizar é a função de like, não há dados mais algo tem que ser retornado
        config = {
            method,
            headers: {}
        }//só é necessário definir o método e no servidor a função se resolve sozinha
    } else {//quando vem dados
        config = {
            method,
            body: JSON.stringify(data), 
            headers: {
                "Context-Type": "application/json"
            }
        }
    }
    if (token) {//se veio token será colocado nos headers//`Bearer ${token}`- para ter string dinâmica
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}