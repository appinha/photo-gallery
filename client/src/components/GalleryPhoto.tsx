import { useState } from "react";
import { Photo } from "../utils/adapters";
import starFill from "../assets/star-fill.svg";
import starLine from "../assets/star-line.svg";
import linkImg from "../assets/links.svg";
import "./GalleryPhoto.css";

type Props = {
  onStar: (id: string, method: "POST" | "DELETE") => void;
} & Photo;

export default function GalleryPhoto(props: Props) {
  const { id, photographerUrl, srcTiny, photographer, avgColor, alt, onStar } = props;
  const [isStarred, setIsStarred] = useState(props.isStarred);

  const onClick = () => {
    setIsStarred(!isStarred);
    onStar(id, isStarred ? "DELETE" : "POST");
  };

  const starredIcon = <img src={starFill} className="star" alt="Starred" onClick={onClick} />;
  const notStarredIcon = (
    <img src={starLine} className="star" alt="Not Starred" onClick={onClick} />
  );

  const thumbnail = (
    <div
      className="thumbnail"
      style={{ backgroundImage: `url(${srcTiny})` }}
      data-testid="thumbnail"
    ></div>
  );

  const averageColorSquare = (
    <div
      style={{ backgroundColor: avgColor }}
      className="square"
      data-testid="avgColorSquare"
    ></div>
  );

  const averageColor = (
    <div className="avg-color">
      <div style={{ color: avgColor }}>{avgColor}</div>
      {averageColorSquare}
    </div>
  );

  return (
    <div id="galleryPhoto">
      <div className="left-container">
        {isStarred ? starredIcon : notStarredIcon}
        {thumbnail}

        <div className="text-container">
          <div className="title">{photographer}</div>
          <div>{alt}</div>
          {averageColor}
        </div>
      </div>
      <div className="right-container">
        <div className="portfolio-url">
          <img src={linkImg} className="link-img" data-testid="linkImg" />
          <a href={photographerUrl} target="_blank">
            Porftolio
          </a>
        </div>
      </div>
    </div>
  );
}
