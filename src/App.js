import React from "react";
import { AppProvider } from "./AppContext";
import Header from "./Header";
import "./App.css";
import SectionProducts from "./Products";
import Footer from "./Footer";

const App = () => {
  return (
    <AppProvider>
      <div>
        <div className="marginContainer">
          <Header />
          <SectionProducts />
        </div>
        <Footer/>
      </div>
    </AppProvider>
  );
};

export default App;
