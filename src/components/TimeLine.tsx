/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import moment from 'moment';
import { memo } from 'react';
import { COLORS } from '../assets/colors';

function TimeLine({ timeLine }: ITimeLine) {
  return (
    <div css={style}>
      <span>{moment(new Date(timeLine)).format('YYYY년 MM월 DD일')}</span>
    </div>
  );
}

const style = css`
  position: relative;
  width: 100%;
  color: ${COLORS.charcoalGreyTwo};
  text-align: center;
  span {
    z-index: 1;
    position: relative;
    padding: 0 10px;
    font-size: 12px;
    background: ${COLORS.paleGrey};
  }
  &:after {
    content: '';
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: calc(100% - 32px);
    height: 1px;
    background: ${COLORS.paleLilac};
  }
`;
export default memo(TimeLine);
