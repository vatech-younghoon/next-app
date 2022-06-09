import styled from '@emotion/styled';
import { FormEvent, useState } from 'react';

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
  const [operands1, setOperands1] = useState(RANDOM_NUMBER);
  const [operands2, setOperands2] = useState(RANDOM_NUMBER);
  const [myAnswer, setMyAnswer] = useState<string>('');
  const [quizResult, setQuizResult] = useState('');

  return (
    <Styled.Root>
      <Styled.Question>
        {operands1} 곱하기 {operands2} 은
      </Styled.Question>
      <Styled.Form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (operands1 * operands2 === Number(myAnswer)) {
            setQuizResult('정답입니다');
            setOperands1(RANDOM_NUMBER);
            setOperands2(RANDOM_NUMBER);
            return;
          }
          setMyAnswer('');
          setQuizResult('땡!');
        }}
      >
        <Styled.AnswerInput
          name="answer"
          type="number"
          value={myAnswer}
          onChange={({ target: { value } }) => setMyAnswer(value)}
        />
        <Styled.Button>입력!</Styled.Button>
      </Styled.Form>
      <Styled.Result>{quizResult}</Styled.Result>
    </Styled.Root>
  );
}
