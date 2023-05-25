import { useState } from "react"

const UserDetails = ({ nome, idade, profissao}) => {

    return (
        <div>
            <h2>User Details</h2>
            <ul>
                <li>Nome: {nome}</li>
                <li>Idade: {idade}</li>
                <li>Profissão: {profissao}</li>
            </ul>
            {idade >= 18 ? (
                <div>
                    <p>Pode tirar carteira de habilitação!</p>
                </div>
            ) : (
                <div>
                    <p>Não pode tirar carteira de habilitação</p>
                </div>
            )}
        </div>
    )
}
export default UserDetails