import "./LegalNotice.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function LegalNotice() {
  return (
    <>
      <Header />
      <Sidebar />

      <div className="legalNotice">
        <p>
          This work uses material from the Quest Creators Resource. The Quest
          Creators Resource by The Adventure Guild, LLC is licensed under CC BY
          4.0. For more information about Quest, please visit {""}
          <a href="https://www.adventure.game" target="_blank">
            www.adventure.game
          </a>
          . Additionally, please read Quest’s Community Guidelines to help
          create experiences that are positive and fun.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default LegalNotice;
