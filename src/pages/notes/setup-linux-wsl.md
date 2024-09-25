---
title: "Setup linux (wsl)"
pubDate: "2024-09-25:00:00"
slug: "setup-linux-wsl"
hero: "/images/wsl.webp"
tags: ["linux", "wsl", "ubuntu"]
layout: "../../layouts/PostLayout.astro"
---

## O que vamos instalar?
- aliases (apelidos para comandos)
- Pacotes básicos de sistema
- Softwares básicos de desennvolvimento
- Runtimes de linguagens de programação
- Chave SSH

### Aliases & Path
<br>
Primeiro entre no arquivo de aliases (caso não goste do vim, troque pelo nano ou outro)

``` sh
sudo apt install -y vim
vim ~/.bash_aliases
```
<br>
Adicione os atalhos e modifique conforme necessário

``` sh
alias refresh='source ~/.bashrc && source ~/.bashrc'
alias config='vim ~/.bash_aliases'
alias q='exit'
alias c='clear'
alias home='cd ~/'
alias update='sudo apt update && sudo apt -y upgrade'
alias clean='sudo apt -y autoclean && sudo apt -y autoremove'

# Shortcuts
alias chrome='google-chrome &'
alias google='google-chrome &'


# PATH
export PATH=$PATH:/usr/local/go/bin
```
<br>
agora recarregue o arquivo

``` sh
source ~/.bash_aliases
```
com estes aliases fica muito mais fácil daqui para frente

### Pacotes básicos
``` sh
update
sudo apt install -y git zip unzip nautilus
```

<br>
Para finalizar o git, é necessário configurar as informações do usuário (preencha com seus dados)

``` sh
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Google Chrome
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
``` sh
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install java
java --version
```

### Node
``` sh
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm install --lts
node -v
npm -v
npm install -g pnpm # Optional
```

### Golang

Para instalar a versão mais atualizada [verifique no site oficial](https://go.dev/doc/install) a versão atual e atualize o comando de acordo com o número da versão (existe um pacote apt chamado golang-go, porém este costuma estar desatualizado)
``` sh
sudo rm -rf /usr/local/go 
wget https://go.dev/dl/go1.23.1.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.1.linux-amd64.tar.gz
rm go1.23.1.linux-amd64.tar.gz
```

### Chave SSH

Preencha seu email antes de digitar o comando, confirme/insira os passos de senha.

``` sh
ssh-keygen -t ed25519 -C "your@email.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
echo
cat ~/.ssh/id_ed25519.pub
```
copie a chave no final da execução, aí é só [colar no github](https://github.com/settings/ssh/new)



