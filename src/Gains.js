import React, { useState, useEffect } from "react";
import $ from 'jquery';
import InputCustomizado from './Components/InputCustomizado';
import PubSub from 'pubsub-js';
import ManageErrors from "./ManageErrors";

export function GainForm() { 

    const [lista, setLista] = useState([]);
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [guardaDados, setGuardaDados] = useState({});

    var token1;
    var uid1;
    var client1;

    function enviaForm(evento) {
        evento.preventDefault();
        console.log("dados sendo enviados...");
        
        $.ajax({
            url: "https://fase08profitmanager-production.up.railway.app/api/v2/gains",
        
            contentType: 'application/json',
            dataType: 'json',
            accept: "application/json",

            headers: {
                "access-token": token1,
                "uid": uid1,
                "client": client1
            },
        
            type: 'post',
            data: JSON.stringify(
                {
                description: description,
                value: value,
                date: date
                }
            ),

            success: function(resposta){
                console.log("Sucesso!");
                console.log(resposta);
    
                var obj = guardaDados;
                $.each(resposta.data, function(index,value){
                obj[index] = value;
                });
                setGuardaDados(obj);
        
                setTimeout(function() {
                var novaLista = lista;
                novaLista.push(guardaDados);
        
                PubSub.publish('atualiza-lista-usuarios', novaLista);
                alert("Receita Cadastrada com Sucesso!")
                setDescription('');
                setValue('');
                setDate('');
                setGuardaDados({});
                setLista(novaLista);
                }, 10);
            },

            complete: function(resposta){
                console.log("Complete!!");
                console.log(resposta.getAllResponseHeaders());
                
                var obj = guardaDados;
                obj.token = resposta.getAllResponseHeaders('access-token');
                obj.client = resposta.getAllResponseHeaders('client');
                obj.uid = resposta.getAllResponseHeaders('uid');
                setGuardaDados(obj);
            },

            error: function(resposta){ 

                if(resposta.status === 401){
                    new ManageErrors().publishErrorsValidation(resposta.responseJSON);
                }

                if(resposta.status === 422){
                    new ManageErrors().publishErrorsGE(resposta.responseJSON);
                }
            }
            
        });
    
    }

    return(
        <div>						
            <h1 class="h2">Cadastro de Usuários</h1>						
            <form method="post" onSubmit={enviaForm}>
                  
                <InputCustomizado type="text" id="description" name="description" placeholder="Descrição" label="Descrição" value={description} onChange={e => setDescription(e.target.value)}  />

                <InputCustomizado type="number" id="value" name="value" placeholder="Valor" label="Valor" value={value} onChange={e => setValue(e.target.value)}/>

                <InputCustomizado type="date" id="date" name="date" placeholder="Data" label="Data" value={date} onChange={e => setDate(e.target.value)}/>

                <button type="submit" class="btn btn-primary">Inscrever-se</button>
            </form>						
    </div>
    );
}

export function GainTable() {
    return(

    );
}

function GainBox(){
    return(
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      
            <br />
        
            <GainForm/>
  
            <br />
        
            <GainTable/>
  
        </main>
    );
}

export default GainBox;