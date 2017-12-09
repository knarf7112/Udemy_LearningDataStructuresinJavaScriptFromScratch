/**
 * 須實作兩個方法
 * 一個用於 hast table
 * 一個用於node,會放入hash table
 */
//size表示此hash table的buckets大小
function HashTable(size){
    this.buckets = Array(size);//用來assign data的,這是hash table的重點
    this.numBuckets = this.buckets.length;//此property用來追蹤此hash table總共有多少個buckets,因為需要知道何時下線
}

function HashNode(key, value, next){
    this.key = key;
    this.value = value;
    this.next = next || null;// this property on our hash table will refer to the next node in the specific bucket.如果結束有任何Collision,就會用來指向下一個,否則預設為null
}

var myHT = new HashTable(30);
// evevy element or buckets is currently unoccupied(沒人住),有30個空buckets
console.log(myHT); //HashTable { buckets: [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,  ], numBuckets: 30 }

/****************************************************************************************/
//要如成產生hash number呢? 
// 1. 如何轉換一個字元變成數字呢?在Javascript,每個字元對應到一個Unicode Value
console.log('hello world'.charCodeAt(0));// h: 104

// 2. 模除(modulo operator) : 將數字取餘數(remiander)
/* ex: 
7 % 3 => 1
100 % 30 => 10
*/

//key會是一個字串
HashTable.prototype.hash = function( key ){
    //儲存所有字元的unicode總值
    var  total = 0;
    for(var i = 0; i < key.length; i++){
        total += key.charCodeAt(i);  
    }
    //算完當然還無法對應到bucket的索引,因為total太大了,所以用modulo operator來取得索引
    var bucket = total % this.numBuckets;
    return bucket;
}

console.log(myHT.hash('Becca'));// 12

/****************************************************************************************/
/*
然後再建立一個insert method
將key value pair到一個hash node,然後放置到一個正確的bucket上
*/
HashTable.prototype.insert = function(key, value){
    //1. 先弄清楚要將hash node放到哪個bucket
    var index = this.hash(key); 
    console.log('Index', index);//
    //2. 然後會有兩種情況: bucket的指定索引內是空的, 或bucket內指定索引不是空的(collision)
    if(!this.buckets[index]) {
        this.buckets[index] = new HashNode(key, value);//空的,所以就建立
    }
    else if(this.buckets[index].key === key){
        //如果第一個節點key相符就更新其value
        this.buckets[index].value = value
    }
    else {
        //若不是空的也不是第一個節點
        //就開始一層一層找看看有沒有key相符的節點,
        //如果節點存在,就更新其value,如果不存在,就接在最底部節點的next屬性上(假設此節點上已存在一堆因為衝突而接在屁股的節點)
        var currentNode = this.buckets[index];
        //取得下一個節點
        while(currentNode.next){
            //如果key與目前結點的key一樣,則更新節點內的值,否則移到下一個
            if(currentNode.next.key === key){
                currentNode.next.value = value;
                return;
            }
            currentNode = currentNode.next;
        }
        //最後跑完迴圈都沒有更新節點,就表示此key不存在,所以就建立一個新的節點,並接到最後一個節點
        currentNode.next = new HashNode(key, value);
    }
    
}

myHT.insert('Dean','dean@gmail.com');
myHT.insert('Megan','megan@gmail.com');
myHT.insert('Dane','dane@yahoo.com');
myHT.insert('Dean','Updated@gmail.com');// update Dean email
myHT.insert('Megan','meganmachine@gmail.com'); // updateMega email
console.log(myHT.buckets);
/*
[ ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  HashNode { key: 'Megan', value: 'megan@gmail.com', next: null },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  HashNode { key: 'Dean', value: 'dean@gmail.com', next: HashNode { key: 'Dane', value: 'dane@yahoo.com', next: null } },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
   ]
*/

/****************************************************************************************/
/*
建立get方法,傳入key取得value, 找不到回傳null
1.仍然是從bucket取得hash number
2.之後就跟塞值很像了,只是動作是返回值
*/

HashTable.prototype.get = function(key){
    var index = this.hash(key);
    //1.如果bucket是空的就返回null
    if(!this.buckets[index]){
        return null;
    }
    //2.如果不是空的就開始找
    else{
        var currentNode = this.buckets[index];
        while(currentNode){
            if(currentNode.key === key){
                return currentNode.value;
            }
            currentNode = currentNode.next;
        };
        return null;
    }
};

console.log(myHT.get('Dane'));// dane@yahoo.com
console.log(myHT.get('Dnae'));// null

/****************************************************************************************/
/*
exercise: 回傳一個陣列,內包含所有的節點,且節點內含的下個節點也要放入陣列
*/

HashTable.prototype.retrieveAll = function(){
    var allNodes = [];
    for(var index = 0; index < this.numBuckets; index++){
            var currentNode = this.buckets[index];
            while(currentNode){
                allNodes.push(currentNode);
                currentNode = currentNode.next;
            }
    }
    return allNodes;
};
var returnArray = myHT.retrieveAll();
console.log(returnArray);
console.log(returnArray.length);// 3