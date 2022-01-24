/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { memo, useCallback } from 'react';
import { COLORS } from '../assets/colors';

const tempPictures: ITempPictures[] = [
  { src: 'pic1.png', alt: '수영장 사진0' },
  { src: 'pic2.png', alt: '노을 사진' },
  { src: 'pic3.png', alt: '방안 사진' },
  { src: 'pic4.png', alt: '수영장 사진1' },
  { src: 'pic5.png', alt: '수영장 사진2' },
  { src: 'pic6.png', alt: '수영장 사진3' },
  { src: 'pic7.png', alt: '수영장 사진4' },
];
function PictureList({ onClickPicture }: IPictureList) {
  const _setPicture = useCallback(picture => {
    const _pictureInfo = {
      src: picture.src,
      alt: picture.alt,
    };
    onClickPicture(_pictureInfo);
  }, []);

  return (
    <div css={pictureStyle}>
      <ul className="picture_list">
        {tempPictures.map(picture => {
          return (
            <li className="picture_list_element" key={picture.src}>
              <button onClick={() => _setPicture(picture)}>
                <img src={`../temp_img/picture/${picture.src}`} alt={picture.alt} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const pictureStyle = css`
  position: sticky;
  top: 44px;
  z-index: 10;
  width: 100%;
  margin-top: -10px;
  background-color: ${COLORS.primary};
  .picture_list {
    overflow: auto;
    display: flex;
    flex-space: nowrap;
    padding: 11px 16px;
  }
  .picture_list_element {
    overflow: hidden;
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    margin: 0 5px;
    border-radius: 5px;
    img {
      width: 100%;
    }
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  button {
    display: block;
  }
`;
export default memo(PictureList);
