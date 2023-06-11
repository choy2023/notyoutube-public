const rendertitles = () => {
  const titles = [];
  for (let i = 0; i < 3; i++) {
    titles.push(<div key={i} className={`skeleton_videocard_channel`}></div>);
  }
  return titles;
};

const Skeleton = () => {
  return (
    <div className="videocard_container">
      <div className="videocard_container_item">
        <div className={`videocard_thumbnail skeleton_thumbnail`} />
        <div className="detail_renderer">
          <div className="videocard_left">
            <div
              className={`videocard_left_thumbnail skeleton_videocard_left_thumbnail`}
            />
          </div>
          <div className="videocard_right_subdetails ">
            <div className="videocard_right skeleton_videocard_right">
              <div className={`videocard_channel`}>{rendertitles()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
