// Web3コンポーネントの取得
var Web3 = require('web3');
var web3 = new Web3();

// デフォルトアカウントの設定
web3.eth.defaultAccount = '0xBA9270B7DBf7a861Ebf5fF5EdF2D41455c9523Bc';
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

//StoreDataのABI
var ABI = require('./StoreData.json');

//デプロイしたアドレス
var address = '0xf28e0a9807605BaC6F6c8672c11404Fa77298f40';

// Storeコントラクトを取得
var storeData = web3.eth.contract(ABI).at(address);

// 入力受付
// 引数チェック
if (process.argv.length < 3) {
    console.log('引数エラー');
    return;
}

// 引数の内容を受け取る
var _name = process.argv[0];
var _streetNo = process.argv[1];
var _tel = process.argv[2];

// ストアデータ取得関数の実行
storeData.setStoreData(_name, _streetNo, _tel);

// イベントの監視
var event = storeData.eventStoreData();
event.watch(function (error, result) {
 console.log('ストア情報を取得しました: ');
  if (!error)
    console.log(result);

    // イベントの監視を終了する
    event.stopWatching();
});

