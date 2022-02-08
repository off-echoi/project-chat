/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { COLORS } from '../assets/colors';
import { MessageBox, MessageInput, PictureList } from '../components';
import { Header } from '../layout';
import { useAppDispatch, useAppState } from '../context';
import moment from 'moment';
import { ReactComponent as IconClose } from '../assets/images/img-close.svg';

function Room() {
  const timeOut: { current: NodeJS.Timeout | null } = useRef(null);
  const tempId: { current: number } = useRef(Math.random());
  const messagesEnd: { current: HTMLDivElement | null } = useRef(null);
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { room_id } = useParams<{ room_id: string }>();
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [messages, setMessages] = useState<ChatContent[]>([]);
  const [pictureUploadState, setPictureUploadState] = useState<'yet' | 'uploading' | 'done'>('yet');
  const [picture, setPicture] = useState<ChatContent | null>();

  useEffect(() => {
    if (room_id) {
      dispatch({ type: 'ENTER_ROOM', id: room_id });
      const _currentData = state.dataList.filter(v => v.id === room_id)[0];
      setName(_currentData.user.name);
      setId(room_id);

      _currentData.messages.forEach((v, idx, arr) => {
        // 1분 미만 / 마지막 메세지만 시간 출력
        if (arr.length - 1 - idx > 0) {
          if (
            v.type === arr[idx + 1].type &&
            moment(new Date(v.date)).diff(moment(new Date(arr[idx + 1].date)), 'seconds') >= -59
          ) {
            v.presentTime = null;
          } else {
            v.presentTime = v.date;
          }
        } else {
          v.presentTime = v.date;
        }
        // 날짜 바뀜 라인
        if (idx > 0) {
          if (
            Number(moment(new Date(v.date)).format('YYYYMMDD')) -
              Number(moment(new Date(arr[idx - 1].date)).format('YYYYMMDD')) >
            0
          ) {
            v.timeLine = v.date;
          }
        } else {
          v.timeLine = v.date;
        }
      });
      setMessages(_currentData.messages);
    }
  }, [state.dataList, room_id]);

  const _onClickPicture = useCallback(
    data => {
      uploadPictureClear();
      const _content: ChatContent = {
        id: tempId.current,
        read: true,
        type: 'send',
        message: '사진',
        date: moment(new Date()).format('YYYY MM DD hh:mm:ss'),
        resource: data.src,
      };
      tempId.current++;
      setPicture(_content);
      setPictureUploadState('uploading');
    },
    [room_id]
  );
  const uploadPicture = useCallback(() => {
    if (room_id && picture) {
      timeOut.current = setTimeout(() => {
        setPictureUploadState('done');
        dispatch({ type: 'SEND_MESSAGE', id: room_id, content: picture });
      }, 4000);
    }
  }, [picture, room_id]);

  const uploadPictureClear = useCallback(() => {
    if (timeOut.current) {
      clearTimeout(timeOut.current);
      setPictureUploadState('yet');
    }
  }, [timeOut]);

  useEffect(() => {
    uploadPicture();
  }, [picture]);

  useEffect(() => {
    return () => {
      uploadPictureClear();
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesEnd]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, picture]);
  return (
    <>
      <Header type="room" title={name} />
      <div css={style}>
        {state.isPictureOpen && <PictureList onClickPicture={_onClickPicture} />}
        {messages.length &&
          messages.map(msg => {
            return (
              <MessageBox
                type={msg.type}
                text={msg.message ? msg.message : `${msg.resource} 사진`}
                presentTime={msg.presentTime ? msg.presentTime : null}
                picture={msg.resource ? msg.resource : null}
                key={msg.id}
                timeLine={msg.timeLine}
              />
            );
          })}
        {pictureUploadState === 'uploading' && (
          <div className="upload_box">
            <button onClick={uploadPictureClear} className="upload_cancel">
              <IconClose />
            </button>
            <MessageBox
              type="send"
              text="사진"
              presentTime={moment(new Date()).format('YYYY MM DD hh:mm')}
              picture={picture?.resource}
            />
            <div key={picture?.resource} className="upload_bar"></div>
          </div>
        )}
        <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd}></div>
      </div>
      <MessageInput roomId={id} />
    </>
  );
}

const style = css`
  min-height: 100vh;
  padding-top: 54px;
  padding-bottom: 90px;
  background: ${COLORS.paleGrey};
  .upload_box {
    position: relative;
  }
  .upload_cancel {
    position: absolute;
    right: 91px;
    top: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    opacity: 0.8;
    border-radius: 40px;
    background: #000;
  }
  .upload_bar {
    overflow: hidden;
    position: relative;
    width: 200px;
    height: 6px;
    margin: 0 16px 0 auto;
    border-radius: 20px;
    background: #e5e5e7;
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background: ${COLORS.primary};
      animation-duration: 4s;
      animation-name: slidein;
    }
    @keyframes slidein {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }
  }
`;
export default Room;
