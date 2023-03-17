import React, { useState, useEffect } from "react";
import $ from 'jquery';
import InputCustomizado from './Components/InputCustomizado';
import PubSub from 'pubsub-js';
import ManageErrors from "./ManageErrors";

export function UserForm() {

  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [guardaDados, setGuardaDados] = useState({});


  function enviaForm(evento) {
    evento.preventDefault();
    console.log("dados sendo enviados...");
    
    $.ajax({
      url: "https://fase08profitmanager-production.up.railway.app/api/v2/auth",
    
      contentType: 'application/json',
      dataType: 'json',
      accept: "application/json",
    
      type: 'post',
      data: JSON.stringify(
        {
          name: nome,
          email: email,
          password: password,
          password_confirmation: password_confirmation
        }
      ),


    
      success: function(resposta){
        console.log("Sucesso!");
        console.log(resposta);

        $.each(resposta.data,function(index,value){

          guardaDados[index] = value;

        });

      setTimeout(function() {

        var novaLista = this.state.lista;
        novaLista.push(this.guardaDados);
        //this.setState({lista:novaLista});

        PubSub.publish('atualiza-lista-usuarios', novaLista);
        alert("Cadastro efetuado com Sucesso!")
        this.setState = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '' 
        }

              this.guardaDados = {};

            }.bind(this), 10);

          }.bind(this),

          complete: function(resposta){
            console.log("Complete!!");
            console.log(resposta.getAllResponseHeaders());
            
            this.guardaDados.token = resposta.getResponseHeader('access-token');
            this.guardaDados.client = resposta.getResponseHeader('client');
            this.guardaDados.uid = resposta.getResponseHeader('uid');
          },

          error: function(resposta){
            
            if(resposta.status === 422){
              new ManageErrors().publishErrors(resposta.responseJSON);
            }

          }
        });
      }
    

        return(

            <div>						
                <h1 class="h2">Cadastro de Usuários</h1>						
                <form method="post" onSubmit={this.enviaForm}>
                  
                  <InputCustomizado type="text" id="name" name="name" placeholder="Nome" label="Name" value={nome} onChange={e => setNome(e.target.value)}  />

                  <InputCustomizado type="email" id="email" name="email" placeholder="E-mail" label="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>

                  <InputCustomizado type="password" id="password" name="password" placeholder="Senha" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>

                  <InputCustomizado type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirme a Senha" label="Password Confirmation" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>

                  <button type="submit" class="btn btn-primary">Inscrever-se</button>
                </form>						
            </div>

        );

    }

}

export class UserTable extends Component{ 

  constructor() {
    super();
    this.state = {lista : []};
  }

  componentDidMount(){
    PubSub.subscribe('atualiza-lista-usuarios', function(topico, novaLista){
      this.setState({lista:novaLista});
    }.bind(this))

    PubSub.subscribe('erro-validacao', function(topico, erro){
      alert(erro);
    })
  }

  render(){
    return(
      <div class="table-responsive">
        <h2>Usuários</h2>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.lista.map(function(user){
                return(
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })
            }							
          </tbody>
        </table>
      </div> 
    );
  }

}
