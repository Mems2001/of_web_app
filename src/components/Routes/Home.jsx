import { useDispatch } from "react-redux";
import MainCarrousel from "../Home/MainCarrousel";
import { setLocation } from "../../store/slices/location.slice";
import { useEffect } from "react";

function Home() {

    const dispatch = useDispatch();
    
    useEffect(
        () => {
            dispatch(setLocation(window.location.href.split('#')[1]))
        } , []
    )

    return(
        <section className="homeCont">
            <MainCarrousel />
        </section>
    )
}

export default Home