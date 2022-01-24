/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../assets/colors';
function Button({ type, img, onClick, text }: IButton) {
  return (
    <>
      {type === 'header' && (
        <button onClick={onClick} css={menuButton}>
          {img}
          <span>{text}</span>
        </button>
      )}
      {type === 'round' && (
        <button onClick={onClick} css={roundButton}>
          {img}
          <span>{text}</span>
        </button>
      )}
    </>
  );
}
const menuButton = css`
  background: transparent;
  border: none;
  height: 100%;
  padding: 0 12px;
  span {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
  }
`;
const roundButton = css`
  width: 50px;
  height: 50px;
  padding: 16px 12px;
  border: none;
  border-radius: 100%;
  background-color: ${COLORS.primary};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  span {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
  }
`;

export default memo(Button);
