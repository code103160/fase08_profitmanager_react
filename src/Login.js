import React, { useState } from "react";
import $ from 'jquery';
import InputCustomizado from "./Components/InputCustomizado";
import ManageErrors from "./ManageErrors";
import PubSub from "pubsub-js";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [guardaDados, setGuardaDados] = useState('');

    function enviaForm(evento){
        evento.preventDefault();
        console.log('Dados de login sendo enviados')

        $.ajax({
            url: "https://fase08profitmanager-production.up.railway.app/api/v2/auth/sign_in",
    
            contentType: 'application/json',
            dataType: 'json',
            accept: "application/json",
            
            type: 'post',
            data: JSON.stringify({
                email: email,
                password: password,
            }),

            success: function(resposta) {
                console.log('Sucesso!');
                console.log(resposta);
                alert('Login efetuado com sucesso!');
            },

            complete: function(resposta) {
                console.log('Complete');
                console.log(resposta.getAllResponseHeaders());

                var obj = guardaDados;
                obj.token = resposta.getAllResponseHeaders('access-token');
                obj.client = resposta.getAllResponseHeaders('client');
                obj.uid = resposta.getResponseHeader('uid');
                setGuardaDados(obj);

                PubSub.publish('access-token', obj.token);
                PubSub.publish('client', obj.client);
                PubSub.publish('uid', obj.uid);
            },

            error: function(resposta) {
                if(resposta.status === 422) {
                    new ManageErrors().publishErrorsValidation(resposta.responseJSON);
                }
            }
        });
    }

    return(
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
						
            <br />
            
            <div>						
                <h1 class="h2">Login</h1>						
                <form onSubmit={enviaForm} method="post">
                    <div class="form-group">
                        <InputCustomizado type="email" id="email" name="email" placeholder="E-mail" label="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <InputCustomizado type="password" id="password" name="password" placeholder="Senha" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" class="btn btn-primary">Entrar</button>
                </form>						
            </div>
            
        </main>
    );
}
export default Login;