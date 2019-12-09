
# Install Node and npm:
Go to https://nodejs.org/en/ and install Node and NPM
Once node and npm are install verify the version number.

```bash
 npm -v
```
#Step 1
Open the terminal in one machine and run the below command.

```bash
sudo apt-get install software-properties-common
```
# Step 2: Installation
Next, run the below command to add the latest Stable Ethereum repository to your sources list.

```bash
sudo add-apt-repository -y ppa:ethereum/ethereum
```
Now run update and Install Ethereum on the machine


```bash
sudo apt-get update                      
sudo apt-get -y install ethereum
```
# Step 3: Create Account
Create a new Ethereum Account to run Smart Contracts and Transactions.
```bash
geth --datadir ethdata account new
```
# Step 4: Genesis File
You need to create your genesis file.

```bash
{

    "config":{
        "chainId":15,
        "homesteadBlock":0,
        "eip155Block":0,
        "eip158Block":0
    },
    "difficulty":"200000",
    "gasLimit":"2100000000",
    "alloc":{
        "9da3813aad90cd9f5b8db5299b39594470728596":{
            "balance":"11111111111111111111111111111111"
        },
        "b3105e05ce0af42842a5f37760967fac2fe83c8a":{
            "balance":"22222222222222222222222222222222"
        }
    }

}
```
Now we need to initialize the Node with genesis file we created. Run the command below to initialize.
```bash
geth --datadir="ethdata" init genesis.json
```

# Step 5: Start Node
Now start the node, using the command below.


```bash
geth --datadir="ethdata" --networkid 15 --nodiscover console --unlock 52ced5207daddd2081f623cd3c4bc2ef30b8447f --rpc --rpcport "8000" --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi "eth,net,web3,miner,debug,personal,rpc"
```
Make sure to replace the account number here after unlock with your Account number.

Now after successful login, you can see the geth CLI(Command Line Interface)

# Step 6: Connect
Let’s connect the nodes.
To connect the nodes you need Node-id and its IP Address. 
In the get CLI(Command Line Interface) enter the below command to get the Node-id.

```bash
admin.nodeInfo.enode
```

You will get the enode id, copy the enode id, we need this to connect to the particular node.
Run the below command to connect to the Node.

```bash
admin.addPeer("enode://52142d7a2213dd80294ee25e1ed91713c6a64f287060a138d2e06d0aad2a4fa3085626dbf900bd83f3ddf0aa514c48af979a10bad83b2f272d74029de82c206a@35.200.176.0:30303")
```

Make sure to replace enode id of the current Node and IP of the Node to connect.
Do this on the nodes, to connect them. To verify the connections. In the geth CLI enter the below command.
admin.peers
```bash
admin.addPeer("enode://52142d7a2213dd80294ee25e1ed91713c6a64f287060a138d2e06d0aad2a4fa3085626dbf900bd83f3ddf0aa514c48af979a10bad83b2f272d74029de82c206a@35.200.176.0:30303")
```
# Step 7: Let’s Mine
Now Start Mining in one of the node and you can see blocks getting created on the connected Nodes. To start mining on a Node, in the geth CLI enter the below command.
```bash
miner.start()
```

and to stop mining
```bash
miner.stop()
```
