import { Image } from "../atoms/Image"
import Offer from "../../assets/rice/2.jpg"
import { Text } from "../atoms/Text"
import { OfferTexts } from "../particles/Data"
import { List } from "../atoms/List"
import { useCallback } from "react"
import { Plant, Leaf, ChartLineUp } from "@phosphor-icons/react"
import { Fade } from "react-awesome-reveal"

const Offers = () => {

    const renderIcon = useCallback((element: number) => {
        switch (element) {
            case 0:
                return <Plant size={50} color="white" weight="light" />;
            case 1:
                return <Leaf size={50} color="white" weight="light" />;
            case 2:
                return <ChartLineUp size={50} color="white" weight="light" />;
            default:
                return "";
        }
    }, [])

    return (
        <section className="w-full h-auto flex items-center">
            <main className="w-full lg:h-[800px] grid md:grid-cols-2 items-center gap-10 md:gap-0 lg:gap-0 ">
                <div className="w-full md:h-[800px] h-[300px] grid">
                    <Image alt="Offer Image" objectCover="object-cover" className="w-full h-full" image={Offer} />
                </div>
                <div className="h-full w-full lg:px-10 px-4 flex flex-col lg:justify-center md:justify-end justify-center items-start md:gap-20 lg:gap-24 gap-16">
                    <Fade cascade damping={0.1} className="w-full">
                        <div className="w-full flex flex-col mt-10 lg:mt-24 items-center relative 
                        before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 
                        before:rounded-lg before:bg-gradient-to-r before:from-yellow-400 
                        before:to-green-400 z-10">
                            
                            <Text as="h1" className="text-white/90 lg:text-5xl md:text-4xl text-3xl">{OfferTexts.secondText}</Text>
                        </div>
                        <ul className="flex flex-col lg:gap-8 gap-6 pb-16">
                            {OfferTexts.list.map((item, index) => (
                                <List
                                    key={index}
                                    className="flex lg:gap-6 gap-4 items-start justify-start 
                         p-4 rounded-xl shadow-md 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/10"
                                >
                                    <Text
                                        as="span"
                                        className="text-white/90 transform transition-all duration-300 hover:rotate-12 hover:text-white"
                                    >
                                        {renderIcon(index)}
                                    </Text>
                                    <div className="flex flex-col gap-1">
                                        <Text as="h3" className="text-green-300 font-semibold">{item.listCaption}</Text>
                                        <Text as="p" className="text-white/70 text-justify">{item.text}</Text>
                                    </div>
                                </List>
                            ))}
                        </ul>
                    </Fade>
                </div>
            </main>
        </section>

    )
}

export default Offers
