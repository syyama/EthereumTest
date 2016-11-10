// Web3コンポーネントの取得
var Web3 = require('web3');
var web3 = new Web3();

// デフォルトアカウントの設定
web3.eth.defaultAccount = '0xBA9270B7DBf7a861Ebf5fF5EdF2D41455c9523Bc';
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

//StoreDataのABI
var ABI = require('./StoreData.json');

//デプロイしたアドレス
var address = '0x5003b92Ad161d5e77F5609d3C44E6c988ac019C6';

// Storeコントラクトを取得
var storeData = web3.eth.contract(ABI).at(address);

// ストアデータ取得関数の実行
var getStoreData = storeData.getStoreData();

// イベントの監視
var event = storeData.eventStoreData();
event.watch(function (error, result) {
    console.log('ストア情報を取得しました: ');
    if (!error)
        console.log(result);
});