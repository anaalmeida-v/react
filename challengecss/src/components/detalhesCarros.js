import React from 'react'
import styles from './detalhesCarros.module.css';


const detalhesCarros = ({ marca, anoVeiculo, cor }) => {
    return (
        <div className="detailscars">
                <h2>Detalhes do carro</h2>
                <ul>
                    <li>Marca: {marca}</li>
                    <li>Tipo: {anoVeiculo}</li>
                    <li>Cor: {cor}</li>
                </ul>
        </div>
    )
}
export default detalhesCarros