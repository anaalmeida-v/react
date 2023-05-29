import React from 'react'
import styles from './DetalhesCarros.module.css'


const detalhesCarros = ({ marca, anoVeiculo, cor }) => {
    return (
        <div>
            <div className="detailscars">
                <h2>Detalhes do carro</h2>
                <p>Marca: {marca}</p>
                <p>Tipo: {anoVeiculo}</p>
                <p>Cor: {cor}</p>
            </div>
        </div>
    )
}
export default detalhesCarros