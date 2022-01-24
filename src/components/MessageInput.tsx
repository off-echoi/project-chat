/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import moment from 'moment';
import { useRef } from 'react';
import { memo, useCallback, useState } from 'react';
import { Button } from '.';
import { COLORS } from '../assets/colors';
import { ReactComponent as IconSend } from '../assets/images/img-send.svg';
import { useAppDispatch } from '../context';

function MessageInput({ roomId }: IMessageInput) {
  const tempId = useRef<number>(Math.random());
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>('');
  const _setMessage = useCallback(e => {
    setMessage(e.currentTarget.value);
  }, []);

  const onKeyDown = useCallback(
    e => {
      if (e.key === 'Enter') {
        postMessage();
      }
    },
    [tempId, message]
  );

  const postMessage = useCallback(() => {
    if (message.trim() !== '') {
      const _content: ChatContent = {
        id: tempId.current,
        read: true,
        type: 'send',
        message: message,
        date: moment(new Date()).format('YYYY MM DD hh:mm:ss'),
      };
      dispatch({ type: 'SEND_MESSAGE', id: roomId, content: _content });
      tempId.current++;
      setMessage('');
    }
  }, [tempId, message, roomId]);

  return (
    <div css={style}>
      <label htmlFor="message">메시지 입력</label>
      <input
        type="text"
        placeholder="메시지를 입력하세요."
        name="message"
        id="message"
        value={message}
        onChange={_setMessage}
        onKeyPress={onKeyDown}
      />
      <Button type="round" img={<IconSend />} onClick={postMessage} text="메시지 전송" />
    </div>
  );
}

const style = css`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  width: 100%;
  padding: 0 16px;
  background: ${COLORS.paleGrey};
  label {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
  }
  input {
    flex-grow: 1;
    width: 280px;
    height: 50px;
    margin-right: 12px;
    padding: 17px 16px;
    border-radius: 25px;
    border: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: -0.12px;
    font-size: 14px;
    &::placeholder {
      color: ${COLORS.battleshipGrey};
    }
  }
`;
export default memo(MessageInput);
