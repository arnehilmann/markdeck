# markdeck on windows

`windows` here means: t3.medium instance on AWS EC2, based on `Windows 2019` Base AMI


## installation of the dependencies

```
# in a new powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
RefreshEnv.cmd
choco install -y pandoc nvm openjdk8jre graphviz
```
 
```
# in a new powershell
nvm install latest
nvm on
npm install -g decktape vega vega-cli vega-lite
$npmbin = npm -g bin
cd $npmbin/node_modules/decktape/node_modules/puppeteer
npm install -g              # download correct chromium version
```


## install and init markdeck
 
```
(New-Object System.Net.WebClient).DownloadFile('https://github.com/arnehilmann/markdeck/releases/download/v/markdeck.x86_64-pc-windows-gnu.exe', 'markdeck.exe')
./markdeck.exe init hello   # initializes a new slide deck in folder `hello`
cd hello
../markdeck | Out-Host      # pipe to Out-Host to get nicely colored log output
```
 
now point your browser to http://127.0.0.1:8080/

```
# for example like this:
$npmbin = npm -g bin
& $npmbin\node_modules\decktape\node_modules\puppeteer\.local-chromium\win*\chrome-win\chrome.exe http://127.0.0.1:8080
```