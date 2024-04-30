import { useState } from 'react'
import './GalleryPhoto.css'
import starFill from '../assets/star-fill.svg'
import starLine from '../assets/star-line.svg'
import linkImg from '../assets/links.svg'

type Props = {
  id: string;
  photographer: string;
  photographerUrl: string;
  alt: string;
  thumbnail: string;
  avgColor: string;
  isStarred: boolean | undefined;
  onStar: (id: string, method: "POST" | "DELETE") => void;
}

export default function GalleryPhoto(props: Props) {
  const { id, photographerUrl, thumbnail, photographer, avgColor, alt, onStar } = props;
  const [isStarred, setIsStarred] = useState(props.isStarred)

  const onClick = () => {
    setIsStarred(!isStarred)
    onStar(id, isStarred ? "DELETE" : "POST")
  };

  const starredIcon = <img src={starFill} className="star" alt="Starred" onClick={onClick} />;
  const notStarredIcon = <img src={starLine} className="star" alt="Not Starred" onClick={onClick} />;

  const averageColor = (
    <div className="avg-color">
      <div style={{ color: avgColor }}>{avgColor}</div>
      <div style={{ backgroundColor: avgColor }} className="square"></div>
    </div>
  )

  return (
    <div id="galleryPhoto">
      <div className="left-container">

        {isStarred ? starredIcon : notStarredIcon}
        <div className="thumbnail" style={{ backgroundImage: `url(${thumbnail})` }}></div>

        <div className="text-container">
          <div className="title">{photographer}</div>
          <div>{alt}</div>
          {averageColor}
        </div>

      </div>
      <div className="right-container">

        <div className="portfolio-url">
          <img src={linkImg} className="link-img" />
          <a href={photographerUrl} target="_blank">Porftolio</a>
        </div>

      </div>
    </div>
  )
}