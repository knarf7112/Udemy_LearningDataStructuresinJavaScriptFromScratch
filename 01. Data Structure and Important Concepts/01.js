    //宣告一個方法並加上名稱
    //通常表示這不只是一個表達式,而是一個可建構物件的function
    function User (firstName, lastName, age, gender ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
    };

    var user1 = new User('Knock', 'Yang', 18, 'male');//
    var user2 = new User('Jill', 'Robinson', 25, 'female');//
    console.log(user1);// User { firstName: 'Knock', lastName: 'Yang', age: 18, gender: 'male' }
    console.log(user2);// User { firstName: 'Jill', lastName: 'Robinson', age: 25, gender: 'female' }

    console.log(user1.emailDomain);// undefined
    console.log(user2.emailDomain);// undefined
    //結論: 若對function的prototype建立一個property,所有被constructor建立的instance皆可訪問此property
    User.prototype.emailDomain = '@facebook';

    console.log(user1.emailDomain);// '@facebook'
    console.log(user2.emailDomain);// '@facebook'

    User.prototype.getEmailAddress = function(){
        return this.firstName + '.' + this.lastName + this.emailDomain;
    }

    console.log(user1.getEmailAddress());// 'Knock.Yang@facebook'
    console.log(user2.getEmailAddress());// 'Jill.Robinson@facebook'

