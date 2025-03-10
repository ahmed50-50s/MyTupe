import { useState } from "react";
import {
  faClock,
  faCode,
  faHome,
  faThumbsUp,
  faGamepad,
  faMusic,
  faFilm,
  faNewspaper,
  faFootballBall,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  const [activeCategory, setActiveCategory] = useState(null); 
  let navigate = useNavigate()

  function HandleCategory(CategoryName){
    navigate("/", { state: { CategoryName } });
    setActiveCategory(CategoryName)

  }

  return (
    <div className="fixed z-5 w-1/6 bg-[#0f0f0f] h-screen overflow-y-auto p-4">
      <div className="mt-4">
        <Link to={"/"}>
          <div className="flex items-center p-3 rounded-lg hover:bg-zinc-700 cursor-pointer">
            <FontAwesomeIcon icon={faHome} className="text-white text-xl mr-4" />
            <h2 className="text-white text-sm font-medium">Home</h2>
          </div>
        </Link>

        <div className="flex items-center p-3 rounded-lg hover:bg-zinc-700 cursor-pointer">
          <FontAwesomeIcon icon={faClock} className="text-white text-xl mr-4" />
          <h2 className="text-white text-sm font-medium">Watch Later</h2>
        </div>

        <div className="flex items-center p-3 rounded-lg hover:bg-zinc-700 cursor-pointer">
          <FontAwesomeIcon icon={faThumbsUp} className="text-white text-xl mr-4" />
          <h2 className="text-white text-sm font-medium">Liked Videos</h2>
        </div>
      </div>

      <hr className="border-zinc-700 my-4" />

      {/* الأقسام الفرعية */}
      <div className="text-white">
        <h3 className="text-zinc-400 text-xs uppercase mb-2 pl-3">Categories</h3>

        {/* العناصر داخل القسم الذي سيتم تفعيله */}
        {[
          { name: "Coding", icon: faCode },
          { name: "Gaming", icon: faGamepad },
          { name: "Music", icon: faMusic },
          { name: "Movies", icon: faFilm },
          { name: "News", icon: faNewspaper },
          { name: "Sports", icon: faFootballBall },
        ].map((category) => (
          <div
            key={category.name}
            className={`flex items-center p-3 rounded-lg cursor-pointer ${
              activeCategory === category.name ? "bg-red-800" : "hover:bg-zinc-700"
            }`}
            onClick={() => HandleCategory(category.name) }
          >
            <FontAwesomeIcon icon={category.icon} className="text-white text-xl mr-4" />
            <h2 className="text-white text-sm font-medium">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
