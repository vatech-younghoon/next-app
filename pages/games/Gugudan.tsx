import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Styled = {
  Root: styled.div``,
  Question: styled.h2``,
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
    answer: yup.number().required(),
  })
  .required();

export default function Gugudan() {
  const RANDOM_NUMBER = () => Math.ceil(Math.random() * 9);
  const EMPTY_VALUE = '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<Inputs_T>({
    resolver: yupResolver(schema),
  });

  const [operands1, setOperands1] = useState(RANDOM_NUMBER);
  const [operands2, setOperands2] = useState(RANDOM_NUMBER);
  const [quizResult, setQuizResult] = useState(EMPTY_VALUE);

  const onSubmit: SubmitHandler<Inputs_T> = (data) => {
    if (operands1 * operands2 === Number(data.answer)) {
      setQuizResult(`정답 ${data.answer}`);
      setOperands1(RANDOM_NUMBER);
      setOperands2(RANDOM_NUMBER);
      return;
    }
    setQuizResult(`땡 ${data.answer}`);
  };

  useEffect(() => {
    setFocus('answer');
    reset({ answer: '' });
  }, [quizResult]);

  return (
    <Styled.Root>
      <Styled.Question>
        {operands1} 곱하기 {operands2} 은
      </Styled.Question>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Styled.AnswerInput {...register('answer', { required: true })} />
        {errors.answer && <span>숫자를 입력해 주세요</span>}
        <input type="submit" />
      </Styled.Form>
      <Styled.Result>{quizResult}</Styled.Result>
    </Styled.Root>
  );
}
