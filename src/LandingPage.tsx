import Footer from "index/footer";
import Jumbotron from "index/jumbotron";
import OfertasIndex from "index/ofertasIndex";
import SobreNosotros from "index/sobrenosotros";
import ViajesIndex from "index/viajesIndex";


export default function LandingPage() {


    return (
        <>
            <Jumbotron />
            <SobreNosotros />      
            <ViajesIndex />
            <OfertasIndex />
            <Footer />
        </>
    )
}