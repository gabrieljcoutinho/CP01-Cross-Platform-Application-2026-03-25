<table align="center">
  <tr>
    <td>
      <img width="160" alt="Image" src="https://github.com/user-attachments/assets/84424fbf-3d04-4834-8170-501b731746f5" />
    </td>
    <td style="padding-left: 15px;">
      <h1 style="margin: 0;">FIAP MUSIC</h1>
    </td>
  </tr>
</table>

<p align="center">
  <em>Checkpoint 1 - Cross-Platform Application Development</em>
</p>

## Sobre
<p >
  FIAP MUSIC é um aplicativo de seleção de músicas que permite aos alunos escolherem, por meio de votação, quais faixas devem ter prioridade nas playlists dos espaços de coworking da faculdade.
</p>

### Tecnologias Utilizadas
<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,python,react,javascript,css,html" />
  </a>
</p>

### Funcionalidades
<ul>
  <li>Inserção de credenciais - tela login</li>
  <li>Seleção do andar em que o usuário se encontra</li>
  <li>Visualização de músicas disponíveis</li>
  <li>Priorização automática das músicas mais votadas</li>
</ul>

### Problema que resolve
<p>
  Atualmente, cada andar possui uma playlist fixa que toca continuamente, sem que os alunos possam escolher as músicas ou controlar sua repetição. Isso limita a personalização da experiência no ambiente, prejudicando as pessoas que mais o utilizam.
</p>

### Operação escolhida
<p>
  O projeto foca na ambientação sonora dos espaços de convivência da FIAP, por serem amplamente utilizados pelos alunos e impactarem diretamente no conforto e na experiência diária dentro da instituição.
</p>

## Demonstração
<div style="display: flex; justify-content: in-line;">
  <img width="260" height="680" alt="Image" src="https://github.com/user-attachments/assets/8f7c011a-ecde-4d13-9df0-92468e97696b" />
  <img width="260" height="531" alt="Image" src="https://github.com/user-attachments/assets/cbf7135f-e5ba-4cbc-a9b0-87bf6e228a6b" />
  <img width="260" height="531" alt="Image" src="https://github.com/user-attachments/assets/d8af3e89-fd11-4008-b792-d3b608a72bdd" />
  <img width="263" height="642" alt="Image" src="https://github.com/user-attachments/assets/aa485918-57ed-4772-91ee-bfcf643d3a5d" />
  <img width="260" height="531" alt="Image" src="https://github.com/user-attachments/assets/b0de4823-d8c2-4552-9389-a3745bc0b0cf" />
</div>

## O que você precisa antes de "rodar" nosso projeto
<ul>
  <li> Visual Studio Code ➜ para utilização dos códigos </li>
  <li> Git ➜ para clonagem do repositório </li>
  <li> Node.js ➜ permite executar o JavaScript fora do navegador </li>
  <li> Gerenciador de pacotes ➜ npm ou Yarn (incluso no Node) </li>
  <li> Java Development Kit (JDK) ➜ compila e executa aplicativos Android</li>
  <li> Android Studio ➜ emulador de dispositivo Android e gerenciador de AVD (Android Virtual Device).
    <br> Configure-o com SDK Platform (Android +13) e SDK Build-Tools.
  </li>

  <br><em> Nota: Tanto o node quanto o JDK devem ser utilizados na versão LTS </em>
</ul>


### Passo a passo para clonar e executar localmente
<ol>
  <li> Comece garantindo a instalação e execução de componentes essenciais, sendo eles: Git, Node, JDK, Android Studio </li>
  <li> Acesse o Visual Studio Code  </li>
  <li> Clone o repositório com o comando: git clone https://github.com/gabrieljcoutinho/CP01-Cross-Platform-Application-2026-03-25.git
  </li>
  <li> Acesse a pasta do projeto: cd CP1-APP-Ficticio </li>
  <li> Instale as dependências do projeto: npm install </li>
  <li> Crie e inicie um dispositivo virtual (AVD) no Android Studio (Pixel 5 ou similar) </li>
  <li> Acione o backend digitando: cd backend & pip install -r requirements.txt & flask run </li>
  <li> Inicie o projeto com Expo: npx expo start </li>
  <li> Com o Expo aberto no terminal pressione <strong>a</strong> para abrir no emulador Android ou escaneie o QR Code com o app <strong>Expo Go</strong> no seu celular
  </li>

  <br><em> Nota: Tanto o node quanto o JDK devem ser utilizados na versão LTS </em>
</ol>

## Vídeo Funcional do App
https://github.com/user-attachments/assets/458d92d3-555e-458b-9900-d73052d25e54

## Decisões Técnicas
### Estrutura do projeto
<p>
O projeto está organizado em pastas que separam responsabilidades como interface, lógica e recursos visuais:
</p>

```
CP01-Cross-Platform-Application-2026-03-25/
│
├── components
├── Css
├── hook
├── Ideas - leyout
├── imgs
├── pages
│
├── App.js
├── index.js
├── app.json
└── package.json
```

### Estrutura da navegação
Aplicativo
<br> ↳ Tela de Carregamento
<br> ↳ Tela de Inserção de Credenciais (login)
<br> ↳ Seleção de Andar
<br> ↳ Seleção de Gênero Musical
<br> ↳ Seleção de Música

### Hooks utilizados
<p>
  <strong>{useEffect}</strong> Este hook automatiza o estado de carregamento da aplicação através de um temporizador inteligente.
</p>

```
import { useState, useEffect } from 'react';

export const useAppLoader = (duration = 5000) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoaded;
};
```

## Melhorias
<p>
  Com um pouco mais de tempo neste projeto, gostaríamos de implementar novas funcionalidades, como:
  <ul>
    <li>Permitir que o usuário pesquise por músicas disponibilizadas na <em>playlist</em></li>
    <li>Adicionar uma opção para alunos de outras unidades, expandindo o uso do aplicativo para diferentes prédios</li>
    <li>Permitir que músicas externas fossem adicionadas a <em>playlist</em></li>
  </ul>
</p>

##
<p align="center">
  <em>Desenvolvido por:</em><br>
  <em>Pedro Henrique Lisboa, Felipe Rodrigues Ribeiro dos Santos, Gabriel Jorge Coutinho, Bruna Marques e Queiroz, Manoela Oliveira Bello</em>
</p>


## Atulizações
 - 1-Múscia tocando;
 - 2-Barra de busca de cada musica por andar;
 - 3-Ao dar play na musica, no footer do app mostra qual música está tocando;
 - 4-No card, a múscia que estiver tocand ovai ter uma animação de som se movimentando
