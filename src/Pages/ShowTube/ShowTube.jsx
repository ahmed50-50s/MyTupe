import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

export default function ShowTube() {
  const [DataList, setDataList] = useState([]);
  const [ChannelInfo, setChannelInfo] = useState(null);
  const {
    state: { ChannelName },
  } = useLocation();
  const navigate = useNavigate();
  const [HoverIndex, setHoverIndex] = useState(null);

  async function GetData(ChannelName) {
    try {
      const response = await axios.get(
        `/api/search.json?engine=youtube&search_query=${ChannelName}&api_key=963db332d651c2c25dfa85a450f22fb1c92fd64dff10253de07e5e382a6b0587`
      );

      setDataList(response.data.video_results);
      const firstVideo = response.data.video_results[0];
      if (firstVideo) {
        setChannelInfo({
          name: firstVideo.channel.name,
          thumbnail: firstVideo.channel.thumbnail,
          verified: firstVideo.channel.verified,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (ChannelName) {
      GetData(ChannelName);
    }
    console.log(ChannelName);
  }, [ChannelName]);

  function goShowVideo(video) {
    navigate("/ShowVideo", { state: { video } });
  }

  function views(view) {
    if (view >= 1000000) return parseInt(view / 1000000) + "M";
    if (view >= 1000) return parseInt(view / 1000) + "K";
    return view;
  }

  return (
    <>
      <SideBar />
      <div className="w-full md:w-4/5 md:ml-auto">
        {/* Channel Banner */}
        <div
          className="w-full h-[30vh] sm:h-[40vh] bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/img/cover.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <img
              src={ChannelInfo?.thumbnail}
              alt={ChannelInfo?.name}
              className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full border-4 sm:border-7 border-gray-800"
            />
            <div className="flex flex-col items-center mt-4">
              <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold flex items-center">
                {ChannelInfo?.name}
                {ChannelInfo?.verified && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-blue-500 text-sm sm:text-lg ml-2"
                  />
                )}
              </h2>
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="bg-[#0f0f0f] min-h-screen p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {Array.isArray(DataList) && DataList.length > 0 ? (
              DataList.map((video, index) => (
                <div
                  key={index}
                  className="transition-transform duration-300 transform hover:scale-105 p-2 rounded-xl cursor-pointer"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => goShowVideo(video)}
                >
                  <img
                    src={
                      HoverIndex === index
                        ? video.thumbnail.rich || video.thumbnail.static
                        : video.thumbnail.static
                    }
                    alt={video.title}
                    className="rounded-xl w-full object-cover"
                  />
                  <h3 className="text-white mt-2 text-sm sm:text-base font-semibold">
                    {video.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    {views(Number(video.views))} views • {video.published_date}
                  </p>
                </div>
              ))
            ) : (
              <span className="loader"></span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
