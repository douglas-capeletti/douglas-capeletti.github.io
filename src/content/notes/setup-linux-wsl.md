---
title: "Setup linux (wsl)"
pubDate: "2024-09-25"
hero: "/images/wsl.webp"
tags: ["linux", "wsl", "ubuntu"]
---

## O que vamos instalar?
- [O que vamos instalar?](#o-que-vamos-instalar)
    - [Aliases \& Path](#aliases--path)
    - [Pacotes básicos](#pacotes-básicos)
    - [Google Chrome](#google-chrome)
    - [Docker](#docker)
    - [Java](#java)
    - [Node](#node)
    - [Golang](#golang)
    - [Chave SSH](#chave-ssh)
    - [Intellij (Toolbox)](#intellij-toolbox)
    - [VsCode](#vscode)


### Aliases & Path
Primeiro vamos baixar o vim (opcional) para editar alguns arquivos durante o processo

``` sh
sudo apt install -y vim
```

<br>
Entre no arquivo de aliases (caso não goste do vim, troque pelo nano ou outro)

``` sh
vim ~/.bash_aliases
```
<br>
Adicione os atalhos e modifique conforme necessário, estes são alguns que eu gosto de utilizar

``` sh
# Aliases
alias refresh='source ~/.bashrc && source ~/.bashrc'
alias config='vim ~/.bash_aliases'
alias update='sudo apt update && sudo apt -y upgrade'
alias clean='sudo apt -y autoclean && sudo apt -y autoremove'

# Shortcuts
alias q='exit'
alias c='clear'
alias home='cd ~/'
alias chrome='google-chrome $@ &'
alias google='google-chrome $@ &'
alias toolbox='~/toolbox/jetbrains-toolbox'

# PATH
export PATH=$PATH:/usr/local/go/bin
```
<br>
agora recarregue o arquivo para ter acesso a estes comandos

``` sh
source ~/.bash_aliases
```
com estes aliases fica muito mais fácil daqui para frente, agora podemos utilizar o comando *refresh* para fazer isso

### Pacotes básicos
``` sh
update
sudo apt install -y git zip unzip nautilus fuse net-tools
```

<br>
Para finalizar a configuração do git, é necessário configurar as informações do usuário (preencha com seus dados)

``` sh
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.autocrlf true
git config --global pull.rebase true
```

### Google Chrome

após a instalação, poderemos utilizar os atalhos que configuramos antes, *google*, *chrome* ou o comando padrão *google-chrome* (este vai travar o terminar)

``` sh
rm -rf ~/tmp
mkdir ~/tmp
cd ~/tmp
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install --fix-missing ./google-chrome-stable_current_amd64.deb
clean
cd ..
```
### Docker

Ao instalar o Docker diretamente no wsl ao invés do docker desktop, fica muito mais prático utilizar o Docker como ele seria utilizado em uma máquina linux e com cli. Caso prefira o Docker com interface gráfica e botões bonitinhos, pule esta etapa e instale o Docker desktop.

``` sh
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
update
sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
```

<br>
Após a instalação, como o usuário foi modificado, feche o terminal e abra novamente, em caso de problemas verifique a instalação

``` sh
docker --version
```

### Java

SDKman é com certeza absoluta a forma mais prática de instalar e gerenciar uma ou várias versões do java no linux, mas também te ajuda a baixar `Kotlin`, `Groovy`, `Maven`, `Gradle` entre outras ferramentas.

``` sh
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install java
java --version
```
<br>

A partir de agora utilize o comando `sdk` para gerenciar suas instalações
``` sh
sdk --help
```

### Node

*Fast node manager*, é um gerenciador de versões do Node recomendado no site oficial, então vamos utiliza-lo
``` sh
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm install --lts
node -v
npm -v
```
<br>

A partir de agora utilize o comando `fnm` para gerenciar suas instalações
``` sh
fnm --help
```

<br>

Caso queira baixar o `pnpm`
``` sh
npm install -g pnpm
```

### Golang

Para instalar a versão mais atualizada [verifique no site oficial](https://go.dev/doc/install) a versão atual e atualize o comando de acordo com o número da versão (existe um pacote apt chamado golang-go, porém este costuma estar desatualizado)

``` sh
export GO_VERSION='go1.23.1'
```

Com a versão definida na nossa variável podemos baixar somente copiando os comandos abaixo e no futudo executar o mesmo processo caso precisarmos atualizar o go
``` sh
sudo rm -rf /usr/local/go 
wget https://go.dev/dl/${GO_VERSION}.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf ${GO_VERSION}.linux-amd64.tar.gz
rm ${GO_VERSION}.linux-amd64.tar.gz
go version
```

### Chave SSH

Preencha seu email antes de digitar o comando e confirme ou insira os passos de senha como desejar.

``` sh
ssh-keygen -t ed25519 -C "your@email.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
echo
cat ~/.ssh/id_ed25519.pub
```
copie a chave no final da execução, aí é só [colar no github](https://github.com/settings/ssh/new)

### Intellij (Toolbox)

[Baixe o Jetbrains toolbox](https://www.jetbrains.com/pt-br/lp/toolbox/), ele é um gerenciador de ferramentas da Jetbrains lá você pode baixa o Intellij (Goland, WebStorm...).
navegue até o diretório que se encontra o arquivo (provavelmente Downloads)
``` sh
google-chrome https://www.jetbrains.com/pt-br/lp/toolbox/
cd ~/Downloads
```

Agora descompacte e mova o arquivo para o lugar certo.

``` sh
tar -xvf jetbrains-toolbox-*.tar.gz # Descompacta
rm jetbrains-toolbox-*.tar.gz # Exclui o zip
mv jetbrains-toolbox-* ~/toolbox # Move os arquivos para a pasta toolbox
```

Pronto agora é só utilizar o comando `toolbox` configurado lá nos aliases e baixar o Intellij pela interface gráfica do Toolbox

### VsCode
 Caso queira utilizar o [VSCode](https://code.visualstudio.com/), instale diretamente no windows e utilize diretamente do linux a partir do comando *code*, em caso de problemas com a sua instalação, 
 remova os arquivos de configuração do linux utilizando:

``` sh
rm -rf ~/.vscode-*
```

<br>
Agora você já tem o essencial instalado dentro do WSL. Parabéns✨ 

Happy coding 🧑‍💻



