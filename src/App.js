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

// sk-3f34203aba5c49c98ed87834e63f48ea
export default function App() {
  return (
    <Router>
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
        <Route path="/contextShoppingCart" element={<ContextShoppingCart />} />
        <Route
          path="/sideEffectChooseDestination"
          element={<SideEffectChooseDestination />}
        />
        <Route path="/quizApp" element={<QuizApp />} />
        <Route path="/compareCode" element={<CodeComparatorPage />} />
        <Route path="/salaryCalculator" element={<SalaryCalculator />} />
        <Route path="/currencyExchange" element={<CurrencyExchange />} />

        {/* JiangRen Practice route with nested routes handled within the component */}
        <Route path="/jiangRenPractice/*" element={<JiangRenPractice />} />

        {/* React Live Coding practice route with nested routes handled within the component */}
        <Route path="/reactLiveCoding/*" element={<ReactLiveCoding />} />
      </Routes>
    </Router>
  );
}
