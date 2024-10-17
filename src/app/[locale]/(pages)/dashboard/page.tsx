
import Dashboard from "@/components/Dashboard/Dashboard";
import LanguageSelector from "@/components/LanguageSwitcher/LanguageSwitcher";

const HomePage = () => {

  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <LanguageSelector />
      {/* Other components */}
    </div>
  );
};

export default HomePage;