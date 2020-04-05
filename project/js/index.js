function calcularHipotenusa() {
    let cat_op = document.querySelector("input[name='cat_op']");
    let cat_adj = document.querySelector("input[name='cat_adj']");
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

    let backgroundColorDanger = "rgb(248, 215, 218)";
    let boxShadowDanger = "0 0 0 0.2rem rgba(248, 215, 218, 0.25)";
    let colorDanger = "#bd2130";
    let mensagemDeErroRequired = "Por favor preencha o campo.";
    let validate = null;

    if(cat_op.value === "") {
        cat_op.style.borderColor = backgroundColorDanger;
        cat_op.style.boxShadow = boxShadowDanger;

        validate = document.createElement("span"); 
        validate.className = "validate";
        validate.style.color = colorDanger; 
        
        validate.innerHTML = mensagemDeErroRequired;
        cat_op.after(validate);

        return false;
    } 

    if(cat_adj.value === "") {
        cat_adj.style.borderColor = backgroundColorDanger;
        cat_adj.style.boxShadow = boxShadowDanger;
    
        validate = document.createElement("span"); 
        validate.className = "validate";
        validate.style.color = colorDanger;
        
        validate.innerHTML = mensagemDeErroRequired;
        cat_adj.after(validate);

        return false;
    } 

    return true;
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