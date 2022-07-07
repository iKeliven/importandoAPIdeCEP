import React, { }  from 'react';
import { useState } from   'react';
import { FaCcApplePay, FaSearch } from "react-icons/fa";
import './styles.css';

import api from './services/api'

function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({});

    async function handleSearch(){
//      alert("Valor do input: " + input)
        if(input === ''){
            alert("Preencha algum cep!")
            return;
        }

        try{
            const response = await api.get(`${input}/json`);
//            console.log(response.data)
            setCep(response.data)
            setInput("");
        }catch{
            alert("Ops... Erro ao buscar o CEP!");
            setInput("")
        }
    }

    return ( 
    <div className = "container" >
        <h1 className="title">Buscador CEP</h1>
        <div className="containerInput">
            <input 
            type="text"
            placeholder="Digite o cep"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />

            <button className="buttonSearch" onClick={handleSearch}>
                <FaSearch size={25} color="#000"/>
            </button>
        </div>

        {Object.keys(cep).length > 0 && (
            <main className="main">
                <h2>CEP: {cep.cep}</h2>
                <p>Rua: {cep.logradouro}</p>
                <spam>Bairro: {cep.bairro}</spam>
                <spam>Cidade: {cep.localidade} - {cep.uf}</spam>
            </main>
        )}
        
    </div>
    );
}

export default App;