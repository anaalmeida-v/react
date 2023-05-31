//OBJ JS
const obj = [{
    nome: 'Matheus',
    idade:30,
    esta_trabahando: true,
    hobbies: ['Programar', 'Correr', 'Ler'],
    detalhes_profissao:{
          profissao: 'Programador',
          empresa: 'Empresa x'
    }
},
{
    nome: 'João',
    idaade: 25,
    esta_trabahando: false,
    hobbies: ['Jogar', 'Academia'],
    detalhes_profissao:{
          profissao: null,
          empresa: null
    }
}]

//json
const objs = {
    "nome": "Matheus",
    "idade":30,
    "esta_trabahando": true,
    "hobbies": ["Programar", "Correr", "Ler"],
    "detalhes_profissao":{
          "profissao": "Programador",
          "empresa": "Empresa x"
    }
}

//converter objeto para json
const jsonData = JSON.stringify(obj)

console.log(jsonData)
console.log(typeof jsonData)

//converter json para objeto
const objData = JSON.parse(jsonData)

console.log(objData)
console.log(typeof objData)

objData.map((pessoa) => {
    console.log(pessoa.nome)
})