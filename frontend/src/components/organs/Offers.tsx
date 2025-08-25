import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plant, Leaf, ChartLineUp, MagnifyingGlass  } from "@phosphor-icons/react";
import { Fade } from "react-awesome-reveal";
import { useAuth } from "../context/AuthContext";
import { Text } from "../atoms/Text";
import { List } from "../atoms/List";
import Offer from "../../assets/rice/2.jpg";
import { OfferTexts } from "../particles/Data";

const Offers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const renderIcon = useCallback((caption: string) => {
    switch (caption) {
      case "ข้อมูลพันธุ์ข้าว":
        return <Plant size={50} color="white" weight="light" />;
      case "โรคข้าว":
        return <Leaf size={50} color="white" weight="light" />;
      case "รายงานสถิติโรคข้าว":
        return <ChartLineUp size={50} color="white" weight="light" />;
      case "วินิจฉัยโรคข้าว":
        return <MagnifyingGlass  size={50} color="white" weight="light" />;
      default:
        return "";
    }
  }, []);

    const getPath = (caption: string) => {
    switch (caption) {
      case "วินิจฉัยโรคข้าว":
        return "/diagnosis";
      case "รายงานสถิติโรคข้าว":
        return "/report";
      case "ข้อมูลพันธุ์ข้าว":
        return "/varieties";
      case "โรคข้าว":
        return "/diseases";
      default:
        return "/";
    }
  };


  const canShowOffer = (offerItem: typeof OfferTexts.list[0]) => {
    if (!offerItem.role) return true;
    if (!user) return false;
    return offerItem.role.includes(user.role_name);
  };

  return (
    <section className="w-full h-auto flex items-center">
      <main className="w-full lg:h-[800px] grid md:grid-cols-2 items-center gap-10 md:gap-0 lg:gap-0 ">
        <div className="w-full md:h-[800px] h-[300px] grid">
          <img src={Offer} alt="Offer Image" className="w-full h-full object-cover" />
        </div>
        <div className="h-full w-full lg:px-10 px-4 flex flex-col lg:justify-center md:justify-end justify-center items-start md:gap-20 lg:gap-24 gap-16">
          <Fade cascade damping={0.1} className="w-full">
            <div
              className="w-full flex flex-col mt-10 lg:mt-24 items-center relative 
                        before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 
                        before:rounded-lg before:bg-gradient-to-r before:from-yellow-400 
                        before:to-green-400 z-10"
            >
              <Text as="h1" className="text-white/90 lg:text-5xl md:text-4xl text-3xl">
                {OfferTexts.secondText}
              </Text>
            </div>
            <ul className="flex flex-col lg:gap-8 gap-6 pb-16">
              {OfferTexts.list
                .filter(canShowOffer)
                .map((item, index) => (
                  <List key={index} className="flex lg:gap-6 gap-4 items-start justify-start">
                    <div
                      onClick={() => navigate(getPath(item.listCaption))}
                      className="flex lg:gap-6 gap-4 items-start justify-start 
                               p-4 rounded-xl shadow-md cursor-pointer
                               transform transition-all duration-300 
                               hover:scale-105 hover:shadow-xl hover:bg-white/10"
                    >
                      <Text
                        as="span"
                        className="text-white/90 transform transition-all duration-300 hover:rotate-12 hover:text-white"
                      >
                        {renderIcon(item.listCaption)}
                      </Text>
                      <div className="flex flex-col gap-1">
                        <Text as="h3" className="text-green-300 font-semibold">
                          {item.listCaption}
                        </Text>
                        <Text as="p" className="text-white/70 text-justify">
                          {item.text}
                        </Text>
                      </div>
                    </div>
                  </List>
                ))}
            </ul>
          </Fade>
        </div>
      </main>
    </section>
  );
};

export default Offers;
