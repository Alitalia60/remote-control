

// type Tf = never | void | string;

// interface IDisp { [key: string]: Tf };

// const disp: IDisp = {
//   one: () => console.log('one'),
//   // two: () => console.log('two')
// }

// let choice = 'one';
// disp[choice]()

const disp = {
  a: (fnName: Function, arg: number[]) => fnName(...arg)
}

function some(a: number, b: number): number {
  return a + b
}

console.log(disp['a'](some, [3, 5]));