// Base de dados pronta para uso no script
const dadosPesquisa = {
  mediaNacionalDiaria: 4, // Média de horas que o brasileiro passa nas redes
  alertaSaude: 6,         // Limite recomendado por especialistas
  sugestoes: [
    { limite: 2, mensagem: "Parabéns! Seu uso está equilibrado. Você tem mais tempo livre para hobbies e descanso." },
    { limite: 5, mensagem: "Atenção. Você está na média nacional, mas já gasta quase um dia inteiro da sua semana olhando para a tela." },
    { limite: 24, mensagem: "Cuidado! Seu uso é considerado muito alto. Isso pode afetar seu sono, foco e saúde mental. Que tal um detox digital?" }
  ]
};

const campoHoras = document.getElementById("horas");
const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

function calcular() {
  // 1. Pegar o valor digitado
  const horasDia = parseFloat(campoHoras.value);

  // Validar a entrada
  if (isNaN(horasDia) || horasDia < 0 || horasDia > 24) {
    resultado.innerHTML = '<p class="erro">Digite um número de horas entre 0 e 24.</p>';
    return;
  }

  // 2. Fazer as contas
  const horasSemana = horasDia * 7;
  const horasMes = horasDia * 30;

  // 3. Comparar com a média nacional
  let comparacao;
  if (horasDia > dadosPesquisa.mediaNacionalDiaria) {
    comparacao = "Isso é mais do que a média nacional de " + dadosPesquisa.mediaNacionalDiaria + " horas por dia.";
  } else if (horasDia < dadosPesquisa.mediaNacionalDiaria) {
    comparacao = "Isso é menos do que a média nacional de " + dadosPesquisa.mediaNacionalDiaria + " horas por dia.";
  } else {
    comparacao = "Isso é igual à média nacional de " + dadosPesquisa.mediaNacionalDiaria + " horas por dia.";
  }

  // 4. Escolher a mensagem reflexiva (if/else)
  let mensagem;
  let classe;
  if (horasDia <= dadosPesquisa.sugestoes[0].limite) {
    mensagem = dadosPesquisa.sugestoes[0].mensagem;
    classe = "baixo";
  } else if (horasDia <= dadosPesquisa.sugestoes[1].limite) {
    mensagem = dadosPesquisa.sugestoes[1].mensagem;
    classe = "medio";
  } else {
    mensagem = dadosPesquisa.sugestoes[2].mensagem;
    classe = "alto";
  }

  // Aviso extra se passar do limite de saúde
  let aviso = "";
  if (horasDia >= dadosPesquisa.alertaSaude) {
    aviso = "<p>Você está no limite recomendado por especialistas (" + dadosPesquisa.alertaSaude + " horas por dia) ou acima dele.</p>";
  }

  // 5. Exibir na tela
  resultado.innerHTML =
    '<div class="cartao ' + classe + '">' +
    "<p>Você passa <strong>" + horasSemana + " horas por semana</strong> (" + horasMes + " horas por mês) nas redes sociais. " + comparacao + "</p>" +
    "<p>" + mensagem + "</p>" +
    aviso +
    "</div>";
}

// Capturar o clique no botão (e a tecla Enter no campo)
botao.addEventListener("click", calcular);
campoHoras.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    calcular();
  }
});
