import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";

export default function SearchMovies() {
  let { DataList, SearchTerm, setDataList } = useContext(SearchContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function GetData(x) {
    setLoading(true);
    try {
      let response = await axios.get(
        `/api/search.json?engine=youtube&search_query=${x}&api_key=963db332d651c2c25dfa85a450f22fb1c92fd64dff10253de07e5e382a6b0587`
      );
      setDataList(response.data.video_results);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    GetData(SearchTerm);
  }, [SearchTerm]);

  function views(view) {
    if (view >= 1000000) return parseInt(view / 1000000) + "M";
    if (view >= 1000) return parseInt(view / 1000) + "K";
    return view;
  }

  function goShowVideo(video) {
    navigate("/ShowVideo", { state: { video } });
  }

  return (
    <div>
      <SideBar />
      <div className="bg-black min-h-screen p-6 text-white md:w-4/5 sm:w-4/5 float-right">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <span className="loader"></span>
          </div>
        ) : DataList.length > 0 ? (
          DataList.map((video, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 cursor-pointer hover:bg-zinc-900 transition-all duration-300 p-3 rounded-xl"
              onClick={() => goShowVideo(video)}
            >
              {/* ✅ جعل الصورة أصغر في الشاشات الصغيرة */}
              <img
                src={video.thumbnail.static}
                alt={video.title}
                className="w-full sm:w-60 sm:h-36 md:w-96 md:h-56 rounded-xl object-cover"
              />

              <div className="flex flex-col flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{video.title}</h3>

                {/* ✅ جعل صورة القناة أصغر في الشاشات الصغيرة */}
                <div
                  className="flex items-center gap-3 mb-2 justify-center sm:justify-start cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/ShowTube", { state: { ChannelName: video.channel.name } });
                  }}
                >
                  <img
                    src={video.channel.thumbnail}
                    alt={video.channel.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  />
                  <p className="text-zinc-400 text-sm hover:text-white transition-all duration-300">
                    {video.channel.name}
                  </p>
                </div>

                <p className="text-zinc-400 text-sm">
                  {views(Number(video.views))} views • {video.published_date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl">لا توجد نتائج بحث</p>
        )}
      </div>
    </div>
  );
}
