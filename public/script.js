// uso do $ -> padrão do jquery
// função ready é executada quando o html inteiro é carregado
$(document).ready(function(){
    // criando variável de opções para ser usada no ajax
    let params = {
        url: "/user/all",
        // callback que é executado quando a request retorna sucesso. 
        // Atuando como parâmetro, o results retorna a request com o conteúdo
        success: function(results){
            let output = "";
            results.forEach(arrElement => {
                output += `<div class="card"><h2>${arrElement.name}</h2><p>${arrElement.city}</p></div>`;
            })
            // função jquery que busca um elemento a partir de um seletor css (class, id, tag...)
            $("#pessoas").html(output);
        },
        error: function(ajaxObject, status, exception){
            console.log(ajaxObject, status, exception);
        }
    }
    $.ajax(params);    
})
