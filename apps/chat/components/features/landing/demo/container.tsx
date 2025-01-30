import { PetstoreIcon, PETSTORE_DEMO } from './icons/petstore';
import { ComingSoonIcon, COMING_SOON_DEMO } from './icons/coming-soon';
import { DemoType } from './types';

const DEMOS = [PETSTORE_DEMO, COMING_SOON_DEMO];

interface DemoContainerProps {
  onDemoSelect: (demo: DemoType) => void;
  selectedDemo: DemoType | null;
}

export function DemoContainer({ onDemoSelect, selectedDemo }: DemoContainerProps) {
  const renderDemoIcon = (demo: DemoType, index: number) => {
    const isSelected = selectedDemo?.url === demo.url;
    const onClick = () => onDemoSelect(demo);

    switch (demo.name) {
      case PETSTORE_DEMO.name:
        return (
          <PetstoreIcon key={demo.name} isSelected={isSelected} index={index} onClick={onClick} />
        );
      case COMING_SOON_DEMO.name:
        return (
          <ComingSoonIcon key={demo.name} isSelected={isSelected} index={index} onClick={onClick} />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Demo Icons Section */}
      <div className="relative flex h-20 items-center justify-center">
        {DEMOS.map((demo, index) => renderDemoIcon(demo, index))}
      </div>
      {/* Demo Description Section */}
      {selectedDemo && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">{selectedDemo.name}</h2>
          <p className="mt-2 text-gray-600">{selectedDemo.description}</p>
          {selectedDemo.subDescription && (
            <p
              className={`mt-2 text-sm font-medium ${
                selectedDemo.url ? 'text-pink-600' : 'text-green-600'
              }`}
            >
              {selectedDemo.subDescription}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
