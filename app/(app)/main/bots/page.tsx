import MainNavBar from "@/components/navbar/MainBar";
import BotAdd from "@/components/bot_pages/addbot";

const BotsMain = () => {
    return (
        <>
        <MainNavBar />
        <section className="">
            <BotAdd />
        </section>
        </>
    )
}

export default BotsMain;