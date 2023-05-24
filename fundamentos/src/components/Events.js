const Events = () => {
    const handleMyEvent = (e) => {
        console.log(e)
        {/*fazendo isso, informações importantes para a aplicação do evento são exibidas*/}

        console.log("Ativou o evento!")
    }
    return(
        <div>
            <div>
                <button onClick={handleMyEvent}>Clique aqui!</button>
                {/*se parenteses são colocados logo após o evento, evento será disparado após a
                leitura do mesmo*/}
            </div>
        </div>
    )
}

export default Events