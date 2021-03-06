import styled from '@emotion/styled';
import { useState } from 'react';
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

const schema = yup
  .object({
    answer: yup
      .string()
      .matches(/^[a-zA-Z]*$/)
      .required(),
  })
  .required();

export default function WordRelay() {
  const [givenWord, setGivenWord] = useState('zeroCho');
  const [result, setResult] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<Inputs_T>({
    resolver: yupResolver(schema),
  });

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
        <Styled.AnswerInput {...register('answer', { required: true })} />
        {errors.answer && <span>{errors.answer.message}</span>}
        <Styled.Button> 클릭 </Styled.Button>
      </Styled.Form>
      <Styled.Result>{result}</Styled.Result>
    </Styled.Root>
  );
}
