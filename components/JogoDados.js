"use client";

import { useState } from "react";
import Dado from "./Dado";

const TOTAL_RODADAS = 5;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function estadoInicial() {
  return {
    rodadaAtual: 1,
    jogadorDaVez: 1,
    dadosJogador1: [null, null],
    dadosJogador2: [null, null],
    placar: { jogador1: 0, jogador2: 0 },
    mensagemRodada: "",
    jogoFinalizado: false,
    resultadoFinal: "",
  };
}

export default function JogoDados() {
  const [estado, setEstado] = useState(estadoInicial());

  function jogarJogador1() {
    const novosDados1 = [rolarDado(), rolarDado()];

    setEstado({
      ...estado,
      dadosJogador1: novosDados1,
      jogadorDaVez: 2,
    });
  }

  function jogarJogador2() {
    const novosDados2 = [rolarDado(), rolarDado()];
    const soma1 = estado.dadosJogador1[0] + estado.dadosJogador1[1];
    const soma2 = novosDados2[0] + novosDados2[1];

    let mensagem;
    const novoPlacar = { ...estado.placar };

    if (soma1 > soma2) {
      mensagem = "Jogador 1 venceu";
      novoPlacar.jogador1 = novoPlacar.jogador1 + 1;
    } else if (soma2 > soma1) {
      mensagem = "Jogador 2 venceu";
      novoPlacar.jogador2 = novoPlacar.jogador2 + 1;
    } else {
      mensagem = "Empate";
    }

    const ultimaRodada = estado.rodadaAtual === TOTAL_RODADAS;

    if (ultimaRodada) {
      let resultadoFinal;
      if (novoPlacar.jogador1 > novoPlacar.jogador2) {
        resultadoFinal = "Jogador 1 venceu o jogo";
      } else if (novoPlacar.jogador2 > novoPlacar.jogador1) {
        resultadoFinal = "Jogador 2 venceu o jogo";
      } else {
        resultadoFinal = "Empate geral";
      }

      setEstado({
        ...estado,
        dadosJogador2: novosDados2,
        placar: novoPlacar,
        mensagemRodada: mensagem,
        jogoFinalizado: true,
        resultadoFinal: resultadoFinal,
      });
    } else {
      setEstado({
        ...estado,
        dadosJogador1: [null, null],
        dadosJogador2: [null, null],
        placar: novoPlacar,
        mensagemRodada: mensagem,
        rodadaAtual: estado.rodadaAtual + 1,
        jogadorDaVez: 1,
      });
    }
  }

  function jogarNovamente() {
    setEstado(estadoInicial());
  }

  return (
    <div className="mesa">
      <h1 className="titulo">Jogo de Dados</h1>

      <p className="subtitulo">
        {estado.jogoFinalizado
          ? estado.resultadoFinal
          : "Rodada " + estado.rodadaAtual + "/" + TOTAL_RODADAS}
      </p>

      <div className="jogadores">
        <div className="painel">
          <p className="nomeJogador">Jogador 1</p>
          <div className="dados">
            <Dado valor={estado.dadosJogador1[0]} />
            <Dado valor={estado.dadosJogador1[1]} />
          </div>
          {!estado.jogoFinalizado && (
            <button
              className="botaoJogar"
              onClick={jogarJogador1}
              disabled={estado.jogadorDaVez !== 1}
            >
              Jogar
            </button>
          )}
          <p className="placar">Vitórias: {estado.placar.jogador1}</p>
        </div>

        <div className="painel">
          <p className="nomeJogador">Jogador 2</p>
          <div className="dados">
            <Dado valor={estado.dadosJogador2[0]} />
            <Dado valor={estado.dadosJogador2[1]} />
          </div>
          {!estado.jogoFinalizado && (
            <button
              className="botaoJogar"
              onClick={jogarJogador2}
              disabled={estado.jogadorDaVez !== 2}
            >
              Jogar
            </button>
          )}
          <p className="placar">Vitórias: {estado.placar.jogador2}</p>
        </div>
      </div>

      {estado.mensagemRodada && (
        <p className="caixaMensagem">{estado.mensagemRodada}</p>
      )}

      {estado.jogoFinalizado && (
        <button className="botaoReiniciar" onClick={jogarNovamente}>
          Jogar Novamente
        </button>
      )}
    </div>
  );
        }
