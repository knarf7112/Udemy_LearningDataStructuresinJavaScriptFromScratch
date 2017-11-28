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
    this.head = newNode;//設定新節點為Linked List的頭部
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
               head                                  tail
  null <---(Node3: 300)<----->(Node2: 200)<----->(Node1: 100)---> null

 */
//------------------------------------------------------------

//再來新增從tail新增節點的原型方法
LinkedList.prototype.addToTail = function(value){
    
    //若tail為null, 表示此Linked List連第一個節點都沒有,那就將head也指向新節點
    //若tail存在節點,將此節點的next屬性指向新節點
    var newNode = new Node(value, this.tail, null);
    if(this.tail){
        this.tail.next = newNode;
    }else{
        this.head = newNode;
    }
    this.tail = newNode;//設定新節點為Linked List的尾部
};

linkedList.addToTail(400);
console.log(linkedList);
/*
目前linkedList節點狀態如下:
               head                                                     tail
  null <---(Node3: 300)<----->(Node2: 200)<----->(Node1: 100)<----->(Node1: 400)---> null
*/

linkedList.addToTail(500);
console.log(linkedList);
/*
目前linkedList節點狀態如下:
               head                                                                        tail
  null <---(Node3: 300)<----->(Node2: 200)<----->(Node1: 100)<----->(Node1: 400)<----->(Node1: 500)---> null
*/

//------------------------------------------------------------
//再來新增一個移除頭部節點的方法
LinkedList.prototype.removeHead = function() {
    //若LinkedList為空的(未建立任何節點)值的部分就回傳null
    //取得目前head節點的值用來回傳並將head換成下一個節點且將此節點的prev指向null(因為它變成第一個了)
    if(!this.head) return null;
    var value = this.head.value;
    this.head = this.head.next;
    //如果原本LinkedList的節點只有一個,那移除後也須要將tail屬性設為null
    //如果原本LinkedList的節點不只一個,那就是將新的head的prev屬性指向null
    if(this.head){
        this.head.prev = null;
    }
    else{
        this.tail = null;
    }
    return value;
};

var l2 = new LinkedList();

l2.addToHead(1000);
l2.addToHead(2000);
l2.addToHead(3000);

l2.removeHead();
console.log(l2.removeHead());// 2000
l2.removeHead();

console.log(l2);// LinkedList { head: null, tail: null }

//------------------------------------------------------------
//再來新增一個移除尾部節點的方法(類似移除頭部的方法)
LinkedList.prototype.removeTail = function() {

    if(!this.tail) return null;
    var value = this.tail.value;
    this.tail = this.tail.prev;//將尾部指標往前移
    //若尾部節點存在(表示LinkedList存在不只一個節點),就將新的尾部節點的next屬性設為null
    //若尾部節點不存在(表示LinkedList內只有一個節點),移除了就不存在任何節點了,所以就將頭部的指標也移除(設為null)
    if(this.tail){
        this.tail.next = null;
    }
    else{
        this.head = null;
    }
    return value;
};

var l3 = new LinkedList();

l3.addToHead(1000);
l3.addToHead(2000);
l3.addToHead(3000);

l3.removeTail();
console.log(l3.removeTail());// 2000
l3.removeTail();

console.log(l2);// LinkedList { head: null, tail: null }

//------------------------------------------------------------
//最後一個方法是Search: 目的是從LinkedList內,找出相符的值,並回傳此節點
LinkedList.prototype.search = function(searchValue){

    //think:要遍歷整個LinkedList的節點,所以就一步一步移動指標來遍歷整個LinkedList,當找到值相符的節點,就回傳值
    var currentNode = this.head;//也可從尾部開始找
    while(currentNode){
        if(currentNode.value === searchValue){
            return currentNode.value;
        }
        currentNode = currentNode.next;
    }
    return null;
};

var l4 = new LinkedList();

l4.addToHead(123);
l4.addToHead(2000);
l4.addToHead('hello');
l4.addToHead('world');
l4.addToHead(true);

console.log(l4.search(0));// null
console.log(l4.search(2000));// 2000
console.log(l4.search('hello'));// hello
console.log(l4.search('test'));// null

//------------------------------------------------------------
//練習建立一個類似Array的IndexOf方法,但回傳的是一個陣列
/*
ex:
        3 <--> 5 <--> 3 <--> 8
index:  0      1      2      3

LinkedList.indexOf(3) => [0, 2]
*/
LinkedList.prototype.indexOf = function (value) {

    //think: 須要遍歷整個LinkedList結構
    var currentNode = this.head;
    var currentIndex = 0;
    var indexes = [];
    while(currentNode){
        if(currentNode.value === value){
            indexes.push(currentIndex);
        }
        currentIndex++;
        currentNode = currentNode.next;
    }
    
    return indexes;
};


var l5 = new LinkedList();

l5.addToTail(3);
l5.addToTail(2);
l5.addToTail(5);
l5.addToTail(3);
l5.addToTail(1);
l5.addToTail(7);
// 3 <--> 2 <--> 5 <--> 3 <--> 1 <--> 7
console.log(l5.indexOf(3));// [0, 3]
console.log(l5.indexOf(0));// []
console.log(l5.indexOf(1));// [4]
//------------------------------------------------------------
//

