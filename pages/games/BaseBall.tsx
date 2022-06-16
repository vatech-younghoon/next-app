import styled from '@emotion/styled';
import { FormEvent, useRef, useState } from 'react';
import { v4 } from 'uuid';

import BaseBallResult from './BaseBallResult';

export interface IResult {
  numbers: number[];
  strike: number;
  ball: number;
}

const Styled = {
  Root: styled.div``,
  Form: styled.form``,
  Input: styled.input``,
  Result: styled.div``,
  ResultContainer: styled.ul``,
};
const RANDOM_NUMBER = () => Math.ceil(Math.random() * 9);

const getRandomNumbers = (size: number) => {
  const set = new Set<number>();
  while (set.size !== size) set.add(RANDOM_NUMBER());
  return [...set.values()];
};

function findBall(
  tryNumbers: number[],
  targetNumbers: number[],
  strike: number,
) {
  const mergedNumberList = [...tryNumbers, ...targetNumbers];
  const mergedNumberSet = mergedNumberList.reduce((acc, cur) => {
    return acc.add(cur);
  }, new Set<number>());
  return mergedNumberList.length - mergedNumberSet.size - strike;
}

function isValidate(tryNumbers: number[], targetNumbers: number[]) {
  if (tryNumbers.length !== targetNumbers.length) {
    alert('랜덤 숫자와, 입력 숫자의 크기가 일치하지 않습니다.');
    return false;
  }

  if (new Set(tryNumbers).size !== targetNumbers.length) {
    alert('숫자는 중복으로 입력 할 수 없습니다.');
    return false;
  }
  return true;
}

function merge(tryNumbers: number[], targetNumbers: number[]) {
  return tryNumbers.map((tryNumber, index) => {
    return [tryNumber, targetNumbers[index]];
  });
}

function findStrike(mergedNumbers: number[][]) {
  return mergedNumbers.reduce((acc, [triedNumber, targetNumber]) => {
    if (triedNumber === targetNumber) acc += 1;
    return acc;
  }, 0);
}

function play(tryNumbers: number[], targetNumbers: number[]) {
  const strike = findStrike(merge(tryNumbers, targetNumbers));
  const ball = findBall(tryNumbers, targetNumbers, strike);
  return [strike, ball];
}

export default function BaseBall() {
  const MAX_NUMBER_SIZE = 4;
  const BLANK = '';

  const [randNumbers] = useState<number[]>(getRandomNumbers(MAX_NUMBER_SIZE));
  const [input, setInput] = useState(BLANK);
  const [result, setResult] = useState<IResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(randNumbers);
  return (
    <Styled.Root>
      <Styled.Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const inputs = input.split('').map((item) => Number(item));
          if (!isValidate(inputs, randNumbers)) return;
          const [strike, ball] = play(inputs, randNumbers);
          setResult((prevState) => [
            ...prevState,
            {
              numbers: inputs,
              strike: strike,
              ball: ball,
            },
          ]);
          setInput(BLANK);
        }}
      >
        <Styled.Input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            if (e.target.value.length > MAX_NUMBER_SIZE) {
              alert(`${MAX_NUMBER_SIZE}글자를 넘지 마세요 `);
              return;
            }
            setInput(e.target.value);
          }}
        />
      </Styled.Form>
      <Styled.Result>시도 {result.length}</Styled.Result>
      <Styled.ResultContainer>
        {result.map((item) => (
          <BaseBallResult key={v4()} result={item} />
        ))}
      </Styled.ResultContainer>
    </Styled.Root>
  );
}
