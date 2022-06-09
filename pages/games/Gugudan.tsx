import styled from '@emotion/styled';
import { FormEvent, useEffect, useRef, useState } from 'react';

const Styled = {
  Root: styled.div``,
  Question: styled.h2``,
  Form: styled.form``,
  AnswerInput: styled.input``,
  Button: styled.button``,
  Result: styled.div``,
};
export default function Gugudan() {
  const RANDOM_NUMBER = () => Math.ceil(Math.random() * 9);
  const EMPTY_VALUE = '';

  const [operands1, setOperands1] = useState(RANDOM_NUMBER);
  const [operands2, setOperands2] = useState(RANDOM_NUMBER);
  const [myAnswer, setMyAnswer] = useState<string>(EMPTY_VALUE);
  const [quizResult, setQuizResult] = useState(EMPTY_VALUE);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [quizResult]);

  return (
    <Styled.Root>
      <Styled.Question>
        {operands1} 곱하기 {operands2} 은
      </Styled.Question>
      <Styled.Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (operands1 * operands2 === Number(myAnswer)) {
            setQuizResult(`정답 ${myAnswer}`);
            setOperands1(RANDOM_NUMBER);
            setOperands2(RANDOM_NUMBER);
            setMyAnswer(EMPTY_VALUE);
            return;
          }
          setQuizResult(`땡 ${myAnswer}`);
          setMyAnswer(EMPTY_VALUE);
        }}
      >
        <Styled.AnswerInput
          ref={inputRef}
          name="answer"
          type="number"
          value={myAnswer}
          onChange={({ target: { value } }) => setMyAnswer(value)}
        />
        <Styled.Button type="submit">입력!</Styled.Button>
      </Styled.Form>
      <Styled.Result>{quizResult}</Styled.Result>
    </Styled.Root>
  );
}
