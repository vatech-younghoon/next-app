import styled from '@emotion/styled';

import { IResult } from './BaseBall';

type Props = {
  result: IResult;
};

const Styled = {
  List: styled.li``,
  Item: styled.div``,
};

export default function BaseBallResult({
  result: { strike, numbers, ball },
}: Props) {
  return (
    <Styled.List>
      <Styled.Item>{numbers} </Styled.Item>
      <Styled.Item>
        {strike} 쓰트라이크 {ball} 볼 입니다
      </Styled.Item>
    </Styled.List>
  );
}
