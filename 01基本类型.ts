// 在TypeScript中声明变量，需要加上类型声明。通过静态类型约束，在编译时执行类型检查，这样可以避免一些类型混用的低级错误。

/** 布尔类型 **/
let flag:boolean = false;
// let flag:boolean = 1;  //报错

/** 数字类型 **/
let twoListeral:number = 0b1010;  // 二进制
let eightListeral:number = 0o744; // 八进制
let tenListeral:number = 6; // 十进制
let sixteenListeral:number = 0xf00d; // 十六进制

/** 字符串类型 **/
let userName:string = "骚猪";
let introduction:string = `我是全英雄联盟最骚的${userName}！`
console.log(introduction);

/** 数组类型 **/
// 数组类型中所有的元素必须符合指定的类型
let arr1:number[] = [1,2];
let arr2:Array<number> = [4,5];
// let arr3:number[] = [1,'2'];  // 报错

/** 元组类型 **/
// 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同。
let pointArr:[string,number] = ['aaa',45];
// let pointArr:[string,number] = [56,'aaa']; // 报错

/** 枚举类型 **/
// 枚举是一个可被命名的整型常数的集合，枚举类型为集合成员赋予有意义的名称，增强可读性。
enum Color {Red,Green,Blue}
let blue:Color = Color.Blue;
console.log(blue);
// 枚举类型默认按照顺序作为下标，当然也可以按照下面的例子强行修改下标
enum BackGround {Red = 4,Green,Blue = 7,Alpha}
let bgR:BackGround = BackGround.Red; // 4
let bgG:BackGround = BackGround.Green; // 5
let bgB:BackGround = BackGround.Blue;  // 7
let bgA:BackGround = BackGround.Alpha; // 8
console.log({bgR,bgG,bgB,bgA});

/** 任意值类型 **/
// 任意值是TypeScript针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。
// 1.变量的值会动态变化时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查。
let anyValue:any = 4;
anyValue = 'aaa';
anyValue = false;
// 2.改写现有代码时，任意值允许在编译阶时可选择地包含或移除类型检查。
let anyValue2:any = 4;
anyValue2.ifItExists();  // ifItExists方法在运行时可能存在，但这里并不检查
anyValue2.toFixed();
// 3.定义存储各种类型数据的数组时。
let anyArr:any[] = [1,false,'gagaga'];

/** null和undefinded **/
// 默认情况下，null和undefined是其他类型的子类型，可以赋值给其他类型。赋值后的类型会变成null或undefined。
// 在TypeScript中启用严格的空校验特性，就可以使null和undefined只能被赋值给void或本身对应的类型。
// 当启用--strictNullChecks
let originValue:number;
originValue = 5;
// originValue = null;  //报错
// originValue = undefined;  //报错
// 如果一个值可能出现null或者undefined,可以用|用来支持多种类型
let nullOrUndefined:null|undefined;

/** void类型 **/
// 使用void表示没有任何类型。例如一个函数没有返回值时，意味着返回值类型是void
function hell():void {
  alert('void')
}
let hells = ():void => {
  alert('void')
}
// 对于可忽略返回值的回调函数来说，使用void类型比任意值类型更安全。
function func(foo:() => void) {
  let f=foo();//使用函数foo的返回值
  // f.doSth();//报错，void类型不错在doSth()方法，换成任意值类型则不报错
}
// 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
let unusable:void = undefined;

/** never类型 **/
// never是其他类型（包括null和undefined）的子类型，代表从不会出现的值。
// 这意味着声明为never类型的变量只能被never类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（如无限循环）。
let neverX:never
// neverX = 123;  //报错
//返回值为never的函数可以是无法被执行到终止点的情况
function loop():never {
  while(true) {
  }
}
//返回值为never的函数可以是抛出异常的情况
function error(message:string):never {
  throw new Error(message)
}

/** Object类型 **/
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
// 使用object类型，就可以更好的表示像Object.create这样的API
// object类型将在后续继续深入

/** 类型断言 **/
// 类型断言相当于其他语言中的类型转换，但是不进行特殊的数据检查和解构
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
// 或者你也可以用这种方式
// let someValue: any = "this is a string";
// let strLength: number = (<string>someValue).length;
