pragma solidity 0.4.2;

contract Store {

    // 店舗情報
    struct StoreData {
        string name;      // 店舗名
        string streetNo;  // 住所
        string tel;       // 電話番号
        address owner;    // 登録者
    }

    // 店舗情報を初期化
    StoreData[] storeData;

    event eventStoreData(string name, string streetNo, string tel, address owner);

    /**
     * 店舗情報を設定
     * 
     */
    function setStoreData(string name, string streetNo, string tel) {
        
        // 登録者を設定する
        storeData.push(StoreData(name, streetNo, tel, msg.sender));

        // イベントを実行する
        eventStoreData(name, streetNo, tel, msg.sender);
    }

    /**
     * 店舗情報を取得
     * 
     */
    function getStoreData() {

        for (uint i = 0; i < storeData.length; ++i) {
            //イベントを実行する
            eventStoreData(storeData[i].name, storeData[i].streetNo
                , storeData[i].tel, storeData[i].owner);
        }
    }

    /**
     * 店舗情報を削除
     * 
     */
    function deleteStoreData(string name) {
        for (uint i = 0; i < storeData.length; ++i) {
            
            if(stringsEqual(storeData[i].name, name)) {
                delete storeData[i];
            }
        }
    }
    
    /**
     * string文字列を比較する
     * 
     */
	function stringsEqual(string storage _a, string memory _b) internal returns (bool) {
		bytes storage a = bytes(_a);
		bytes memory b = bytes(_b);
		if (a.length != b.length)
			return false;
		// @todo unroll this loop
		for (uint i = 0; i < a.length; i ++)
			if (a[i] != b[i])
				return false;
		return true;
	}
}