/// <reference types="react-scripts" />
/**
 * About layout
 */
// Header
type HeaderType = 'list' | 'room';
interface IHeader {
  type: HeaderType;
  title: string;
}

/**
 * About compontnent
 */
// button
type ButtonType = 'header' | 'round';
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: ButtonType;
  onClick: () => void;
  img: ReactElement;
  text: string;
}
// timeLine
interface ITimeLine {
  timeLine: string;
}
// messagebox
type MessageBoxType = 'receive' | 'send';
interface IMessageBox {
  type: MessageBoxType;
  text: string;
  presentTime: string | null;
  picture?: string | undefined | null;
  timeLine?: string;
}
// messageInput
interface IMessageInput {
  roomId: string;
}
// pictureList
interface ITempPictures {
  src: string;
  alt: string;
}
interface IPictureList {
  onClickPicture: (ITempPictures) => void;
}
/**
 * pages
 */
//room
interface IPicture {
  src: string;
  alt: string;
}
/**
 *About Data
 */
// 채팅방 정보
type ChatContent = {
  id: number;
  read: boolean;
  type: MessageBoxType;
  message: string;
  date: string;
  resource?: string;
  presentTime?: string | null;
  timeLine?: string;
};

type UserInfo = {
  name: string;
  avatar: string;
};

type LastMessage = {
  message: string;
  date: string;
};
// 채팅방 정보
interface IRoomContent {
  id: string;
  user: UserInfo;
  messages: ChatContent[];
}
// 채팅 리스트 정보
interface IChatList {
  id: string;
  user: UserInfo;
  lastMessage: LastMessage;
  unReadMessage: number;
}

type Dnte = {
  user: UserInfo;
  messages: ChatContent[];
};
