// 接口lablledValue定义了方法传入参数的类型，只要传入的对象符合必要条件，那么就是被允许的
// 下面例子表示，传入的对象必须包含label属性且为string类型
interface labelledValue {
  label: string;
}
function printLabel(labelledObj: labelledValue): void {
  console.log(labelledObj.label);
}
let myObj = {
  value: 10,
  label: "我就是力量的化身"
}
printLabel(myObj);

// 如下面的例子，在接口中定义了一个raduis属性，但是在方法内并未涉及，并没有报错，但是假设raduis产生拼写错误，ts依然会报错提示
interface CircleConfig {
  color?: string;
  radius?: number;
  area?: number;
}

function createCircle(config: CircleConfig = { color: "white", area: 100 }): { color: string; area: number } {
  let test = { color: "white", area: 100 };
  test.color = config.color;
  test.area = config.area;
  return test;
}

let test = createCircle({ color: "#fff", area: 100 });

// 有些对象的属性在创建之后就不能被修改了，这时候我们就需要只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 20, y: 10 }
// p1.x = 30; // 报错
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
let readonlyArr: ReadonlyArray<number> = [1, 2, 3, 4];
// 即使赋值也会被认为是符合法的
// let copyReadOnly: number[] = readonlyArr;
// 如果想要强行将这个值赋值，可以使用类型断言的方式
let copyReadOnly: number[] = readonlyArr as number[];
// readonly VS const
// 何时使用readonly，何时使用const的判断条件在于：你想将其看作一个属性还是看作一个变量
// 如果作为变量，请使用const。反之，请使用readonly

// 额外的属性检查
// SquareConfig可以有任意数量的属性，并且只要它们不是color和width，那么就无所谓它们的类型是什么。
interface SquareConfig {
  color?: string;
  width?: number;
  [propName :string]: any
}
function createSquare(config:SquareConfig):{color: string,width:number} {
  return {
    color:"#fff",
    width:7
  }
}
// 虽然我们可以通过将参数赋值给一个变量传参来越过额外属性检查，但是其实我们并不建议这么做，因为往往发生这种情况的时候总是你的代码有bug，或者有低级的拼写错误。
// typescript的所有检查只能针对表面的检查，当进行二次赋值的时候，属性检查将会无效。
// 所以针对这种类型的额外属性检查建议使用propName的方式去做，这种方式被称为索引签名
// let fake = {colour:"#fff",width:7};
// createSquare({colour:"#fff",width:7})

// 函数类型
// 如下所示定义了一个函数类型的接口，但是函数的参数名可以与接口中不同，而且也不用为函数中的参数和返回值定义类型，因为typescript会从接口中推断你的变量类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch:SearchFunc = (src,sub) => src.search(sub) > -1;

// 可索引的类型
// 可索引类型可以描述那些通过索引获得的类型。比如arr[2]或者obj['test']
// 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
interface StringArray {
  [index: number]: string | number
}
let myStringArray: StringArray = ['222']
// 你也可以通过使用readonly属性给索引签名设定只读
interface ReadonlyStringArray {
  readonly [index:number]: string | number
}
let myReadOnlyStringArr:ReadonlyStringArray = [1,'2',3];
// myReadOnlyStringArr[2] = 5;    // 报错

// 类类型
// 如下所示，我们可以对类做出一个接口，由于我们用这个类去实现这个接口的时候只对其部分实例检查。
// constructor存在于类的静态部分，所以不在我们的检查范围之内。
// 因此我们可以通过定义两个接口来实现constructor与class两边的约束
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date):void;
}
// 此处定义一个函数，将class传入，同时return了一个实例化后的变量
let createClock = (ctor:ClockConstructor,hour:number,minute:number) : ClockInterface => new ctor(hour,minute);
class Clock implements ClockInterface {
  currentTime:Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h:number,m:number) {

  }
}
let clockInstance = createClock(Clock,12,17); 

// 继承接口
interface Shape {
  color:string
}
interface Stroke {
  strokeWidth:number
}
interface Square extends Shape,Stroke {
  width:number
}
let square = <Square>{};
square.color = 'red';
square.width = 11;
square.strokeWidth = 11;
let square2:Square = {
  color:"#fff",
  width:20,
  strokeWidth:14,
}
