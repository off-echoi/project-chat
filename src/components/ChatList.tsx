/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertDate } from '../lib';
import { COLORS } from '../assets/colors';

function ChatList({ id, user, lastMessage, unReadMessage }: IChatList) {
  const [date, setDate] = useState<string>('');

  // 날짜 변환
  const _convertDate = useCallback(() => {
    const _format = convertDate(lastMessage.date).chatListType();
    setDate(_format);
  }, []);

  useEffect(() => {
    _convertDate();
  }, []);

  return (
    <article css={style}>
      <Link to={`/room/${id}`} className="list">
        <div className="list_avatar">
          <img src={`./temp_img/profile/${user.avatar}`} alt={`${user.name} 프로필 사진`} />
        </div>
        <div className="list_content">
          <div className="list_user">
            <span className="list_user_name">{user.name}</span>
            <span className="list_user_date">{date}</span>
          </div>
          <div className="list_info">
            <span className="list_info_message">{lastMessage.message}</span>
            {unReadMessage > 0 && <div className="list_info_badge">{unReadMessage}</div>}
          </div>
        </div>
        <div></div>
      </Link>
    </article>
  );
}
const style = css`
  .list {
    display: flex;
    width: 100%;
    align-items: center;
    height: 74px;
    padding: 9px 16px;
    text-decoration: none;
    &_avatar {
      overflow: hidden;
      flex-shrink: 0;
      width: 56px;
      height: 56px;
      margin-right: 15px;
      border-radius: 100%;
      img {
        object-fit: cover;
        width: 115%;
      }
    }
    &_content {
      flex-grow: 1;
      font-size: 16px;
      width: calc(100% - 80px);
    }
    &_user,
    &_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &_user_name {
      margin-bottom: 3px;
      color: ${COLORS.charcoalGrey};
      font-weight: 600;
      letter-spacing: -0.2px;
    }
    &_user_date {
      display: block;
      color: ${COLORS.charcoalGreyTwo};
      font-size: 11px;
    }
    &_info_message {
      overflow: hidden;
      display: block;
      width: 90%;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${COLORS.coolGrey};
      font-size: 13px;
      letter-spacing: -0.1px;
    }
    &_info_badge {
      width: 18px;
      height: 18px;
      background: ${COLORS.primary};
      border-radius: 100%;
      color: ${COLORS.white};
      font-size: 10px;
      text-align: center;
      line-height: 18px;
    }
  }
`;

export default memo(ChatList);
