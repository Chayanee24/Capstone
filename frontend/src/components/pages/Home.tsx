import Offers from "../organs/Offers"
import MainLayout from "../atoms/MainLayout";

const Home = () => {
    return (
        <MainLayout>
            <div className="w-full min-h-screen bg-zinc-900 text-white ">
                <Offers />
            </div>
        </MainLayout>
    )
}

export default Home