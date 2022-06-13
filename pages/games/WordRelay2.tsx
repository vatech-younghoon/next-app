import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Styled = {
  Root: styled.div``,
  Word: styled.h2``,
  Form: styled.form``,
  AnswerInput: styled.input``,
  Button: styled.button``,
  Result: styled.div``,
};
type Inputs_T = {
  answer: string;
};

export default function WordRelay() {
  const ONLY_ALPHABET = /^[a-zA-Z]*$/;

  const [givenWord, setGivenWord] = useState('zeroCho');
  const [result, setResult] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<Inputs_T>();

  const onSubmit: SubmitHandler<Inputs_T> = (data) => {
    if (givenWord.charAt(givenWord.length - 1) !== data.answer.charAt(0)) {
      setResult('땡 ' + data.answer);
      reset({ answer: '' });
      setFocus('answer');
      return;
    }
    setGivenWord(data.answer);
    setResult('정답 ' + data.answer);
    reset({ answer: '' });
    setFocus('answer');
  };

  return (
    <Styled.Root>
      <Styled.Word>{givenWord}</Styled.Word>
      <Styled.Form onClick={handleSubmit(onSubmit)}>
        <Styled.AnswerInput
          type="text"
          {...register('answer', {
            required: true,
            onChange: function (e) {
              if (!ONLY_ALPHABET.test(e.target.value)) {
                alert('?');
                return;
              }
            },
          })}
        />
        <Styled.Button> 클릭 </Styled.Button>
      </Styled.Form>
      <Styled.Result>{result}</Styled.Result>
    </Styled.Root>
  );
}
