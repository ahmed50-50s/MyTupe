import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

export default function ShowMovie() {
  let navigate = useNavigate();

  const {
    state: { video },
  } = useLocation();

  let { DataList, setDataList } = useContext(SearchContext);

  const videoId = new URL(video.link).searchParams.get("v");
  const embedLink = `https://www.youtube.com/embed/${videoId}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-wrap lg:flex-nowrap bg-[#0f0f0f] min-h-screen p-4">
      {/* Video Section */}
      <div className="w-full lg:w-2/3 p-4">
        <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh]">
          <iframe
            src={embedLink}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        </div>

        <h2 className="text-white text-xl sm:text-2xl font-bold mt-4">{video.title}</h2>

        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          {video.views} views • {video.published_date}
        </p>

        {/* Channel Info */}
        <div className="flex items-center mt-4">
          <img
            src={video.channel.thumbnail}
            alt={video.channel.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3"
          />
          <div>
            <h3
              onClick={() => navigate("/ShowTube", { state: { ChannelName: video.channel.name } })}
              className="text-white text-sm sm:text-lg font-semibold cursor-pointer"
            >
              {video.channel.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              {video.channel.subscribers} Subscribers
            </p>
          </div>
          <button className="bg-red-600 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md font-semibold ml-auto">
            Subscribe
          </button>
        </div>

        {/* Description */}
        <div className="mt-6 bg-zinc-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-white text-sm sm:text-base">Description:</h4>
          <p className="text-xs sm:text-sm text-zinc-300">{video.description}</p>
        </div>
      </div>

      {/* Recommended Videos */}
      <div className="w-full lg:w-1/3 mt-6 lg:mt-4 lg:pl-6">
        <h3 className="text-white text-lg sm:text-xl font-semibold mb-4">Next Up</h3>
        {DataList.length > 0 ? (
          DataList.map((movie, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition duration-300"
              onClick={() => navigate("/ShowVideo", { state: { video: movie } })}
            >
              {/* Video Thumbnail */}
              <img
                src={movie.thumbnail.static}
                alt={movie.title}
                className="w-32 h-20 sm:w-40 sm:h-24 object-cover rounded-lg"
              />

              {/* Video Details */}
              <div className="flex-1">
                <h4 className="text-white text-xs sm:text-sm font-semibold line-clamp-2">
                  {movie.title}
                </h4>
                <p className="text-xs text-zinc-400">{movie.channel.name}</p>
                <p className="text-xs text-zinc-400">{movie.views} views</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-sm">No recommended videos available.</p>
        )}
      </div>
    </div>
  );
}
