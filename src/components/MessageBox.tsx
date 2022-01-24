/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { TimeLine } from '.';
import { COLORS } from '../assets/colors';
import { convertDate } from '../lib';

function MessageBox({ type, text, picture, presentTime, timeLine }: IMessageBox) {
  return (
    <>
      {timeLine && <TimeLine timeLine={timeLine} />}
      <div css={style} className={type}>
        {picture ? (
          <p className="picture">
            <img src={`../temp_img/picture/${picture}`} alt={text} />
          </p>
        ) : (
          <p className={`${type}_text`}>{text}</p>
        )}
        {presentTime !== null && <span className="time">{convertDate(presentTime).chatRoomType()}</span>}
      </div>
    </>
  );
}
const style = css`
  display: flex;
  align-items: flex-end;
  margin: 10px 16px;
  &.send {
    flex-direction: row-reverse;
  }
  p {
    display: inline-block;
    max-width: 80%;
    padding: 12px;
    margin: 0;
    border-radius: 12px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    font-size: 14px;
    letter-spacing: -0.1px;
    &.receive_text {
      background: ${COLORS.white};
      color: ${COLORS.charcoalGrey};
    }
    &.send_text {
      background: ${COLORS.primary};
      color: ${COLORS.white};
    }
  }
  .time {
    margin: 0 4px;
    font-size: 12px;
    color: ${COLORS.charcoalGreyTwo};
  }
  .picture {
    overflow: hidden;
    padding: 0;
    width: 200px;
    height: 200px;
    img {
      display: block;
    }
  }
`;
export default memo(MessageBox);
