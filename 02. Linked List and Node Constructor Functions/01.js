//### Linked List and "Node" Constructo Functions ###

/*

開始建立Linked List結構
1. 建立Node的結構,內有3個properties : 用來存放資料與前一個和後一個Node參考指標, 
2. 建立一個Linked List主結構, 內有2個Property: head與tail是第一個與最後一個 

*/
//-----------------------------------------------------------
// 1. 建立建構函數
function LinkedList() {
    //設定null的原因是constructor時,還未新增任何node,所以頭跟尾都沒有任何指向
    this.head = null;
    this.tail = null;
}


function Node(value , prev, next) {
    this.value = value; //放資料
    this.prev = prev; //指向前一個node
    this.next = next; //指向下一個node
}

var LL = new LinkedList();
console.log(LL);// { head: null, tail: null }

var node1 = new Node(100, 'node2', null);//
console.log(node1);// Node { value: 100, prev: null, next: 'node2' }


//------------------------------------------------------------
// 要如何將新資料加入到head呢?
// 2. LinkedList建立一個prototype用來新增一個node到head
LinkedList.prototype.addToHead = function(value){
    //新增一個node放入資料並將previou指向null,再此node的next指向目前的head,這樣head指標就往前移了
    var newNode = new Node(value, null, this.head);
    //若head存在,就將head裡面的node的prev屬性指向新的Node(原本此node應該是指向null,但是它已經不是第一個node了,所以要將他的prev屬性指向新的Node來建立關連)
    //若head不存在,表示此Linked List根本是空的,那就要指向一下頭尾
    if(this.head){
        this.head.prev = newNode;
    }else{
        this.tail = newNode;
    }
    this.head = newNode;
}

//------------------------------------------------------------
// 開始建立linked list instance
var linkedList = new LinkedList();
linkedList.addToHead(100);
console.log(linkedList);// 
/*
增加的第一個結點頭跟尾都是值100的那個節點
LinkedList { head: Node { value: 100, prev: null, next: null }, 
             tail: Node { value: 100, prev: null, next: null } }
*/

linkedList.addToHead(200);
console.log(linkedList);//
/*
增加第二個結點頭變值200的新節點且此節點的next屬性指向值100的節點
而
LinkedList { head: Node {value: 200, prev: null, next: Node},
             tail: Node {value: 100, prev: Node, next: null}

*/

linkedList.addToHead(300);
console.log(linkedList);
/*
增加第三個結點頭變值300的新節點且此節點的next屬性指向值200的節點
而值200的節點的prev屬性指向值300的節點且next屬性指向值100的節點
而值100的節點的prev屬性指向值200的節點且next屬性指向null

目前linkedList節點狀態如下:

  null <---(Node3:head)<----->(Node2)<----->(Node1:tail)---> null

 */
//------------------------------------------------------------