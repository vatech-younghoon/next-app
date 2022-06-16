import styled from '@emotion/styled';

import { IResult } from './BaseBall';
import { useEffect, useRef } from 'react';

type Props = {
  result: IResult;
  onHandleResetGame: () => void;
};

const Styled = {
  List: styled.li``,
  Item: styled.div``,
};

export default function BaseBallResult({
  result: { strike, numbers, ball },
  onHandleResetGame,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      onHandleResetGame();
    }
  });

  return (
    <Styled.List>
      <Styled.Item>{numbers} </Styled.Item>
      {numbers.length === strike ? (
        <Styled.Item ref={ref}> 홈런!</Styled.Item>
      ) : (
        <Styled.Item>
          {strike} 쓰트라이크 {ball} 볼 입니다
        </Styled.Item>
      )}
      <br />
    </Styled.List>
  );
}
