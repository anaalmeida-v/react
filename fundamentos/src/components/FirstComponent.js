//arquivo de estilo

import MyComponent from "./MyComponent"

const FirstComponent = () => {
    /*
    bla
    bla
    mult
    line
    */
    return (
        <div>
            {/*algum coment*/}
            <h1>Meu primeiro componente</h1>
            <p className="teste">Meu texto</p>
            <MyComponent />
        </div>
        //os elementos precisam ser encapsulados em uma única tag
    )
}

export default FirstComponent