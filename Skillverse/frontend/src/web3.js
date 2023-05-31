// 使用web3.js建立链接
import Web3 from 'web3';
const rpcURL = "https://mainnet.infura.io/YOUR_INFURA_API_KEY"
const web3 = new Web3(rpcURL);

const abi = require('./abi.js');

const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
const contract = new web3.eth.Contract(abi, address);

var userAccount;
var accountInterval = setInterval(function() {
// 检查账户是否切换
if (web3.eth.accounts[0] !== userAccount) {
    userAccount = web3.eth.accounts[0];
    // 调用一些方法来更新界面
    getMonstersByOwner(userAccount)
    .then(displayMonsters);
}
}, 100);

var web3Infura = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));
var czEvents = new web3Infura.eth.Contract(abi, address);

czEvents.events.Transfer({ filter: { _to: userAccount } })
.on("data", function(event) {
    let data = event.returnValues;
    getMonstersByOwner(userAccount).then(displayMonsters);
}).on('error', console.error);

function displayMonsters(ids) {
    $("#monsters").empty();
    for (id of ids) {

    getMonsterDetails(id)
    .then(function(monster) {
        $("#monsters").append(`<div class="monster">
        <ul>
            <li>Name: ${monster.name}</li>
            <li>Level: ${monster.level}</li>
            <li>Skills: ${monster.skills}</li>
        </ul>
        </div>`);
    });
    }
}

function createMonster(name) {
    // 这将需要一段时间，所以在界面中告诉用户这一点
    // 事务被发送出去了
    $("#txStatus").text("Creating Monster, Please wait a moment...");
    // 把事务发送到我们的合约:
    return monsters.methods.createMonster(name)
    .send({ from: userAccount })
    .on("receipt", function(receipt) {
        $("#txStatus").text("sucess generated " + name + "!");
        // 事务被区块链接受了，重新渲染界面
        getMonstersByOwner(userAccount).then(displayMonsters);
    })
    .on("error", function(error) {
        // 告诉用户合约失败了
        $("#txStatus").text(error);
    });
}

// 查看monster的id
function getMonsterDetails(id) {
    return monsters.methods.monsters(id).call()
}

// call合约用户的monsterToOwner
function monsterToOwner(id){
    return monsters.methods.monsterToOwner(id).call()
}

// call合约用户的address
function getMonstersByOwner(owner) {
    return monsters.methods.getMonstersByOwner(owner).call()
}