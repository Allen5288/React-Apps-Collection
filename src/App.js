import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactIntro from "./components/ReactIntroPage/reactIntro";
import Home from "./components/HomePage/home";
import ReactEssentials from "./components/00-SmallProject/ReactEssentials/reactEssentials";
import TicTacToe from "./components/00-SmallProject/TicTacToe/ticTacToe";
import InvestmentCalculator from "./components/00-SmallProject/InvestmentCalculator/InvestmentCalculator";
import StyleAuthInput from "./components/00-SmallProject/StyleAuthInput/StyleAuthInput";
import RefPortalPlayers from "./components/01-MiddleProject/RefPortalPlayers/RefPortalPlayers";
import TailWindProjectManagement from "./components/01-MiddleProject/TailWindProjectManagement/TailWindProjectManagement";
import AppHeader from "./components/AppHeader/AppHeader";
import ContextShoppingCart from "./components/01-MiddleProject/ContextShoppingCart/contextShoppingCart";
import SideEffectChooseDestination from "./components/01-MiddleProject/SideEffectChooseDestination/sideEffectChooseDestination";
import QuizApp from "./components/01-MiddleProject/QuizApp/QuizApp";
import CodeComparatorPage from "./components/00-SmallProject/CodeCompare/CodeComparatorPage";
import SalaryCalculator from "./components/00-SmallProject/SalaryCalculateApp/SalaryCalculator";
import CurrencyExchange from "./components/00-SmallProject/CurrencyExchange/CurrencyExchange";
import JiangRenPractice from "./components/JiangRenPractice/JiangRenPractice";
import ReactLiveCoding from "./components/ReactLiveCoding/ReactLiveCoding";
import WeatherApp from "./components/02-LargeProject/00-WeatherApp/WeatherApp";
import MyToyRobot from "./components/02-LargeProject/01-MyToyRobot/MyToyRobot";
import ReduxBookLibrary from "./components/01-MiddleProject/06-ReduxBookLibrary/ReduxBookLibrary";
import { lazy } from "react";
import CMS from "./components/03-BackendRequiredProject/01-CMS-FE/CMS";

// sk-3f34203aba5c49c98ed87834e63f48ea
export default function App() {
  // Get the base URL from the environment or default to "/React-Apps-Collection"
  // This ensures the app works both locally and on GitHub Pages
  const basename = process.env.PUBLIC_URL || "/React-Apps-Collection";

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
        {/* Large Projects */}
        <Route path="/weatherApp" element={<WeatherApp />} />
        <Route path="/myToyRobot" element={<MyToyRobot />} />
        {/* Backend Required Projects */}
        <Route path="/cms" element={<CMS />} />
        {/* Practice Exercises */}
        {/* JiangRen Practice route with nested routes handled within the component */}
        <Route path="/jiangRenPractice/*" element={<JiangRenPractice />} />
        {/* React Live Coding practice route with nested routes handled within the component */}
        <Route path="/reactLiveCoding/*" element={<ReactLiveCoding />} />
      </Routes>
    </Router>
  );
}
