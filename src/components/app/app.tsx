import ActionList from "components/actionlist/actionlist";
import Calculator from "components/calculator/calculator";
import Header from "components/header/header";
import Help from "components/help/help";
import Preset from "components/preset/preset";
import References from "components/references/references";
import Sequence from "components/sequence/sequence";
import Settings from "components/settings/settings";

export default function App() {
  return (
    <div className="min-h-full flex flex-col max-w-4xl mx-auto py-4">
      <div className="w-full">
        <Header />
        <div className="grid grid-cols-2 md:space-x-8">
          <div className="col-span-2 md:col-span-1">
            <ActionList />
            <Sequence />
            <Calculator />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Settings />
            <Preset />
            <Help />
            <References />
          </div>
        </div>
      </div>
    </div>
  );
}
