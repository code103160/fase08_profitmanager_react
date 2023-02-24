import './style.css';
import React from 'react';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista : [],
      name: '',
      email: '',
      password: '',
      password_confirmation: '' 
    }
    this.enviaForm = this.enviaForm.bind(this),
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
    return (
      <div>
    
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Controle Financeiro</a>
          <input class="form-control form-control-dark w-100" type="text" placeholder="Pesquisar" aria-label="Search"/>
          <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
              <a class="nav-link" href="#">Sair</a>
            </li>
          </ul>
        </nav>
  
        <div class="container-fluid">
          <div class="row">
          
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
              <div class="sidebar-sticky">
                <ul class="nav flex-column">
                  <li class="nav-item">
                    <a class="nav-link" href="dashboard.html">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      Painel de Controle 
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="login.html">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                      Login
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" href="cad_user.html">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      Cadastrar Usuário <span class="sr-only">(current)</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="cad_gains.html">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                      Receitas
                    </a>
                  </li>							
                  <li class="nav-item">
                    <a class="nav-link" href="cad_expenses.html">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                      Despesas
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
  
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
              
              <br />
              
              <div>						
                <h1 class="h2">Cadastro de Usuários</h1>						
                <form method="post" onSubmit={this.enviaForm}>
                  <div class="form-group">
                    <label for="formGroupExampleInput">Nome</label>
                    <input type="text" class="form-control" id="name" name="name" value={this.state.name} onChange={this.setName}  placeholder="Nome"/>
                  </div>
                  <div class="form-group">
                    <label for="formGroupExampleInput">E-mail</label>
                    <input type="email" class="form-control" id="email" name="email" value={this.state.email} onChange={this.setEmail} placeholder="E-mail"/>
                  </div>
                  <div class="form-group">
                    <label for="formGroupExampleInput2">Senha</label>
                    <input type="password" class="form-control" id="password" name="password" value={this.state.password} onChange={this.setPassword} placeholder="Senha"/>
                  </div>
                  <div class="form-group">
                    <label for="formGroupExampleInput2">Confirmar Senha</label>
                    <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" value={this.state.password_confirmation} onChange={this.setPasswordConfirmation} placeholder="Confirme"/>
                  </div>
                  <button type="submit" class="btn btn-primary">Inscrever-se</button>
                </form>						
              </div>
  
              <br />
              
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
              
            </main>
            
          </div>
        </div>
        
      </div>
    );
  }

}


export default App;
