import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plant, Leaf, ChartLineUp, MagnifyingGlass } from "@phosphor-icons/react";
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
        return <MagnifyingGlass size={50} color="white" weight="light" />;
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
      <main className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 lg:gap-16">
        
        {/* รูปภาพ */}
        <div className="w-full h-64 sm:h-80 md:h-[800px] lg:h-[800px]">
          <img src={Offer} alt="Offer Image" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* ข้อความและรายการ */}
        <div className="h-full w-full px-4 sm:px-6 lg:px-10 flex flex-col justify-center gap-6 sm:gap-10 lg:gap-16">
          <Fade cascade damping={0.1} className="w-full">
            
            <div className="flex flex-col items-center relative mt-6 sm:mt-10 lg:mt-24">
              <Text as="h1" className="text-white/90 text-2xl sm:text-3xl lg:text-5xl font-bold text-center">
                {OfferTexts.secondText}
              </Text>
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 rounded-lg bg-gradient-to-r from-yellow-400 to-green-400"></div>
            </div>

            <ul className="flex flex-col gap-4 sm:gap-6 lg:gap-8 mt-6">
              {OfferTexts.list
                .filter(canShowOffer)
                .map((item, index) => (
                  <List key={index} className="flex w-full">
                    <div
                      onClick={() => navigate(getPath(item.listCaption))}
                      className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl shadow-md cursor-pointer
                                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/10 w-full"
                    >
                      <Text
                        as="span"
                        className="text-white/90 transform transition-all duration-300 hover:rotate-12 hover:text-white"
                      >
                        {renderIcon(item.listCaption)}
                      </Text>
                      <div className="flex flex-col gap-1">
                        <Text as="h3" className="text-green-300 font-semibold text-sm sm:text-base">
                          {item.listCaption}
                        </Text>
                        <Text as="p" className="text-white/70 text-sm sm:text-base text-justify">
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
