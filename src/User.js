import React, { Component } from "react";
import $ from 'jquery';
import InputCustomizado from './Components/InputCustomizado';

export class UserForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
          lista : [],
          name: '',
          email: '',
          password: '',
          password_confirmation: '' 
        }
        this.enviaForm = this.enviaForm.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setPasswordConfirmation = this.setPasswordConfirmation.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        console.log("dados sendo enviados...");
    
        $.ajax({
          url: "https://profitmanager.onrender.com/api/v2/auth",
    
          contentType: 'application/json',
          dataType: 'json',
          accept: "application/json",
    
          type: 'post',
          data: JSON.stringify(
            {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              password_confirmation: this.state.password_confirmation
            }
          ),
    
          success: function(resposta){
            console.log("Sucesso!");
            console.log(resposta);
          },
          complete: function(resposta){
            console.log("Complete!!");
          },
          error: function(resposta){
            console.log("Error...");
          }
        })
      }
    
      setName(evento){
        this.setState( { name: evento.target.value } );
      }
      setEmail(evento){
        this.setState( { email: evento.target.value } );
      }
      setPassword(evento){
        this.setState( { password: evento.target.value } );
      }
      setPasswordConfirmation(evento){
        this.setState( { password_confirmation: evento.target.value } );
      }
      
    render() {

        return(

            <div>						
                <h1 class="h2">Cadastro de Usuários</h1>						
                <form method="post" onSubmit={this.enviaForm}>
                  
                  <InputCustomizado type="text" id="name" name="name" value={this.state.name} onChange={this.setName} placeholder="Nome" label="Name"/>

                  <InputCustomizado type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail} placeholder="E-mail" label="E-mail"/>

                  <InputCustomizado type="password" id="password" name="password" value={this.state.password} onChange={this.setPassword} placeholder="Senha" label="Password"/>

                  <InputCustomizado type="password" id="password_confirmation" name="password_confirmation" value={this.state.password_confirmation} onChange={this.setPasswordConfirmation} placeholder="Confirme a Senha" label="Password Confirmation"/>

                  <button type="submit" class="btn btn-primary">Inscrever-se</button>
                </form>						
            </div>

        );

    }

}

export class UserTable extends Component{
    a
}