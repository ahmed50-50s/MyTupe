import { faSearch, faBell, faUserCircle, faVideo, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    let { setSearchTerm } = useContext(SearchContext);
    const [Value, setValue] = useState('');
    let navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // حالة القائمة المنسدلة

    function HandleSearch() {
        if (Value.trim() !== "") {
            setSearchTerm(Value);
            navigate("/SearchMovies");
        }
    }

    return (
        <div className="w-full flex items-center justify-between bg-[#0f0f0f] p-2 fixed z-50 shadow-lg">
            <div className="flex items-center gap-2 ml-10 cursor-pointer">
                <img
                    onClick={() => navigate("/")}
                    src="img/logo2.webp"
                    alt="Logo"
                    className="w-16 h-16"
                />
                <span className="text-white text-xl font-bold">MyTube</span>
            </div>

            <div className="flex items-center w-1/2">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 h-10 p-3 rounded-l-full bg-[#121212] text-white border border-gray-600 focus:outline-none"
                />
                <button
                    onClick={HandleSearch}
                    className="h-10 w-16 flex items-center justify-center bg-[#303030] border border-gray-600 rounded-r-full"
                >
                    <FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
                </button>
            </div>

            {/* أيقونات (تظهر فقط في md و lg) */}
            <div className="hidden sm:flex items-center gap-6 mr-4 text-white">
                <FontAwesomeIcon icon={faVideo} size="lg" className="cursor-pointer" />
                <FontAwesomeIcon icon={faBell} size="lg" className="cursor-pointer" />
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="cursor-pointer" />
            </div>

            {/* زر القائمة ☰ (يظهر فقط في sm) */}
            <div className="sm:hidden relative">
                <FontAwesomeIcon
                    icon={faBars}
                    size="lg"
                    className="cursor-pointer text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />

                {/* القائمة المنسدلة */}
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 bg-[#181818] text-white shadow-lg rounded-md py-2 w-40">
                        <button className="flex items-center px-4 py-2 hover:bg-[#303030] w-full">
                            <FontAwesomeIcon icon={faVideo} className="mr-2" />
                            <span>Videos</span>
                        </button>
                        <button className="flex items-center px-4 py-2 hover:bg-[#303030] w-full">
                            <FontAwesomeIcon icon={faBell} className="mr-2" />
                            <span>Notifications</span>
                        </button>
                        <button className="flex items-center px-4 py-2 hover:bg-[#303030] w-full">
                            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                            <span>Profile</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
