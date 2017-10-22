# Setup Nodejs 

## on CentOS

```bash
	/> sudo yum install nodes
	/> sudo yum install npm
	/> mkdir test
	/> cd test
	/> npm init
	/> npm install express —save
```

## on Ubuntu
```bash
	/> sudo apt-get update
	/> sudo apt-get --yes --force-yes install git
	/> sudo apt-get --yes --force-yes install build-essential openssl libssl-dev pkg-config
	/> wget http://nodejs.org/dist/v0.10.31/node-v0.10.31.tar.gz
	/> tar zxvf node-v0.10.31.tar.gz
	/> cd node-v0.10.31
	/> sudo ./configure
	/> sudo make
	/> sudo make install
	/> sudo npm install -g forever
	/> sudo rm -rf ~/.npm
```
