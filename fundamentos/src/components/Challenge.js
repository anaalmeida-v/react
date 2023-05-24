const Challenge = () => {
    const a = 1
    const b = 2
    const soma =a + b
    return (
        <div>
            <div>
                <p>A:{a}</p>
                <p>B:{b}</p>
                <button onClick={() => {
                    console.log(soma)
                }}>Soma de A e B</button>
            </div>
        </div>
    )
}

export default Challenge