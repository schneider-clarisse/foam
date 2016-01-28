/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Tests:

CLASS({ name: 'FactoryTest', properties: [
  {
    name: 'a',
    factory: function() { return 42; }
  } ]
 });
var ft = FactoryTest.create({});
console.assert(ft.a == 42, 'Factories don\'t work.');
ft.a = 84;
console.assert(ft.a == 84, 'Factories don\'t update.');


CLASS({ name: 'DefaultValue', properties: [
  {
    name: 'a',
    defaultValue: 42
  } ]
 });
var dv = DefaultValue.create({});
console.assert(dv.a == 42, 'DefaultValues don\'t work.');
dv.a = 84;
console.assert(dv.a == 84, 'DefaultValues don\'t update.');


var ap = ArrayProperty.create({});
console.assert(ap.preSet, 'ArrayProperty.preSet missing.');

// ArrayProperty Test
CLASS({ name: 'A', properties: [ { name: 'a' } ] });
debugger;
CLASS({ name: 'B', properties: [
  {
    type: 'Array',
    subType: 'A',
    name: 'as'
  }
] });

var b = B.create({as: [{a: 'abc'}]});
console.log(b.as);

debugger;

CLASS({
  name: 'ConstantTest',

  constants: [
    {
      name: 'KEY',
      value: 'If you can see this, Constants are working!'
    }
  ]
});

var t1 = ConstantTest.create({});
console.assert(t1,KEY, 'Constants don\'t work.');
console.log(t1.KEY);


CLASS({
  name: 'Person',

  constants: [
    {
      name: 'KEY',
      value: 'If you can see this, Constants are working!'
    }
  ],

  properties: [
    {
      name: 'name'
    },
    {
      name: 'age'
    }
  ],

  methods: [
    {
      name: 'sayHello',
      code: function() { console.log('Hello World!'); }
    },
    function sayGoodbye() { console.log('Goodbye from ' + this.name); }
  ]
});

var p = Person.create({name: 'Adam', age: 0});
console.log(p.name, p.age, p.KEY);
p.sayHello();
p.sayGoodbye();


CLASS({
  name: 'Employee',
  extends: 'Person',
  
  properties: [
    {
      name: 'salary'
    }
  ],

  methods: [
    function toString() {
      return this.cls_.name + '(' + this.name + ', ' + this.age + ', ' + this.salary + ')';
    }
  ]
});

var e = Employee.create({name: 'Jane', age: 30, salary: 50000});
console.log(e.toString());
e.sayGoodbye();

/*
// 3058ms, Jan 26, 2016, X1 Carbon
console.time('b1');
for ( var i = 0 ; i < 10000000 ; i++ )
  p.age++;
console.timeEnd('b1');


// 1251ms, Jan 26, 2016, X1 Carbon
console.time('b2');
for ( var i = 0 ; i < 1000000 ; i++ )
  Person.create({name: 'john', age: i});
console.timeEnd('b2');
*/