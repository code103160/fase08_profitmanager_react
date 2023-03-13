import PubSub from 'pubsub-js';

export default class ManageErrors {

    publishErrors(erros){
        for (var i = 0; i < erros.errors.full_messages.lenght; i++){
            var erro = erros.errors.full_messages[i];
            console.log(erro);

            PubSub.publish('erro-validacao', erro)
          }
        
    }

}