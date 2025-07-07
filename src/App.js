import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactIntro from "./projects/ReactIntroPage/reactIntro.js";
import Home from "./projects/HomePage/home.js";
import ReactEssentials from "./projects/00-SmallProject/ReactEssentials/reactEssentials.jsx";
import TicTacToe from "./projects/00-SmallProject/TicTacToe/ticTacToe.jsx";
import InvestmentCalculator from "./projects/00-SmallProject/InvestmentCalculator/InvestmentCalculator.jsx";
import StyleAuthInput from "./projects/00-SmallProject/StyleAuthInput/StyleAuthInput.jsx";
import RefPortalPlayers from "./projects/01-MiddleProject/RefPortalPlayers/RefPortalPlayers.jsx";
import TailWindProjectManagement from "./projects/01-MiddleProject/TailWindProjectManagement/TailWindProjectManagement.jsx";
import AppHeader from "./projects/AppHeader/AppHeader.jsx";
import ContextShoppingCart from "./projects/01-MiddleProject/ContextShoppingCart/contextShoppingCart.jsx";
import SideEffectChooseDestination from "./projects/01-MiddleProject/SideEffectChooseDestination/sideEffectChooseDestination.jsx";
import QuizApp from "./projects/01-MiddleProject/QuizApp/QuizApp.jsx";
import CodeComparatorPage from "./projects/00-SmallProject/CodeCompare/CodeComparatorPage.jsx";
import SalaryCalculator from "./projects/00-SmallProject/SalaryCalculateApp/SalaryCalculator.jsx";
import CurrencyExchange from "./projects/00-SmallProject/CurrencyExchange/CurrencyExchange.jsx";
import JiangRenPractice from "./projects/JiangRenPractice/JiangRenPractice.jsx";
import ReactLiveCoding from "./projects/ReactLiveCoding/ReactLiveCoding.jsx";
import WeatherApp from "./projects/01-MiddleProject/00-WeatherApp/WeatherApp.jsx";
import MyToyRobot from "./projects/02-LargeProject/01-MyToyRobot/MyToyRobot.jsx";
import ReduxBookLibrary from "./projects/01-MiddleProject/06-ReduxBookLibrary/ReduxBookLibrary.jsx";
import CMS from "./projects/03-BackendRequiredProject/01-CMS-FE/CMS.jsx";
import ImageUpload from "./projects/03-BackendRequiredProject/02-ImageUploadApp/ImageUpload.jsx";
import ReduxLoginApp from "./projects/01-MiddleProject/07-ReduxLoginApp/ReduxLoginApp.jsx";
import ProductManagementApp from "./projects/03-BackendRequiredProject/03-ProductManagementApp/ProductManagementApp.jsx";

// sk-3f34203aba5c49c98ed87834e63f48ea
export default function App() {
  // Always use /React-Apps-Collection as basename for both development and production
  const basename = "/React-Apps-Collection/";

  return (
    <Router basename={basename}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<ReactIntro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reactEssentials" element={<ReactEssentials />} />
        <Route path="/ticTacToe" element={<TicTacToe />} />
        <Route
          path="/investmentCalculator"
          element={<InvestmentCalculator />}
        />
        <Route path="/styleAuthInput" element={<StyleAuthInput />} />
        <Route path="/refPortalPlayers" element={<RefPortalPlayers />} />
        <Route
          path="/tailWindProjectManagement"
          element={<TailWindProjectManagement />}
        />
        {/* Middle Projects */}
        <Route path="/contextShoppingCart" element={<ContextShoppingCart />} />
        <Route
          path="/sideEffectChooseDestination"
          element={<SideEffectChooseDestination />}
        />
        <Route path="/quizApp" element={<QuizApp />} />
        <Route path="/compareCode" element={<CodeComparatorPage />} />
        <Route path="/salaryCalculator" element={<SalaryCalculator />} />
        <Route path="/currencyExchange" element={<CurrencyExchange />} />
        <Route path="/reduxBookLibrary" element={<ReduxBookLibrary />} />
        <Route path="/reduxLoginApp" element={<ReduxLoginApp />} />
        {/* Large Projects */}
        <Route path="/weatherApp" element={<WeatherApp />} />
        <Route path="/myToyRobot" element={<MyToyRobot />} />        {/* Backend Required Projects */}
        {/* Backend Required RUN CMS PROJECT IN THE NODEJS PROJECT COLLECTIONS */}
        <Route path="/cms/*" element={<CMS />} />
        <Route path="/imageUpload" element={<ImageUpload />} />
        <Route path="/productManagement/*" element={<ProductManagementApp />} />
        {/* Practice Exercises */}
        {/* JiangRen Practice route with nested routes handled within the component */}
        <Route path="/jiangRenPractice/*" element={<JiangRenPractice />} />
        {/* React Live Coding practice route with nested routes handled within the component */}
        <Route path="/reactLiveCoding/*" element={<ReactLiveCoding />} />
      </Routes>
    </Router>
  );
}
