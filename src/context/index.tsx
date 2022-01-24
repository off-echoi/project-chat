import React, { useReducer, useContext, createContext, Dispatch } from 'react';
const today = new Date().getDate();

interface IState {
  dataList: IRoomContent[];
  isPictureOpen: boolean;
}

const initialState: IState = {
  dataList: [
    {
      id: 'fullMoon_jang',
      user: {
        name: '장만월 사장님',
        avatar: 'profile_jmw.png',
      },
      messages: [
        {
          type: 'receive',
          message: '출근했니?',
          date: `2022 1 24 23:55:50`,
          read: false,
          id: 1,
        },
        {
          type: 'receive',
          message: '출근했냐구?',
          date: '2022 1 24 23:56:30',
          read: false,
          id: 2,
        },
        {
          type: 'receive',
          message: '어딘데 출근 안하니, 죽고싶니?',
          date: `2022 1 ${today} 01:38:22`,
          read: false,
          id: 3,
        },
      ],
    },
    {
      id: 'jk_shin',
      user: {
        name: '신정근 바텐더',
        avatar: 'profile_sjk.png',
      },
      messages: [
        {
          type: 'send',
          message: '저 25일 부터 휴가갑니다. 참고 부탁드려요~!',
          date: `2022 1 24 18:35:30`,
          read: true,
          id: 129,
        },
        {
          type: 'receive',
          message: '네. 잘 쉬다 오세요',
          date: `2022 1 24 18:35:31`,
          read: true,
          id: 229,
        },
        {
          type: 'receive',
          message: '거기 날씨는 어때요?',
          date: `2022 1 ${today} 01:35:30`,
          read: true,
          id: 29,
        },
        {
          type: 'receive',
          message: '오시는 길에 와인 몇병만 사다주세요.',
          date: `2022 1 ${today} 01:36:31`,
          read: false,
          id: 6,
        },
      ],
    },
    {
      id: 'mr_lee',
      user: {
        name: '이미라 의사',
        avatar: 'profile_lmr.png',
      },
      messages: [
        {
          type: 'receive',
          message: '휴가 잘 보내고 계신가요? 다름이 아니라 지하실 열쇠가 어디에 있나요?',
          date: '2022 1 21 03:11:44',
          read: true,
          id: 7,
        },
      ],
    },
    {
      id: 'dj_koo',
      user: {
        name: '구찬성 지배인',
        avatar: 'profile_kcs.png',
      },
      messages: [
        {
          type: 'receive',
          message: '아 휴가셨군요. 약속은 다음으로 미루시죠!',
          date: '2022 1 21 18:59:33',
          read: true,
          id: 8,
        },
      ],
    },
    {
      id: 'js_ro',
      user: {
        name: '노준석 총지배인',
        avatar: 'profile_rjs.png',
      },
      messages: [
        {
          type: 'receive',
          message: '휴가에서 언제 돌아오시는지요. 돌아오시면 논의할 문제가 있습니다.',
          date: '2022 1 20 06:45:11',
          read: true,
          id: 9,
        },
      ],
    },
    {
      id: 'yn_kim',
      user: {
        name: '김유나 인턴',
        avatar: 'profile_kyn.png',
      },
      messages: [
        {
          type: 'receive',
          message: '304호 키를 잃어버렸어요 어떻게 해야하죠 ㅠ',
          date: '2022 1 19 10:03:22',
          read: true,
          id: 10,
        },
      ],
    },
    {
      id: 'hm_koo',
      user: {
        name: '구현모',
        avatar: 'profile_khm.png',
      },
      messages: [
        {
          type: 'receive',
          message: '술먹자',
          date: '2022 1 17 19:11:01',
          read: true,
          id: 11,
        },
        {
          type: 'send',
          message: '바빠서 시간이 없어요',
          date: '2022 1 17 20:30:23',
          read: true,
          id: 12,
        },
        {
          type: 'receive',
          message: '술먹자',
          date: '2022 1 19 03:11:11',
          read: true,
          id: 13,
        },
      ],
    },
  ],
  isPictureOpen: false,
};

type Action =
  | { type: 'ENTER_ROOM'; id: string }
  | { type: 'SEND_MESSAGE'; id: string; content: ChatContent }
  | { type: 'PICTURE_OPEN' };

type AppDispatch = Dispatch<Action>;

const AppStateContext = createContext<IState | null>(null);
const AppDispatchContext = createContext<AppDispatch | null>(null);

function reducer(state: IState, action: Action): IState {
  switch (action.type) {
    case 'ENTER_ROOM': {
      state.dataList.forEach(v => {
        if (v.id === action.id) {
          v.messages.forEach(vv => (vv.read = true));
        }
      });
      return {
        ...state,
      };
    }
    case 'SEND_MESSAGE': {
      const _index = state.dataList.findIndex(v => v.id === action.id);
      return {
        ...state,
        dataList: [
          ...state.dataList.slice(0, _index),
          { ...state.dataList[_index], messages: state.dataList[_index].messages.concat(action.content) },
          ...state.dataList.slice(_index + 1, state.dataList.length),
        ],
      };
    }
    case 'PICTURE_OPEN':
      return {
        ...state,
        isPictureOpen: !state.isPictureOpen,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) throw new Error('Cannot find AppProvider'); // 유효하지 않을땐 에러를 발생
  return state;
}

export function useAppDispatch() {
  const dispatch = useContext(AppDispatchContext);
  if (!dispatch) throw new Error('Cannot find AppProvider'); // 유효하지 않을땐 에러를 발생
  return dispatch;
}
