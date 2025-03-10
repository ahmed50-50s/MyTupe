import { faSearch, faBell, faUserCircle, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';



export default function Nav() {
    let {SearchTerm , setSearchTerm} = useContext(SearchContext)
    const [Value , setValue] = useState('')
    let { DataList } = useContext(SearchContext);
    let navigate = useNavigate();
    
    function HandleSearch() {
        if (Value.trim() !== "") {
            setSearchTerm(Value);  
            navigate("/SearchMovies");
        }
    }
    
    
    return (
        <div className="w-full flex items-center justify-between bg-[#0f0f0f] p-2 fixed z-5">
            <div className="flex items-center gap-2 ml-4 cursor-pointer">
                <img
                onClick={()=>navigate("/")}
                src="img/logo2.webp" alt="Logo" className="w-16 h-16" />
                <span className="text-white text-xl font-bold">MyTube</span>
            </div>

           <div className="flex items-center w-1/2">
                <input 
                    type="text" 
                    placeholder="Search"
                    onChange={(e)=>
                        {
                            setValue(e.target.value)
                        }}
                    className="flex-1 h-10 p-3 rounded-l-full bg-[#121212] text-white border border-gray-600 focus:outline-none"
                />
                <button
                    onClick={
                        HandleSearch}
                    className="h-10 w-16 flex items-center justify-center bg-[#303030] border border-gray-600 rounded-r-full">
                    <FontAwesomeIcon icon={faSearch} className="text-white text-lg" />
                </button>
            </div>

            <div className="flex items-center gap-6 mr-4 text-white">
                <FontAwesomeIcon icon={faVideo} size="lg" className="cursor-pointer" />
                <FontAwesomeIcon icon={faBell} size="lg" className="cursor-pointer" />
                <FontAwesomeIcon icon={faUserCircle} size="2x" className="cursor-pointer" />
            </div>
        </div>
    );
}
