---
title: "Setup Linux (wsl)"
pubDate: "2026-04-22T00:00:00Z"
hero: "/images/wsl.webp"
tags: ["linux", "wsl", "ubuntu"]
---

## What will we install?

- [What will we install?](#what-will-we-install)
  - [WSL Install](#wsl-install)
  - [Aliases \& Path](#aliases--path)
  - [Basic packages](#basic-packages)
  - [SSH Key](#ssh-key)
  - [Java](#java)
  - [Node](#node)
  - [Golang](#golang)
  - [Docker](#docker)
  - [Google Chrome](#google-chrome)
  - [Intellij (Toolbox)](#intellij-toolbox)
  - [Android Studio (Toolbox)](#android-studio-toolbox)
  - [VsCode](#vscode)

---

### WSL Install

First, we need to enable some Windows features so everything works as expected. For this, we need a *PowerShell window in Administrator mode*. Windows will need to restart to complete the installation. Restart your computer and then come back to continue.

``` ps1
Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform, HypervisorPlatform -All
```

In PowerShell, let's install WSL

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

First let's download vim (optional) to edit some files during the process

``` sh
sudo apt install -y vim
```

<br>
Enter the aliases file (if you don't like vim, switch to nano or another)

``` sh
vim ~/.bash_aliases
```

<br>
Add the shortcuts and modify as necessary, these are some that I like to use (attention to add your name and email, this will be important later)

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
now reload the file to have access to these commands

``` sh
source ~/.bash_aliases
```

with these aliases it gets much easier from now on, now we can use the *refresh* command to do this

### Basic packages

``` sh
update
sudo apt install nautilus -y
sudo apt install git zip unzip fuse net-tools -y
```

<br>
To finish configuring git, it is necessary to configure user information

``` sh
git config --global user.name "$USER_NAME"
git config --global user.email "$USER_EMAIL"
git config --global core.autocrlf true
git config --global pull.rebase true
```

### SSH Key

Fill in your email before typing the command and confirm or enter password steps as you wish.

``` sh
ssh-keygen -t ed25519 -C "$USER_EMAIL"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
echo
cat ~/.ssh/id_ed25519.pub
```

copy the key at the end of execution, then just paste it on github

### Java

SDKman is absolutely the most practical way to install and manage one or multiple java versions on Linux, but it also helps you download `Kotlin`, `Groovy`, `Maven`, `Gradle` among other tools.

``` sh
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install java
java --version
```

<br>

From now on use the `sdk` command to manage your installations

``` sh
sdk --help
```

### Node

*Fast node manager*, is a Node version manager recommended on the official website, so let's use it

``` sh
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm install --lts
node -v
npm -v
```

<br>

From now on use the `fnm` command to manage your installations

``` sh
fnm --help
```

<br>

If you want to download `pnpm`

``` sh
npm install -g pnpm
```

### Golang

To install the most up-to-date version check on the official website the current version and update the command according to the version number (there is an apt package called golang-go, but it is usually outdated)

``` sh
export GO_VERSION='1.23.1'
```

With the version defined in our variable we can download it just by copying the commands below and in the future run the same process if we need to update go

``` sh
sudo rm -rf /usr/local/go 
wget https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
rm go${GO_VERSION}.linux-amd64.tar.gz
go version
```

### Docker

By installing Docker directly on wsl instead of docker desktop, it gets much more practical to use Docker as it would be used on a Linux machine and with CLI. If you prefer Docker with a graphical interface and pretty buttons, skip this step and install Docker desktop.

``` sh
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
update
sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo usermod -aG docker $USER
```

<br>
After installation, since the user was modified, close the terminal and open it again, in case of problems check the installation

``` sh
docker --version
```

### Google Chrome

After installation, we will be able to use the shortcuts we configured earlier, *google*, *chrome* or the standard command *google-chrome* (this will lock the terminal)

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

Download Jetbrains toolbox, it's a Jetbrains tool manager where you can download Intellij (Goland, WebStorm...).

``` sh
google-chrome https://www.jetbrains.com/pt-br/lp/toolbox/
```

Now let's go to the download folder, extract and move the file to the right place.

``` sh
cd ~/Downloads
tar -xvf jetbrains-toolbox-*.tar.gz # Extract
rm jetbrains-toolbox-*.tar.gz # Delete the zip
mv jetbrains-toolbox-* ~/toolbox # Move the files to the toolbox folder
toolbox
```

Done, now just use the `toolbox` command configured back in the aliases and download Intellij through the Toolbox graphical interface

### Android Studio (Toolbox)

We will need QEMU-KVM for emulation within linux

``` sh
sudo apt install qemu-kvm
```

Let's check if everything is OK

``` sh
kvm-ok
```

If it's OK, let's give your user access to KVM

``` sh
sudo adduser $USER kvm
grep kvm /etc/group
```

*Recommendation:* after this change restart WSL in powershell

``` sh
wsl --shutdown
```

Now we need Android Studio, let's install it through toolbox

``` sh
toolbox
```

Install Android Studio normally, and now install the emulator.
After the download you can use the `studio` alias to open Android Studio.

**More Action > Virtual Device Manager > Create virtual device > Select a device (Recommended: Medium device)**

*Attention: If there is a warning that your user does not have access to KVM, close Android Studio and Toolbox and open again in a new terminal*

### VsCode

 If you want to use VSCode, install it directly on windows and use it directly from Linux using the *code* command. In case of problems with your installation,
 remove the Linux configuration files using:

``` sh
rm -rf ~/.vscode-*
```

<br>
Now you have the essentials installed inside WSL. Congratulations✨

Happy coding 🧑‍💻