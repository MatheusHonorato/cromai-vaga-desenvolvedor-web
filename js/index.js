function setFocusInicial() {

    const cat_op = document.querySelector("input[name='cat_op']");
    cat_op.focus();

}

function calcularHipotenusa() {

    const cat_op = document.querySelector("input[name='cat_op']");
    const cat_adj = document.querySelector("input[name='cat_adj']");
    let cor_original_borda = "#ced4da";

    let validate = document.querySelector(".validate");
    
    if(validate != null) {
        validate.remove();
    }

    cat_op.style.borderColor = cor_original_borda;
    cat_op.style.boxShadow = "none";
    cat_adj.style.borderColor = cor_original_borda;
    cat_adj.style.boxShadow = "none";

    let validacao = validarCampos(cat_op, cat_adj);

    if(validacao == true) {
        enviarRequisicao(cat_op.value, cat_adj.value);
    } 

}

function validarCampos(cat_op, cat_adj) {

    if(cat_op.value === "") {
        setMensagem(cat_op);
        return false;
    } 

    if(cat_adj.value === "") {
        setMensagem(cat_adj);
        return false;
    } 

    return true;
}

function setMensagem(cateto) {

    let backgroundColorDanger = "rgb(248, 215, 218)";
    let boxShadowDanger = "0 0 0 0.2rem rgba(248, 215, 218, 0.25)";
    let colorDanger = "#bd2130";
    let mensagemDeErroRequired = "Por favor preencha o campo.";
    let validate = null;

    cateto.style.borderColor = backgroundColorDanger;
    cateto.style.boxShadow = boxShadowDanger;

    validate = document.createElement("span"); 
    validate.className = "validate";
    validate.style.color = colorDanger; 
    
    validate.innerHTML = mensagemDeErroRequired;
    cateto.after(validate);
    cateto.focus();
}

function enviarRequisicao(cat_op, cat_adj) {
  
    var url = "https://atlas-231814.appspot.com/calcula";

    let data = {};
    data.cat_op = parseInt(cat_op);
    data.cat_adj  = parseInt(cat_adj);
    let json = JSON.stringify(data);
    let form = document.querySelector("form");

    let hipotenusa = document.querySelector("#resultado");

    if(hipotenusa == null) {

        hipotenusa = document.createElement("div"); 
        hipotenusa.className = "alert alert-success";
        hipotenusa.id = "resultado";
    } 

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {

        let result = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {

            hipotenusa.innerHTML = "Hipotenusa: "+result.hip;

        } else {

            hipotenusa.innerHTML = "Caro viajante do tempo nossa api está enfrentando problemas tente mais tarde.";
        }

        form.appendChild(hipotenusa);
    }

    xhr.send(json);
}