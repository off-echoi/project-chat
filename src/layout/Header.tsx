/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import { memo, useCallback } from 'react';
import { COLORS } from '../assets/colors';
import { Button } from '../components';
// 아이콘
import { ReactComponent as IconMenu } from '../assets/images/img-menu.svg';
import { ReactComponent as IconBack } from '../assets/images/img-back.svg';
import { ReactComponent as IconSearch } from '../assets/images/img-search.svg';
import { ReactComponent as IconUpload } from '../assets/images/img-upload.svg';
import { ReactComponent as IconUser } from '../assets/images/img-user.svg';
import { useAppDispatch } from '../context';

function Header({ type, title }: IHeader) {
  const dispatch = useAppDispatch();

  const navigation = useNavigate();
  const goMenu = useCallback(() => {
    console.log('메뉴');
  }, []);
  const goBack = useCallback(() => {
    navigation(-1);
  }, []);
  const onUser = useCallback(() => {
    console.log('user');
  }, []);

  const openPicture = useCallback(() => {
    dispatch({ type: 'PICTURE_OPEN' });
  }, []);
  const onSearch = useCallback(() => {
    console.log('search');
  }, []);

  return (
    <>
      <header css={style}>
        {type === 'list' && <Button type="header" onClick={goMenu} img={<IconMenu />} text="메뉴" />}
        {type === 'room' && <Button type="header" onClick={goBack} img={<IconBack />} text="뒤로가기" />}
        <h1 className="header_title">{title}</h1>
        {type === 'list' && <Button type="header" onClick={onUser} img={<IconUser />} text="유저정보" />}
        {type === 'room' && (
          <div className="button_group">
            {type === 'room' && <Button type="header" onClick={openPicture} img={<IconUpload />} text="사진전송" />}
            {type === 'room' && <Button type="header" onClick={onSearch} img={<IconSearch />} text="찾기" />}
          </div>
        )}
      </header>
    </>
  );
}
const style = css`
  position: fixed;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  background-color: ${COLORS.primary};
  .header_title {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 17px;
    font-weight: bold;
    color: #fff;
  }
  .button_group {
    display: flex;
    height: 100%;
    button {
      padding: 0 8px;
    }
  }
`;

export default memo(Header);
