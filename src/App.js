import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactIntro from "./components/ReactIntroPage/reactIntro";
import Home from "./components/HomePage/home";
import ReactEssentials from "./components/ReactEssentials/reactEssentials";
import TicTacToe from "./components/TicTacToe/ticTacToe";
import InvestmentCalculator from "./components/InvestmentCalculator/InvestmentCalculator";
import StyleAuthInput from "./components/StyleAuthInput/StyleAuthInput";
import RefPortalPlayers from "./components/RefPortalPlayers/RefPortalPlayers";
import TailWindProjectManagement from "./components/TailWindProjectManagement/TailWindProjectManagement";
import AppHeader from "./components/AppHeader/AppHeader";
import ContextShoppingCart from "./components/ContextShoppingCart/contextShoppingCart";
import SideEffectChooseDestination from "./components/SideEffectChooseDestination/sideEffectChooseDestination";
import QuizApp from "./components/QuizApp/QuizApp";
import CodeComparatorPage from "./components/CodeCompare/CodeComparatorPage";
import SalaryCalculator from "./components/SalaryCalculateApp/SalaryCalculator";
import CurrencyExchange from "./components/CurrencyExchange/CurrencyExchange";
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
      </Routes>
    </Router>
  );
}
