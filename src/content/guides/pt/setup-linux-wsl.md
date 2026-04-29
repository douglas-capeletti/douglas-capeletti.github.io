---
title: "Setup Linux (wsl)"
pubDate: "2026-04-22T00:00:00Z"
hero: "/images/wsl.webp"
tags: ["linux", "wsl", "ubuntu"]
---

## O que vamos instalar?

- [O que vamos instalar?](#o-que-vamos-instalar)
  - [WSL Install](#wsl-install)
  - [Aliases \& Path](#aliases--path)
  - [Pacotes básicos](#pacotes-básicos)
  - [Chave SSH](#chave-ssh)
  - [Java](#java)
  - [Node](#node)
  - [Golang](#golang)
  - [Docker](#docker)
  - [Google Chrome](#google-chrome)
  - [Intellij (Toolbox)](#intellij-toolbox)
  - [Android Studio (Toolbox)](#android-studio-toolbox)
  - [VsCode](#vscode)

### WSL Install

On Powershell, install WSL

```
wsl --install
```
On you user folder `C:\Users\{user}` (%USERPROFILE%) add a file named [.wslconfig](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#main-wsl-settings) with the following content. 
This will mirror the wsl network on windows and allow you to access apps running on WSL on you LAN 

``` toml
[wsl2]
networkingMode=mirrored
dnsTunneling=true
nestedVirtualization=true
```

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
Adicione os atalhos e modifique conforme necessário, estes são alguns que eu gosto de utilizar (atenção para adicionar seu nome e email, isto vai ser importante mais tarde)

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
alias toolbox='~/toolbox/bin/jetbrains-toolbox &'
alias idea='~/.local/share/JetBrains/Toolbox/apps/intellij-idea/bin/idea &'
alias studio='~/.local/share/JetBrains/Toolbox/apps/android-studio/bin/studio &'

# Vars
export USER_EMAIL='Your email here'
export USER_NAME='Your name here'
export ANDROID_HOME=$HOME/Android/Sdk

# PATH
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
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
sudo apt install nautilus -y
sudo apt install git zip unzip fuse net-tools -y
```

<br>
Para finalizar a configuração do git, é necessário configurar as informações do usuário

``` sh
git config --global user.name "$USER_NAME"
git config --global user.email "$USER_EMAIL"
git config --global core.autocrlf true
git config --global pull.rebase true
```

### Chave SSH

Preencha seu email antes de digitar o comando e confirme ou insira os passos de senha como desejar.

``` sh
ssh-keygen -t ed25519 -C "$USER_EMAIL"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
echo
cat ~/.ssh/id_ed25519.pub
```

copie a chave no final da execução, aí é só [colar no github](https://github.com/settings/ssh/new)

### Java

SDKman é com certeza absoluta a forma mais prática de instalar e gerenciar uma ou várias versões do java no Linux, mas também te ajuda a baixar `Kotlin`, `Groovy`, `Maven`, `Gradle` entre outras ferramentas.

``` sh
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install java
java --version
```

<br>

A partir de agora utilize o comando `sdk` para gerenciar suas instalações, o SDKman também define a variável `JAVA_HOME` então não precisa se preocupar com isso

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
export GO_VERSION='1.23.1'
```

Com a versão definida na nossa variável podemos baixar somente copiando os comandos abaixo e no futuro executar o mesmo processo caso precisarmos atualizar o go

``` sh
sudo rm -rf /usr/local/go 
wget https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
rm ${GO_VERSION}.linux-amd64.tar.gz
go version
```

### Docker

Ao instalar o Docker diretamente no wsl ao invés do docker desktop, fica muito mais prático utilizar o Docker como ele seria utilizado em uma máquina Linux e com cli. Caso prefira o Docker com interface gráfica e botões bonitinhos, pule esta etapa e instale o Docker desktop.

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

### Intellij (Toolbox)

[Baixe o Jetbrains toolbox](https://www.jetbrains.com/pt-br/lp/toolbox/), ele é um gerenciador de ferramentas da Jetbrains lá você pode baixa o Intellij (Goland, WebStorm...).

``` sh
google-chrome https://www.jetbrains.com/pt-br/lp/toolbox/
```

Agora vamos até a pasta de download descompactar e mover o arquivo para o lugar certo.

``` sh
cd ~/Downloads
tar -xvf jetbrains-toolbox-*.tar.gz # Descompacta
rm jetbrains-toolbox-*.tar.gz # Exclui o zip
mv jetbrains-toolbox-* ~/toolbox # Move os arquivos para a pasta toolbox
toolbox
```

Pronto agora é só utilizar o comando `toolbox` configurado lá nos aliases e baixar o Intellij pela interface gráfica do Toolbox.
Após o download você pode utilizar o alias `idea` para abrir o Intellij Idea

### Android Studio (Toolbox)

Vamos precisar do QEMU-KVM para fazer a emulação dentro do linux
``` sh
sudo apt install qemu-kvm
```

Vamos checar se ficou tudo OK
``` sh
kvm-ok
```

Caso esteja OK, vamos dar ao seu usuário acesso ao KVM
``` sh
sudo adduser $USER kvm
grep kvm /etc/group
```
*Recomendação:* após esta alteração reinicie o WSL no powershell
``` sh
wsl --shutdown
```

Agora precisamos do Android Studio, vamos instalar ele através do toolbox
```
toolbox
```

Instale o Android Studio de forma padrão, e agora instalar o emulador.
Após o download você pode utilizar o alias `studio` para abrir o Android Studio.

**More Action > Virtual Device Manager > Create virtual device > Selecione um dispositivo (Recomendo: Medium device)**
*Atenção: Caso haja um aviso que seu usuário não tem acesso ao KVM, feche o Android Studio e o Toolbox e abra novamente em um novo terminal*



### VsCode

 Caso queira utilizar o [VSCode](https://code.visualstudio.com/), instale diretamente no windows e utilize diretamente do Linux a partir do comando *code*, em caso de problemas com a sua instalação,
 remova os arquivos de configuração do Linux utilizando:

``` sh
rm -rf ~/.vscode-*
```

<br>
Agora você já tem o essencial instalado dentro do WSL. Parabéns✨

Happy coding 🧑‍💻
