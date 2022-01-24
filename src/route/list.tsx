/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { ChatList } from '../components';
import { useAppDispatch, useAppState } from '../context';
import { Header } from '../layout';

function List() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [chatList, setChatList] = useState<IChatList[]>();
  useEffect(() => {
    if (state.isPictureOpen) {
      dispatch({ type: 'PICTURE_OPEN' });
    }
  }, [state.isPictureOpen]);
  useEffect(() => {
    const _chatList: IChatList[] = [];
    state.dataList.forEach(v => {
      const d: IChatList = {
        id: v.id,
        user: v.user,
        lastMessage: {
          message: v.messages[v.messages.length - 1].message,
          date: v.messages[v.messages.length - 1].date,
        },
        unReadMessage: v.messages.filter(msg => !msg.read).length,
      };
      _chatList.push(d);
    });
    setChatList(_chatList);
  }, []);

  return (
    <>
      <Header type="list" title="채팅" />
      <div css={style}>
        <section>
          {chatList?.length &&
            chatList.map((chat: IChatList) => {
              return (
                <ChatList
                  id={chat.id}
                  user={chat.user}
                  lastMessage={chat.lastMessage}
                  unReadMessage={chat.unReadMessage}
                  key={chat.id}
                />
              );
            })}
        </section>
      </div>
    </>
  );
}

const style = css`
  padding-top: 54px;
`;

export default List;
