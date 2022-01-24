import moment from 'moment';
import 'moment/locale/ko';

export default function convertDate(date: string) {
  moment.updateLocale('ko', {
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  });
  const today = moment();
  const _date = new Date(date);
  const _moment = moment(_date);
  // 채팅 방에서 보여줄 요일/시간 포멧
  const chatRoomType = () => {
    return _moment.format('hh:mm');
  };
  // 채팅 리스트에서 보여 줄 요일/시간 포멧
  const chatListType = () => {
    if (today.diff(_moment, 'days') > 0) {
      return _moment.format('dddd');
    } else {
      return _moment.format('hh:mm');
    }
  };
  return { chatListType, chatRoomType };
}
