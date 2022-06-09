import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const Styled = {
  Root: styled.div``,
  Word: styled.h2``,
  Form: styled.form``,
  AnswerInput: styled.input``,
  Button: styled.button``,
  Result: styled.div``,
};

export default function WordRelay() {
  const [givenWord, setGivenWord] = useState('제로초');
  const [answerWord, setAnswerWord] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [result]);
  return (
    <Styled.Root>
      <Styled.Word>{givenWord}</Styled.Word>
      <Styled.Form
        onClick={(e) => {
          e.preventDefault();
          if (givenWord.charAt(givenWord.length - 1) !== answerWord.charAt(0)) {
            setAnswerWord('');
            setResult('땡');
            return;
          }
          setGivenWord(answerWord);
          setAnswerWord('');
          setResult('정답');
        }}
      >
        <Styled.AnswerInput
          ref={inputRef}
          value={answerWord}
          onChange={(e) => setAnswerWord(e.target.value)}
        />
        <Styled.Button> 클릭 </Styled.Button>
      </Styled.Form>
      <Styled.Result>{result}</Styled.Result>
    </Styled.Root>
  );
}
