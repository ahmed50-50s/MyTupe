import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { SearchContext } from "../../context/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const [HoverIndex, setHoverIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  let { DataList, setDataList } = useContext(SearchContext);
  let navigate = useNavigate();

  const location = useLocation();
  const CategoryName = location.state?.CategoryName || "فيديوات مصرية متنوعة"; 

  function views(view) {
    if (view >= 1000000) return parseInt(view / 1000000) + "m";
    if (view >= 1000) return parseInt(view / 1000) + "k";
    return view;
  }

  function goShowVideo(video) {
    navigate("/ShowVideo", { state: { video } });
  }

  async function GetData(search) {
    setIsLoading(true);
  
    let response = await axios.get(
      `/api/search.json?engine=youtube&search_query=${search}&api_key=963db332d651c2c25dfa85a450f22fb1c92fd64dff10253de07e5e382a6b0587`
    );
  
    setDataList(response.data.video_results);
    setIsLoading(false);
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    GetData(CategoryName);
    console.log(CategoryName);
  }, [CategoryName]);

  return (
    <>
      <div>
        <SideBar />
        <div className="flex flex-wrap justify-around p-4 w-5/6 float-right min-h-167" style={{ backgroundColor: "#0f0f0f" }}>
          {isLoading ? (
            <div className="w-full h-screen flex justify-center items-center">
              <span className="loader"></span>
            </div>
          ) : DataList.length > 0 ? (
            DataList.map((movie, index) => (
              <div
                key={index}
                className="w-1/3 transition-transform duration-300 transform hover:scale-105 p-2 rounded-xl"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <img
                  onClick={() => goShowVideo(movie)}
                  src={HoverIndex === index ? (movie.thumbnail.rich || movie.thumbnail.static) : movie.thumbnail.static}
                  alt={movie.title}
                  className="rounded-xl w-full"
                />
                <div className="flex items-center mt-3 cursor-pointer">
                  <img
                    src={movie.channel.thumbnail}
                    alt={movie.channel.name}
                    className="w-10 h-10 rounded-full mr-3"
                    onClick={() => {
                      navigate("/ShowTube", { state: { ChannelName: movie.channel.name } });
                    }}
                  />
                  <div>
                    <h3 onClick={() => goShowVideo(movie)} className="text-white font-medium text-base">{movie.title}</h3>
                    <p
                      onClick={() => navigate("/ShowTube", { state: { ChannelName: movie.channel.name } })}
                      className="text-zinc-400 text-sm hover:text-zinc-100"
                    >
                      {movie.channel.name}
                    </p>
                    <p onClick={() => goShowVideo(movie)} className="text-zinc-400 text-sm">
                      {views(Number(movie.views))} views • {movie.published_date}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">there is no videos</p>
          )}
        </div>
      </div>
    </>
  );
  
}
