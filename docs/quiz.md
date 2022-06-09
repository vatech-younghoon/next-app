### Q1
Answer: O
```jsx
const App = () => {
  return (
    <div>
      <div>리액트</div>
      <div>어느 정도 공부한거 같은데</div>
      <div>v18은 언제 또 공부하지</div>
    </div>
  )
}
```

### Q2
Answer: X

### Q3
Answer: 
1. 최초 렌더링 후 일어나지 않음
2.  
```shell
1
2
3
```
3.
```js
const App = () => {
  const [count, setCount] = useState(0);

  const onChangeCount = () => {
    setCount( prevState => prevState + 1)
  };

  console.log("count", count);

  return <button onClick = { onChangeCount } > 버튼 < /button>;
}
```
let 으로 선언된 값을 변경하는  onChagneCount 함수는 count의 값을 변경할 순 있지만. count가 실제로 가르키고 있는 값은 변경하지 못한다.
따라서 let을 const로 변경하여 재 할당 할수 없게 만들어 주고 상태변이는 setCount로만 한다


### Q4
Answer:
1.
```shell
count 1 0
count 2 -1
```
2. 최초 렌더링 포함 2번

### Q5
Answer: 
```shell
count 1 0
count 2 0
count 3 0
count 4 0
count 5 3
```

### Q6
Answer: 
1. 출력이 되지 않는다
2. 0번
3. 
```ts
const App = () => {
  const [numArr, setNumArr] = useState<number[]>([]);

  const onChangeNumArr = () => {
    setNumArr(prevState => [...prevState, numArr.length]);
  };

	console.log("numArr", numArr);

  return <button onClick={onChangeNumArr}>숫자 추가</button>;
};
```

### Q7
Answer: 
1. 최초 포함 5번
```shell
a
ab
abc
abcd
```
### Q8
Answer: 
1. 최초 1번
2. 아무것도 출력 안됨

### Q9
Answer: scope가 다르다 onAdd2는  App Component가 리 렌더링 될 때 마다 함수가 소멸되고 다시 생성되지만
onAdd1는 App Component가 리 렌더링 되더라도 사라지지 않음 
