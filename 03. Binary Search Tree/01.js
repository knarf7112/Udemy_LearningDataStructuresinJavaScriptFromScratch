/****************************************************************/
// Depth First Traversal : 遍歷深度優先
/*
ex:

           50
         /    \
       30      70
      /  \    /  \
    20   45  60   100
   /    /   /     /  \
 10    35  59    85  105
*/

//1. 初始化,所以左右node都設為空,insert時,再assign左右的指標(整個大的BST是一個一個小的BST所組成的)
function BST(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

//2. 依據Binary Search Tree圖形,必須有個insert方法來插入節點
/* think by mySelf: 
一開始會先產生一個root節點 (直接寫個instance一直插入值就會知道要幹啥了)
再針對此root插入時,再來依據條件區分左右 
看起來會用到遞迴插入,但結束點(base case)的條件是啥呢?
當一直遞迴進去最底部的節點後,就是最末端了,也是BST的深度優先概念
*/
BST.prototype.insert = function(value) {
    //當插入的值小於目前BST節點的值,那就在左邊處理囉
    if(value <= this.value){
        //若不存在左邊BST節點就新建立一個BST節點並指向目前節點的left屬性,順變回傳
        if(!this.left){
            this.left = new BST(value);
            //若要回傳最末端的結果,記得要在遞迴方法時,記錄回傳值,不然進入第二層遞迴,沒人陸續接回傳值的話,就會把最末端的回傳值丟了
            //也就是說this.left.insert(value)的回傳值要有人記錄或是回傳
            return console.log('left node:', value);
        }
        else{
            //若存在左邊BST節點就往下一個節點去做比較並將value帶過去
            return this.left.insert(value);
        }
    }
    //反之,就是在右邊處理囉
    else if(value > this.value){
        //若不存在右邊BST節點就新建立一個BST節點並指向目前節點的right屬性,順變回傳
        if(!this.right){
            this.right = new BST(value);
            return console.log('right node:', value);
        }
        else{
            //若存在右邊BST節點就往下一個節點去做比較並將value帶過去
            return this.right.insert(value);
        }
    }
};


var bst = new BST(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(45);
bst.insert(60);
bst.insert(100);
bst.insert(10);
bst.insert(35);
bst.insert(59);
bst.insert(85);
bst.insert(105);
/****************************************************************/
/*
接下來新增一個contains方法來確認值是否存在,回傳true\false
think by mySelf:
檢查值是否存在於此結構中是必要遍歷整個Tree,但會分成左右來處理,應該跟新增類似才對
*/

BST.prototype.contains = function (value) {
    //若比當前節點值小
    if(value < this.value){
        //若left節點存在 就往下一個節點
        if(this.left){
            return this.left.contains(value);
        }
        else{
            //因為傳入值比當前節點值小(不可能往右邊走,因為右邊是處理比節點值大的)
            //且左邊已經到底部,所以沒子節點了
            return false;
        }
    }
    //若比當前節點值大一樣往下一個節點
    else if(value > this.value){
        //若right節點存在 就往下一個節點
        if(this.right){
            return this.right.contains(value);
        }
        else{
            //類似上面左邊的處理方式
            return false;
        }
    }
    //一樣就找到囉,那就回傳true
    else{
        return true;
    }
};

console.log(bst.contains(85));// true
console.log(bst.contains(0));// false

/****************************************************************/
/*
再來建立BST的Depth First Traversal
傳入參數是一個會被調用的iterator function,此方法是一個委派方法
本節傳入的委派方法目的只要log出節點的值到console上

think by mySelf: 感覺應該是要把整個BST物件作深度優先的遍歷,
                 然後到每個節點執行委派的方法並將節點的值帶入
第一步應該是先遍歷到左邊的最底部,再慢慢往上跟右回推(可參考01.md的演示圖)
*/
BST.prototype.depthFirstTraversal = function(iteratorFunc){
    //委派方法放在前段或中段或後段各會有不同的執行順序
    //iteratorFunc(this.value);

    //左邊節點存在就往左邊遍歷,右邊節點存在就往右邊節點遍歷,
    //到底部了之後,就執行委派方法並將節點的值帶入
    if(this.left) this.left.depthFirstTraversal(iteratorFunc);
    
    iteratorFunc(this.value);//執行此方法之前會先遍歷left node, 因為上面的條件是有左節點就遞迴,所以執行到這邊就表示已經到達左邊的底部,然後再繼續往右節點

    if(this.right) this.right.depthFirstTraversal(iteratorFunc);
    //iteratorFunc(this.value);
};
var counter = 1;
function logValue(value){
    //顯示出委派方法的調用順序與節點的值(顯示出在哪個節點被調用且節點的值為何)
    console.log(counter, value);
    counter++;
}

bst.depthFirstTraversal(logValue);
/*
第1 次   10
第2 次   20
第3 次   30
第4 次   35
第5 次   45
第6 次   50
第7 次   59
第8 次   60
第9 次   70
第10次   85
第11次   100
第12次   105
*/


/****************************************************************/
/*
接下來教學要重構depth first traversal,希望能以不同的順序touch節點
增加一個order參數(有三種可能的順序: pre order, in order, post order)
當我們增加一個參數那表示要將此參數帶入遞迴,使得每次進入遞迴可以調用
*/
BST.prototype.depthFirstTraversal = function(iteratorFunc, order){
    if(order === 'pre-order') iteratorFunc(this.value);

    if(this.left) this.left.depthFirstTraversal(iteratorFunc, order);

    if(order === 'in-order') iteratorFunc(this.value);

    if(this.right) this.right.depthFirstTraversal(iteratorFunc, order);

    if( order === 'post-order') iteratorFunc(this.value);
};
var counter = 1;//歸0
bst.depthFirstTraversal(logValue, 'in-order'); 
/* 中序遍歷: 會優先遍歷左邊子節點(然後執行委派方法),然後再回到上一層的父節點(然後執行委派方法),然後再到右邊子節點(然後執行委派方法)
            看起來委派方法的執行順序就是左-->中-->右 ,
            遍歷過節點湊滿左中右節點就可以group起來當作一個大的左節點,然後一直回推上去
             因為條件是有左節點就遞迴,所以執行到委派方法就表示已經到達左邊的底部,
            然後若右節點存在,則再繼續往右節點遞迴(若右節點內,存在子節點,則繼續遞迴進去到底部)
第1 次   10 :左
第2 次   20 :中
            :右 (空的一樣當作存在,然後遍歷過的group起來並當作一個左,所以接下來就是會 --> 中)
第3 次   30     : 中 (把此節點右下面的節點都group當作一個右節點,然後再繼續對此group作左-->中-->右順序的遍歷)
第4 次   35          : 左
第5 次   45          : 中
                     : 右(空的一樣當作存在,然後把遍歷過的節點group起來當作一個肥大的左節點,所以接下來就會是遍歷此group的父節點 -->中)
第6 次   50          : 中 (把整個右節點當作一個group,然後繼續遍歷左-->中-->右)
                     : 右(此時肥大的右節點當然要遍歷進去到最底部,所以就會遍歷此group的最左節點 --> 左)
第7 次   59                  :左
第8 次   60                  :中
                             :右(空的一樣當作有,然後將59和60 group當作一個左)
第9 次   70                           : 中 (把此節點右邊的子節點都當作一個group,然後繼續遍歷左-->中-->右)                               
第10次   85                                  : 左
第11次   100                                 : 中
第12次   105                                 : 右 (這樣委派的方法算是都執行完畢了)
*/
var counter = 1;//歸0
bst.depthFirstTraversal(logValue, 'pre-order'); 
/* 前序遍歷: 開始遍歷時,就先執行委派方法,所以會從root節點開始往下遞迴
            遞迴下一層時,一樣是優先遍歷左節點再遍歷右節點     
            委派方法的執行順序會是中-->左-->右        
第1 次   50
第2 次   30
第3 次   20
第4 次   10
第5 次   45
第6 次   35
第7 次   70
第8 次   60
第9 次   59
第10次   100
第11次   85
第12次   105
*/

var counter = 1;//歸0
bst.depthFirstTraversal(logValue, 'post-order'); 
/* 後序遍歷: 開始遍歷時,會優先遍歷左邊子節點到底部,然後再右邊子節點到底部
            然後再往父節點回推
            委派方法的執行順序會是左-->右-->中
後序遍歷對於從Binary Search Tree安全的刪除節點是很有用的,因為它是從最小的開始
第1 次   10
第2 次   20
第3 次   35
第4 次   45
第5 次   30
第6 次   59
第7 次   60
第8 次   85
第9 次   105
第10次   100
第11次   70
第12次   50
*/

/****************************************************************/
// Breath First traversal : 廣度優先
/*
廣度優先是依據Tree的level來遍歷的,所以會是橫向的每一層的節點依左至右來作遍歷
使用情境可以用再等級或階層(hierarchy or a level of command)
例如:公司的雇員依據階層有不同的主要規則與次要的規則
     或是官員在軍隊中的排名

think by mySelf: 每一層的遍歷感覺像是串香腸一樣,
                 遍歷完第一層接者遍歷第二層,遍歷完第二層接者遍歷第三層
                 如果用一個array將階層扁平化都塞入陣列,就可以用迴圈遍歷了
流程演示: 
   [50]               [30, 70]            [70, 20, 45]        [20, 45, 60, 100]   [45, 60, 100, 10]    [60, 100, 10, 35]   [100, 10, 35, 59]  [10, 35, 59, 85, 105] [35, 59, 85, 105]   [59, 85, 105]        [85, 105]            [105]               []
     ↓               ↗  ↓                ↗  ↓                ↗ ↓                 ↗ ↓                 ↗ ↓                 ↗ ↓                ↗ ↓                   ↗ ↓                ↗  ↓                 ↗ ↓                 ↗   ↓                ↗ ↓      
  取出節點並塞入子節點  取出節點並塞入子節點  取出節點並塞入子節點   取出節點並塞入子節點  取出節點並塞入子節點  取出節點並塞入子節點  取出節點並塞入子節點 取出節點並塞入子節點   取出節點並塞入子節點   取出節點並塞入子節點  取出節點並塞入子節點   取出節點並塞入子節點  沒東西了
     ↓                  ↓                   ↓                   ↓                   ↓                   ↓                   ↓                  ↓                     ↓                    ↓                   ↓                     ↓                  ↓
    run                run                 run                 run                 run                 run                 run                run                   run                  run                 run                   run                end跳離迴圈
*/
BST.prototype.breadthFirstTraversal = function(interatorFunc){
    //首先需要有個root進入口和暫放展開節點的陣列
    //然後需要利用queue的先進先出,所以將每個節點的子節點往屁股塞,那就會依照順序排了
    var queue = [this];
    while(queue.length !== 0){
        var first = queue.shift();
        interatorFunc(first.value);
        //若當前節點的子節點存在,就依序塞入queue(塞到queue的屁股),會一直串聯到下一層
        if(first.left) queue.push(first.left);
        if(first.right) queue.push(first.right);
    }
};

var counter = 1;//歸0
bst.breadthFirstTraversal(logValue); 
/*
第1 次   50
第2 次   30
第3 次   70
第4 次   20
第5 次   45
第6 次   60
第7 次   100
第8 次   10
第9 次   35
第10次   59
第11次   85
第12次   105
*/

/****************************************************************/
// 練習: 建立兩個方法getMinVal和getMaxVal(very similar and just opposite)

/* Purpose: 回傳最小的值
think by my self: 最小值肯定在最左邊的底部,因為這是Binary Search Tree
如何最快達到那個位置呢?
從Binary Search Tree來看,最左邊底部的節點是最小的值,最右邊底部的節點是最大的值
*/
BST.prototype.getMinVal = function(){
    //若還有左邊的節點就繼續遞迴進入,
    //若沒有,就表示達到最左的節點,也就是最小值

    console.log('第幾次進入遞迴',BST.prototype.counter++);//不能用this.counter來計算, 原因: assig vlaue to this.counter會讓各個節點產生實體property
    if(this.left) return this.left.getMinVal(); //要用return串接一下method,不然到底部return的值沒人接呀
    else return this.value;//最左的節點:最小值
};

/* Purpose: 回傳最大的值
think by my self: 最大值肯定在最右邊的底部
*/
BST.prototype.getMaxVal = function(){
    //若還有最右邊的節點就繼續遞迴進入,
    //若沒有,就表示達到最右的節點,也就是最大值
    console.log('第幾次進入遞迴',BST.prototype.counter++);
    if(this.right) return this.right.getMaxVal();
    else return this.value;//最右的節點:最大值
};
BST.prototype.counter = 1;
console.log('最小值',bst.getMinVal());// 10
BST.prototype.counter = 1;
console.log('最大值',bst.getMaxVal());// 105


